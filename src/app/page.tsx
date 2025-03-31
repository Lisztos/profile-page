import Experience from "./sections/Experience";
import Intro from "./sections/Intro";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";

export default function Home() {
  const sectionStyle = {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  };
  
  return (
    <main className="flex flex-col items-center gap-8 px-4 py-8 mx-auto max-w-5xl">
      <div 
        className="w-full rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:text-white p-8 shadow-lg"
        style={sectionStyle}
      >
        <Intro />
      </div>
      
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
        <Projects />
      </div>
    </main>
  );
}
