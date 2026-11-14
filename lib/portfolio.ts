import rawPortfolioData from "@/data.json";
import type { PortfolioData, Project, SkillGroup } from "@/types/portfolio";

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isSkillGroup(value: unknown): value is SkillGroup {
  if (!value || typeof value !== "object") return false;
  const group = value as Partial<SkillGroup>;
  return typeof group.title === "string" && isStringArray(group.items);
}

function isProject(value: unknown): value is Project {
  if (!value || typeof value !== "object") return false;
  const project = value as Partial<Project>;

  return (
    typeof project.id === "number" &&
    typeof project.title === "string" &&
    typeof project.description === "string" &&
    typeof project.category === "string" &&
    isStringArray(project.tags) &&
    (project.url === undefined || typeof project.url === "string") &&
    (project.linkLabel === undefined || typeof project.linkLabel === "string") &&
    (project.private === undefined || typeof project.private === "boolean")
  );
}

function validatePortfolioData(value: unknown): PortfolioData {
  if (!value || typeof value !== "object") {
    throw new Error("Portfolio data must be an object.");
  }

  const data = value as Partial<PortfolioData>;

  if (!Array.isArray(data.skillGroups) || !data.skillGroups.every(isSkillGroup)) {
    throw new Error("Portfolio skillGroups data is invalid.");
  }

  if (!Array.isArray(data.projects) || !data.projects.every(isProject)) {
    throw new Error("Portfolio projects data is invalid.");
  }

  const projectIds = new Set(data.projects.map((project) => project.id));
  if (projectIds.size !== data.projects.length) {
    throw new Error("Portfolio project IDs must be unique.");
  }

  return data as PortfolioData;
}

export const portfolioData = validatePortfolioData(rawPortfolioData);
