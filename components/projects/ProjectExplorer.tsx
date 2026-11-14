"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useCallback, useDeferredValue, useMemo, useState, useTransition } from "react";

import { cn } from "@/lib/utils";
import type { Project } from "@/types/portfolio";
import { useHydrated } from "@/components/motion/useHydrated";

import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

interface ProjectExplorerProps {
  projects: Project[];
}

export function ProjectExplorer({ projects }: ProjectExplorerProps) {
  const categories = useMemo(() => ["All", ...new Set(projects.map((project) => project.category))], [projects]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPending, startTransition] = useTransition();
  const deferredCategory = useDeferredValue(activeCategory);
  const prefersReducedMotion = useReducedMotion();
  const isHydrated = useHydrated();
  const shouldReduceMotion = isHydrated && Boolean(prefersReducedMotion);
  const closeProject = useCallback(() => setSelectedProject(null), []);
  const visibleProjects = useMemo(
    () =>
      deferredCategory === "All"
        ? projects
        : projects.filter((project) => project.category === deferredCategory),
    [deferredCategory, projects]
  );

  const selectCategory = (category: string) => {
    startTransition(() => setActiveCategory(category));
  };

  return (
    <LayoutGroup id="project-explorer">
      <div className="mt-12">
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const count =
            category === "All" ? projects.length : projects.filter((project) => project.category === category).length;
          const selected = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => selectCategory(category)}
              className={cn(
                "relative min-h-11 overflow-hidden rounded-full border px-4 py-2 text-sm font-bold backdrop-blur-md transition-colors",
                selected
                  ? "border-accent/40 text-canvas-deep"
                  : "border-white/10 bg-white/[0.025] text-muted hover:border-white/20 hover:text-ink"
              )}
            >
              {selected ? (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-accent"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 360, damping: 30 }
                  }
                />
              ) : null}
              {category} <span className={selected ? "text-canvas-deep" : "text-faded"}>({count})</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visibleProjects.length} projects shown in {deferredCategory} category.
      </p>

        <motion.div
          layout={!shouldReduceMotion}
          aria-busy={isPending}
          className={cn(
            "mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3",
            isPending && !shouldReduceMotion && "opacity-75"
          )}
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onOpen={setSelectedProject} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <ProjectModal project={selectedProject} onClose={closeProject} />
    </LayoutGroup>
  );
}
