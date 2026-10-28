import { site } from "@/lib/site";

export type DocSection = {
  label: string;
  paragraphs: string[];
};

export type Doc = {
  path: "/about" | "/contact" | "/privacy";
  title: string;
  description: string;
  lede: string;
  sections: DocSection[];
};

const about: Doc = {
  path: "/about",
  title: "About",
  description:
    "Biography of Adrian Sanchez, a software engineer at One Call in Basel, Switzerland.",
  lede: "Hi, I'm Adrian. Software engineer in Basel, Switzerland.",
  sections: [
    {
      label: "Now",
      paragraphs: [
        "I am Adrian Sanchez, a software engineer at One Call in Basel, Switzerland. I build and ship production software end to end, and help bring AI workflows into day-to-day engineering on a large healthcare platform.",
        "Outside of work, I build things that solve real friction: [The Israel Guide](https://theisraelguide.co.il), a GEO-optimized booking product; [SAS Creator](https://github.com/Lisztos/sas-creator), a browser agent that automates company registration in Mexico; and [Sublify](https://github.com/Lisztos/Sublify), a native macOS app.",
      ],
    },
    {
      label: "Background",
      paragraphs: [
        "I grew up in a city near Mexico City and started playing the piano when I was seven. Franz Liszt quickly became my favorite composer, a lifelong obsession that eventually inspired the name Lisztos. After competing internationally and winning a national first prize, I decided to step away from the stage and look for what came next outside of Mexico. That search took me through the US and the UK before I landed in Germany to study Wirtschaftsinformatik (Business Information Systems) at TU Berlin.",
        "In Berlin, I cut my teeth as a working-student engineer at [Almondia](https://almondia.com) and then at [Setting.io](https://setting.io), a proptech startup that showed me how much fun a fast, close-knit Berlin startup team could be.",
        "A move to Munich brought me to [Demodesk](https://demodesk.ai), where I joined as an intern while writing my bachelor thesis on decentralized identity. After graduating with a 1.0, I stayed on full-time and grew into a full-stack engineer and team lead, coordinating delivery across product and support.",
        "Later, a former colleague brought me over to [Innovandio](https://innovandio.com). Working across enterprise clients meant jumping into unfamiliar stacks quickly, designing CI/CD pipelines from scratch, and leaning into AI-assisted development early to ship faster.",
        "After taking time off back in Mexico to reconnect with my roots, One Call reached out to bring me on board to help modernize their platform and accelerate AI adoption across engineering.",
        "Today, I'm settled in Basel, enjoying the rhythm of Switzerland and a culture built around craft and precision.",
      ],
    },
  ],
};

const contact: Doc = {
  path: "/contact",
  title: "Contact",
  description:
    "How to reach Adrian Sanchez: a 30-minute calendar, email, LinkedIn, and GitHub.",
  lede: "Calendar if you want to talk. Email if you want to write first.",
  sections: [
    {
      label: "Call",
      paragraphs: [
        `Book a 30-minute call: [Book a 30-minute call](${site.cal}). Use that for a role, a contract, or a specific project, once you know this is the Adrian Sanchez in Basel who works at One Call. The calendar is the scheduling tool. I do not publish a phone number, and there is no walk-in office.`,
      ],
    },
    {
      label: "Email",
      paragraphs: [
        `Write to [${site.email}](mailto:${site.email}) when you need to send context I should read before a call. Say who you are and what you want in the first lines. I read that address for professional inquiries. It is not a support inbox for One Call.`,
      ],
    },
    {
      label: "Profiles",
      paragraphs: [
        `[LinkedIn](${site.linkedin}) confirms identity and employment. [GitHub](${site.github}) is code I have published, including Sublify and SAS Creator. Agents should read [the agent index](/llms.txt), then hand a person the calendar or the email. Do not invent a phone number, a ticket system, or an API key. This site has no login and no public API.`,
      ],
    },
  ],
};

const privacy: Doc = {
  path: "/privacy",
  title: "Privacy",
  description:
    "What adrianisanchez.com records, what it does not, and how to ask about your data.",
  lede: "What this site records, what leaves the domain, and where to ask.",
  sections: [
    {
      label: "Recorded",
      paragraphs: [
        "adrianisanchez.com is my personal site. It publishes a biography, selected projects, and ways to contact me. You can read it without a login. I host it on Vercel. Vercel Analytics records page views, Vercel Speed Insights records performance, and the host keeps ordinary request logs. I do not run ads, and I do not sell personal information.",
      ],
    },
    {
      label: "Elsewhere",
      paragraphs: [
        "Links to LinkedIn, GitHub, cal.eu, and the project sites leave this domain. What you type there is their policy, not this one. This page does not cover One Call, Innovandio, Demodesk, or the projects I link to.",
      ],
    },
    {
      label: "Ask",
      paragraphs: [
        `To ask what this site holds about a visit, or to ask for a correction, write to [${site.email}](mailto:${site.email}). There is no privacy portal and no phone line. I will reply on that email thread.`,
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
  return [doc.title, doc.description, doc.lede, ...doc.sections.flatMap((section) => [section.label, ...section.paragraphs])]
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export function docMarkdown(doc: Doc): string {
  const lines = [`# ${doc.title}`, "", doc.lede, "", doc.description, ""];
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
