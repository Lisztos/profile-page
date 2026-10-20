import { getContributions, getStars } from "@/lib/github";
import { site } from "@/lib/site";
import { CommitGraph } from "./components/CommitGraph";
import { Reveal } from "./components/Reveal";
import { StarredRepos } from "./components/StarredRepos";
import { Ticker } from "./components/Ticker";
import { TiltPortrait } from "./components/TiltPortrait";

export default async function Home() {
  const [stars, contributions] = await Promise.all([
    getStars(),
    getContributions(),
  ]);

  return (
    <main>
      <header>
        <div className="dateline hero-fade d1">
          <span className="meta">{site.location}</span>
          <span className="meta">EST. 5+ YRS IN PROD</span>
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
          <a className="pill" href={site.cal}>
            reach me
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
                <span className="u-past">{item.name}</span>
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

      <CommitGraph days={contributions} />
      <StarredRepos repos={stars} />

      <section className="ruled">
        <Reveal className="inner">
          <h2>Projects</h2>
          <div className="projects">
            {site.projects.map((item) => (
              <div className="cell" key={item.title}>
                <div className="t">{item.title}</div>
                <div className="k">{item.kicker}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <footer>
        <Reveal className="cta">
          <span className="q">Got a project?</span>
          <a className="pill-solid" href={site.cal}>
            reach me →
          </a>
        </Reveal>
        <div className="colophon">
          © {new Date().getFullYear()} ADRIAN SANCHEZ ·{" "}
          <a className="sweep" href={site.linkedin} rel="me">
            LINKEDIN
          </a>{" "}
          ·{" "}
          <a className="sweep" href={site.github} rel="me">
            GITHUB
          </a>
        </div>
      </footer>
    </main>
  );
}
