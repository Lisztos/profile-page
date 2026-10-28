"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { site } from "@/lib/site";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [mac, setMac] = useState(true);
  const pathname = usePathname();
  const sheetId = useId();
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    setMac(/Mac|iPhone|iPod|iPad/.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.logoTone = site.logos.tone;
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      openRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function openCommandMenu() {
    setOpen(false);
    window.dispatchEvent(new Event("cmdk:open"));
  }

  return (
    <>
      <div className="site-chrome-bar" aria-hidden="true" />
      <a
        className="site-logo"
        href="/"
        aria-label={`${site.name} home`}
        style={{ "--logo-mark-src": `url(${site.logos.mark})` } as CSSProperties}
      >
        <span className="site-mark-glyph" aria-hidden="true" />
      </a>

      <nav className="site-nav-desktop" aria-label="Site">
        {LINKS.map(({ href, label }, index) => (
          <Fragment key={href}>
            {index > 0 ? (
              <span className="site-nav-sep" aria-hidden="true">
                ·
              </span>
            ) : null}
            <a
              href={href}
              className={pathname === href ? "site-nav-link sweep is-current" : "site-nav-link sweep"}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </a>
          </Fragment>
        ))}
      </nav>

      <div className="mobile-nav" data-open={open ? "" : undefined}>
        <button
          ref={openRef}
          type="button"
          className="mobile-nav-open"
          aria-expanded={open}
          aria-controls={sheetId}
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <span className="mobile-nav-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>

        <div
          id={sheetId}
          className="mobile-nav-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          aria-hidden={!open}
          inert={open ? undefined : true}
        >
          <header className="mobile-nav-head mobile-nav-row" style={{ "--nav-i": 0 } as CSSProperties}>
            <a
              className="mobile-nav-brand"
              href="/"
              onClick={() => setOpen(false)}
              style={{ "--logo-mark-src": `url(${site.logos.mark})` } as CSSProperties}
            >
              <span className="site-mark-glyph" aria-hidden="true" />
            </a>
            <button
              ref={closeRef}
              type="button"
              className="mobile-nav-close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <span className="mobile-nav-icon is-x" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </header>

          <nav className="mobile-nav-links" aria-label="Site">
            <ul>
              {LINKS.map(({ href, label }, index) => (
                <li
                  key={href}
                  className="mobile-nav-row"
                  style={{ "--nav-i": index + 1 } as CSSProperties}
                >
                  <a
                    href={href}
                    className={pathname === href ? "is-current" : undefined}
                    aria-current={pathname === href ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span className="mobile-nav-label">{label}</span>
                    <span className="mobile-nav-path">{href}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="mobile-nav-foot mobile-nav-row"
            style={{ "--nav-i": LINKS.length + 1 } as CSSProperties}
          >
            <button type="button" className="mobile-nav-cmd" onClick={openCommandMenu}>
              <span className="mobile-nav-cmd-dot" aria-hidden="true" />
              <span className="mobile-nav-cmd-label">Command menu</span>
              <span className="mobile-nav-cmd-key">{mac ? "⌘K" : "Ctrl K"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
