"use client";

import { runScramble } from "@/lib/scramble-text";
import { useEffect, useState } from "react";

/** Match `.hero-fade.d2` transition-delay in globals.css */
const START_DELAY_MS = 380;

const SCRAMBLE_KEY = "hero-role-scramble-v2";

export function ScrambleRole({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem(SCRAMBLE_KEY) === "1";
    } catch {
      /* private mode */
    }

    if (reduced || alreadyPlayed) {
      setDisplay(text);
      return;
    }

    let cancelScramble: (() => void) | undefined;
    const startTimer = window.setTimeout(() => {
      cancelScramble = runScramble(text, setDisplay, () => {
        setDisplay(text);
        try {
          sessionStorage.setItem(SCRAMBLE_KEY, "1");
        } catch {
          /* private mode */
        }
      });
    }, START_DELAY_MS);

    return () => {
      window.clearTimeout(startTimer);
      cancelScramble?.();
    };
  }, [text]);

  return (
    <h2 className="role" aria-label={text}>
      <span className="role-text">
        {[...display].map((char, index) => (
          <span className="scramble-char" key={`${index}-${text[index]}`}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      <span className="role-caret" aria-hidden="true" />
    </h2>
  );
}
