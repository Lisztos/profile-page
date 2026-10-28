const CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>[]{}|/\\-=_+!@#$%^&*?~";

const LOCK_BASE_MS = 320;
const LOCK_STAGGER_MS = 72;

function lockAt(index: number): number {
  return LOCK_BASE_MS + index * LOCK_STAGGER_MS;
}

function randomGlyph(seed: number): string {
  return CHARSET[Math.abs(seed) % CHARSET.length]!;
}

export function scrambleFrame(target: string, elapsed: number): string {
  return [...target]
    .map((char, index) => {
      if (char === " ") return " ";
      const lock = lockAt(index);
      if (elapsed >= lock) return char;
      const tick = Math.floor(elapsed / 28);
      return randomGlyph(char.charCodeAt(0) * 17 + index * 991 + tick * 13);
    })
    .join("");
}

export function runScramble(
  target: string,
  onFrame: (value: string) => void,
  onDone: () => void,
): () => void {
  const started = performance.now();
  let frame = 0;

  const tick = (now: number) => {
    const elapsed = now - started;
    onFrame(scrambleFrame(target, elapsed));

    const done = [...target].every(
      (char, index) => char === " " || elapsed >= lockAt(index),
    );
    if (!done) {
      frame = requestAnimationFrame(tick);
    } else {
      onFrame(target);
      onDone();
    }
  };

  onFrame(scrambleFrame(target, 0));
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}
