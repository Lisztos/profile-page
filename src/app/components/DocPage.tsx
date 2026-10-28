import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";

export function DocPage({
  title,
  lede,
  children,
}: {
  title: ReactNode;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <main className="doc">
      <div className="doc-body">
        <header>
          <h1>{title}</h1>
          {lede ? <p className="lede">{lede}</p> : null}
        </header>
        {children}
      </div>
      <SiteFooter />
    </main>
  );
}
