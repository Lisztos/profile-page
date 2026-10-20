import {
  contributionLevel,
  CONTRIBUTION_SCALE,
  type ContributionDay,
} from "@/lib/github";
import { Reveal } from "./Reveal";

export function CommitGraph({ days }: { days: ContributionDay[] }) {
  if (days.length === 0) return null;

  return (
    <section className="ruled">
      <Reveal className="inner">
        <div className="h2row">
          <h2>A year of commits</h2>
          <span className="meta">VIA GITHUB API</span>
        </div>
        <div className="graph-scroll">
          <div
            className="graph"
            role="img"
            aria-label="GitHub contribution graph for the past year"
          >
            {days.map((day) => (
              <span
                key={day.date}
                style={{
                  background: CONTRIBUTION_SCALE[contributionLevel(day.count)],
                }}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
