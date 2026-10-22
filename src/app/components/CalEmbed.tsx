"use client";

import { useEffect } from "react";
import { calBookingPath, site } from "@/lib/site";

const EMBED_SRC = "https://app.cal.eu/embed/embed.js";
const CAL_ORIGIN = "https://app.cal.eu";

type CalApi = {
  (instruction: string, arg?: object): void;
  loaded?: boolean;
  q: unknown[];
  ns: Record<string, unknown>;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

let booted = false;
let queuedOpen = false;

function bootCal() {
  if (booted || window.Cal?.loaded) return;
  booted = true;

  const cal = function (instruction: string, arg?: object) {
    const fn = window.Cal;
    if (!fn) return;
    if (!fn.loaded) {
      fn.ns = {};
      fn.q = fn.q || [];
      const script = document.createElement("script");
      script.src = EMBED_SRC;
      script.async = true;
      script.addEventListener("error", () => {
        script.dataset.failed = "true";
        if (queuedOpen) window.location.assign(site.cal);
      });
      document.head.appendChild(script);
      fn.loaded = true;
    }
    fn.q.push(arg === undefined ? [instruction] : [instruction, arg]);
  } as CalApi;

  cal.q = [];
  cal.ns = {};
  window.Cal = cal;

  cal("init", { origin: CAL_ORIGIN });
  // Prerender the booking modal, including open slots, so the click only has to show it.
  cal("preload", {
    calLink: calBookingPath,
    type: "modal",
    options: {
      backgroundSlotsFetch: true,
      slotsStaleTimeMs: 5 * 60 * 1000,
    },
  });
}

function embedReady() {
  return !!customElements.get("cal-modal-box");
}

function modalIsOpen() {
  const modal = document.querySelector("cal-modal-box");
  if (!modal) return false;
  // Closing sets visibility without changing the state attribute.
  return getComputedStyle(modal).visibility !== "hidden";
}

export function CalEmbed() {
  useEffect(() => {
    bootCal();

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      const anchor = (event.target as Element | null)?.closest?.("a[data-cal-link]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
      if (modified) {
        event.stopPropagation();
        return;
      }

      const script = document.querySelector(`script[src="${EMBED_SRC}"]`);
      if (script instanceof HTMLScriptElement && script.dataset.failed === "true") return;

      event.preventDefault();
      if (embedReady()) return;

      queuedOpen = true;
      window.Cal?.("modal", {
        calLink: anchor.dataset.calLink || calBookingPath,
        config: {},
      });
    };

    const syncCursor = () => {
      document.documentElement.classList.toggle("cal-open", modalIsOpen());
    };

    const watched = new WeakSet<Element>();
    const modalObserver = new MutationObserver(syncCursor);
    const watchModal = () => {
      const modal = document.querySelector("cal-modal-box");
      if (!modal || watched.has(modal)) return;
      watched.add(modal);
      modalObserver.observe(modal, {
        attributes: true,
        attributeFilter: ["style", "state"],
      });
      syncCursor();
    };

    const appearance = new MutationObserver(watchModal);
    appearance.observe(document.body, { childList: true, subtree: true });
    watchModal();

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      appearance.disconnect();
      modalObserver.disconnect();
      document.documentElement.classList.remove("cal-open");
    };
  }, []);

  return null;
}
