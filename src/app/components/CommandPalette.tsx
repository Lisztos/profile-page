"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/lib/site";

type Group = "pages" | "links" | "actions";

type Item = {
  id: string;
  label: string;
  hotkey?: string;
  hint: string;
  group: Group;
  run: () => void;
  keepOpen?: boolean;
};

const GROUP_TITLES: Record<Group, string> = {
  pages: "pages",
  links: "links",
  actions: "actions",
};

function scrollToId(id: string) {
  if (window.location.pathname !== "/") {
    window.location.assign(`/#${id}`);
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(
    () => [
      { id: "top", label: "Top", hotkey: "0", hint: "section", group: "pages", run: () => scrollToId("top") },
      { id: "about", label: "About", hotkey: "1", hint: "section", group: "pages", run: () => scrollToId("about") },
      {
        id: "starred",
        label: "Starred Repos",
        hotkey: "2",
        hint: "section",
        group: "pages",
        run: () => scrollToId("starred"),
      },
      {
        id: "projects",
        label: "Projects",
        hotkey: "3",
        hint: "section",
        group: "pages",
        run: () => scrollToId("projects"),
      },
      { id: "github", label: "GitHub", hint: "profile", group: "links", run: () => openExternal(site.github) },
      {
        id: "linkedin",
        label: "LinkedIn",
        hint: "profile",
        group: "links",
        run: () => openExternal(site.linkedin),
      },
      {
        id: "github-stars",
        label: "All starred repos",
        hint: "github.com",
        group: "links",
        run: () => openExternal(site.githubStars),
      },
      {
        id: "book-call",
        label: "Book a call",
        hint: "cal.eu",
        group: "actions",
        run: () => openExternal(site.cal),
      },
      {
        id: "copy-link",
        label: "Copy site link",
        hint: copied ? "copied!" : "clipboard",
        group: "actions",
        keepOpen: true,
        run: () => {
          navigator.clipboard?.writeText(site.url);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        },
      },
    ],
    [copied],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) => item.label.toLowerCase().includes(q) || item.hint.toLowerCase().includes(q),
    );
  }, [items, query]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const run = (item: Item) => {
    item.run();
    if (!item.keepOpen) close();
  };

  // cmd+k / ctrl+k toggles the palette from anywhere on the page.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[activeIndex];
        if (item) run(item);
        return;
      }

      // Bare digit presses jump straight to a page, but only while the query is
      // empty — once the user starts typing, digits are just search text.
      if (query === "") {
        const hotkeyMatch = items.find((i) => i.group === "pages" && i.hotkey === e.key);
        if (hotkeyMatch) {
          e.preventDefault();
          run(hotkeyMatch);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, filtered, activeIndex, items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Lets the visible ⌘K hint badge open the palette without duplicating state.
  useEffect(() => {
    const onOpenRequest = () => setOpen(true);
    window.addEventListener("cmdk:open", onOpenRequest);
    return () => window.removeEventListener("cmdk:open", onOpenRequest);
  }, []);

  if (!open) return null;

  let flatIndex = -1;
  const groups: Group[] = ["pages", "links", "actions"];

  return (
    <div className="cmdk-backdrop" onClick={close} role="presentation">
      <div
        className="cmdk"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          className="cmdk-input"
          placeholder="Jump to a section, link, or action…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="cmdk-list">
          {filtered.length === 0 ? (
            <div className="cmdk-empty">No matches</div>
          ) : (
            groups.map((group) => {
              const groupItems = filtered.filter((i) => i.group === group);
              if (groupItems.length === 0) return null;
              return (
                <div key={group} className="cmdk-group">
                  <div className="cmdk-group-title">{GROUP_TITLES[group]}</div>
                  {groupItems.map((item) => {
                    flatIndex += 1;
                    const index = flatIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`cmdk-item${index === activeIndex ? " active" : ""}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => run(item)}
                      >
                        <span className="cmdk-key">
                          {item.group === "pages" ? item.hotkey : item.group === "links" ? "↗" : "»"}
                        </span>
                        <span className="cmdk-label">{item.label}</span>
                        <span className="cmdk-hint">{item.hint}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
