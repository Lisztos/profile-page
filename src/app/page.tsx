import Image from "next/image";
import { getStars } from "@/lib/github";
import { calBookingPath, site } from "@/lib/site";
import { Reveal } from "./components/Reveal";
import { StarredRepos } from "./components/StarredRepos";
import { Ticker } from "./components/Ticker";
import { TiltPortrait } from "./components/TiltPortrait";

export default async function Home() {
  const stars = await getStars();

  return (
    <main>
      <header>
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
          <span className="role">{site.role.toUpperCase()}</span>
          <a
            className="pill"
            href={site.cal}
            data-cal-link={calBookingPath}
            aria-haspopup="dialog"
          >
            contact
          </a>
        </div>
        <div className="intro hero-fade d3">
          <TiltPortrait />
          <p>{site.intro}</p>
        </div>
        <Ticker />
      </header>

      <section className="defs" aria-label="About">
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

      <section className="ruled">
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
        <span className="q">Interested in working together?</span>
        <a
          className="pill-solid"
          href={site.cal}
          data-cal-link={calBookingPath}
          aria-haspopup="dialog"
        >
          contact →
        </a>
      </Reveal>

      <footer>
        <div className="inner">
          <div className="colophon">© {new Date().getFullYear()} ADRIAN SANCHEZ</div>
          <nav className="socials" aria-label="Social">
            <a href={site.linkedin} rel="me" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.09h4.52V24H.24zM8.34 8.09h4.33v2.17h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-7.75c0-1.85-.03-4.22-2.57-4.22-2.58 0-2.97 2.01-2.97 4.09V24H8.34z" />
              </svg>
            </a>
            <a href={site.github} rel="me" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 12 .3z" />
              </svg>
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
