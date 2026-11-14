import { Award, GraduationCap, Maximize2, Users } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { credentials, experience } from "@/data/site";
import { assetPath } from "@/lib/utils";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="section-anchor section-space border-y border-white/6 bg-white/[0.012]"
    >
      <div className="page-container">
        <Reveal>
          <SectionHeading
            id="experience-title"
            eyebrow="Experience"
            title="Learning across software engineering disciplines."
            description="Hands-on quality engineering, formal education, and technical leadership."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <Reveal>
            <GlassPanel as="article" className="h-full p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="eyebrow before:hidden">{experience.period}</span>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/8 px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-emerald-300">
                  Professional training
                </span>
              </div>
              <h3 className="mt-6 text-3xl font-extrabold tracking-[-0.04em] text-ink">{experience.role}</h3>
              <p className="mt-2 text-sm text-muted">{experience.organization}</p>
              <ul className="mt-8 grid gap-4">
                {experience.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-7 text-muted sm:text-base">
                    <span className="mt-[0.72rem] size-1.5 shrink-0 rounded-full bg-accent" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </Reveal>

          <div className="grid gap-4">
            {credentials.map((credential, index) => {
              const Icon = index < 2 ? GraduationCap : index === 2 ? Award : Users;
              return (
                <Reveal key={`${credential.period}-${credential.title}`} delay={index * 0.06}>
                  <article className="surface-card rounded-2xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-cool/10 text-accent-cool">
                        <Icon aria-hidden="true" className="size-5" />
                      </div>
                      <div>
                        <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-accent">
                          {credential.period}
                        </p>
                        <h3 className="mt-2 font-bold leading-6 text-ink">{credential.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-muted">{credential.organization}</p>
                        {credential.certificate ? (
                          <a
                            href={assetPath(credential.certificate.image)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/certificate relative mt-4 block overflow-hidden rounded-xl border border-white/9 bg-canvas-deep"
                            aria-label="View certificate: Software Testing and Quality Assurance"
                          >
                            <span className="relative block aspect-[1.43] overflow-hidden">
                              <Image
                                src={assetPath(credential.certificate.image)}
                                alt={credential.certificate.alt}
                                fill
                                sizes="(max-width: 1024px) 90vw, 420px"
                                className="object-cover transition-transform duration-500 group-hover/certificate:scale-[1.025]"
                              />
                            </span>
                            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-canvas-deep via-canvas-deep/85 to-transparent px-3 pb-2.5 pt-8 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-ink">
                              View certificate
                              <Maximize2 aria-hidden="true" className="size-3.5 text-accent" />
                            </span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
