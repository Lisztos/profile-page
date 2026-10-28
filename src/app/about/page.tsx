import type { Metadata } from "next";
import { DocPage } from "../components/DocPage";
import { RichText } from "../components/RichText";
import { docs } from "@/lib/agent-content";
import { calBookingPath, site } from "@/lib/site";

const doc = docs.about;

export const metadata: Metadata = {
  title: `About | ${site.name}`,
  description: doc.description,
  alternates: { canonical: doc.path },
};

export default function AboutPage() {
  const [intro, background] = doc.sections;

  return (
    <DocPage title="Hi, I'm Adrian.">
      {intro ? (
        <section className="about-prose" aria-label="Introduction">
          {intro.paragraphs.map((paragraph, index) => (
            <p key={`intro-${index}`}>
              <RichText text={paragraph} />
            </p>
          ))}
        </section>
      ) : null}

      {background ? (
        <section className="about-prose about-section" aria-label={background.label}>
          <h2>{background.label}</h2>
          {background.paragraphs.map((paragraph, index) => {
            const last = index === background.paragraphs.length - 1;
            return (
              <p key={`bg-${index}`}>
                <RichText text={paragraph} />
                {last ? (
                  <span className="about-caret-inline" aria-hidden="true">
                    <span className="role-caret" />
                  </span>
                ) : null}
              </p>
            );
          })}
        </section>
      ) : null}

      <div className="cta">
        <span className="q">Reach me.</span>
        <a
          className="pill-solid"
          href={site.cal}
          data-cal-link={calBookingPath}
          aria-haspopup="dialog"
        >
          book a call →
        </a>
      </div>
    </DocPage>
  );
}
