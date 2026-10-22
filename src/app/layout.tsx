import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CommandPalette } from "./components/CommandPalette";
import { DotGrid } from "./components/DotGrid";
import { GridLife } from "./components/GridLife";
import { InkCursor } from "./components/InkCursor";
import { Preloader } from "./components/Preloader";
import { mono, serif } from "./fonts";
import { jsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    type: "profile",
    title: site.title,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${serif.variable} ${mono.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('loading');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
        <Preloader />
        <InkCursor />
        <DotGrid />
        <GridLife />
        <CommandPalette />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
