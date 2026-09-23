"use client";

import { useEffect, useRef, useState } from "react";

let played = false;

export function Preloader() {
  const [visible, setVisible] = useState(!played);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;

    if (played) {
      html.classList.add("ready");
      html.classList.remove("loading");
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      played = true;
      html.classList.add("ready");
      html.classList.remove("loading");
      const loader = loaderRef.current;
      if (!loader) {
        setVisible(false);
        return;
      }
      loader.classList.add("leaving", "done");
      window.setTimeout(() => setVisible(false), 750);
    };

    if (reduced) {
      finish();
      return;
    }

    html.classList.add("loading");
    const t0 = performance.now();
    const dur = 1400;
    let frame = 0;

    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      if (countRef.current) {
        countRef.current.textContent = String(Math.floor(e * 100)).padStart(2, "0");
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${e})`;
      }
      if (p < 1) {
        frame = requestAnimationFrame(step);
      } else {
        if (countRef.current) countRef.current.textContent = "100";
        window.setTimeout(finish, 120);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!visible) return null;

  return (
    <div id="loader" ref={loaderRef} aria-hidden="true">
      <div className="row">
        <span className="meta">PORTFOLIO 2026 - ADRIAN SANCHEZ</span>
        <span className="meta">BERLIN, DE</span>
      </div>
      <div className="mid">
        <div className="big">
          <span>Adrian</span>
          <span className="l2">
            <em>Sanchez</em>.
          </span>
        </div>
      </div>
      <div className="row">
        <span className="meta">LOADING SELECTED WORK</span>
        <span className="count">
          <span ref={countRef}>00</span>
          <span className="of">/100</span>
        </span>
      </div>
      <div className="bar" ref={barRef} />
    </div>
  );
}
