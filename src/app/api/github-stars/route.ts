import { NextResponse } from "next/server";
import type { GitHubRepo } from "@/lib/types";

export async function GET() {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    "https://api.github.com/users/Lisztos/starred?per_page=6&sort=created",
    {
      headers,
      next: { revalidate: 86400 },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch starred repos" },
      { status: 503 }
    );
  }

  const data = await res.json();

  const repos: GitHubRepo[] = data.map((repo: GitHubRepo) => ({
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    html_url: repo.html_url,
    description: repo.description,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    topics: repo.topics ?? [],
    owner: { login: repo.owner.login },
  }));

  return NextResponse.json(repos);
}
