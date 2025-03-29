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
          I'm a <span className="font-medium">Senior Backend Engineer</span> with a specialty in Ruby on Rails and 
          full stack development. With <span className="font-medium">5+ years</span> of experience in startup environments, 
          I focus on building scalable, reliable web applications and leading engineering teams.
        </p>
        
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Currently based in <span className="font-medium">Berlin, Germany</span>, I've worked with companies like 
          Innovandio GmbH, Demodesk, and Setting.io, where I've led teams, managed projects, and implemented 
          key technical solutions.
        </p>
        
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          My core technical skills include <span className="font-medium">Ruby on Rails, Back-End Web Development, 
          Microsoft Power BI, and Heroku</span>. I'm passionate about solving complex problems and creating 
          efficient systems that drive business success.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xs dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-xl mb-3">Education</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            BSc in Wirtschaftsinformatik<br />
            Technische Universität Berlin<br />
            2018 - 2022
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xs dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-xl mb-3">Languages</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Spanish - Native<br />
            German - Full Professional<br />
            English - Full Professional<br />
            French - Elementary
          </p>
        </div>
      </div>
    </motion.section>
  );
} 