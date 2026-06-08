"use client";

import Experience from "./sections/Experience";
import Intro from "./sections/Intro";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import GithubStars from "./sections/GithubStars";
import Card from "./components/Card";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DuckAnimation from "./components/DuckAnimation";
import { useTranslation } from "@/lib/hooks/useTranslation";

type Tab = "skills" | "experience" | "education" | "github-stars";

function DuckClientWrapper() {
  "use client";
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const showDuck = searchParams?.get("duck") === "true";
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted || !showDuck) return null;
  return <DuckAnimation />;
}

function TabNav({ activeTab, onChange }: { activeTab: Tab; onChange: (tab: Tab) => void }) {
  const { t } = useTranslation();

  const tabs: { id: Tab; label: string }[] = [
    { id: "skills", label: t("nav.skills") },
    { id: "experience", label: t("nav.experience") },
    { id: "education", label: t("nav.education") },
    { id: "github-stars", label: t("nav.githubStars") },
  ];

  return (
    <div className="w-full max-w-5xl sticky top-16 z-40 py-4">
      <div className="flex gap-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-1.5 rounded-full shadow-sm border border-gray-200/50 dark:border-gray-700/50 w-fit mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("skills");

  return (
    <main className="flex flex-col items-center px-4">
      <Suspense fallback={null}>
        <DuckClientWrapper />
      </Suspense>

      <div className="min-h-[100dvh] w-full flex items-center justify-center py-8 relative">
        <Card id="intro-card" className="w-full max-w-5xl mx-auto">
          <Intro />
        </Card>
      </div>

      <TabNav activeTab={activeTab} onChange={setActiveTab} />

      <div className="w-full max-w-5xl py-8 pb-16">
        {activeTab === "skills" && (
          <Card id="skills-card" className="w-full">
            <Skills />
          </Card>
        )}
        {activeTab === "experience" && (
          <Card id="experience-card" className="w-full">
            <Experience />
          </Card>
        )}
        {activeTab === "education" && (
          <Card id="education-card" className="w-full">
            <Education />
          </Card>
        )}
        {activeTab === "github-stars" && (
          <Card id="github-stars-card" className="w-full">
            <GithubStars />
          </Card>
        )}
      </div>
    </main>
  );
}
