import { SectionName } from "./types";

export const links = [
  {
    name: "Home" as SectionName,
    hash: "#home",
  },
  /* Temporarily hidden
  {
    name: "Projects" as SectionName,
    hash: "#projects",
  },
  */
  {
    name: "Skills" as SectionName,
    hash: "#skills",
  },
  {
    name: "Experience" as SectionName,
    hash: "#experience",
  },
  {
    name: "Education" as SectionName,
    hash: "#education",
  },
] as const;

export const experienceData = [
  {
    title: "Senior Software Engineer",
    company: "Innovandio",
    location: "Berlin, Germany",
    description: [
      "Built and maintained two full stack applications for enterprise clients",
      "Designed CI/CD pipelines and infrastructure to streamline deployments and testing",
      "Managed engineers and led multiple client projects under tight deadlines"
    ],
    techStack: [
      "rails",
      "matestack",
      "vue",
      "postgresql",
      "terraform",
      "aws",
      "redis",
      "github",
      "bash",
      "twilio"
    ],
    icon: "innovandio",
    date: "October 2023 - Present",
  },
  {
    title: "Full Stack Software Engineer | Team Lead",
    company: "Demodesk",
    location: "Munich, Germany",
    description: [
      "Led a team of engineers focused on feature delivery and platform stability",
      "Shipped features under strict SLA and uptime requirements for a global-facing platform",
      "Improved cross-team alignment by co-developing a process to prioritize product ideas"
    ],
    techStack: [
      "rails",
      "vue",
      "postgresql",
      "redis",
      "gitlab",
      "aws",
      "bash",
      "twilio"
    ],
    icon: "demodesk",
    date: "November 2022 - September 2023",
  },
  {
    title: "Software Engineer Intern",
    company: "Demodesk",
    location: "Munich, Germany",
    description: [
      "Cut technical debt and simplified the codebase by 15%",
      "Boosted backend performance by optimizing queries and reducing response times",
      "Contributed to development of platform features and functionality"
    ],
    techStack: [
      "rails",
      "vue",
      "postgresql"
    ],
    icon: "demodesk",
    date: "February 2022 - November 2022",
  },
  {
    title: "Full Stack Software Engineer (Working Student)",
    company: "Setting HQ",
    location: "Berlin, Germany",
    description: [
      "Optimized the platform's Office-Search functionality, reducing load times by 45%",
      "Developed an office onboarding system, digitizing a previous manual and error-prone system",
      "Eliminated legacy dependencies by migrating the platform to a modern system architecture",
      "Led the relaunch of the company's website"
    ],
    techStack: [
      "rails",
      "postgresql",
      "heroku"
    ],
    icon: "setting",
    date: "October 2020 - February 2022",
  },
  {
    title: "Full Stack Software Engineer (Working Student)",
    company: "Almondia",
    location: "Berlin, Germany",
    description: [
      "Designed and developed a custom CRM system for a partner company",
      "Maintained and optimized Salesforce integration pipelines, improving data flow and error detection"
    ],
    techStack: [
      "rails",
      "postgresql",
      "salesforce"
    ],
    icon: "almondia",
    date: "February 2020 - October 2020",
  }
] as const;

// Education data
export const educationData = [
  {
    degree: "Bachelor of Science – Wirtschaftsinformatik",
    institution: "Technische Universität Berlin",
    location: "Berlin, Germany",
    description: [
      "B.Sc. Business Informatics (Wirtschaftsinformatik)",
      "Thesis topic: \"Integrating Didcomm Messaging in ActivityPub-based Social Networks\"",
    ],
    logo: "tu-berlin",
    date: "2018 - 2022",
  }
] as const;

export const projectsData = [
  {
    title: "Self-Service Onboarding System",
    description:
      "Designed and implemented a self-service onboarding system at Setting.io that streamlined the customer acquisition process and reduced manual intervention.",
    tags: ["Ruby on Rails", "PostgreSQL", "Heroku", "JavaScript", "HTML/CSS"],
    imageUrl: "/images/projects/project1.png",
  },
  {
    title: "Office-Search Optimization",
    description:
      "Improved the load time of the Office-Search feature by 45% through performance optimization, caching strategies, and database query improvements.",
    tags: ["Ruby on Rails", "Elasticsearch", "PostgreSQL", "Performance Optimization"],
    imageUrl: "/images/projects/project2.png",
  },
  {
    title: "Digital Handover Tool",
    description:
      "Developed a digital handover tool that facilitated smooth transitions between team members and improved project continuity and knowledge transfer.",
    tags: ["Ruby", "JavaScript", "RESTful APIs", "UX/UI Design"],
    imageUrl: "/images/projects/project1.png",
  },
  {
    title: "Platform Migration Project",
    description:
      "Led the migration of a legacy platform to a modern system, ensuring data integrity and minimal disruption to users while implementing new features.",
    tags: ["Ruby on Rails", "AWS", "Docker", "Database Migration", "CI/CD"],
    imageUrl: "/images/projects/project2.png",
  },
] as const;

export const skillsData = [
  "Ruby on Rails",
  "Vue.js",
  "Matestack",
  "PostgreSQL",
  "Terraform",
  "AWS",
  "Bash",
  "Heroku",
  "Salesforce",
  "Redis",
  "Git",
  "Twilio"
] as const;

// Location configuration
export const locationConfig = {
  default: "Berlin, Germany",
  americas: "Mexico City, Mexico"
} as const;

// Countries in the Americas for location detection
export const americasCountries = [
  // North America
  "US", "CA", "MX", "GT", "BZ", "SV", "HN", "NI", "CR", "PA",
  // Caribbean
  "CU", "JM", "HT", "DO", "PR", "TT", "BB", "BS", "AG", "DM", "GD", "KN", "LC", "VC",
  // South America
  "AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PY", "PE", "SR", "UY", "VE"
] as const;