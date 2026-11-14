"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import Image from "next/image";
import type { PointerEvent } from "react";

import { assetPath } from "@/lib/utils";
import { useHydrated } from "@/components/motion/useHydrated";

export function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const isHydrated = useHydrated();
  const shouldReduceMotion = isHydrated && Boolean(prefersReducedMotion);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.8 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 16);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 16);
  };

  const resetPosition = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="relative mx-auto aspect-[0.88] w-full max-w-[34rem]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
    >
      <div className="absolute inset-[5%] rounded-full bg-[radial-gradient(circle,rgba(255,122,102,0.28),rgba(255,122,102,0.08)_45%,transparent_72%)] blur-2xl" />
      <motion.div
        className="absolute inset-[9%] rounded-full border border-white/12 bg-white/[0.025]"
        animate={shouldReduceMotion ? undefined : { rotate: [0, 6, 0], scale: [1, 1.025, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-[14%] overflow-hidden rounded-full border-[0.75rem] border-accent/90 bg-canvas-deep shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_25px_80px_rgba(0,0,0,0.42),0_0_70px_rgba(255,122,102,0.16)]"
        style={shouldReduceMotion ? undefined : { x: springX, y: springY }}
      >
        <Image
          src={assetPath("/Akash.webp")}
          alt="MD. Shamim Osman Chowdhury at United International University"
          fill
          priority
          sizes="(max-width: 768px) 78vw, 470px"
          className="object-cover object-[center_48%] transition-transform duration-700 hover:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas-deep/35 via-transparent to-white/[0.04]" />
      </motion.div>

      <motion.div
        className="glass-panel absolute bottom-0 left-0 z-10 w-fit min-w-[12rem] max-w-[calc(100%_-_1rem)] rounded-2xl px-4 py-3"
        animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">Primary focus</p>
        <p className="mt-1 text-sm font-bold text-ink">SQA Engineering</p>
      </motion.div>

      <motion.div
        className="glass-panel absolute right-0 top-0 z-10 w-fit max-w-[calc(100%_-_1rem)] rounded-2xl px-4 py-3"
        animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-semibold text-ink">Open to opportunities</span>
        </div>
      </motion.div>
    </div>
  );
}
