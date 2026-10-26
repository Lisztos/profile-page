"use client";

import { useEffect, useRef } from "react";

export function InkCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const cur = ref.current;
    if (!cur) return;

    document.documentElement.classList.add("cursor-on");

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let frame = 0;
    let running = true;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    let onDark = false;

    const inside = (el: Element | null, x: number, y: number) => {
      if (!el) return false;
      const box = el.getBoundingClientRect();
      return x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
    };

    const darkFill = (color: string) => {
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (!match) return null;
      const alpha = match[4] === undefined ? 1 : Number(match[4]);
      if (alpha < 0.6) return null;
      const r = Number(match[1]);
      const g = Number(match[2]);
      const b = Number(match[3]);
      return 0.2126 * r + 0.7152 * g + 0.0722 * b < 90;
    };

    const darkUnder = (x: number, y: number) => {
      if (inside(document.querySelector("footer"), x, y)) return true;
      if (inside(document.querySelector(".ticker"), x, y)) return true;

      for (const node of document.elementsFromPoint(x, y)) {
        if (!(node instanceof Element)) continue;
        if (node.id === "cursor") continue;
        if (node.tagName === "NEXTJS-PORTAL" || node.closest("nextjs-portal")) continue;
        const dark = darkFill(getComputedStyle(node).backgroundColor);
        if (dark !== null) return dark;
      }
      return false;
    };

    const follow = () => {
      if (!running) return;
      cx += (tx - cx) * 0.45;
      cy += (ty - cy) * 0.45;
      cur.style.translate = `${cx.toFixed(1)}px ${cy.toFixed(1)}px`;
      const dark = darkUnder(tx, ty);
      if (dark !== onDark) {
        onDark = dark;
        cur.classList.toggle("on-dark", dark);
      }
      frame = requestAnimationFrame(follow);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      cur.classList.toggle("hot", !!target?.closest("a, button"));
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseover", onOver);
    frame = requestAnimationFrame(follow);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("cursor-on");
    };
  }, []);

  return <div id="cursor" ref={ref} />;
}
