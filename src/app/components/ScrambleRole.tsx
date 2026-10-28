"use client";

import { useEffect, useState } from "react";
import DecryptedText from "./DecryptedText";

/** Match `.hero-fade.d2` transition-delay in globals.css */
const START_DELAY_MS = 380;

export function ScrambleRole({ text }: { text: string }) {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAnimate(!reduced);
  }, []);

  return (
    <h2 className="role" aria-label={text}>
      <span className="role-text">
        {animate ? (
          <DecryptedText
            text={text}
            animateOn="inViewHover"
            effect="scramble"
            sequential
            revealDirection="start"
            speed={28}
            maxIterations={18}
            characters="01"
            scrambleColor="#244068"
            startDelay={START_DELAY_MS}
            revealLead={12}
            className="scramble-char"
            encryptedClassName="scramble-char scramble-char-hot"
          />
        ) : (
          text
        )}
      </span>
      <span className="role-caret" aria-hidden="true" />
    </h2>
  );
}
