import { SectionName } from "./types";

export const links = [
  {
    name: "Home" as SectionName,
    hash: "#home",
  },
  {
    name: "Projects" as SectionName,
    hash: "#projects",
  },
  {
    name: "Skills" as SectionName,
    hash: "#skills",
  },
  {
    name: "Experience" as SectionName,
    hash: "#experience",
  },
] as const;

export const experienceData = [
  {
    title: "Senior Software Engineer | Project Manager",
    company: "Innovandio GmbH",
    location: "Berlin, Germany",
    description:
      "Leading development teams and managing projects in a fast-paced startup environment. Applying Ruby on Rails expertise and full stack development skills to deliver high-quality software solutions.",
    icon: "briefcase",
    date: "October 2023 - Present",
  },
  {
    title: "Full Stack Software Engineer | Team Lead",
    company: "Demodesk",
    location: "Berlin, Germany",
    description:
      "Led a team of engineers launching features and maintaining platform stability. Managed daily stand-ups and cross-department coordination. Co-developed a product idea assessment process and reported progress directly to the CEO.",
    icon: "briefcase",
    date: "November 2022 - September 2023",
  },
  {
    title: "Software Engineer Intern",
    company: "Demodesk",
    location: "Munich, Germany",
    description:
      "Contributed to platform development and learned professional software engineering practices in a collaborative environment.",
    icon: "briefcase",
    date: "February 2022 - November 2022",
  },
  {
    title: "Working Student – Full Stack Developer",
    company: "Setting.io",
    location: "Berlin, Germany",
    description:
      "Acted as technical support to the CTO. Optimized Office-Search load time by 45%. Designed a self-service onboarding system, developed a digital handover tool, and led company website relaunch.",
    icon: "briefcase",
    date: "October 2020 - February 2022",
  },
  {
    title: "Working Student – Software Engineer",
    company: "Almondia GmbH",
    location: "Berlin, Germany",
    description:
      "Worked with Salesforce, Ruby on Rails, AWS, Docker, Elasticsearch & PostgreSQL to support the company's technical infrastructure and development needs.",
    icon: "briefcase",
    date: "February 2020 - October 2020",
  },
  {
    title: "Bachelor of Science – Wirtschaftsinformatik",
    company: "Technische Universität Berlin",
    location: "Berlin, Germany",
    description:
      "Studied Business Informatics, combining computer science with business administration knowledge. Gained a solid foundation in software development, databases, and IT management.",
    icon: "graduation",
    date: "2018 - 2022",
  },
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
  "Back-End Development",
  "Microsoft Power BI",
  "Heroku",
  "AWS",
  "Docker",
  "PostgreSQL",
  "Elasticsearch",
  "JavaScript",
  "HTML/CSS",
  "Git",
  "Salesforce",
  "Project Management",
  "Team Leadership",
  "RESTful APIs",
  "CI/CD",
  "Agile Methodologies",
  "Problem Solving",
] as const; 