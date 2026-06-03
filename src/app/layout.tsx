import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ActiveSectionContextProvider from "./context/active-section-context";
import ThemeContextProvider from "./context/theme-context";
import { LocationProvider } from "../lib/hooks/useLocationDisplay";
import LanguageContextProvider from "./context/language-context";
// Theme switch is temporarily disabled
// import ThemeSwitch from "./components/ThemeSwitch";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from "react-hot-toast";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://adrianisanchez.com"),
  title: "Adrian Sanchez",
  description: "Senior Full Stack Engineer with Ruby on Rails expertise and 5+ years of experience in startup environments.",
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: "Adrian Sanchez | Senior Full Stack Engineer",
    description: "Senior Full Stack Engineer with Ruby on Rails expertise and 5+ years of experience in startup environments.",
    images: [{ url: '/icon.png', width: 60, height: 60 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Adrian Sanchez | Senior Full Stack Engineer",
    description: "Senior Full Stack Engineer with Ruby on Rails expertise and 5+ years of experience in startup environments.",
    images: ['/icon.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="shortcut icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className={`${geist.className} bg-gray-50 text-gray-950 relative pt-4 min-h-screen dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}>


        <div className="bg-[#fbe2e3] fixed inset-0 -z-10 w-full max-w-[75rem] right-[11rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#2563eb] animate-gradient"></div>
        <div className="bg-[#539df7] fixed inset-0 -z-10 w-full max-w-[50rem] left-[35rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#3b82f6] animate-gradient [animation-delay:-7s]"></div>

        <LocationProvider>
          <ThemeContextProvider>
            <LanguageContextProvider>
              <ActiveSectionContextProvider>
                <Header />
              {children}
              <Footer />
              {/* ThemeSwitch temporarily disabled */}
              {/* <ThemeSwitch /> */}
              <Toaster position="top-right" />
              </ActiveSectionContextProvider>
            </LanguageContextProvider>
          </ThemeContextProvider>
        </LocationProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
