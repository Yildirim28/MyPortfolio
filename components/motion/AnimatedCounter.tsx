"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
}

export function AnimatedCounter({ value, suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || shouldReduceMotion || !valueRef.current) return;

    valueRef.current.textContent = "0";
    const controls = animate(0, value, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (valueRef.current) valueRef.current.textContent = String(Math.round(latest));
      }
    });

    return () => controls.stop();
  }, [isInView, shouldReduceMotion, value]);

  return (
    <span ref={ref}>
      <span ref={valueRef}>{value}</span>
      <span className="accent-text">{suffix}</span>
    </span>
  );
}
