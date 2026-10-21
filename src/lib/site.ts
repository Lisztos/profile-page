export const site = {
  name: "Adrian Sanchez",
  givenName: "Adrian",
  familyName: "Sanchez",
  role: "Software Engineer",
  location: "BASEL, CH",
  url: "https://adrianisanchez.com",
  githubUser: "Lisztos",
  github: "https://github.com/Lisztos",
  githubStars: "https://github.com/Lisztos?tab=stars",
  linkedin: "https://www.linkedin.com/in/adrian-isaias-sanchez/",
  cal: "https://cal.eu/adriansanchez/30min",
  title: "Adrian Sanchez | Software Engineer",
  description:
    "Software Engineer at One Call. 5+ years of experience building production software. Based in Basel, Switzerland.",
  intro:
    "I build and ship production software end to end, covering backend, frontend, and infrastructure, for teams shipping real products.",
  nowLead: "Software Engineer at ",
  nowCompany: "One Call",
  nowRest:
    ". I maintain and build features for a .NET Core platform in the Physical Medicine division, and help accelerate AI adoption across engineering.",
  before: [
    {
      name: "Innovandio",
      url: "https://innovandio.com",
      after:
        ", as a senior engineer building and maintaining full-stack applications for enterprise clients, designing CI/CD pipelines, and leading client projects. Earlier, ",
    },
    {
      name: "Demodesk",
      url: "https://demodesk.ai",
      after:
        ", starting as an engineering intern and growing into a full-stack engineer and team lead, managing a team of engineers and coordinating feature delivery across product and support. Working-student roles at Setting.io and Almondia before that, where I first cut my teeth on full-stack development.",
    },
  ],
  stack:
    "Product, infrastructure, and AI-assisted development. Tools are chosen to fit the problem.",
  tickerItems: [
    "FULL STACK",
    "PRODUCT",
    "INFRA",
    "AI",
    "ZERO-TO-ONE",
    "ONE CALL",
    "BASEL",
  ],
  projects: [
    {
      title: "The Israel Guide",
      kicker: "LIVE · GEO-OPTIMIZED · $10K REVENUE IN 2 MONTHS",
      description:
        "A GEO-optimized booking site for a licensed private tour guide in Israel, built to convert search and AI-assistant traffic into bookings.",
      techStack: ["Next.js", "Tailwind CSS"],
      image: { src: "/images/projects/the-israel-guide.jpg", alt: "The Israel Guide site preview" },
      url: "https://theisraelguide.co.il",
    },
    {
      title: "Sublify",
      kicker: "OPEN SOURCE · MACOS APP",
      description:
        "A macOS app that uses brief on-screen affirmations, subliminal messaging techniques, to help reinforce personal goals and positive self-talk.",
      techStack: ["Swift", "SwiftUI"],
      image: {
        src: "/images/projects/sublify-logo.png",
        alt: "Sublify logo",
        border: false,
      },
      url: "https://github.com/Lisztos/Sublify",
    },
    {
      title: "SAS Creator",
      kicker: "OPEN SOURCE · LEGAL AUTOMATION",
      description:
        "An automated browser agent that completes Mexico's notoriously slow SAS company registration end to end, with auto-retry and Telegram notifications.",
      techStack: ["Python", "Playwright"],
      url: "https://github.com/Lisztos/sas-creator",
    },
    {
      title: "Mastodon + Decentralized Identity",
      kicker: "OPEN SOURCE · BACHELOR THESIS",
      description:
        "A Mastodon instance built for my bachelor thesis, integrating decentralized identifiers (DIDs) and the DIDComm v2 protocol for decentralized identity and confidential, transport-agnostic communication.",
      techStack: ["Ruby on Rails", "React", "Node.js"],
      image: { src: "/images/projects/mastodon-logo.png", alt: "Mastodon logo" },
      url: "https://github.com/Lisztos/mastodon",
    },
  ],
} as const;
