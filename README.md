# MD. Shamim Osman Chowdhury — Software Engineering Portfolio

[![Deploy Next.js portfolio](https://github.com/Yildirim28/MyPortfolio/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/Yildirim28/MyPortfolio/actions/workflows/deploy-pages.yml)

A premium, dark-first portfolio presenting software development, full-stack systems, applied AI, and Software Quality Assurance engineering. The interface combines server-rendered content with focused React interaction boundaries, glossy glassmorphism, accessible motion, and responsive layouts.

## Live Portfolio

**Production:** [https://Yildirim28.github.io/MyPortfolio/](https://Yildirim28.github.io/MyPortfolio/)

The previous Vercel alias is currently inactive. GitHub Pages is the verified production deployment.

## Experience Highlights

- Advanced frosted-glass navigation, panels, grids, and cards
- Animated Hero expertise ticker with IBM Plex Sans display typography
- Scroll progress, desktop pointer spotlight, ambient lighting, and gradient mesh effects
- Continuous technology marquee with hover, keyboard, and reduced-motion controls
- Magnetic calls to action and pointer-responsive portrait parallax
- Typed project filters for SQA, Web, Fullstack, and AI/ML work
- Click-to-expand project cards with shared-layout glass dialogs
- Keyboard activation, focus trapping, Escape handling, and focus restoration
- Responsive STQA certificate preview with a full-size accessible link
- Optimized WebP portrait and stable downloadable CV path
- Static SEO content with JSON-LD, sitemap, robots, manifest, and canonical metadata
- GitHub Pages base-path export with automated browser and accessibility checks

## Technology Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js App Router |
| UI | React and TypeScript |
| Styling | Tailwind CSS and global design tokens |
| Motion | Motion for React and optimized CSS animation |
| Icons | Lucide React |
| Data | Typed build-time JSON import |
| Testing | Playwright and axe-core |
| Deployment | Next.js static export and GitHub Pages |

GSAP and React Three Fiber are intentionally excluded because Motion and CSS cover the current interactions with less runtime cost.

## Architecture

```text
app/                  App Router page, metadata routes, icon, and global design system
components/layout/    Header, footer, ambient lighting, pointer and scroll layers
components/motion/    Reveal, counter, magnetic-link, and hydration utilities
components/projects/  Filters, glossy cards, and animated detail dialog
components/sections/  Hero, About, experience, projects, skills, and contact
components/ui/        Reusable glass panel and section-heading primitives
data/site.ts          Identity, biography, experience, education, and contacts
data.json             Projects and grouped technical skills
lib/                  Data validation and deployment-safe path utilities
public/               Portrait, CV, and certificate assets
scripts/              Static export server and export verification
tests/                Interaction, responsive, and accessibility tests
types/                Portfolio TypeScript interfaces
```

## Server and Client Boundaries

Core content renders as Server Components for fast delivery and SEO. Client Components are restricted to features requiring browser state:

- Active navigation and mobile drawer
- Scroll progress and pointer spotlight
- Viewport reveals and animated counters
- Hero parallax, expertise rotation, and magnetic buttons
- Project filtering, card tilt, and expandable dialogs

## Local Development

Node.js 22 or newer is recommended.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Commands

```bash
npm run dev             # Next.js development server
npm run typecheck       # TypeScript validation
npm run lint            # ESLint validation
npm run build           # Static production export
npm run verify:export   # Exported files and asset-path verification
npm run test:e2e        # Playwright tests against next dev
npm run test:export     # Playwright and axe tests against out/
```

Install Chromium once before local browser testing:

```bash
npx playwright install chromium
```

## Updating Portfolio Content

### Projects and Skills

Edit `data.json`. Filter buttons are generated from project categories, and the build fails on malformed data or duplicate project IDs.

```json
{
  "id": 11,
  "title": "Project name",
  "description": "Project summary",
  "category": "Web",
  "tags": ["Next.js", "TypeScript"],
  "url": "https://example.com",
  "linkLabel": "View project"
}
```

### Profile and Experience

Edit `data/site.ts` to update identity, biography, navigation, statistics, experience, education, services, and contact information.

### Assets

- Replace `public/CV.pdf` to update the downloadable CV.
- Replace `public/Akash.jpg` and regenerate `public/Akash.webp` to update the portrait.
- Replace `public/certificates/STQA_CERTIFICATE.jpeg` to update the certificate preview.

## Deployment

`.github/workflows/deploy-pages.yml` performs the complete deployment pipeline:

1. Install locked dependencies with `npm ci`.
2. Run typecheck and ESLint.
3. Build the `/MyPortfolio` static export.
4. Verify generated files and prefixed URLs.
5. Install Playwright Chromium.
6. Run interaction and axe tests against the exported site.
7. Upload and deploy the verified `out/` artifact.

The workflow requires GitHub Pages to use **GitHub Actions** as its deployment source.

## Accessibility and Performance

- Semantic landmarks and heading hierarchy
- Skip link and visible keyboard focus
- Focus-trapped mobile navigation and project dialogs
- Reduced-motion support in CSS and Motion components
- Keyboard-operable project cards and filters
- Accessible names, descriptions, and live filter status
- Optimized transform/opacity motion where possible
- Mobile-specific blur reduction
- Server-visible content before hydration

## Contact

- **GitHub:** [Yildirim28](https://github.com/Yildirim28)
- **LinkedIn:** [MD. Shamim Osman Chowdhury](https://www.linkedin.com/in/md-shamim-osman-chowdhury-24b482256)
- **Email:** [shamimosmanakash330@gmail.com](mailto:shamimosmanakash330@gmail.com)
- **WhatsApp:** [Message me](https://wa.me/8801639815290)
- **Facebook:** [Profile](https://www.facebook.com/share/1KXLmrhyMU/)
- **Phone:** [+880 1639 815290](tel:+8801639815290)
