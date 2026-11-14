export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url?: string;
  linkLabel?: string;
  private?: boolean;
}

export interface PortfolioData {
  skillGroups: SkillGroup[];
  projects: Project[];
}

export interface NavigationItem {
  label: string;
  href: `#${string}`;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface Credential {
  period: string;
  title: string;
  organization: string;
  certificate?: {
    image: string;
    alt: string;
  };
}
