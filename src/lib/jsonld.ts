import { site } from "@/lib/site";

const personId = `${site.url}/#person`;
const organizationId = `${site.url}/#organization`;
const portraitUrl = `${site.url}${site.portrait.src}`;

const portrait = {
  "@type": "ImageObject",
  "@id": `${portraitUrl}#image`,
  contentUrl: portraitUrl,
  url: portraitUrl,
  caption: site.portrait.alt,
  width: site.portrait.width,
  height: site.portrait.height,
  encodingFormat: "image/jpeg",
};

export function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${site.url}/#webpage`,
        url: site.url,
        name: site.title,
        description: site.description,
        inLanguage: "en",
        primaryImageOfPage: portrait,
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        givenName: site.givenName,
        familyName: site.familyName,
        description: site.description,
        jobTitle: site.role,
        image: portrait,
        worksFor: site.nowCompany,
        email: site.email,
        url: site.url,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.addressLocality,
          addressCountry: site.addressCountry,
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Technische Universität Berlin",
        },
        knowsLanguage: ["English", "Spanish", "German"],
        knowsAbout: [
          "Ruby on Rails",
          ".NET Core",
          "Generative Engine Optimization (GEO)",
          "Search Engine Optimization (SEO)",
          "Cloud Infrastructure",
          "AWS",
          "Terraform",
          "Docker",
          "CI/CD",
          "GitHub Actions",
          "PostgreSQL",
          "Redis",
          "TypeScript",
          "React",
          "Next.js",
          "Vue.js",
          "Angular",
          "Python",
          "Playwright",
          "Swift",
          "SwiftUI",
          "AI Engineering",
          "LLM Integrations",
          "Decentralized Identity (DID, DIDComm v2)",
        ],
        sameAs: [site.github, site.linkedin, "https://x.com/lisztos"],
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        url: site.url,
        description: site.description,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.addressLocality,
          addressCountry: site.addressCountry,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "professional inquiries",
          email: site.email,
          url: site.cal,
          availableLanguage: ["English", "Spanish", "German"],
        },
        sameAs: [site.github, site.linkedin],
      },
    ],
  };
}
