import { Reveal } from "@/components/motion/Reveal";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/types/portfolio";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="section-anchor section-space border-y border-white/6 bg-white/[0.012]"
    >
      <div className="page-container">
        <Reveal>
          <SectionHeading
            id="projects-title"
            eyebrow="Selected work"
            title="Projects across testing, web, full-stack, and applied AI."
            description="Filter the collection by discipline. Every item remains server-rendered for accessibility and SEO."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <ProjectExplorer projects={projects} />
        </Reveal>
      </div>
    </section>
  );
}
