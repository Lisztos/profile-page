"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useActiveSectionContext } from "@/app/context/active-section-context";
import { skillsData } from "@/lib/data";
import SectionHeading from "@/app/components/SectionHeading";
import { 
  FaGem, 
  FaAws, 
  FaDocker, 
  FaJs, 
  FaGit,
  FaDatabase,
  FaChartBar
} from "react-icons/fa";
import { 
  SiRubyonrails, 
  SiPostgresql, 
  SiElasticsearch, 
  SiHeroku, 
  SiSalesforce,
  SiHtml5,
  SiCss3
} from "react-icons/si";
import { GoProjectRoadmap } from "react-icons/go";
import { GrUserManager } from "react-icons/gr";
import { TbApi } from "react-icons/tb";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

// Skill categories
const skillCategories = [
  {
    title: "Backend Development",
    skills: [
      { name: "Ruby", icon: <FaGem /> },
      { name: "Ruby on Rails", icon: <SiRubyonrails /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "RESTful APIs", icon: <TbApi /> },
      { name: "AWS", icon: <FaAws /> },
      { name: "Docker", icon: <FaDocker /> },
    ],
  },
  {
    title: "Frontend & Tools",
    skills: [
      { name: "JavaScript", icon: <FaJs /> },
      { name: "HTML", icon: <SiHtml5 /> },
      { name: "CSS", icon: <SiCss3 /> },
      { name: "Power BI", icon: <FaChartBar /> },
      { name: "Salesforce", icon: <SiSalesforce /> },
      { name: "Git", icon: <FaGit /> },
    ],
  },
];

export default function Skills() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="skills"
      className="max-w-[53rem] scroll-mt-28 text-center mx-auto"
    >
      <SectionHeading>Skills</SectionHeading>
      <div className="space-y-8">
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <h3 className="text-xl font-bold">{category.title}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skillIndex}
                  className="flex flex-col items-center group"
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={skillIndex}
                >
                  <div className="bg-white rounded-full p-4 border border-gray-200 text-2xl text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {skill.icon}
                  </div>
                  <span className="mt-2 text-sm">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 