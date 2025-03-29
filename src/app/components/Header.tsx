"use client";

import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/app/context/active-section-context";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { SectionName } from "@/lib/types";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = (section: SectionName) => {
    setActiveSection(section);
    setTimeOfLastClick(Date.now());
    setMobileMenuOpen(false);
  };

  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[4.5rem] border-b border-gray-200 bg-white bg-opacity-80 shadow-sm backdrop-blur-md dark:bg-gray-950 dark:border-gray-800 dark:bg-opacity-75"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      />

      <div className="fixed top-0 left-0 right-0 h-[4.5rem] flex items-center justify-between px-4 sm:px-8 lg:px-16">
        <Link 
          href="#home" 
          className="font-bold text-xl text-gray-900 dark:text-white transition-colors"
          onClick={() => handleLinkClick("Home")}
        >
          Adrian<span className="text-blue-600 dark:text-blue-400">.dev</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1 text-[0.9rem] font-medium text-gray-500 dark:text-gray-400">
            {links.map((link) => (
              <li key={link.hash} className="relative">
                <Link
                  className={clsx(
                    "px-4 py-2 rounded-md hover:text-gray-950 dark:hover:text-white transition-colors",
                    {
                      "text-gray-950 dark:text-white": activeSection === link.name,
                    }
                  )}
                  href={link.hash}
                  onClick={() => handleLinkClick(link.name)}
                >
                  {link.name}
                  {link.name === activeSection && (
                    <motion.span
                      className="absolute inset-0 rounded-md bg-gray-100 dark:bg-gray-800 -z-10"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800 dark:text-gray-200 p-2 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="fixed top-[4.5rem] left-0 right-0 h-screen bg-white dark:bg-gray-900 z-50 p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <ul className="flex flex-col gap-4 items-center text-lg font-medium text-gray-800 dark:text-gray-200">
            {links.map((link) => (
              <li key={link.hash} className="w-full">
                <Link
                  className={clsx(
                    "block py-3 text-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                    {
                      "bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-blue-400": 
                        activeSection === link.name,
                    }
                  )}
                  href={link.hash}
                  onClick={() => handleLinkClick(link.name)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
} 