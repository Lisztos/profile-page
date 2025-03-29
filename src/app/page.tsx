import Experience from "./sections/Experience";
import Intro from "./sections/Intro";
import Projects from "./sections/Projects";
import SectionDivider from "./components/SectionDivider";
import Skills from "./sections/Skills";

export default function Home() {
  return (
    <main 
      className="flex flex-col items-center px-8 py-12 bg-white text-gray-900 dark:bg-gray-900 dark:text-white rounded-lg shadow-lg mx-auto max-w-5xl my-8"
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      <Intro />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Projects />
    </main>
  );
}
