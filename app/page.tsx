import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { TechnicalSkills } from "@/components/sections/TechnicalSkills";
import { TechnologyStrip } from "@/components/sections/TechnologyStrip";
import { siteConfig } from "@/data/site";
import { portfolioData } from "@/lib/portfolio";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.primaryUrl,
  image: `${siteConfig.primaryUrl}/Akash.jpg`,
  jobTitle: siteConfig.role,
  description: siteConfig.description,
  email: `mailto:${siteConfig.email}`,
  telephone: siteConfig.phoneHref,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD"
  },
  sameAs: [siteConfig.social.github, siteConfig.social.linkedin, siteConfig.social.facebook]
};

export default function HomePage() {
  return (
    <div className="page-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <TechnologyStrip />
        <About />
        <Experience />
        <Projects projects={portfolioData.projects} />
        <TechnicalSkills groups={portfolioData.skillGroups} />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </div>
  );
}
