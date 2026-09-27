const GITHUB_HEADERS: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

export type StarredRepo = {
  name: string;
  desc: string;
  url: string;
  topic: string;
};

type GithubStarRaw = {
  full_name: string;
  description: string | null;
  html_url: string;
  topics?: string[];
  language?: string | null;
};

export async function getStars(): Promise<StarredRepo[]> {
  const res = await fetch(
    "https://api.github.com/users/Lisztos/starred?per_page=8&sort=created",
    {
      headers: GITHUB_HEADERS,
      next: { revalidate: 86400 },
    }
  );

  if (!res.ok) return [];

  const repos = (await res.json()) as GithubStarRaw[];
  return repos.map((r) => ({
    name: r.full_name,
    desc: r.description ?? "",
    url: r.html_url,
    topic: (r.topics?.[0] ?? r.language ?? "").toUpperCase(),
  }));
}

export const CONTRIBUTION_SCALE = [
  "rgba(33,31,26,.07)",
  "rgba(180,67,44,.25)",
  "rgba(180,67,44,.45)",
  "rgba(180,67,44,.7)",
  "#b4432c",
] as const;

export function contributionLevel(count: number): number {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export type ContributionDay = {
  count: number;
  date: string;
};

type GraphQlResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: {
            contributionDays: { contributionCount: number; date: string }[];
          }[];
        };
      };
    };
  };
  errors?: { message: string }[];
};

export async function getContributions(): Promise<ContributionDay[]> {
  if (!process.env.GITHUB_TOKEN) return [];

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          user(login: "Lisztos") {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `,
    }),
    next: { revalidate: 86400 },
  });

  if (!res.ok) return [];

  const json = (await res.json()) as GraphQlResponse;
  const weeks =
    json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  return weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      count: day.contributionCount,
      date: day.date,
    }))
  );
}
