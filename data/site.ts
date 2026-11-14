import type { Credential, NavigationItem, Stat } from "@/types/portfolio";

export const siteConfig = {
  name: "MD. Shamim Osman Chowdhury",
  shortName: "Shamim",
  role: "Software Engineer",
  description:
    "Computer Science portfolio featuring software development, full-stack systems, AI and data interests, and highlighted Software Quality Assurance engineering work.",
  primaryUrl: "https://osman28.vercel.app",
  githubPagesUrl: "https://Yildirim28.github.io/MyPortfolio/",
  email: "shamimosmanakash330@gmail.com",
  phoneDisplay: "+880 1639 815290",
  phoneHref: "+8801639815290",
  location: "Badda, Dhaka, Bangladesh",
  social: {
    github: "https://github.com/Yildirim28",
    linkedin: "https://www.linkedin.com/in/md-shamim-osman-chowdhury-24b482256",
    whatsapp: "https://wa.me/8801639815290",
    facebook: "https://www.facebook.com/share/1KXLmrhyMU/"
  }
} as const;

export const navigation: NavigationItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contacts" }
];

export const technologies = [
  "JavaScript",
  "TypeScript",
  "React",
  "Python",
  "MySQL",
  "Playwright",
  "Git & GitHub"
] as const;

export const services = [
  {
    title: "Software Development",
    description: "Web, full-stack, database, and API experiences built around real user needs.",
    icon: "code"
  },
  {
    title: "SQA Engineering",
    description: "Manual, API, unit, and automated testing with practical defect communication.",
    icon: "shield"
  },
  {
    title: "AI & Data Exploration",
    description: "Applied machine learning, data mining, and model-driven product experiments.",
    icon: "brain"
  }
] as const;

export const aboutParagraphs = [
  "Hi, I’m MD. Shamim Osman Chowdhury.",
  "I’m a Computer Science and Engineering graduate from United International University (UIU), and Software Quality Assurance is where I do my strongest work. I believe good software isn’t just built, it’s tested, questioned, and refined. That mindset drives how I work.",
  "My QA toolkit covers manual testing, requirement analysis, API validation, Playwright automation, and clear defect reporting. I read requirements closely to catch gaps before a single line is tested, validate APIs to make sure the data behind the screen is right, automate repetitive checks with Playwright, and write bug reports that developers can act on right away.",
  "Outside QA, I explore web and full-stack development, databases, APIs, artificial intelligence, and machine learning. This background helps me understand software from both sides: how it’s built and how it breaks.",
  "I’m now looking for a Junior QA / SQA Engineer role where I can contribute to reliable products, learn from experienced teams, and keep growing."
] as const;

export const stats: Stat[] = [
  { value: 10, suffix: "+", label: "Portfolio projects across CSE areas" },
  { value: 4, suffix: "+", label: "Highlighted SQA and automation projects" },
  { value: 34, suffix: "+", label: "Unit test cases designed" }
];

export const experience = {
  period: "May 2026 — October 2026",
  role: "STQA Trainee",
  organization: "Center for Development of IT Professionals, UIU",
  highlights: [
    "Executed manual, functional, and API testing for web applications using SDLC and STLC practices in Agile workflows.",
    "Developed structured Postman API collections and practiced Playwright UI automation.",
    "Designed test cases from requirements, documented defects in Jira, and verified bug fixes."
  ]
} as const;

export const credentials: Credential[] = [
  {
    period: "Completed November 2, 2026",
    title: "B.Sc. in Computer Science & Engineering",
    organization: "United International University"
  },
  {
    period: "2020 / 2018",
    title: "HSC & SSC",
    organization:
      "Thakurgaon Govt. College and Thakurgaon Govt. Boys’ High School — GPA 5.00 / 5.00"
  },
  {
    period: "July 2026",
    title: "Software Testing & Quality Assurance",
    organization: "32-hour certificate training program offered by CDIP, UIU",
    certificate: {
      image: "/certificates/STQA_CERTIFICATE.jpeg",
      alt: "CDIP certificate of completion for the 32-hour Software Testing and Quality Assurance training program awarded to MD. Shamim Osman Chowdhury"
    }
  },
  {
    period: "Leadership",
    title: "Robotics & Science Clubs",
    organization: "Coordinated a 20-member team and helped organize technical events"
  }
];
