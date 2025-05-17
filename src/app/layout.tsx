import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import ActiveSectionContextProvider from "./context/active-section-context";
import ThemeContextProvider from "./context/theme-context";
import ThemeSwitch from "./components/ThemeSwitch";
import { Analytics } from '@vercel/analytics/next';
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


        <div className="bg-[#fbe2e3] fixed inset-0 -z-10 w-full max-w-[75rem] right-[11rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#2563eb] animate-gradient"></div>
        <div className="bg-[#539df7] fixed inset-0 -z-10 w-full max-w-[50rem] left-[35rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#3b82f6] animate-gradient [animation-delay:-7s]"></div>

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            {children}
            <Footer />
            <ThemeSwitch />
            <Toaster position="top-right" />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
        <Analytics />
      </body>
    </html>
  );
}
