import { BrainCircuit, Code2, ShieldCheck } from "lucide-react";

import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Reveal } from "@/components/motion/Reveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutParagraphs, services, stats } from "@/data/site";

const serviceIcons = {
  code: Code2,
  shield: ShieldCheck,
  brain: BrainCircuit
} as const;

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-anchor section-space">
      <div className="page-container">
        <Reveal>
          <SectionHeading
            id="about-title"
            eyebrow="About"
            title="I understand how software is built—and how it breaks."
            description="A broad engineering foundation with a quality-first specialty."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <div className="grid gap-4">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon];
              return (
                <Reveal key={service.title} delay={index * 0.07}>
                  <article className="surface-card group rounded-2xl p-5 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.055]">
                    <div className="flex items-start gap-4">
                      <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-accent/20 bg-accent/10 text-accent transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
                        <Icon aria-hidden="true" className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-bold tracking-[-0.02em] text-ink">{service.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted">{service.description}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.12}>
            <GlassPanel className="h-full p-6 sm:p-8 lg:p-10">
              <div className="space-y-5 text-[0.95rem] leading-7 text-muted sm:text-base sm:leading-8">
                {aboutParagraphs.map((paragraph, index) => (
                  <p key={paragraph} className={index === 0 ? "text-xl font-bold text-ink" : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-9 grid gap-3 border-t border-white/8 pt-7 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/7 bg-white/[0.025] p-4">
                    <p className="text-3xl font-extrabold tracking-[-0.04em] text-ink">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-xs leading-5 text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
