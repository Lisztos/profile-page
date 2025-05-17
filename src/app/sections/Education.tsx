"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { educationData } from "@/lib/data";
import SectionHeading from "@/app/components/SectionHeading";

export default function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-28 max-w-[50rem] text-center leading-8 mx-auto mb-16"
    >
      <SectionHeading>Education</SectionHeading>

      {educationData.map((education, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-md border border-[#C10430] overflow-hidden dark:bg-gray-800 dark:border-[#C10430]/70 mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Header with logo */}
          <div className="bg-gradient-to-r from-[#C10430] to-[#97042A] p-4 flex items-center gap-3">
            <div className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden flex-shrink-0">
              <a
                href="https://www.tu.berlin"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110 flex items-center justify-center"
                aria-label="Visit TU Berlin website"
              >
                <Image
                  src={`/images/logos/${education.logo}.jpg`}
                  alt={education.institution}
                  width={40}
                  height={30}
                  className="object-contain"
                />
              </a>
            </div>

            <div className="text-left text-white">
              <h4 className="text-lg font-bold">{education.institution}</h4>
              <p className="text-white/90 text-sm">{education.location}</p>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full inline-block mt-1">{education.date}</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 text-left">
            <ul className="text-gray-700 dark:text-gray-300 space-y-3">
              {education.description.map((item, i) => (
                <li key={i} className={i === 0 ? "font-semibold text-base" : "text-sm"}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </section>
  );
}