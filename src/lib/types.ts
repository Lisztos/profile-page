export type SectionName = "Home" | "Projects" | "Skills" | "Experience" | "Education" | "GitHub Stars";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  owner: {
    login: string;
  };
}

export type TechItem =
  | "rails"
  | "postgresql"
  | "redis"
  | "vue"
  | "angular"
  | "terraform"
  | "github"
  | "aws"
  | "gitlab"
  | "bash"
  | "heroku"
  | "salesforce"
  | "matestack";

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  description: string[];
  techStack?: TechItem[];
  icon: string;
  date: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  description: string[];
  logo: string;
  date: string;
}