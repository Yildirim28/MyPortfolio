"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, LockKeyhole, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useHydrated } from "@/components/motion/useHydrated";
import { isSafeExternalUrl } from "@/lib/utils";
import type { Project } from "@/types/portfolio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isHydrated = useHydrated();
  const shouldReduceMotion = isHydrated && Boolean(prefersReducedMotion);

  useEffect(() => {
    if (!project) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [
        ...dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ];
      const first = focusable[0];
      const last = focusable.at(-1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [onClose, project]);

  if (!isHydrated) return null;

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-canvas-deep/82 p-4 backdrop-blur-xl sm:p-8"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.24 }}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            layoutId={`project-card-${project.id}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            aria-describedby="project-dialog-description"
            className="glass-panel relative w-full max-w-3xl overflow-hidden rounded-[2rem] p-6 sm:p-9"
            transition={
              shouldReduceMotion
                ? { duration: 0.01 }
                : { type: "spring", stiffness: 250, damping: 28, mass: 0.8 }
            }
          >
            <div className="absolute -right-28 -top-28 size-80 rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute -bottom-32 left-16 size-72 rounded-full bg-accent-cool/8 blur-3xl" />

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-xl border border-white/10 bg-canvas-deep/70 text-muted backdrop-blur-md transition-colors hover:border-white/20 hover:text-ink"
            >
              <X aria-hidden="true" className="size-5" />
            </button>

            <div className="relative pr-12">
              <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent">
                {String(project.id).padStart(2, "0")} / {project.category}
              </p>
              <h2
                id="project-dialog-title"
                className="gradient-text mt-5 text-balance text-3xl font-extrabold leading-tight tracking-[-0.045em] sm:text-5xl"
              >
                {project.title}
              </h2>
              <p id="project-dialog-description" className="mt-6 max-w-2xl text-base leading-8 text-muted">
                {project.description}
              </p>
            </div>

            <div className="relative mt-8 border-t border-white/9 pt-6">
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-faded">
                Technology stack
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-semibold text-muted backdrop-blur-md"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-9 flex flex-wrap items-center justify-between gap-4">
              {!project.private && isSafeExternalUrl(project.url) ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-shine inline-flex min-h-12 items-center gap-2 overflow-hidden rounded-xl bg-accent px-5 py-3 text-sm font-extrabold text-canvas-deep"
                >
                  {project.linkLabel ?? "View project"}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted">
                  {project.private ? <LockKeyhole aria-hidden="true" className="size-4" /> : null}
                  {project.private ? "Private repository" : "Case study available on request"}
                </span>
              )}
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-faded">
                Press Esc to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
