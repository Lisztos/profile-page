"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useActiveSectionContext } from "@/app/context/active-section-context";
import SectionHeading from "@/app/components/SectionHeading";

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.75,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  return (
    <motion.section
      ref={ref}
      id="about"
      className="mb-28 max-w-[50rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>About Me</SectionHeading>
      
      <div className="mb-12 text-left">
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          I'm a passionate <span className="font-medium">Full-Stack Developer</span> with a focus on creating elegant, 
          performant, and user-friendly web applications. With <span className="font-medium">8+ years</span> of 
          experience, I specialize in building responsive web applications using modern technologies.
        </p>
        
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          My journey in web development started with a degree in <span className="font-medium">Computer Science</span>, 
          followed by years of hands-on experience working with various technologies and frameworks. I've had the 
          opportunity to work on a diverse range of projects, from e-commerce platforms to complex web applications.
        </p>
        
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          My core technical skills include <span className="font-medium">React.js, Next.js, TypeScript, Node.js, 
          and MongoDB</span>. I'm passionate about writing clean, efficient code and creating intuitive user experiences.
        </p>
        
        <p className="text-gray-700 dark:text-gray-300">
          When I'm not coding, I enjoy photography, exploring new hiking trails, reading tech blogs, and contributing 
          to open-source projects. I'm constantly learning and staying updated with the latest trends in web development.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xs dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-xl mb-3">Education</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Bachelor of Science in Computer Science<br />
            University of Technology<br />
            2011 - 2015
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xs dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-xl mb-3">Work Philosophy</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            I believe in writing clean, maintainable code and creating intuitive, accessible user experiences.
            Continuous learning and adapting to new technologies are core principles of my work ethic.
          </p>
        </div>
      </div>
    </motion.section>
  );
} 