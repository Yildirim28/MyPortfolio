"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { useHydrated } from "./useHydrated";

interface MagneticLinkProps extends Omit<HTMLMotionProps<"a">, "children"> {
  children: ReactNode;
  strength?: number;
}

export function MagneticLink({
  children,
  className,
  strength = 0.18,
  onPointerMove,
  onPointerLeave,
  ...props
}: MagneticLinkProps) {
  const prefersReducedMotion = useReducedMotion();
  const isHydrated = useHydrated();
  const shouldReduceMotion = isHydrated && Boolean(prefersReducedMotion);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    onPointerMove?.(event);
    if (shouldReduceMotion || event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLAnchorElement>) => {
    onPointerLeave?.(event);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      className={cn(className)}
      style={shouldReduceMotion ? undefined : { x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
