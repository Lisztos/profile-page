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

    const follow = () => {
      if (!running) return;
      cx += (tx - cx) * 0.45;
      cy += (ty - cy) * 0.45;
      cur.style.translate = `${cx.toFixed(1)}px ${cy.toFixed(1)}px`;
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
