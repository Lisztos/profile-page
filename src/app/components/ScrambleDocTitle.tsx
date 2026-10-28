"use client";

import { Fragment, useEffect, useState } from "react";
import DecryptedText from "./DecryptedText";

const START_DELAY_MS = 200;

const decryptProps = {
  animateOn: "inViewHover" as const,
  effect: "scramble" as const,
  sequential: true,
  revealDirection: "start" as const,
  speed: 28,
  maxIterations: 18,
  characters: "01",
  scrambleColor: "#1a1917",
  revealLead: 12,
  className: "scramble-char",
  encryptedClassName: "scramble-char scramble-char-hot",
};

function StaticLines({ text }: { text: string }) {
  const lines = text.split("\n");
  return lines.map((line, index) => (
    <Fragment key={index}>
      {index > 0 ? <br /> : null}
      {line}
    </Fragment>
  ));
}

export function ScrambleDocTitle({
  text,
  label = text.replace(/\n/g, " "),
}: {
  text: string;
  label?: string;
}) {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAnimate(!reduced);
  }, []);

  return (
    <span className="scramble-title" aria-label={label}>
      {animate ? (
        <DecryptedText text={text} startDelay={START_DELAY_MS} {...decryptProps} />
      ) : (
        <StaticLines text={text} />
      )}
    </span>
  );
}
