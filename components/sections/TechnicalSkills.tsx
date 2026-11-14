import { BrainCircuit, CodeXml, DatabaseZap, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SkillGroup } from "@/types/portfolio";

interface TechnicalSkillsProps {
  groups: SkillGroup[];
}

const icons = [CodeXml, DatabaseZap, ShieldCheck, BrainCircuit] as const;

export function TechnicalSkills({ groups }: TechnicalSkillsProps) {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-anchor section-space">
      <div className="page-container">
        <Reveal>
          <SectionHeading
            id="skills-title"
            eyebrow="Capabilities"
            title="A broad CSE toolkit with a strong SQA edge."
            description="Practical tools and methods selected around the problem—not the trend."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {groups.map((group, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Reveal key={group.title} delay={index * 0.06}>
                <article className="surface-card group h-full rounded-2xl p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white/18 hover:shadow-[0_22px_54px_rgba(0,0,0,0.3),0_0_40px_rgba(130,188,229,0.04)] sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="grid size-11 place-items-center rounded-xl border border-white/8 bg-white/[0.04] text-accent transition-transform duration-300 group-hover:rotate-3">
                      <Icon aria-hidden="true" className="size-5" />
                    </div>
                    <span className="font-mono text-[0.65rem] text-faded">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 min-h-12 text-lg font-extrabold leading-6 tracking-[-0.025em] text-ink">
                    {group.title}
                  </h3>
                  <ul className="mt-5 grid gap-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted">
                        <span className="size-1.5 shrink-0 rounded-full bg-accent/75" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
