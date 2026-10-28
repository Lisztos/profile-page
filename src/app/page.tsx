import type { Metadata } from "next";
import Image from "next/image";
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
        <div className="dateline hero-fade d1">
          <span className="meta">{site.location}</span>
          <span className="meta">5+ YEARS IN PRODUCTION ENGINEERING</span>
        </div>
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
          <ScrambleRole text={site.role} />
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

      <section className="defs" id="about" aria-label="About">
        <Reveal className="def">
          <span className="label" style={{ color: "var(--accent)" }}>
            NOW
          </span>
          <p>
            {site.nowLead}
            <span className="u-now">{site.nowCompany}</span>
            {site.nowRest}
          </p>
        </Reveal>
        <Reveal className="def">
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
        </Reveal>
        <Reveal className="def">
          <span className="label" style={{ color: "var(--muted)" }}>
            STACK
          </span>
          <p>{site.stack}</p>
        </Reveal>
      </section>

      <StarredRepos repos={stars} />

      <section className="ruled" id="projects">
        <Reveal className="inner">
          <h2>Projects</h2>
          <div className="projects">
            {site.projects.map((item) => {
              const url = "url" in item ? item.url : undefined;
              const description = "description" in item ? item.description : undefined;
              const image = "image" in item ? item.image : undefined;
              const techStack = "techStack" in item ? item.techStack : undefined;
              const content = (
                <>
                  {image ? (
                    <div
                      className={
                        "border" in image && image.border === false
                          ? "cell-media cell-media-noborder"
                          : "cell-media"
                      }
                    >
                      <div className="cell-media-inset">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="56px"
                          className="cell-media-img"
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="cell-body">
                    <div className="t">{item.title}</div>
                    {description ? <p className="d">{description}</p> : null}
                    {techStack ? (
                      <div className="stack">
                        {techStack.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    ) : null}
                    <div className="k">{item.kicker}</div>
                  </div>
                </>
              );
              return url ? (
                <a
                  className="cell"
                  key={item.title}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <div className="cell" key={item.title}>
                  {content}
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

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
