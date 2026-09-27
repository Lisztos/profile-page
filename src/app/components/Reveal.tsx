"use client";

import { useEffect, useRef } from "react";

let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (typeof window === "undefined") return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            sharedObserver?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );
  }
  return sharedObserver;
}

export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }

    const observer = getObserver();
    observer?.observe(el);
    return () => observer?.unobserve(el);
  }, []);

  return (
    <div ref={ref} className={["fx", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
