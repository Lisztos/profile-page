import type { Metadata } from "next";
import { site } from "@/lib/site";
import { SiteFooter } from "./components/SiteFooter";

export const metadata: Metadata = {
  title: `Page not found | ${site.name}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="doc">
      <div className="doc-body">
      <header>
        <h1>Page not found</h1>
      </header>
      <section className="defs" aria-label="Page not found">
        <div className="def">
          <span className="label">MISSING</span>
          <p>
            This address is not on the site. Start at the{" "}
            <a className="sweep" href="/">
              homepage
            </a>
            , read the{" "}
            <a className="sweep" href="/llms.txt">
              agent index
            </a>
            , or open the{" "}
            <a className="sweep" href="/sitemap.xml">
              sitemap
            </a>
            .
          </p>
        </div>
      </section>
      </div>
      <SiteFooter />
    </main>
  );
}
