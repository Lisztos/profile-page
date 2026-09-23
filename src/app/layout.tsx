import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DotGrid } from "./components/DotGrid";
import { InkCursor } from "./components/InkCursor";
import { Preloader } from "./components/Preloader";
import { mono, serif } from "./fonts";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Adrian Sanchez | Senior Full Stack Engineer",
  description: "Rails and Vue engineer, 5+ years in startups. Berlin.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: "Adrian Sanchez | Senior Full Stack Engineer",
    description: "Rails and Vue engineer, 5+ years in startups. Berlin.",
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Adrian Sanchez | Senior Full Stack Engineer",
    description: "Rails and Vue engineer, 5+ years in startups. Berlin.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${serif.variable} ${mono.variable}`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('loading');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Preloader />
        <InkCursor />
        <DotGrid />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
