"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function TiltPortrait({
  priority = true,
  sizes = "190px",
}: {
  priority?: boolean;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
    };

    const onLeave = () => {
      el.style.transform = "perspective(800px)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="portrait" ref={ref}>
      <Image
        src="/images/portrait.jpg"
        alt="Adrian Sanchez"
        fill
        priority={priority}
        sizes={sizes}
      />
    </div>
  );
}
