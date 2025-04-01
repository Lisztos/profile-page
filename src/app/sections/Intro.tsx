"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HiDownload } from "react-icons/hi";
import { FaMapMarkerAlt, FaLinkedin, FaGithub, FaGitlab, FaEnvelope } from "react-icons/fa";
import { useActiveSectionContext } from "@/app/context/active-section-context";
import { useInView } from "react-intersection-observer";

export default function Intro() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  const waveAnimation = {
    initial: { rotate: 0 },
    hover: {
      rotate: [0, 14, -8, 14, -4, 10, 0],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      id="home"
      className="max-w-[50rem] text-center leading-8 scroll-mt-[100rem] pt-4 mx-auto"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <Image
              src="/images/profile-photo.png"
              alt="Adrian Sanchez"
              width="192"
              height="192"
              quality="95"
              priority={true}
              className="h-40 w-40 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
            />
          </motion.div>

          <motion.span
            className="absolute bottom-0 right-0 text-4xl cursor-pointer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover="hover"
            variants={waveAnimation}
            style={{ originX: 0.7, originY: 0.7 }}
            transition={{
              type: "spring",
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
          >
            👋
          </motion.span>
        </div>
      </div>

      <motion.h1
        className="mb-4 mt-8 px-4 text-4xl font-bold !leading-[1.3] sm:text-5xl text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Adrian Sanchez
      </motion.h1>
      
      <motion.h2
        className="mb-1 px-4 text-xl text-gray-800 dark:text-gray-200 font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Full-Stack Engineer
      </motion.h2>

      <motion.div
        className="flex items-center justify-center gap-1 mb-8 text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <FaMapMarkerAlt className="text-gray-500" />
        <span>Berlin, Germany</span>
      </motion.div>

      <motion.p
        className="mb-10 px-4 text-lg !leading-[1.8] text-gray-800 dark:text-gray-200 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        I build exceptional digital experiences with <span className="text-blue-500">5+ years</span> of 
        experience in startup environments. Specialized in <span className="text-blue-500">Ruby on Rails</span> and 
        full stack development.
      </motion.p>

      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        {/* Download CV Button */}
        <a
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-black active:scale-105 transition cursor-pointer border border-transparent justify-center w-auto"
          href="/CV.pdf"
          download
        >
          Download CV{" "}
          <HiDownload className="opacity-70 group-hover:translate-y-1 transition" />
        </a>

        {/* Social Links */}
        <div className="flex gap-5 items-center justify-center">
          <a
            href="https://www.linkedin.com/in/adrian-isaias-sanchez/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-3 text-gray-700 rounded-full hover:text-blue-600 hover:scale-110 transition-all border border-gray-200 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com/Lisztos"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-3 text-gray-700 rounded-full hover:text-gray-900 hover:scale-110 transition-all border border-gray-200 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
            aria-label="GitHub profile"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://gitlab.com/Lisztos"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-3 text-gray-700 rounded-full hover:text-orange-600 hover:scale-110 transition-all border border-gray-200 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
            aria-label="GitLab profile"
          >
            <FaGitlab size={20} />
          </a>
          <a
            href="mailto:isaias.liszt@gmail.com"
            className="bg-white p-3 text-gray-700 rounded-full hover:text-red-500 hover:scale-110 transition-all border border-gray-200 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
            aria-label="Email contact"
          >
            <FaEnvelope size={20} />
          </a>
        </div>
      </motion.div>
    </section>
  );
} 