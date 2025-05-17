"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/app/components/SectionHeading";
import { skillsData } from "@/lib/data";
import {
  FaAws,
  FaGit
} from "react-icons/fa";
import {
  SiRubyonrails,
  SiPostgresql,
  SiSalesforce,
  SiVuedotjs,
  SiRedis,
  SiTerraform,
  SiHeroku,
  SiGnubash
} from "react-icons/si";

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

// Map skill names to icons with their original brand colors
const getSkillIcon = (skillName: string) => {
  switch(skillName) {
    case "Ruby on Rails":
      return <SiRubyonrails className="w-7 h-7" style={{ color: "#CC0000" }} />;
    case "Vue.js":
      return <SiVuedotjs className="w-7 h-7" style={{ color: "#4FC08D" }} />;
    case "PostgreSQL":
      return <SiPostgresql className="w-7 h-7" style={{ color: "#336791" }} />;
    case "Redis":
      return <SiRedis className="w-7 h-7" style={{ color: "#DC382D" }} />;
    case "Terraform":
      return <SiTerraform className="w-7 h-7" style={{ color: "#7B42BC" }} />;
    case "AWS":
      return <FaAws className="w-7 h-7" style={{ color: "#FF9900" }} />;
    case "Bash":
      return <SiGnubash className="w-7 h-7" style={{ color: "#4EAA25" }} />;
    case "Heroku":
      return <SiHeroku className="w-7 h-7" style={{ color: "#430098" }} />;
    case "Salesforce":
      return <SiSalesforce className="w-7 h-7" style={{ color: "#00A1E0" }} />;
    case "Matestack":
      return <Image src="/images/logos/matestack.png" alt="Matestack" width={28} height={28} className="object-contain" />;
    case "Git":
      return <FaGit className="w-7 h-7" style={{ color: "#F05032" }} />;
    default:
      return null;
  }
};

// Function to format tech name
const formatTechName = (tech: string): string => {
  switch(tech) {
    case "GitHub Actions":
      return "GitHub";
    default:
      return tech;
  }
};

// Organize skills in balanced rows
const organizeSkills = () => {
  const rowSize = Math.ceil(skillsData.length / 2); // Display in 2 rows
  const rows = [];

  for (let i = 0; i < skillsData.length; i += rowSize) {
    rows.push(skillsData.slice(i, i + rowSize));
  }

  return rows;
};

export default function Skills() {
  const skillRows = organizeSkills();

  return (
    <section
      id="skills"
      className="max-w-[53rem] scroll-mt-28 text-center mx-auto"
    >
      <SectionHeading>Skills</SectionHeading>
      <div className="flex flex-col gap-8">
        {skillRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap justify-center gap-6">
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
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full flex items-center justify-center shadow-sm">
                  {getSkillIcon(skill)}
                </div>
                <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {formatTechName(skill)}
                </span>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}