"use client";

import Experience from "./sections/Experience";
import Intro from "./sections/Intro";
// import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import GithubStars from "./sections/GithubStars";
import Card from "./components/Card";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DuckAnimation from "./components/DuckAnimation";

function DuckClientWrapper() {
  "use client";
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const showDuck = searchParams?.get("duck") === "true";
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted || !showDuck) return null;
  return <DuckAnimation />;
}

export default function Home() {
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
      <div className="w-full max-w-5xl flex flex-col gap-8 py-16">
        <Card id="skills-card" className="w-full my-2">
          <Skills />
        </Card>
        <Card id="experience-card" className="w-full my-2">
          <Experience />
        </Card>
        <Card id="education-card" className="w-full my-2">
          <Education />
        </Card>
        <Card id="github-stars-card" className="w-full my-2">
          <GithubStars />
        </Card>
        {/* Projects section temporarily hidden
        <Card id="projects-card" className="w-full">
          <Projects />
        </Card>
        */}
      </div>
    </main>
  );
}
