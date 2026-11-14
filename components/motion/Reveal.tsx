"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useSyncExternalStore, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

export function Reveal({ children, className, delay = 0, distance = 28 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15, margin: "0px 0px -60px" });
  const shouldReduceMotion = useReducedMotion();
  const isHydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );
  const animate =
    !isHydrated || shouldReduceMotion
      ? undefined
      : isInView
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: distance };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={false}
      animate={animate}
      transition={{
        delay: shouldReduceMotion ? 0 : delay,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
