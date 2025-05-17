"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { projectsData } from "@/lib/data";
import SectionHeading from "@/app/components/SectionHeading";
import { BsGithub } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-28 max-w-[50rem] mx-auto"
    >
      <SectionHeading>Projects</SectionHeading>

      <p className="text-center text-gray-700 dark:text-gray-300 mb-8 max-w-[42rem] mx-auto">
        I&apos;ve worked on various projects ranging from web applications to mobile apps.
        Here are some of my recent projects that showcase my skills and expertise.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                quality={90}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className="transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                <a
                  href="#"
                  className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsGithub />
                  <span className="text-sm">Source</span>
                </a>

                <a
                  href="#"
                  className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiExternalLink />
                  <span className="text-sm">Demo</span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}