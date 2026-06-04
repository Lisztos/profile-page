"use client";

import React from "react";
import LanguageSelector from "./LanguageSelector";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="flex justify-end">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-1">
          <ThemeSwitch />
          <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
          <LanguageSelector isHeader={true} />
        </div>
      </div>
    </header>
  );
}