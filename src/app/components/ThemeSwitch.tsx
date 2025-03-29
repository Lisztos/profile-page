"use client";

import { useTheme } from "@/app/context/theme-context";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="fixed bottom-5 right-5 bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <SunIcon className="h-[1.2rem] w-[1.2rem] text-gray-800" />
      ) : (
        <MoonIcon className="h-[1.2rem] w-[1.2rem] text-gray-200" />
      )}
    </button>
  );
} 