# MD. Shamim Osman Chowdhury - Portfolio

A responsive Computer Science and software engineering portfolio highlighting my development work across web, full-stack systems, data and AI interests, with a strong focus on Software Quality Assurance engineering.

## Live Portfolio

- **Primary deployment:** [https://osman28.vercel.app](https://osman28.vercel.app)
- **GitHub Pages:** [https://Yildirim28.github.io/MyPortfolio/](https://Yildirim28.github.io/MyPortfolio/)

## Portfolio Highlights

- General CSE and software engineering profile with a highlighted SQA specialization
- Experience, education, certification, leadership, technical skills, and downloadable CV
- Ten projects covering SQA automation, API testing, web applications, PWAs, full-stack platforms, and applied AI/ML
- Dynamic project and skill rendering from `data.json`
- Generated project filters for SQA, Web, Fullstack, and AI/ML categories
- Animated statistics, scroll reveals, and active navigation using `IntersectionObserver`
- Dark responsive layout for desktop, tablet, and mobile devices
- Accessible mobile navigation, visible focus states, semantic markup, and reduced-motion support
- Static HTML fallback when JavaScript or dynamic data loading is unavailable
- Contact links for GitHub, LinkedIn, email, WhatsApp, Facebook, and phone

## Technology Stack

- **HTML5:** Semantic page structure and static content fallbacks
- **CSS3:** Custom properties, Grid, Flexbox, responsive breakpoints, and animations
- **Vanilla JavaScript:** Fetch API, safe DOM rendering, project filtering, counters, active navigation, and mobile menu behavior
- **JSON:** Maintainable project and skill-group content
- **Google Fonts and inline SVG:** Typography and scalable icons
- **Deployment:** Vercel and GitHub Pages

## Project Structure

```text
.
├── index.html         # Page structure, embedded styles, and behavior
├── data.json          # Dynamic projects and grouped technical skills
├── Akash.jpg          # Portfolio portrait
├── CV.pdf             # Downloadable CV
├── README.md          # Project overview and setup instructions
└── DOCUMENTATION.md   # Detailed maintenance documentation
```

## Run Locally

The Fetch API requires the portfolio to run through a local web server rather than directly from `file://`.

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in a browser.

## Update Portfolio Content

### Projects and Skills

Edit `data.json` to add or update project cards, categories, links, tags, and skill groups. Project filter buttons are generated automatically from the project categories.

### Personal Information

Edit the semantic sections in `index.html` to update the hero, About content, experience, education, contact information, and social links.

### CV

Replace `CV.pdf` while keeping the same filename. The download button will use the new file without requiring an HTML change.

### Portrait

Replace `Akash.jpg` while keeping the same filename, or update the image path in `index.html`.

## Accessibility and Progressive Enhancement

- Keyboard-accessible mobile navigation and interactive controls
- WCAG-compliant text contrast and visible focus indicators
- Reduced-motion support through `prefers-reduced-motion`
- Safe external URL validation before dynamic links are rendered
- Static project and skill content remains available if `data.json` cannot load

## Contact

- **GitHub:** [Yildirim28](https://github.com/Yildirim28)
- **LinkedIn:** [MD. Shamim Osman Chowdhury](https://www.linkedin.com/in/md-shamim-osman-chowdhury-24b482256)
- **Email:** [shamimosmanakash330@gmail.com](mailto:shamimosmanakash330@gmail.com)
- **WhatsApp:** [Message me](https://wa.me/8801639815290)
- **Facebook:** [Profile](https://www.facebook.com/share/1KXLmrhyMU/)
- **Phone:** [+880 1639 815290](tel:+8801639815290)
