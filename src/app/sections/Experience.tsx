"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { experienceData } from "@/lib/data";
import SectionHeading from "@/app/components/SectionHeading";
import { FaBriefcase } from "react-icons/fa";
import { SiRubyonrails, SiPostgresql, SiRedis, SiVuedotjs, SiAngular, SiTerraform, SiGithub, SiGitlab, SiGnubash, SiHeroku, SiSalesforce } from "react-icons/si";
import { MdOutlineSchool } from "react-icons/md";
import { FaAws } from "react-icons/fa";

export default function Experience() {
  // Function to return appropriate icon based on company
  const getCompanyIcon = (iconName: string) => {
    switch(iconName) {
      case "innovandio":
        return (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <a
              href="https://innovandio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-110 flex items-center justify-center"
              aria-label="Visit Innovandio website"
            >
              <Image src="/images/logos/innovandio-icon.png" alt="Innovandio" width={48} height={48} className="object-contain" />
            </a>
          </div>
        );
      case "demodesk":
        return (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <a
              href="https://demodesk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-110 flex items-center justify-center"
              aria-label="Visit Demodesk website"
            >
              <Image src="/images/logos/demodesk.svg" alt="Demodesk" width={48} height={48} className="object-contain" />
            </a>
          </div>
        );
      case "setting":
        return (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <a
              href="https://setting.io"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-110 flex items-center justify-center"
              aria-label="Visit Setting HQ website"
            >
              <Image src="/images/logos/setting.svg" alt="Setting HQ" width={48} height={48} className="object-contain" />
            </a>
          </div>
        );
      case "almondia":
        return (
          <div className="w-full h-full flex items-center justify-center bg-[#000F46]">
            <a
              href="https://almondia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-110 flex items-center justify-center"
              aria-label="Visit Almondia website"
            >
              <Image src="/images/logos/almondia.png" alt="Almondia" width={48} height={48} className="object-contain" />
            </a>
          </div>
        );
      default:
        return <FaBriefcase className="w-9 h-9 text-blue-600 dark:text-blue-400" />;
    }
  };

  // Function to get tech stack icon
  const getTechIcon = (tech: string) => {
    switch(tech) {
      case "rails":
        return <SiRubyonrails className="w-7 h-7" style={{ color: "#CC0000" }} />;
      case "postgresql":
        return <SiPostgresql className="w-7 h-7" style={{ color: "#336791" }} />;
      case "redis":
        return <SiRedis className="w-7 h-7" style={{ color: "#DC382D" }} />;
      case "vue":
        return <SiVuedotjs className="w-7 h-7" style={{ color: "#4FC08D" }} />;
      case "angular":
        return <SiAngular className="w-7 h-7" style={{ color: "#DD0031" }} />;
      case "terraform":
        return <SiTerraform className="w-7 h-7" style={{ color: "#7B42BC" }} />;
      case "github":
        return <SiGithub className="w-7 h-7" style={{ color: "#181717" }} />;
      case "aws":
        return <FaAws className="w-7 h-7" style={{ color: "#FF9900" }} />;
      case "gitlab":
        return <SiGitlab className="w-7 h-7" style={{ color: "#FCA121" }} />;
      case "bash":
        return <SiGnubash className="w-7 h-7" style={{ color: "#4EAA25" }} />;
      case "heroku":
        return <SiHeroku className="w-7 h-7" style={{ color: "#430098" }} />;
      case "salesforce":
        return <SiSalesforce className="w-7 h-7" style={{ color: "#00A1E0" }} />;
      case "matestack":
        return <Image src="/images/logos/matestack.png" alt="Matestack" width={28} height={28} className="object-contain" />;
      default:
        return null;
    }
  };

  return (
    <section
      id="experience"
      className="scroll-mt-28 max-w-[50rem] text-center leading-8 mx-auto mb-16"
    >
      <SectionHeading>Experience</SectionHeading>
      <div className="relative">
        {/* Timeline bar */}
        <motion.div
          className="absolute left-9 top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-700"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "100%" }}
          transition={{ duration: 0.5 }}
        />

        {/* Timeline items */}
        <div className="space-y-8">
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
                className={`absolute left-0 top-0 w-[74px] h-[74px] bg-white border-2 border-gray-200 rounded-full flex items-center justify-center dark:bg-gray-800 dark:border-gray-700 shadow-md overflow-hidden`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: index * 0.1 + 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
              >
                {getCompanyIcon(experience.icon)}
              </motion.div>

              {/* Content */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-3 dark:bg-blue-900/30 dark:text-blue-400">
                  {experience.date}
                </span>
                <h3 className="text-xl font-bold mb-1">
                  {experience.title.includes("Working Student") ? (
                    <>
                      Full Stack Software Engineer <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(Working Student)</span>
                    </>
                  ) : (
                    experience.title
                  )}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {experience.company} • {experience.location}
                </p>

                <ul className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed list-disc pl-5 space-y-1 mb-4">
                  {experience.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                {/* Tech Stack Icons */}
                {'techStack' in experience && experience.techStack.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-4">
                      {experience.techStack.map((tech, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center"
                        >
                          <div className={`bg-gray-100 dark:bg-gray-700 p-3 rounded-full flex items-center justify-center shadow-sm mb-1 ${tech === "matestack" ? "overflow-hidden" : ""}`}>
                            {getTechIcon(tech)}
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
                            {tech.charAt(0).toUpperCase() + tech.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}