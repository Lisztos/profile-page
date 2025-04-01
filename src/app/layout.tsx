import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import ActiveSectionContextProvider from "./context/active-section-context";
import ThemeContextProvider from "./context/theme-context";
import ThemeSwitch from "./components/ThemeSwitch";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adrian Sanchez | Senior Backend Engineer",
  description: "Senior Backend Engineer with Ruby on Rails expertise and 5+ years of experience in startup environments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-950 relative pt-4 min-h-screen dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}>
        <div className="bg-[#0ea5e9] fixed inset-0 -z-10 w-full max-w-[75rem] mx-auto rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#0369a1]"></div>
        <div className="bg-[#c4b5fd] fixed inset-0 -z-10 w-full max-w-[50rem] mx-auto rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#5650a7]"></div>

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            {children}
            <Footer />
            <ThemeSwitch />
            <Toaster position="top-right" />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
