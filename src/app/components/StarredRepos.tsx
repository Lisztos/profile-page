import type { StarredRepo } from "@/lib/github";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

export function StarredRepos({ repos }: { repos: StarredRepo[] }) {
  if (repos.length === 0) return null;

  return (
    <section className="ruled">
      <Reveal className="inner">
        <div className="h2row">
          <h2>Recently starred</h2>
          <span className="meta">WHAT I&apos;M LOOKING AT</span>
        </div>
        <p className="starred-intro">
          New tools, AI agents, things I might fold into day-to-day work.
          Curated by use, not hype. Steal freely.
        </p>
        <div className="ledger">
          {repos.map((repo) => (
            <a
              key={repo.url}
              className="repo"
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="name">{repo.name}</span>
              <span className="desc">{repo.desc}</span>
              {repo.topic ? <span className="tag">{repo.topic}</span> : <span />}
            </a>
          ))}
        </div>
        <a
          className="more sweep"
          href={site.githubStars}
          target="_blank"
          rel="noopener noreferrer"
        >
          FULL LIST ON GITHUB →
        </a>
      </Reveal>
    </section>
  );
}
