import About from "./sections/About";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Intro from "./sections/Intro";
import Projects from "./sections/Projects";
import SectionDivider from "./components/SectionDivider";
import Skills from "./sections/Skills";

export default function Home() {
  return (
    <main style={{
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0 1rem',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'white',
    }} className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
