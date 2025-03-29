import Link from "next/link";
import { BsLinkedin, BsGithub, BsTwitter } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="py-10 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Adrian Sanchez</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Full-Stack Developer & Software Engineer
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-6">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <BsLinkedin size={20} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <BsGithub size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
                className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <BsTwitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Adrian Sanchez
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Built with React, Next.js, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 