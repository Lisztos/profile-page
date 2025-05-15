"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "@/app/components/SectionHeading";
import { 
  FaGem, 
  FaAws, 
  FaDocker, 
  FaJs, 
  FaGit,
  FaChartBar
} from "react-icons/fa";
import { 
  SiRubyonrails, 
  SiPostgresql, 
  SiSalesforce,
  SiHtml5,
  SiCss3,
  SiVuedotjs
} from "react-icons/si";
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

// Skill categories organized in two rows
const skillsRows = [
  [
    { name: "Ruby", icon: <FaGem /> },
    { name: "Ruby on Rails", icon: <SiRubyonrails /> },
    { name: "PostgreSQL", icon: <SiPostgresql /> },
    { name: "AWS", icon: <FaAws /> },
    { name: "Docker", icon: <FaDocker /> },
    { name: "JavaScript", icon: <FaJs /> },
  ],
  [
    { name: "Vue.js", icon: <SiVuedotjs /> },
    { name: "RESTful APIs", icon: <TbApi /> },
    { name: "HTML5", icon: <SiHtml5 /> },
    { name: "CSS3", icon: <SiCss3 /> },
    { name: "Power BI", icon: <FaChartBar /> },
    { name: "Git", icon: <FaGit /> },
  ],
];

export default function Skills() {
  const { ref } = useInView({
    threshold: 0.5,
  });

  return (
    <section
      ref={ref}
      id="skills"
      className="max-w-[53rem] scroll-mt-28 text-center mx-auto"
    >
      <SectionHeading>Skills</SectionHeading>
      <div className="flex flex-col gap-8">
        {skillsRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-4">
            {row.map((skill, skillIndex) => (
              <motion.div
                key={skillIndex}
                className="flex flex-col items-center group"
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={skillIndex + rowIndex * row.length}
              >
                <div className="bg-white rounded-full p-4 border border-gray-200 text-2xl text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {skill.icon}
                </div>
                <span className="mt-2 text-sm">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
} 