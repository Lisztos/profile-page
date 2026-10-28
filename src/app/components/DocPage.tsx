import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { SiteFooter } from "./SiteFooter";

export function DocPage({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <main className="doc">
      <div className="doc-body">
        <header>
          <div className="dateline">
            <a className="meta sweep" href="/">
              {site.name.toUpperCase()}
            </a>
            <span className="meta">{site.location}</span>
          </div>
          <h1>{title}</h1>
          {lede ? <p className="lede">{lede}</p> : null}
        </header>
        {children}
      </div>
      <SiteFooter />
    </main>
  );
}
