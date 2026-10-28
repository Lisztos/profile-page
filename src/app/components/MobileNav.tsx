"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="mobile-nav" data-open={open ? "" : undefined}>
      <button
        ref={toggleRef}
        type="button"
        className="mobile-nav-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="mobile-nav-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      {open ? (
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => setOpen(false)}
        />
      ) : null}
      <nav
        id={panelId}
        className="mobile-nav-panel"
        aria-label="Site"
        aria-hidden={!open}
        inert={open ? undefined : true}
      >
        <ul className="mobile-nav-list">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={pathname === href ? "is-current" : undefined}
                aria-current={pathname === href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
