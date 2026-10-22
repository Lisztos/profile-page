import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DotGrid } from "./components/DotGrid";
import { GridLife } from "./components/GridLife";
import { InkCursor } from "./components/InkCursor";
import { CalEmbed } from "./components/CalEmbed";
import { Preloader } from "./components/Preloader";
import { mono, serif } from "./fonts";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  worksFor: {
    "@type": "Organization",
    name: site.nowCompany,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Basel",
    addressCountry: "CH",
  },
  url: site.url,
  sameAs: [site.github, site.linkedin],
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
        <GridLife />
        <CalEmbed />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
