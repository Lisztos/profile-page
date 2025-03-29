"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useActiveSectionContext } from "@/app/context/active-section-context";
import { experienceData } from "@/lib/data";
import SectionHeading from "@/app/components/SectionHeading";
import { FaBriefcase, FaGraduationCap, FaBuilding } from "react-icons/fa";

export default function Experience() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="experience"
      className="scroll-mt-28 mb-28 max-w-[50rem] text-center leading-8 sm:mb-40 mx-auto"
    >
      <SectionHeading>Experience</SectionHeading>
      
      <p className="text-center text-gray-700 dark:text-gray-300 mb-12 max-w-[42rem] mx-auto">
        My professional journey as a developer and the experiences that have shaped my career path.
      </p>
      
      <div className="relative">
        {/* Timeline bar */}
        <motion.div
          className="absolute left-9 top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-700"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "100%" }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Timeline items */}
        <div className="space-y-12">
          {experienceData.map((experience, index) => (
            <motion.div
              key={index}
              className="relative pl-20 text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Timeline icon */}
              <motion.div
                className="absolute left-0 top-0 w-[74px] h-[74px] bg-white border-2 border-gray-200 rounded-full flex items-center justify-center dark:bg-gray-800 dark:border-gray-700 shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: index * 0.1 + 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
              >
                {experience.icon === "briefcase" ? (
                  <FaBriefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                ) : experience.icon === "graduation" ? (
                  <FaGraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                ) : (
                  <FaBuilding className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                )}
              </motion.div>
              
              {/* Content */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-3 dark:bg-blue-900/30 dark:text-blue-400">
                  {experience.date}
                </span>
                <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {experience.company} • {experience.location}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {experience.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-16 flex justify-center">
        <a 
          href="/CV.pdf" 
          download 
          className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-gray-900"
        >
          Download Full Resume
        </a>
      </div>
    </section>
  );
} 