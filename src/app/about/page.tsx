import type { Metadata } from "next";
import { DocPage } from "../components/DocPage";
import { TiltPortrait } from "../components/TiltPortrait";
import { docs } from "@/lib/agent-content";
import { calBookingPath, site } from "@/lib/site";

const doc = docs.about;

export const metadata: Metadata = {
  title: `${doc.title} | ${site.name}`,
  description: doc.description,
  alternates: { canonical: doc.path },
};

export default function AboutPage() {
  return (
    <DocPage title={doc.title} lede={doc.lede}>
      <figure className="doc-figure">
        <TiltPortrait priority={false} sizes="220px" />
      </figure>

      <section className="role-list" aria-label="Work">
        {site.history.map((item) => {
          const name =
            "url" in item && item.url ? (
              <a className="sweep" href={item.url} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            ) : (
              item.name
            );
          return (
            <article className="role-row" key={item.name}>
              <div className="role-head">
                <h2>{name}</h2>
                <span className="meta">{item.when}</span>
              </div>
              <p className="role-kicker">{item.role}</p>
              <p>{item.line}</p>
            </article>
          );
        })}
      </section>

      <section className="build-list" aria-label="Selected work">
        <p className="section-kicker meta">Selected</p>
        {site.projects.map((item, index) => {
          const href = "url" in item ? item.url : undefined;
          const title = href ? (
            <a className="sweep" href={href} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          ) : (
            item.title
          );
          return (
            <article className="build-row" key={item.title}>
              <span className="meta n">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <div className="build-head">
                  <h2>{title}</h2>
                  <span className="k">{item.kicker}</span>
                </div>
                {"description" in item ? <p>{item.description}</p> : null}
              </div>
            </article>
          );
        })}
      </section>

      <div className="cta">
        <span className="q">A call, if you want one.</span>
        <a className="pill-solid" href={site.cal} data-cal-link={calBookingPath} aria-haspopup="dialog">
          book 30 minutes
        </a>
      </div>
    </DocPage>
  );
}
