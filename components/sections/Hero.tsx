import { ArrowDownRight, Download, MapPin } from "lucide-react";

import { MagneticLink } from "@/components/motion/MagneticLink";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/data/site";
import { assetPath } from "@/lib/utils";

import { HeroVisual } from "./HeroVisual";
import { ExpertiseTicker } from "./ExpertiseTicker";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="section-anchor relative flex min-h-[min(940px,100svh)] items-center overflow-hidden pt-28 sm:pt-32"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <div className="page-container grid items-center gap-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24">
        <div className="relative z-10 max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-7">Hello, I’m Shamim</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              id="hero-title"
              className="hero-title-shimmer gradient-text text-balance text-[clamp(3.4rem,8.2vw,7.4rem)] font-bold leading-[0.96] tracking-[-0.055em]"
            >
              Software
              <span className="block">Engineer<span className="accent-text">.</span></span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-balance text-base leading-8 text-muted sm:text-lg">
              I build software across web, full-stack, AI and data—then apply an SQA mindset to make
              every experience more reliable.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ExpertiseTicker />
          </Reveal>

          <Reveal delay={0.24} className="mt-5 flex flex-wrap gap-2">
            {[
              "SQA Engineering",
              "Software Development",
              "AI & Data"
            ].map((focus, index) => (
              <span
                key={focus}
                className={`rounded-full border px-3 py-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] ${
                  index === 0
                    ? "border-accent/35 bg-accent/10 text-accent"
                    : "border-white/10 bg-white/[0.035] text-muted"
                }`}
              >
                {focus}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.32} className="mt-9 flex flex-wrap gap-3">
            <MagneticLink
              href="#projects"
              className="cta-shine group relative inline-flex min-h-12 items-center gap-2 overflow-hidden rounded-xl bg-accent px-5 py-3 text-sm font-extrabold text-canvas-deep shadow-[0_14px_34px_rgba(255,122,102,0.24)] transition-[background-color,box-shadow] hover:bg-[#ff8c79] hover:shadow-[0_18px_46px_rgba(255,122,102,0.3)]"
            >
              View projects
              <ArrowDownRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </MagneticLink>
            <MagneticLink
              href={assetPath("/CV.pdf")}
              download
              className="cta-shine group relative inline-flex min-h-12 items-center gap-2 overflow-hidden rounded-xl border border-white/13 bg-white/[0.045] px-5 py-3 text-sm font-bold text-ink backdrop-blur-md transition-[background-color,border-color] hover:border-white/25 hover:bg-white/[0.08]"
            >
              Download CV
              <Download aria-hidden="true" className="size-4 transition-transform group-hover:translate-y-0.5" />
            </MagneticLink>
          </Reveal>

          <Reveal delay={0.4} className="mt-8 flex items-center gap-2 text-sm text-muted">
            <MapPin aria-hidden="true" className="size-4 text-accent" />
            {siteConfig.location}
          </Reveal>
        </div>

        <Reveal delay={0.2} distance={18} className="lg:-mr-8">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
