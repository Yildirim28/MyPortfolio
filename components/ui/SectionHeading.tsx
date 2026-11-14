import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow mb-5", align === "center" && "justify-center before:hidden")}>{eyebrow}</p>
      <h2
        id={id}
        className="gradient-text text-balance text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl lg:text-6xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
