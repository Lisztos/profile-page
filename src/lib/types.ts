export type SectionName = "Home" | "Projects" | "Skills" | "Experience";

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