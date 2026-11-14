# Portfolio Architecture and Maintenance

## Architecture

The portfolio uses Next.js App Router with a server-first component model. Identity, About, experience, initial project data, skills, contact information, metadata, and structured data render at build time. Client components are limited to interactions that require browser state.

### Server Components

- `app/page.tsx`
- Hero, technology strip, About, experience, projects shell, technical skills, contact, and footer
- Typed project and skill data loading
- Metadata and JSON-LD

### Client Components

- `Header.tsx`: active navigation and accessible mobile drawer
- `Reveal.tsx`: viewport-triggered section entrances
- `AnimatedCounter.tsx`: statistics animation
- `MagneticLink.tsx`: restrained pointer response for primary CTAs
- `HeroVisual.tsx`: subtle desktop parallax and floating glass labels
- `ProjectExplorer.tsx`: filters and animated layout changes
- `ProjectCard.tsx`: pointer-aware tilt and interactive lighting

No route or section becomes a Client Component solely for styling.

## Content Sources

### `data.json`

Preserves the original root structure:

```ts
interface PortfolioData {
  skillGroups: SkillGroup[];
  projects: Project[];
}
```

`lib/portfolio.ts` validates project shapes, optional URLs, skill arrays, and unique project IDs during the build.

### `data/site.ts`

Contains identity, navigation, technology strip, services, About copy, statistics, experience, education, certification, leadership, and contact information.

## Design System

The design tokens live in `app/globals.css` and are exposed to Tailwind through `@theme inline`.

Primary tokens include:

```css
--canvas: #080e16;
--surface: rgba(18, 29, 42, 0.64);
--ink: #f6f8fb;
--muted: #a4afbc;
--accent: #ff7a66;
--accent-cool: #82bce5;
--page-width: 1180px;
```

Backdrop filters are limited to navigation and key glass panels. Project and skill cards use opaque translucent surfaces to reduce GPU cost.

## Motion System

Motion for React controls reveals, filtering, spring navigation indicators, magnetic links, counters, hero parallax, and project-card tilt. Motion is restricted to transform and opacity where possible.

Every motion component uses `useReducedMotion`, and global CSS handles the `prefers-reduced-motion` media query.

GSAP is not required for the current interaction model.

## Accessibility

- Semantic landmarks and heading hierarchy
- Skip link and visible focus indicators
- Mobile drawer focus trap, Escape handling, and focus restoration
- `aria-current` for active navigation
- `aria-pressed` for project filters
- Minimum 44px interactive filter targets
- Reduced-motion behavior
- Descriptive portrait alt text
- Safe external link relationships
- Automated axe checks in `tests/portfolio.spec.ts`

## Assets

- `public/Akash.webp`: optimized hero portrait rendered through `next/image`
- `public/Akash.jpg`: social metadata fallback image
- `public/CV.pdf`: stable downloadable CV path
- `public/certificates/STQA_CERTIFICATE.jpeg`: full-size STQA training certificate and responsive preview
- `app/icon.svg`: generated application icon

Next.js generates responsive image markup. Static export uses unoptimized image URLs because GitHub Pages does not provide the Next.js image optimization service.

## SEO

- Canonical Vercel URL
- Open Graph and Twitter metadata
- Person JSON-LD
- `robots.txt`
- `sitemap.xml`
- Web application manifest
- Static server-rendered projects and skills

## Deployment

### Vercel

Vercel uses the root project and deploys the static export without a base path.

### GitHub Pages

`.github/workflows/deploy-pages.yml` runs typecheck, lint, and build before deploying `out/`. During GitHub Actions builds, `next.config.ts` applies `/MyPortfolio` as `basePath` and `assetPrefix`. `NEXT_PUBLIC_BASE_PATH` keeps public assets and CV links correct.

GitHub repository Pages settings must use **GitHub Actions** as the deployment source.

## Maintenance Commands

```bash
npm run typecheck
npm run lint
npm run build
npm run test:e2e
npm run test:export
```

`test:e2e` runs against the development server. `test:export` serves the generated `out/` directory and verifies the exact production artifacts, including GitHub Pages base paths. Run these checks before every deployment. Production dependencies should remain audit-clean, and new animation libraries should only be added when Motion cannot support a required interaction.
