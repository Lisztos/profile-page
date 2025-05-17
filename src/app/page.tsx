import Experience from "./sections/Experience";
import Intro from "./sections/Intro";
// import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Education from "./sections/Education";

export default function Home() {
  const sectionStyle = {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  };

  return (
    <main className="flex flex-col items-center">
      <div
        className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center px-4 py-8 relative"
      >
        <div
          className="w-full max-w-5xl rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:text-white p-8 shadow-lg"
          style={sectionStyle}
        >
          <Intro />
        </div>
      </div>

      <div className="w-full max-w-5xl px-4 flex flex-col gap-8 py-16">
        <div
          className="w-full rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:text-white p-8 shadow-lg"
          style={sectionStyle}
        >
          <Skills />
        </div>

        <div
          className="w-full rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:text-white p-8 shadow-lg"
          style={sectionStyle}
        >
          <Experience />
        </div>

        <div
          className="w-full rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:text-white p-8 shadow-lg"
          style={sectionStyle}
        >
          <Education />
        </div>

        {/* Projects section temporarily hidden
        <div
          className="w-full rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:text-white p-8 shadow-lg"
          style={sectionStyle}
        >
          <Projects />
        </div>
        */}
      </div>
    </main>
  );
}
