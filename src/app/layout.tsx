import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CommandPalette } from "./components/CommandPalette";
import { SiteNav } from "./components/SiteNav";
import { InkCursor } from "./components/InkCursor";
import { CalEmbed } from "./components/CalEmbed";
import { ScrollHomeTop } from "./components/ScrollHomeTop";
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
      <head>
        <link rel="preconnect" href="https://app.cal.eu" />
        <link rel="dns-prefetch" href="https://app.cal.eu" />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');requestAnimationFrame(function(){document.documentElement.classList.add('ready')});`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
        <InkCursor />
        <CalEmbed />
        <CommandPalette />
        <SiteNav />
        <ScrollHomeTop />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
