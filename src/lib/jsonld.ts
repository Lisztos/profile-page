import { site } from "@/lib/site";

const personId = `${site.url}/#person`;
const organizationId = `${site.url}/#organization`;

export function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        givenName: site.givenName,
        familyName: site.familyName,
        description: site.description,
        jobTitle: site.role,
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
