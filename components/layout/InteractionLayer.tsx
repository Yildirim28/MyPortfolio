"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect } from "react";

import { useHydrated } from "@/components/motion/useHydrated";

export function InteractionLayer() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.35 });
  const pointerX = useMotionValue(-600);
  const pointerY = useMotionValue(-600);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.7 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.7 });
  const prefersReducedMotion = useReducedMotion();
  const isHydrated = useHydrated();
  const shouldReduceMotion = isHydrated && Boolean(prefersReducedMotion);

  useEffect(() => {
    if (shouldReduceMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const trackPointer = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    window.addEventListener("pointermove", trackPointer, { passive: true });
    return () => window.removeEventListener("pointermove", trackPointer);
  }, [pointerX, pointerY, shouldReduceMotion]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-accent via-[#ffab91] to-accent-cool shadow-[0_0_18px_rgba(255,122,102,0.55)]"
        style={{ scaleX: shouldReduceMotion ? 0 : progress }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 hidden size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(130,188,229,0.09),rgba(255,122,102,0.045)_38%,transparent_70%)] blur-2xl lg:block"
        style={{ x: smoothX, y: smoothY, opacity: shouldReduceMotion ? 0 : 1 }}
      />
    </>
  );
}
