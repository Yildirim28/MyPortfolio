"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { useHydrated } from "@/components/motion/useHydrated";

const expertise = [
  "Quality-first engineering",
  "Playwright automation",
  "Full-stack problem solving",
  "Applied AI exploration"
] as const;

export function ExpertiseTicker() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const isHydrated = useHydrated();
  const shouldReduceMotion = isHydrated && Boolean(prefersReducedMotion);

  useEffect(() => {
    if (!isHydrated || shouldReduceMotion) return;
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % expertise.length),
      2800
    );
    return () => window.clearInterval(timer);
  }, [isHydrated, shouldReduceMotion]);

  return (
    <div className="relative mt-6 max-w-md overflow-hidden rounded-2xl border border-white/9 bg-white/[0.035] px-4 py-3 backdrop-blur-md">
      <span className="sr-only">
        Expertise includes {expertise.join(", ")}.
      </span>
      <div aria-hidden="true" className="flex items-center gap-3">
        <span className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-faded">
          Now building
        </span>
        <span className="h-3 w-px bg-white/12" />
        <span className="relative h-6 flex-1 overflow-hidden text-sm font-bold text-ink">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={expertise[activeIndex]}
              className="absolute inset-0 flex items-center"
              initial={
                isHydrated && !shouldReduceMotion
                  ? { opacity: 0, y: 12, filter: "blur(5px)" }
                  : false
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(5px)" }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              {expertise[activeIndex]}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="font-mono text-[0.58rem] text-accent">
          {String(activeIndex + 1).padStart(2, "0")}/{String(expertise.length).padStart(2, "0")}
        </span>
      </div>
      <motion.span
        key={activeIndex}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent to-accent-cool"
        initial={isHydrated && !shouldReduceMotion ? { scaleX: 0 } : false}
        animate={{ scaleX: 1 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 2.75, ease: "linear" }}
      />
    </div>
  );
}
