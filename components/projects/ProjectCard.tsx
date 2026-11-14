"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { LockKeyhole, Maximize2 } from "lucide-react";
import type { KeyboardEvent, PointerEvent } from "react";

import type { Project } from "@/types/portfolio";
import { useHydrated } from "@/components/motion/useHydrated";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const isHydrated = useHydrated();
  const shouldReduceMotion = isHydrated && Boolean(prefersReducedMotion);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 170, damping: 24, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 170, damping: 24, mass: 0.5 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-2.5, 2.5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2.5, -2.5]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], [15, 85]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [15, 85]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onOpen(project);
  };

  return (
    <motion.div
      layoutId={`project-card-${project.id}`}
      layout={!shouldReduceMotion}
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
      transition={{
        layout: { type: "spring", stiffness: 280, damping: 30 },
        opacity: { duration: 0.28 },
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.045, 0.25)
      }}
      style={
        shouldReduceMotion
          ? undefined
          : { transformPerspective: 1000, rotateX, rotateY, transformStyle: "preserve-3d" }
      }
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onClick={() => onOpen(project)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      className="surface-card group relative flex min-h-[22rem] cursor-pointer flex-col overflow-hidden rounded-3xl p-6 text-left transition-[border-color,box-shadow] duration-300 hover:border-white/18 hover:shadow-[0_24px_70px_rgba(0,0,0,0.32)] focus-visible:border-accent/55"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x as number}% ${y as number}%, rgba(255,122,102,0.13), transparent 42%)`
          )
        }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-accent">
          {String(project.id).padStart(2, "0")} / {project.category}
        </span>
        <span className="size-2 rounded-full bg-accent/70 shadow-[0_0_18px_rgba(255,122,102,0.6)]" />
      </div>

      <div className="relative mt-10" style={shouldReduceMotion ? undefined : { transform: "translateZ(24px)" }}>
        <h3
          id={`project-title-${project.id}`}
          className="text-balance text-2xl font-extrabold leading-tight tracking-[-0.035em] text-ink"
        >
          {project.title}
        </h3>
        <p id={`project-description-${project.id}`} className="mt-4 text-sm leading-7 text-muted">
          {project.description}
        </p>
      </div>

      <ul className="relative mt-7 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-white/8 bg-white/[0.035] px-2.5 py-1 font-mono text-[0.58rem] font-medium uppercase tracking-[0.07em] text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-8">
        <span className="inline-flex items-center gap-2 text-sm font-extrabold text-ink transition-colors group-hover:text-accent">
          {project.private ? <LockKeyhole aria-hidden="true" className="size-4" /> : <Maximize2 aria-hidden="true" className="size-4" />}
          {project.private ? "Private project details" : "Explore project"}
        </span>
      </div>
    </motion.div>
  );
}
