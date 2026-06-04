"use client";

import { BsLinkedin, BsGithub, BsHeart } from "react-icons/bs";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 mt-2 border-t border-gray-200 dark:border-gray-800 bg-white rounded-lg dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Adrian Sanchez</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t('intro.title')}
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-5">
              <a
                href="https://www.linkedin.com/in/adrian-isaias-sanchez/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <BsLinkedin size={18} />
              </a>
              <a
                href="https://github.com/Lisztos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <BsGithub size={18} />
              </a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <div className="flex flex-col items-center md:items-end">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('footer.rights', { year: currentYear })}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Made with <BsHeart className="inline text-red-400 mx-0.5" size={11} /> in Berlin
              </p>
            </div>
          </div>
                </div>
      </div>
    </footer>
  );
}