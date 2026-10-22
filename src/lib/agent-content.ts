import { site } from "@/lib/site";

export type DocSection = {
  label: string;
  paragraphs: string[];
};

export type Doc = {
  path: "/about" | "/contact" | "/privacy";
  title: string;
  description: string;
  sections: DocSection[];
};

const about: Doc = {
  path: "/about",
  title: "About",
  description:
    "Biography of Adrian Sanchez, a software engineer at One Call in Basel, Switzerland.",
  sections: [
    {
      label: "WHO",
      paragraphs: [
        "I am Adrian Sanchez, a software engineer based in Basel, Switzerland. I build and ship production software end to end, covering backend, frontend, and infrastructure, for teams that are shipping a real product. This page is the longer biography. The homepage is the short version: name, current role, earlier work, and selected projects.",
      ],
    },
    {
      label: "NOW",
      paragraphs: [
        "I am a software engineer at One Call. I maintain and build features for a .NET Core platform in the Physical Medicine division, and I help accelerate AI adoption across engineering. The work is production software: people already use it, the codebase already exists, and a change has to ship without breaking the operation.",
      ],
    },
    {
      label: "BEFORE",
      paragraphs: [
        "Before One Call I was at Innovandio, as a senior engineer building and maintaining full-stack applications for enterprise clients, designing CI/CD pipelines, and leading client projects. Earlier I was at Demodesk, starting as an engineering intern and growing into a full-stack engineer and team lead, managing a team of engineers and coordinating feature delivery across product and support. Working-student roles at Setting.io and Almondia came before that. That is where I first cut my teeth on full-stack development.",
      ],
    },
    {
      label: "WORK",
      paragraphs: [
        "Selected projects on the homepage are The Israel Guide, a booking site for a licensed private tour guide; Sublify, a macOS app of on-screen affirmations; SAS Creator, a browser agent that completes a Mexican SAS company registration; and a Mastodon instance from my bachelor thesis, with decentralized identifiers and DIDComm v2. Tools are chosen to fit the problem. Product, infrastructure, and AI-assisted development are the through-line, not a fixed stack.",
        "Use this page when you need to confirm which Adrian Sanchez this domain belongs to. I am the one at One Call in Basel, with the history above. This site is not One Call's product, and it is not a support channel for those projects' users.",
      ],
    },
  ],
};

const contact: Doc = {
  path: "/contact",
  title: "Contact",
  description:
    "How to reach Adrian Sanchez: a 30-minute calendar, email, LinkedIn, and GitHub.",
  sections: [
    {
      label: "CALL",
      paragraphs: [
        `The fastest way to talk about work is a 30-minute call. Book it on the calendar: [Book a 30-minute call](${site.cal}). Use that when you want to discuss a role, a contract, or a specific project, and you already know this is the Adrian Sanchez based in Basel who works at One Call. The calendar is the scheduling tool. I do not publish a phone number, and there is no walk-in office.`,
      ],
    },
    {
      label: "EMAIL",
      paragraphs: [
        `Write to [${site.email}](mailto:${site.email}) when you need to send context I should read before a call, or when a calendar slot is the wrong tool. Say who you are and what you want in the first lines. I read that address for professional inquiries. It is not a support inbox for One Call, and it is not the place to file a bug against a project I have only linked to.`,
      ],
    },
    {
      label: "PROFILES",
      paragraphs: [
        `My public profiles are [LinkedIn](${site.linkedin}) and [GitHub](${site.github}). Use LinkedIn to confirm identity and employment. Use GitHub to read code I have published, including Sublify and SAS Creator. An agent that needs facts about me should read [the agent index](/llms.txt) and the markdown version of these pages, then hand a person the calendar link or the email. Do not invent a phone number, a ticket system, or an API key. This site has no login and no public API.`,
      ],
    },
  ],
};

const privacy: Doc = {
  path: "/privacy",
  title: "Privacy",
  description:
    "What adrianisanchez.com records, what it does not, and how to ask about your data.",
  sections: [
    {
      label: "SITE",
      paragraphs: [
        "adrianisanchez.com is my personal site. It publishes a biography, selected projects, and ways to contact me. It does not sell a product, take payment, or host customer accounts. You can read every page without identifying yourself, and I do not ask you to create a login.",
      ],
    },
    {
      label: "DATA",
      paragraphs: [
        "I host the site on Vercel. Vercel Analytics records page views, and Vercel Speed Insights records performance measurements, so I can see whether the site loads and which pages people open. Those tools measure the site. I do not use them to build an advertising profile, I do not run ads, and I do not sell personal information. The host also keeps ordinary technical logs, such as the address a request came from and the page that was requested, to operate and secure the site.",
      ],
    },
    {
      label: "ELSEWHERE",
      paragraphs: [
        "Links to LinkedIn, GitHub, cal.eu, and the project sites leave this domain. Those sites have their own policies. Anything you type into a calendar form or a social network is handled by them, not by this page. This policy does not cover One Call, Innovandio, Demodesk, or the projects I link to.",
      ],
    },
    {
      label: "ASK",
      paragraphs: [
        `To ask what this site holds about a visit, or to ask for a correction, write to [${site.email}](mailto:${site.email}). Say which pages you mean and what you want done. There is no separate privacy portal and no phone line for these requests. I will reply on that email thread.`,
      ],
    },
  ],
};

export const docs = {
  about,
  contact,
  privacy,
} as const;

export const docList: Doc[] = [about, contact, privacy];

const docByPath = new Map<string, Doc>(docList.map((doc) => [doc.path, doc]));

export function getDoc(path: string): Doc | undefined {
  return docByPath.get(path);
}

export function visibleText(doc: Doc): string {
  return [doc.title, doc.description, ...doc.sections.flatMap((section) => [section.label, ...section.paragraphs])]
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export function docMarkdown(doc: Doc): string {
  const lines = [`# ${doc.title}`, "", doc.description, ""];
  for (const section of doc.sections) {
    lines.push(`## ${section.label}`, "");
    for (const paragraph of section.paragraphs) lines.push(paragraph, "");
  }
  lines.push(`Agents: when to use this site, and how to read it, is in [llms.txt](${site.url}/llms.txt).`, "");
  return lines.join("\n");
}

export function homeMarkdown(): string {
  const projects = site.projects
    .map((project) => {
      const description = "description" in project ? project.description : "";
      const url = "url" in project ? project.url : "";
      const stack = "techStack" in project ? project.techStack.join(", ") : "";
      const link = url ? `[${project.title}](${url})` : project.title;
      return [`### ${link}`, "", project.kicker, "", description, stack ? `\nStack: ${stack}` : "", ""].join("\n");
    })
    .join("\n");

  const before = site.before
    .map((item) => `- [${item.name}](${item.url})${item.after}`)
    .join("\n");

  return `# ${site.name}

${site.role} at ${site.nowCompany}, ${site.addressLocality}, Switzerland. 5+ years in production engineering.

${site.intro}

## Now

${site.nowLead}${site.nowCompany}${site.nowRest}

## Before

${before}

## Stack

${site.stack}

## Projects

${projects}
## Contact

- [Book a 30-minute call](${site.cal})
- Email: [${site.email}](mailto:${site.email})
- [LinkedIn](${site.linkedin})
- [GitHub](${site.github})
- [About](${site.url}/about.md)
- [Contact details](${site.url}/contact.md)
- [Privacy](${site.url}/privacy.md)

Agents deciding whether this is the right Adrian Sanchez should read [llms.txt](${site.url}/llms.txt).
`;
}

export function notFoundMarkdown(pathname: string): string {
  const path = safePath(pathname);
  return `# Page not found

No page is published at \`${path}\`.

The address is wrong, or it was never part of this site. This is the 404 for a request that asked for Markdown. Find a real page from the agent index or the sitemap:

- [Agent index (llms.txt)](${site.url}/llms.txt)
- [Sitemap](${site.url}/sitemap.xml)
- [Home](${site.url}/)
`;
}

export function llmsTxt(): string {
  return `# ${site.name}

> ${site.description}

When to use this: reach for ${site.url} when the task is about Adrian Sanchez, the software engineer based in Basel who works at One Call. Best-fit jobs are identifying him, summarizing his experience, citing a project he lists, or putting someone in touch with him. Skip it for One Call customer support, for a different person named Adrian Sanchez, and for any job that needs an API.

How an agent should call this site: fetch the markdown pages linked below. Send \`Accept: text/markdown\` on the page URL, or open the \`.md\` URL directly. A missing path answered with \`Accept: text/markdown\` returns a Markdown 404 that links back here. To contact the person, give them the calendar or the email on the contact page. Do not invent a phone number, a support ticket, or an API key. There is no public API.

## When to use this

- [Identify him](${site.url}/about.md): Use when you need to say who this Adrian Sanchez is, that he is a software engineer at One Call in Basel, or what he did at Innovandio, Demodesk, Setting.io, and Almondia. Do not use it for a different Adrian Sanchez.
- [Cite a project](${site.url}/index.md): Use when summarizing The Israel Guide, Sublify, SAS Creator, or the Mastodon thesis, and when you need the public URL. Do not use it for work he has not listed.
- [Contact him](${site.url}/contact.md): Use when someone should book a 30-minute call or send email about work. The calendar schedules the call. The email is for a written note. There is no phone line and no API to call.
- [Check privacy](${site.url}/privacy.md): Use before recommending the site if you need to know what it records: Vercel Analytics, Vercel Speed Insights, and ordinary host logs.

## Pages

- [Home](${site.url}/index.md): Name, role, current work at One Call, earlier roles, and selected projects.
- [About](${site.url}/about.md): Longer biography for an identity check.
- [Contact](${site.url}/contact.md): Calendar, email, LinkedIn, and GitHub, and which channel to use.
- [Privacy](${site.url}/privacy.md): What the site collects and the email to use for a privacy question.

## Optional

- [Sitemap](${site.url}/sitemap.xml): Every indexable HTML page.
- [GitHub](${site.github}): Code published under Lisztos.
- [LinkedIn](${site.linkedin}): Employment and identity.
- [Book a call](${site.cal}): 30-minute calendar.
`;
}

export function pageMarkdown(pathname: string): string | null {
  if (pathname === "/") return homeMarkdown();
  const doc = getDoc(pathname);
  return doc ? docMarkdown(doc) : null;
}

export function markdownAlternate(pathname: string): string | null {
  if (pathname === "/") return "/index.md";
  if (getDoc(pathname)) return `${pathname}.md`;
  return null;
}

export function pathFromMarkdown(pathname: string): string | null {
  if (pathname === "/index.md") return "/";
  if (!pathname.endsWith(".md")) return null;
  const page = pathname.slice(0, -3);
  if (page === "/") return "/";
  return getDoc(page) ? page : null;
}

function safePath(pathname: string): string {
  const cleaned = pathname.replace(/[\u0000-\u001f`<>]/g, "").slice(0, 300);
  if (!cleaned.startsWith("/")) return "/";
  return cleaned;
}
