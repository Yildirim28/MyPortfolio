import { technologies } from "@/data/site";

export function TechnologyStrip() {
  const renderTechnologies = (duplicate = false) => (
    <ul
      aria-hidden={duplicate || undefined}
      className="flex min-w-max items-center gap-14 pr-14 sm:gap-20 sm:pr-20"
    >
      {technologies.map((technology) => (
        <li
          key={`${duplicate ? "duplicate-" : ""}${technology}`}
          className="group flex items-center gap-3 whitespace-nowrap text-sm font-bold text-faded transition-colors hover:text-ink"
        >
          <span className="size-1 rounded-full bg-accent/70 shadow-[0_0_12px_rgba(255,122,102,0.45)] transition-transform group-hover:scale-[1.8]" />
          {technology}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      aria-label="Core technologies"
      className="relative overflow-hidden border-y border-white/7 bg-white/[0.018]"
    >
      <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-canvas to-transparent sm:w-28" />
      <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-canvas to-transparent sm:w-28" />
      <div
        role="region"
        aria-label="Animated technology list"
        tabIndex={0}
        className="group/marquee overflow-hidden rounded-sm py-7"
      >
        <div className="technology-marquee-track flex w-max group-hover/marquee:[animation-play-state:paused] group-focus/marquee:[animation-play-state:paused]">
          {renderTechnologies()}
          {renderTechnologies(true)}
        </div>
      </div>
    </aside>
  );
}
