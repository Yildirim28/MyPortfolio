import { BriefcaseBusiness, Code2, Mail, MapPin, MessageCircle, Phone, Users } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";

const contacts = [
  { label: "GitHub", value: "@Yildirim28", href: siteConfig.social.github, icon: Code2 },
  {
    label: "LinkedIn",
    value: "Md. Shamim Osman",
    href: siteConfig.social.linkedin,
    icon: BriefcaseBusiness
  },
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail },
  { label: "WhatsApp", value: siteConfig.phoneDisplay, href: siteConfig.social.whatsapp, icon: MessageCircle },
  { label: "Facebook", value: "Md. Shamim Osman", href: siteConfig.social.facebook, icon: Users },
  { label: "Phone", value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phoneHref}`, icon: Phone }
] as const;

export function Contact() {
  return (
    <section id="contacts" aria-labelledby="contact-title" className="section-anchor pb-6 pt-12 sm:pb-8 sm:pt-16">
      <div className="page-container">
        <Reveal>
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-9 lg:p-12">
            <div className="absolute -right-28 -top-32 size-[28rem] rounded-full border border-accent/12 bg-accent/5 blur-[1px]" />
            <div className="absolute -bottom-48 left-[25%] size-80 rounded-full bg-accent-cool/8 blur-3xl" />

            <div className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <SectionHeading
                  id="contact-title"
                  eyebrow="Let’s connect"
                  title="Let’s build useful, reliable software."
                />
                <p className="mt-6 flex items-center gap-2 text-sm text-muted">
                  <MapPin aria-hidden="true" className="size-4 text-accent" />
                  {siteConfig.location}
                </p>
              </div>

              <nav aria-label="Contact and social links" className="grid gap-3 sm:grid-cols-2">
                {contacts.map((contact) => {
                  const Icon = contact.icon;
                  const external = contact.href.startsWith("http");
                  return (
                    <a
                      key={contact.label}
                      href={contact.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/9 bg-white/[0.04] p-3.5 backdrop-blur-lg transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-accent/[0.08] hover:shadow-[0_16px_42px_rgba(0,0,0,0.24)]"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted">
                          {contact.label}
                        </span>
                        <span className="mt-1 block truncate text-xs font-bold text-ink">{contact.value}</span>
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
