"use client";

import React, { useRef, useState, useEffect } from "react";
import { useLanguage } from "../context/language-context";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { GB, DE, MX } from 'country-flag-icons/react/3x2';

type LanguageCode = "en" | "de" | "es";

type LanguageInfo = {
  code: LanguageCode;
  name: string;
};

interface LanguageSelectorProps {
  isHeader?: boolean;
}

export default function LanguageSelector({ isHeader = false }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get flag component based on current language
  const getFlagComponent = (lang: LanguageCode) => {
    switch (lang) {
      case "en": return <GB className="w-4 h-3 rounded-sm shadow-sm" />;
      case "de": return <DE className="w-4 h-3 rounded-sm shadow-sm" />;
      case "es": return <MX className="w-4 h-3 rounded-sm shadow-sm" />;
      default: return <GB className="w-4 h-3 rounded-sm shadow-sm" />;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const languages: LanguageInfo[] = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" }
  ];

  const handleSelectLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  if (isHeader) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-1.5 bg-transparent text-sm py-1 pl-1 pr-2 border-none focus:outline-none cursor-pointer text-gray-700 dark:text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {getFlagComponent(language as LanguageCode)}
          <span>{language.toUpperCase()}</span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 text-sm ${language === lang.code ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                {getFlagComponent(lang.code)}
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Footer version with full language names
  return (
    <div className="flex flex-col items-center sm:items-end">
      <label htmlFor="language-select" className="text-sm text-gray-600 dark:text-gray-400 mb-1">
        {t('footer.languageSelector')}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {getFlagComponent(language as LanguageCode)}
          <span>{languages.find(lang => lang.code === language)?.name}</span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 text-sm ${language === lang.code ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                {getFlagComponent(lang.code)}
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}