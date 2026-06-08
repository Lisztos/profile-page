"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiStar, FiGithub } from "react-icons/fi";
import SectionHeading from "@/app/components/SectionHeading";
import { useTranslation } from "@/lib/hooks/useTranslation";
import type { GitHubRepo } from "@/lib/types";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Dart: "#00B4AB",
  "C++": "#f34b7d",
  C: "#555555",
  Nix: "#7e7eff",
  Dockerfile: "#384d54",
};

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const color = LANGUAGE_COLORS[repo.language ?? ""] ?? "#8b949e";
  const isOwnRepo = repo.owner.login === "Lisztos";
  const topics = repo.topics.slice(0, 2);

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * index, duration: 0.3 }}
      viewport={{ once: true }}
      style={{ backgroundImage: `linear-gradient(135deg, ${color}28 0%, transparent 60%)` }}
      className="group flex flex-col bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 dark:bg-zinc-950 dark:border-zinc-800 dark:hover:border-zinc-700 h-full"
    >
      <div className="h-[3px] w-full flex-shrink-0" style={{ backgroundColor: color }} />

      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <span className="text-base font-bold text-zinc-900 dark:text-zinc-50 leading-snug">
            {repo.name}
          </span>
          <span className="flex items-center gap-1 flex-shrink-0">
            <FiStar className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 tabular-nums">
              {repo.stargazers_count.toLocaleString()}
            </span>
          </span>
        </div>

        {!isOwnRepo && (
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 -mt-0.5 font-mono truncate">
            {repo.full_name}
          </p>
        )}

        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 flex-1">
          {repo.description ?? "No description"}
        </p>

        {topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1 pt-1 border-t border-zinc-200/60 dark:border-zinc-800">
            {topics.map((topic) => (
              <span
                key={topic}
                className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-zinc-200/80 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.a>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden shadow-sm dark:bg-zinc-900 dark:border-zinc-800 animate-pulse">
      <div className="h-[3px] w-full bg-zinc-300 dark:bg-zinc-700" />
      <div className="flex flex-col p-4 gap-2">
        <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-3/5" />
        <div className="space-y-1">
          <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
          <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-4/5" />
        </div>
        <div className="flex items-center justify-between mt-1 pt-1 border-t border-zinc-200/60 dark:border-zinc-800">
          <div className="flex gap-1">
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-12" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-14" />
          </div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-10" />
        </div>
      </div>
    </div>
  );
}

export default function GithubStars() {
  const { t } = useTranslation();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github-stars")
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((data: GitHubRepo[]) => {
        setRepos(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="github-stars"
      className="scroll-mt-28 max-w-[50rem] leading-8 mx-auto mb-16"
    >
      <div className="mb-8">
        <SectionHeading align="left">
          <span className="flex items-center gap-2">
            <FiStar className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            {t("githubStars.title")}
          </span>
        </SectionHeading>
        <p className="text-sm text-gray-500 dark:text-gray-400 -mt-5">
          {t("githubStars.subtitle")}
        </p>
      </div>

      {error ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
          {t("githubStars.error")}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : repos.map((repo, i) => (
                  <RepoCard key={repo.id} repo={repo} index={i} />
                ))}
          </div>

          {!loading && !error && (
            <div className="flex justify-end mt-4">
              <a
                href="https://github.com/Lisztos?tab=stars"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FiGithub className="w-3.5 h-3.5" />
                {t("githubStars.viewAll")}
              </a>
            </div>
          )}
        </>
      )}
    </section>
  );
}
