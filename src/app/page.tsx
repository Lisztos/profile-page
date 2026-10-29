import type { Metadata } from "next";
import { getStars } from "@/lib/github";
import { calBookingPath, site } from "@/lib/site";
import { CommandHint } from "./components/CommandHint";
import { ScrambleRole } from "./components/ScrambleRole";
import { Reveal } from "./components/Reveal";
import { SiteFooter } from "./components/SiteFooter";
import { StarredRepos } from "./components/StarredRepos";
import { Ticker } from "./components/Ticker";
import { TiltPortrait } from "./components/TiltPortrait";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const stars = await getStars();

  return (
    <main>
      <header id="top">
        <h1>
          <span className="mask">
            <span className="line">{site.givenName}</span>
          </span>
          <span className="mask">
            <span className="line">
              <em>{site.familyName}</em>
            </span>
          </span>
        </h1>
        <div className="titlebar hero-fade d2">
          <ScrambleRole text={site.role} location={site.location} />
          <div className="titlebar-actions">
            <CommandHint />
            <a
              className="pill"
              href={site.cal}
              data-cal-link={calBookingPath}
              aria-haspopup="dialog"
            >
              contact
            </a>
          </div>
        </div>
        <div className="intro hero-fade d3">
          <TiltPortrait />
          <p>{site.intro}</p>
        </div>
        <Ticker />
      </header>

      <section className="ruled defs" id="about" aria-label="Experience">
        <Reveal className="inner">
          <div className="h2row">
            <h2>Experience</h2>
            <span className="meta">NOW &amp; BEFORE</span>
          </div>
          <div className="defs-list">
            <div className="def">
              <span className="label" style={{ color: "var(--accent)" }}>
                NOW
              </span>
              <p>
                {site.nowLead}
                <span className="u-now">{site.nowCompany}</span>
                {site.nowRest}
              </p>
            </div>
            <div className="def">
              <span className="label" style={{ color: "var(--muted)" }}>
                BEFORE
              </span>
              <p>
                {site.before.map((item) => (
                  <span key={item.name}>
                    <a
                      className="u-past"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </a>
                    {item.after}
                  </span>
                ))}
              </p>
            </div>
            <div className="def">
              <span className="label" style={{ color: "var(--muted)" }}>
                STACK
              </span>
              <p>{site.stack}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="ruled" id="projects">
        <Reveal className="inner">
          <div className="h2row">
            <h2>Projects</h2>
            <span className="meta">SELECTED WORK</span>
          </div>
          <div className="projects">
            {site.projects.map((item, index) => {
              const url = "url" in item ? item.url : undefined;
              const description = "description" in item ? item.description : undefined;
              const techStack = "techStack" in item ? item.techStack : undefined;
              const num = String(index + 1).padStart(2, "0");
              const content = (
                <>
                  <span className="project-num" aria-hidden="true">
                    {num}
                  </span>
                  <div className="project-body">
                    <div className="project-head">
                      <span className="project-title">
                        {item.title}
                        {url ? (
                          <span className="project-arrow" aria-hidden="true">
                            ↗
                          </span>
                        ) : null}
                      </span>
                      <span className="project-kicker">{item.kicker}</span>
                    </div>
                    {description ? <p className="project-desc">{description}</p> : null}
                    {techStack && techStack.length > 0 ? (
                      <div className="project-stack">
                        {techStack.map((tech, i) => (
                          <span key={tech}>
                            {i > 0 ? <i aria-hidden="true"> · </i> : null}
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </>
              );
              return url ? (
                <a
                  className="project-row"
                  key={item.title}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <div className="project-row" key={item.title}>
                  {content}
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      <StarredRepos repos={stars} />

      <Reveal className="cta">
        <span className="q">Reach me.</span>
        <a
          className="pill-solid"
          href={site.cal}
          data-cal-link={calBookingPath}
          aria-haspopup="dialog"
        >
          book a call →
        </a>
      </Reveal>

      <SiteFooter />
    </main>
  );
}
