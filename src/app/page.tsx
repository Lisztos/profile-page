"use client";

import Experience from "./sections/Experience";
import Intro from "./sections/Intro";
// import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import Card from "./components/Card";
import DuckAnimation from "./components/DuckAnimation";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const showDuck = searchParams?.get("duck") === "true";

  // Ensure duck is only rendered client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="flex flex-col items-center px-4">
      {isMounted && showDuck && <DuckAnimation />}
      <div
        className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center py-8 relative"
      >
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

        {/* Projects section temporarily hidden
        <Card id="projects-card" className="w-full">
          <Projects />
        </Card>
        */}
      </div>
    </main>
  );
}
