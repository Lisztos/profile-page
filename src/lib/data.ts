import { SectionName } from "./types";

export const links = [
  {
    name: "Home" as SectionName,
    hash: "#home",
  },
  {
    name: "About" as SectionName,
    hash: "#about",
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
  {
    name: "Contact" as SectionName,
    hash: "#contact",
  },
] as const;

export const experienceData = [
  {
    title: "Senior Software Engineer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    description:
      "Led a team of 5 developers in building a scalable e-commerce platform. Implemented microservices architecture using Node.js and React, improving system performance by 40%. Mentored junior developers and established code review practices.",
    icon: "briefcase",
    date: "2020 - Present",
  },
  {
    title: "Software Developer",
    company: "Digital Solutions Co.",
    location: "Boston, MA",
    description:
      "Developed and maintained web applications using React.js, Next.js, and Node.js. Collaborated with design and product teams to implement user-centric features. Reduced page load time by 35% through optimization techniques.",
    icon: "briefcase",
    date: "2017 - 2020",
  },
  {
    title: "Frontend Developer",
    company: "Creative Web Agency",
    location: "Chicago, IL",
    description:
      "Created responsive web interfaces for various clients using HTML, CSS, and JavaScript. Implemented pixel-perfect designs and ensured cross-browser compatibility. Worked closely with UX designers to enhance user experiences.",
    icon: "briefcase",
    date: "2015 - 2017",
  },
  {
    title: "Computer Science Degree",
    company: "University of Technology",
    location: "Cambridge, MA",
    description:
      "Bachelor of Science in Computer Science with a focus on web technologies and software engineering. Participated in various hackathons and coding competitions.",
    icon: "graduation",
    date: "2011 - 2015",
  },
] as const;

export const projectsData = [
  {
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, user authentication, and payment processing. Built with Next.js, React, Node.js, and MongoDB.",
    tags: ["React", "Next.js", "Node.js", "MongoDB", "Stripe"],
    imageUrl: "/images/projects/project1.png",
  },
  {
    title: "Task Management App",
    description:
      "A productivity tool for teams to manage tasks, track progress, and collaborate on projects. Features include drag-and-drop interfaces, real-time updates, and performance analytics.",
    tags: ["React", "TypeScript", "Firebase", "Tailwind CSS", "Redux"],
    imageUrl: "/images/projects/project2.png",
  },
  {
    title: "Finance Dashboard",
    description:
      "An interactive dashboard for financial data visualization with customizable charts, filters, and report generation. Real-time data processing with optimized performance.",
    tags: ["React", "D3.js", "Node.js", "Express", "PostgreSQL"],
    imageUrl: "/images/projects/project1.png",
  },
  {
    title: "Social Media Platform",
    description:
      "A social networking application with features like user profiles, posts, comments, friend requests, and real-time messaging. Built with a focus on performance and scalability.",
    tags: ["Next.js", "React", "Socket.io", "MongoDB", "Redis"],
    imageUrl: "/images/projects/project2.png",
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "MongoDB",
  "Redux",
  "GraphQL",
  "Apollo",
  "Express",
  "PostgreSQL",
  "Python",
  "Django",
  "Framer Motion",
] as const; 