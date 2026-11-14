# Portfolio Architecture and Maintenance Guide

## 1. System Overview

The portfolio is a statically exported Next.js App Router application. It uses a server-first architecture for content and SEO, with isolated React client boundaries for motion and interaction.

The production site is deployed to:

```text
https://Yildirim28.github.io/MyPortfolio/
```

GitHub Pages serves the generated `out/` directory under `/MyPortfolio`.

## 2. Application Layers

### App Router

| File | Responsibility |
| --- | --- |
| `app/layout.tsx` | Fonts, metadata, viewport, ambient and interaction layers |
| `app/page.tsx` | Page composition and Person JSON-LD |
| `app/globals.css` | Tailwind import, tokens, glass surfaces, animation, responsive rules |
| `app/robots.ts` | Search crawler policy |
| `app/sitemap.ts` | Static sitemap |
| `app/manifest.ts` | Web application manifest |
| `app/icon.svg` | Application icon |

### Server Components

- `Hero.tsx`
- `TechnologyStrip.tsx`
- `About.tsx`
- `Experience.tsx`
- `Projects.tsx`
- `TechnicalSkills.tsx`
- `Contact.tsx`
- `Footer.tsx`
- `GlassPanel.tsx`
- `SectionHeading.tsx`

These components render meaningful HTML before hydration.

### Client Components

| Component | Browser responsibility |
| --- | --- |
| `Header.tsx` | Active navigation, mobile drawer, focus trap, resize cleanup |
| `InteractionLayer.tsx` | Scroll progress and desktop pointer spotlight |
| `Reveal.tsx` | Hydration-safe viewport reveals |
| `AnimatedCounter.tsx` | Viewport-triggered statistics |
| `MagneticLink.tsx` | Pointer-responsive primary links |
| `HeroVisual.tsx` | Portrait parallax and floating status panels |
| `ExpertiseTicker.tsx` | Rotating expertise presentation |
| `ProjectExplorer.tsx` | Category filters and selected project state |
| `ProjectCard.tsx` | Keyboard opening, tilt, glow, and shared-layout origin |
| `ProjectModal.tsx` | Expand animation, dialog focus trap, Escape and overlay close |

`useHydrated.ts` prevents server/client animation-preference mismatches.

## 3. Data Model

### `data.json`

```ts
interface PortfolioData {
  skillGroups: SkillGroup[];
  projects: Project[];
}

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url?: string;
  linkLabel?: string;
  private?: boolean;
}
```

`lib/portfolio.ts` validates every project, skill group, optional link, and unique project ID during the build.

### `data/site.ts`

Contains:

- Identity and deployment URLs
- Navigation
- Technology marquee items
- Services and About copy
- Statistics
- Training experience
- Education, certification, and leadership credentials
- Certificate image metadata
- Contact and social links

## 4. Design System

Tokens are defined in `app/globals.css` and exposed to Tailwind through `@theme inline`.

```css
--canvas: #080e16;
--canvas-deep: #050a10;
--surface: rgba(18, 29, 42, 0.64);
--surface-raised: rgba(28, 43, 59, 0.78);
--ink: #f6f8fb;
--muted: #a4afbc;
--accent: #ff7a66;
--accent-cool: #82bce5;
--page-width: 1180px;
```

### Typography

- Manrope: body, navigation, and UI text
- IBM Plex Sans: Hero display heading with a clear double-storey lowercase “g”
- JetBrains Mono: labels, counters, categories, and metadata

### Glass Surfaces

- `.glass-panel`: stronger frosted panel for major sections and dialogs
- `.surface-card`: glossy card with layered highlights, blur, saturation, and depth
- Mobile breakpoints reduce blur strength to protect rendering performance
- Contact cards, filters, header, and CTAs use lighter localized blur

## 5. Motion and Interaction

Motion for React is the primary animation library. GSAP is not installed.

Implemented systems:

- Scroll progress indicator
- Pointer-following ambient spotlight on fine-pointer devices
- Slowly moving background lights
- Hero title gradient sweep
- Rotating expertise ticker
- Continuous technology marquee
- Viewport reveal transitions
- Animated statistics
- Magnetic CTA response
- Portrait parallax and floating status panels
- Spring navigation indicator
- Project filtering and layout transitions
- Pointer-aware card tilt and glow
- Shared-layout project expansion dialogs
- CTA specular light sweep

Every preference-dependent Motion component waits for hydration before applying reduced-motion behavior. Global CSS also handles `prefers-reduced-motion`.

## 6. Project Dialog Behavior

Project cards are keyboard-operable `role="button"` elements.

- Enter, Space, or click opens the detail dialog.
- Focus moves to the close button.
- Tab and Shift+Tab remain inside the dialog.
- Escape closes the dialog.
- Clicking the backdrop closes the dialog.
- Focus returns to the originating card.
- External project links remain inside the dialog.
- Reduced-motion users receive immediate transitions without spring layout animation.

## 7. Assets

| Asset | Usage |
| --- | --- |
| `public/Akash.webp` | Optimized Hero portrait |
| `public/Akash.jpg` | Social metadata fallback |
| `public/CV.pdf` | Stable CV download path |
| `public/certificates/STQA_CERTIFICATE.jpeg` | Certificate preview and full-size view |
| `app/icon.svg` | Application icon |

`images.unoptimized` remains enabled because GitHub Pages does not provide the Next.js image optimization service. Source images are optimized before commit.

## 8. Accessibility

- Server-visible content before hydration
- Skip link and semantic page landmarks
- Ordered heading hierarchy
- Visible focus indicators
- Focus-trapped mobile navigation
- Focus-trapped project dialogs
- Escape and focus restoration behavior
- `aria-current` navigation state
- `aria-pressed` project filters
- Live project count updates
- Keyboard-operable scroll and card regions
- Reduced-motion behavior
- Descriptive image alternatives
- Safe external-link relationships
- Automated axe testing on desktop and mobile exports

## 9. SEO

- Metadata API title and description
- Canonical URL configuration in `data/site.ts`
- Open Graph and Twitter metadata
- Person JSON-LD
- `robots.txt`
- `sitemap.xml`
- Web application manifest
- Static server-rendered project and skill content

The Vercel alias is currently inactive. GitHub Pages is the verified production deployment. Update `siteConfig.primaryUrl` when a permanent custom or Vercel domain is active.

## 10. Static Export and Base Paths

`next.config.ts` enables:

```ts
output: "export";
trailingSlash: true;
images: { unoptimized: true };
```

During GitHub Actions builds:

```text
basePath=/MyPortfolio
assetPrefix=/MyPortfolio
NEXT_PUBLIC_BASE_PATH=/MyPortfolio
```

Use `assetPath()` from `lib/utils.ts` for files under `public/` that appear in component props or links.

## 11. Deployment Workflow

`.github/workflows/deploy-pages.yml` performs:

1. Repository checkout
2. Node.js setup and npm cache restoration
3. `npm ci`
4. TypeScript validation
5. ESLint validation
6. Static export build
7. Base-path and asset verification
8. Playwright Chromium installation
9. Exported-site interaction and axe tests
10. Artifact upload
11. GitHub Pages deployment

The workflow token requires `pages: write` and `id-token: write` permissions.

## 12. Testing

### Development Server

```bash
npm run test:e2e
```

### Production Export

```bash
npm run build
npm run verify:export
npm run test:export
```

`scripts/serve-export.mjs` provides a dependency-free static server for exact production artifacts. `scripts/verify-export.mjs` checks required files, CV, portrait, certificate, manifest, chunks, and base-prefixed URLs.

Current Playwright coverage includes:

- Core content and project filters
- Project dialog open and close behavior
- Mobile menu keyboard control
- Mobile-to-desktop scroll-lock cleanup
- Reduced-motion project behavior
- Desktop and mobile axe analysis

## 13. Maintenance Checklist

Before deployment:

```bash
npm run typecheck
npm run lint
npm run build
npm run verify:export
npm run test:export
npm audit --omit=dev
```

Before adding a dependency:

- Confirm an existing library or CSS cannot solve the requirement.
- Measure client bundle and main-thread impact.
- Verify reduced-motion behavior.
- Keep Server Components as the default.
- Update this documentation when architecture or deployment behavior changes.
