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
  const topics = repo.topics.slice(0, 3);

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      viewport={{ once: true }}
      className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 dark:bg-gray-800/50 dark:border-gray-700 h-full"
    >
      {/* language-colored top accent */}
      <div className="h-[3px] w-full" style={{ backgroundColor: color }} />

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="text-sm font-semibold font-mono text-blue-600 dark:text-blue-400 leading-tight">
            {repo.name}
          </span>
          <FiExternalLink className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {!isOwnRepo && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-mono">
            {repo.full_name}
          </p>
        )}

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1 mb-3">
          {repo.description ?? "No description"}
        </p>

        <div className="flex flex-col gap-2 mt-auto">
          {topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50"
                >
                  #{topic}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            {repo.language && (
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <FiStar className="w-3 h-3" />
              {repo.stargazers_count.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden dark:bg-gray-800/50 dark:border-gray-700 animate-pulse">
      <div className="h-[3px] w-full bg-gray-200 dark:bg-gray-700" />
      <div className="flex flex-col p-5">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/5 mb-3" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1.5" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-4" />
        <div className="flex gap-2 mb-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-14" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
        </div>
        <div className="flex gap-3">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-10" />
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
