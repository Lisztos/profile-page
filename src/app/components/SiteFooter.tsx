import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer>
      <div className="inner">
        <div className="colophon">
          <div className="colophon-copy">© {new Date().getFullYear()} Adrian Sanchez</div>
          <nav className="colophon-links" aria-label="Footer">
            <a className="sweep" href="/about">
              About
            </a>
            <span className="colophon-sep" aria-hidden="true">·</span>
            <a className="sweep" href="/contact">
              Contact
            </a>
            <span className="colophon-sep" aria-hidden="true">·</span>
            <a className="sweep" href="/privacy">
              Privacy
            </a>
          </nav>
        </div>
        <nav className="socials" aria-label="Social">
          <a href={site.linkedin} rel="me" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.09h4.52V24H.24zM8.34 8.09h4.33v2.17h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-7.75c0-1.85-.03-4.22-2.57-4.22-2.58 0-2.97 2.01-2.97 4.09V24H8.34z" />
            </svg>
          </a>
          <a href={site.github} rel="me" aria-label="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 12 .3z" />
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  );
}
