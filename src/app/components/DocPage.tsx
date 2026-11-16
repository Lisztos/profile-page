import type { ReactNode } from "react";
import type { Doc } from "@/lib/agent-content";
import { RichText } from "./RichText";
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

export function DocSections({ doc }: { doc: Doc }) {
  return (
    <section className="role-list" aria-label={doc.title}>
      {doc.sections.map((section) => (
        <article className="role-row" key={section.label}>
          <div className="role-head">
            <h2>{section.label}</h2>
          </div>
          {section.paragraphs.map((paragraph, index) => (
            <p key={`${section.label}-${index}`}>
              <RichText text={paragraph} />
            </p>
          ))}
        </article>
      ))}
    </section>
  );
}
