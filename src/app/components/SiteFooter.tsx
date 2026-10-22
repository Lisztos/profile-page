import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer>
      <div className="inner">
        <div className="colophon">
          <div>
            © {new Date().getFullYear()} ADRIAN SANCHEZ ·{" "}
            <a className="sweep" href={site.linkedin} rel="me">
              LINKEDIN
            </a>
            {" · "}
            <a className="sweep" href={site.github} rel="me">
              GITHUB
            </a>
          </div>
          <div>
            <a className="sweep" href="/about">
              ABOUT
            </a>
            {" · "}
            <a className="sweep" href="/contact">
              CONTACT
            </a>
            {" · "}
            <a className="sweep" href="/privacy">
              PRIVACY
            </a>
          </div>
        </div>
        <div className="made-with">
          Made with <span className="heart">♥</span> in Berlin
        </div>
      </div>
    </footer>
  );
}
