# MD. Shamim Osman Chowdhury — Portfolio

A premium, dark-first software engineering portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS, Motion for React, and Lucide React. The portfolio presents development work across web, full-stack systems, applied AI, and Software Quality Assurance engineering.

## Live Portfolio

- **Primary:** [https://osman28.vercel.app](https://osman28.vercel.app)
- **GitHub Pages:** [https://Yildirim28.github.io/MyPortfolio/](https://Yildirim28.github.io/MyPortfolio/)

## Highlights

- Server-rendered content with isolated client-side interaction boundaries
- Typed build-time project and skill data from `data.json`
- Advanced glassmorphism, ambient lighting, and responsive dark design
- Motion-powered reveals, counters, filtering, parallax, magnetic CTAs, and card tilt
- Accessible mobile navigation with focus trapping and reduced-motion support
- Ten projects with generated SQA, Web, Fullstack, and AI/ML filters
- SEO metadata, canonical URL, JSON-LD, robots, sitemap, manifest, and favicon
- Static export for both Vercel and GitHub Pages
- Playwright browser tests and axe accessibility checks

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Motion for React
- Lucide React
- Playwright and axe-core

GSAP and React Three Fiber are intentionally not installed because the current interactions are handled efficiently by Motion and CSS.

## Project Structure

```text
app/                  App Router pages, metadata routes, and global styles
components/           Layout, sections, projects, motion, and UI primitives
data/site.ts          Identity, navigation, About, experience, and contact content
data.json             Projects and grouped technical skills
lib/                  Data validation and shared utilities
public/               Optimized-path portrait and downloadable CV
tests/                Browser, interaction, and accessibility tests
types/                Portfolio TypeScript interfaces
.github/workflows/    GitHub Pages static-export deployment
```

## Local Development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality Checks

```bash
npm run typecheck
npm run lint
npm run build
npm run test:e2e
npm run test:export
```

Install the Playwright browser once before running browser tests locally:

```bash
npx playwright install chromium
```

## Updating Content

- Edit `data.json` to update projects, categories, links, tags, and skill groups.
- Edit `data/site.ts` to update identity, biography, experience, education, statistics, and contacts.
- Replace `public/CV.pdf` while keeping the filename to update the downloadable CV.
- Replace `public/Akash.jpg` and regenerate `public/Akash.webp` to update the portrait.
- Replace `public/certificates/STQA_CERTIFICATE.jpeg` to update the certification preview.

Project data is validated during the build. Invalid project shapes or duplicate IDs fail the build instead of silently breaking the interface.

## Deployment

Vercel builds the static Next.js export from `main`. GitHub Pages uses `.github/workflows/deploy-pages.yml`, which applies the `/MyPortfolio` base path and deploys the generated `out/` directory.

## Contact

- **GitHub:** [Yildirim28](https://github.com/Yildirim28)
- **LinkedIn:** [MD. Shamim Osman Chowdhury](https://www.linkedin.com/in/md-shamim-osman-chowdhury-24b482256)
- **Email:** [shamimosmanakash330@gmail.com](mailto:shamimosmanakash330@gmail.com)
- **WhatsApp:** [Message me](https://wa.me/8801639815290)
- **Facebook:** [Profile](https://www.facebook.com/share/1KXLmrhyMU/)
- **Phone:** [+880 1639 815290](tel:+8801639815290)
