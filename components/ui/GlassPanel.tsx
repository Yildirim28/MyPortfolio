import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface GlassPanelProps<T extends ElementType = "div"> {
  as?: T;
  children: ReactNode;
  className?: string;
}

export function GlassPanel<T extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: GlassPanelProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof GlassPanelProps<T>>) {
  const Component = as ?? "div";
  return (
    <Component className={cn("glass-panel rounded-[1.5rem]", className)} {...props}>
      {children}
    </Component>
  );
}
