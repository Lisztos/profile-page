"use client";

import { useEffect, useState } from "react";

export function CommandHint() {
  const [mac, setMac] = useState(true);

  useEffect(() => {
    setMac(/Mac|iPhone|iPod|iPad/.test(navigator.userAgent));
  }, []);

  return (
    <button
      type="button"
      className="hotkey-hint"
      aria-label="Open command palette"
      onClick={() => window.dispatchEvent(new Event("cmdk:open"))}
    >
      {mac ? "⌘" : "Ctrl"}K
    </button>
  );
}
