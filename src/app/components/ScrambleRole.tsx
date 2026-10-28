"use client";

import { useEffect, useState } from "react";
import DecryptedText from "./DecryptedText";

/** Match `.hero-fade.d2` transition-delay in globals.css */
const START_DELAY_MS = 380;

const roleRevealMs = (text: string) => START_DELAY_MS + text.length * 32 + 280;

const locationRevealMs = (text: string) => text.length * 32 + 320;

type Phase = "role" | "location" | "done";

const decryptProps = {
  animateOn: "inViewHover" as const,
  effect: "scramble" as const,
  sequential: true,
  revealDirection: "start" as const,
  speed: 28,
  maxIterations: 18,
  characters: "01",
  scrambleColor: "#244068",
  revealLead: 12,
  className: "scramble-char",
  encryptedClassName: "scramble-char scramble-char-hot",
};

export function ScrambleRole({
  text,
  location,
}: {
  text: string;
  location?: string;
}) {
  const [animate, setAnimate] = useState(true);
  const [phase, setPhase] = useState<Phase>("role");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAnimate(!reduced);
    if (reduced) setPhase("done");
  }, []);

  useEffect(() => {
    if (!animate || !location) {
      if (!location) setPhase("done");
      return;
    }

    const roleDoneAt = roleRevealMs(text);
    const toLocation = window.setTimeout(() => setPhase("location"), roleDoneAt);
    const toDone = window.setTimeout(
      () => setPhase("done"),
      roleDoneAt + locationRevealMs(location),
    );

    return () => {
      window.clearTimeout(toLocation);
      window.clearTimeout(toDone);
    };
  }, [animate, location, text]);

  const showRoleCaret = animate && Boolean(location) && phase === "role";
  const showLocationLine = !location || !animate || phase !== "role";
  const showLocationCaret =
    !location || !animate || phase === "location" || phase === "done";

  return (
    <div className="titlebar-meta">
      <h2 className="role" aria-label={text}>
        <span className="role-text">
          {animate ? (
            <DecryptedText
              text={text}
              startDelay={START_DELAY_MS}
              {...decryptProps}
            />
          ) : (
            text
          )}
        </span>
        {showRoleCaret ? <span className="role-caret" aria-hidden="true" /> : null}
      </h2>
      {location ? (
        <p
          className="meta titlebar-location"
          aria-label={location}
          hidden={!showLocationLine}
        >
          <span className="titlebar-location-text">
            {!animate || phase === "done" ? (
              location
            ) : phase === "location" ? (
              <DecryptedText text={location} startDelay={0} {...decryptProps} />
            ) : null}
          </span>
          {showLocationCaret && showLocationLine ? (
            <span className="role-caret" aria-hidden="true" />
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
