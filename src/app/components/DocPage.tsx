import type { Doc } from "@/lib/agent-content";
import { site } from "@/lib/site";
import { RichText } from "./RichText";
import { SiteFooter } from "./SiteFooter";

export function DocPage({ doc }: { doc: Doc }) {
  return (
    <main className="doc">
      <header>
        <div className="dateline">
          <a className="meta sweep" href="/">
            {site.name.toUpperCase()}
          </a>
          <span className="meta">{site.location}</span>
        </div>
        <h1>{doc.title}</h1>
      </header>
      <section className="defs" aria-label={doc.title}>
        {doc.sections.map((section) => (
          <div className="def" key={section.label}>
            <span className="label">{section.label}</span>
            <div>
              {section.paragraphs.map((paragraph, index) => (
                <p key={`${section.label}-${index}`}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          </div>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
