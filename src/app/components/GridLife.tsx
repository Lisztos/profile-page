"use client";

import { useEffect, useRef } from "react";

const CELL = 18;
const FADE_STEP = 0.06;
const LIFE_INTERVAL_MS = 160;
const IDLE_MS = 500;
const IDLE_SPAWN_INTERVAL_MS = 1100;
const IDLE_SPAWN_CHANCE = 0.2;
const MAX_ALIVE_RATIO = 0.01;
const MAX_ALPHA = 0.22;
const NEIGHBOR_SPAWN_CHANCE = 0.3;
const INK = "20, 23, 26";

export function GridLife() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cols = 0;
    let rows = 0;
    let alive = new Uint8Array(0);
    let next = new Uint8Array(0);
    let brightness = new Float32Array(0);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / CELL) + 1;
      rows = Math.ceil(h / CELL) + 1;
      alive = new Uint8Array(cols * rows);
      next = new Uint8Array(cols * rows);
      brightness = new Float32Array(cols * rows);
    };
    resize();

    let lastMoveAt = 0;
    let mouseCellX = -1;
    let mouseCellY = -1;
    let trailCellX = -1;
    let trailCellY = -1;

    const spawnBlob = (cx: number, cy: number) => {
      const points: Array<[number, number]> = [
        [0, 0],
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      for (const [dx, dy] of points) {
        const x = cx + dx;
        const y = cy + dy;
        if (x < 0 || x >= cols || y < 0 || y >= rows) continue;
        if (dx === 0 && dy === 0) {
          alive[y * cols + x] = 1;
        } else if (Math.random() < NEIGHBOR_SPAWN_CHANCE) {
          alive[y * cols + x] = 1;
        }
      }
    };

    // Lays a trail between the last and current cursor cell so fast swipes
    // don't leave gaps the life-step would otherwise kill immediately.
    const spawnTrail = (cx: number, cy: number) => {
      if (trailCellX < 0) {
        spawnBlob(cx, cy);
      } else {
        const steps = Math.max(Math.abs(cx - trailCellX), Math.abs(cy - trailCellY));
        for (let s = 0; s <= steps; s++) {
          const t = steps === 0 ? 0 : s / steps;
          spawnBlob(
            Math.round(trailCellX + (cx - trailCellX) * t),
            Math.round(trailCellY + (cy - trailCellY) * t),
          );
        }
      }
      trailCellX = cx;
      trailCellY = cy;
    };

    const onMove = (e: MouseEvent) => {
      lastMoveAt = performance.now();
      mouseCellX = Math.floor(e.clientX / CELL);
      mouseCellY = Math.floor(e.clientY / CELL);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);

    let visible = !document.hidden;
    const onVisibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const neighbors = (x: number, y: number) => {
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;
          n += alive[ny * cols + nx];
        }
      }
      return n;
    };

    let raf = 0;
    let lastLifeStep = 0;
    let lastIdleSpawn = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const moving = now - lastMoveAt < 80;
      if (moving) {
        spawnTrail(mouseCellX, mouseCellY);
      } else {
        trailCellX = -1;
        trailCellY = -1;
      }

      if (now - lastMoveAt > IDLE_MS && now - lastIdleSpawn > IDLE_SPAWN_INTERVAL_MS) {
        lastIdleSpawn = now;
        if (Math.random() < IDLE_SPAWN_CHANCE) {
          const x = Math.floor(Math.random() * cols);
          const y = Math.floor(Math.random() * rows);
          alive[y * cols + x] = 1;
        }
      }

      if (now - lastLifeStep > LIFE_INTERVAL_MS) {
        lastLifeStep = now;
        let aliveCount = 0;
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const i = y * cols + x;
            const n = neighbors(x, y);
            const willLive = alive[i] === 1 ? n === 2 || n === 3 : n === 3;
            next[i] = willLive ? 1 : 0;
            if (willLive) aliveCount++;
          }
        }
        if (aliveCount > cols * rows * MAX_ALIVE_RATIO) {
          for (let i = 0; i < next.length; i++) {
            if (next[i] === 1 && Math.random() < 0.35) next[i] = 0;
          }
        }
        alive.set(next);
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = `rgba(${INK}, 1)`;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const target = alive[i] ? 1 : 0;
          const dir = target > brightness[i] ? 1 : -1;
          brightness[i] = Math.max(0, Math.min(1, brightness[i] + dir * FADE_STEP));
          if (brightness[i] <= 0.01) continue;
          const px = x * CELL + CELL / 2;
          const py = y * CELL + CELL / 2;
          const r = 0.8 + brightness[i] * 1;
          ctx.globalAlpha = brightness[i] * MAX_ALPHA;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} id="grid-life" aria-hidden="true" />;
}
