import type { Metadata } from "next";
import { DocPage } from "../components/DocPage";
import { RichText } from "../components/RichText";
import { docs } from "@/lib/agent-content";
import { site } from "@/lib/site";

const doc = docs.privacy;

export const metadata: Metadata = {
  title: `${doc.title} | ${site.name}`,
  description: doc.description,
  alternates: { canonical: doc.path },
};

export default function PrivacyPage() {
  return (
    <DocPage title={doc.title} lede={doc.lede}>
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
    </DocPage>
  );
}
