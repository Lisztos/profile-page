"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { HiDownload } from "react-icons/hi";
import { FaMapMarkerAlt, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";

export default function Intro() {
  const controls = useAnimation();

  useEffect(() => {
    // Ensure animations run after component mounts
    controls.start({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 }
    });
  }, [controls]);

  const waveAnimation = {
    initial: { rotate: 0 },
    wave: {
      rotate: [0, 14, -8, 14, -4, 10, 0],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        type: "tween",
      },
    },
    hover: {
      rotate: [0, 14, -8, 14, -4, 10, 0],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        type: "tween",
      },
    },
  };

  const [handWaved, setHandWaved] = React.useState(false);

  useEffect(() => {
    setTimeout(() => setHandWaved(true), 600); // delay for effect
    setTimeout(() => setHandWaved(false), 2200); // reset after animation
  }, []);

  return (
    <section
      id="home"
      className="max-w-[50rem] text-center leading-8 scroll-mt-[100rem] pt-4 mx-auto"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              duration: 0.2,
            }}
          >
            {/* Using unoptimized to fix image loading issues with Next.js Image optimization */}
            <Image
              src="/images/profile-photo.png"
              alt="Adrian Sanchez"
              width={192}
              height={192}
              quality={95}
              priority={true}
              className="h-40 w-40 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
              unoptimized
            />
          </motion.div>

          <motion.span
            className="absolute bottom-0 right-0 text-4xl cursor-pointer"
            initial={{ opacity: 0, scale: 0 }}
            animate={handWaved ? { opacity: 1, scale: 1, rotate: [0, 14, -8, 14, -4, 10, 0] } : { opacity: 1, scale: 1 }}
            whileHover="hover"
            variants={waveAnimation}
            style={{ originX: 0.7, originY: 0.7 }}
            transition={{
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
        className="mb-3 mt-8 px-4 text-4xl font-bold !leading-[1.3] sm:text-5xl text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: 100 }}
        animate={controls}
      >
        Adrian Sanchez
      </motion.h1>

      <motion.h2
        className="px-4 text-xl text-gray-800 dark:text-gray-200 font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={controls}
        transition={{ delay: 0.1 }}
      >
        Full-Stack Engineer
      </motion.h2>

      <motion.div
        className="flex items-center justify-center gap-1 mb-8 text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0, y: 100 }}
        animate={controls}
        transition={{ delay: 0.15 }}
      >
        <FaMapMarkerAlt className="text-gray-500" />
        <span>Berlin, Germany</span>
      </motion.div>

      <motion.p
        className="mb-4 px-3 text-lg !leading-[1.8] text-gray-800 dark:text-gray-200 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 100 }}
        animate={controls}
        transition={{ delay: 0.2 }}
      >
        I build exceptional digital experiences, backed by <span className="text-blue-500">5+ years</span> in startup environments. Specialized in <span className="text-blue-500">Ruby on Rails</span> and
        full stack development.
      </motion.p>

      <motion.p
        className="mb-10 px-3 text-md !leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl mx-auto bg-gray-50 dark:bg-gray-800/50 py-4 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: 100 }}
        animate={controls}
        transition={{ delay: 0.22 }}
      >
        <span className="text-2xl">💬</span>
        Freelance & consulting inquiries welcome — book a call to discuss your project.
      </motion.p>

      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 100 }}
        animate={controls}
        transition={{ delay: 0.25 }}
      >
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Primary CTA - Let's Work Together */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-75 group-hover:opacity-100 blur-sm group-hover:blur transition-all duration-1000 animate-tilt"></div>
            <a
              className="relative bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none transition-all duration-300 hover:bg-black active:scale-[0.96] cursor-pointer border border-gray-700 justify-center w-auto transform hover:scale-[1.05] focus:scale-[1.05] shadow-sm hover:shadow-md z-10"
              href="https://calendly.com/lisztos/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Let&apos;s Work Together{" "}
              <FaCalendarCheck className="opacity-70 transition-transform duration-300 transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Secondary CTA - Download CV */}
          <a
            className="group bg-transparent text-gray-900 dark:text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none transition-all duration-300 cursor-pointer border border-gray-300 dark:border-gray-700 justify-center hover:border-gray-400 dark:hover:border-gray-600 transform hover:scale-[1.05] focus:scale-[1.05] active:scale-[0.96] hover:shadow-sm"
            href="/adrianisanchez-cv.pdf"
            download
          >
            Download CV{" "}
            <HiDownload className="opacity-70 transition-transform duration-300 transform group-hover:translate-y-1" />
          </a>
        </div>

        {/* Social Links - Icons Only */}
        <div className="flex gap-5 items-center justify-center">
          <a
            href="https://www.linkedin.com/in/adrian-isaias-sanchez/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-3 text-gray-700 rounded-full transition-all duration-300 border border-gray-200 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 transform hover:scale-110 hover:text-blue-600"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com/Lisztos"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-3 text-gray-700 rounded-full transition-all duration-300 border border-gray-200 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 transform hover:scale-110 hover:text-gray-900"
            aria-label="GitHub profile"
          >
            <FaGithub size={20} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}