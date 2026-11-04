# Portfolio Project Documentation

Welcome to the documentation for the personal portfolio project. This guide provides detailed information on the project's architecture, file structure, and instructions on how to update and deploy the website.

## Table of Contents
1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Architecture and Features](#architecture-and-features)
4. [How to Update Content](#how-to-update-content)
5. [Customization](#customization)
6. [Deployment](#deployment)

---

## Project Overview
This project is a single-page personal portfolio website built with HTML5, CSS3, and Vanilla JavaScript. It is designed to be fully responsive, accessible, and easily maintainable. The portfolio dynamically loads data (skills and projects) from a JSON file, eliminating the need to edit HTML code when adding new portfolio items.

## File Structure

```text
portfolio/
├── index.html       # The main HTML structure, CSS styles, and JavaScript logic
├── data.json        # The data source for skills and projects
├── README.md        # A brief overview of the project
├── Akash.jpg        # Profile image (hero section)
├── CV.pdf           # Downloadable CV linked from the hero section (replace to update)
└── CNAME            # Custom domain configuration for GitHub Pages
```

## Architecture and Features

### 1. Dynamic Data Loading
The website uses the Fetch API to load `data.json` asynchronously. Static project cards and skill groups remain in the HTML as an SEO and no-JavaScript fallback.
- **Skills**: Rendered dynamically into `#skill-groups`.
- **Projects**: Rendered dynamically into the `#projects-grid`.

### 2. Filtering System
Project filter buttons are generated automatically from the unique `category` values in `data.json`. The current categories are SQA, Web, and Fullstack, and adding another category requires no HTML changes.

### 3. Progressive Enhancements
Intersection Observers activate scroll reveals, statistics counters, and the current navigation link. All content remains readable when motion is reduced, Intersection Observer is unavailable, or JavaScript is disabled.

### 4. Responsive Navigation
The desktop navigation collapses into an accessible mobile menu. The toggle updates `aria-expanded`, closes after navigation, supports the Escape key, and restores the desktop state after resizing.

---

## How to Update Content

Projects and grouped skills are maintained in `data.json`. Core identity, About, experience, education, and contact content remain semantic HTML in `index.html`.

### Updating Skills
To add or remove a skill, edit an entry inside the `skillGroups` array in `data.json`:
```json
{
  "title": "Programming & Development",
  "items": ["JavaScript & TypeScript", "Python", "New Skill"]
}
```

### Updating Projects
To add a new project, append a new object to the `projects` array in `data.json`:
```json
{
  "id": 5,
  "title": "New Project Title",
  "description": "A short description of what the project does.",
  "category": "Web",
  "tags": ["React", "CSS", "API"],
  "url": "https://link-to-live-demo.com"
}
```
**Notes on Projects:**
- **id**: Make sure each project has a unique ID.
- **category**: Generates its own filter button automatically.
- **url**: Optional external project URL.
- **linkLabel**: Optional link text such as "View live app".
- **private**: Set to `true` to show "Private repository" without an inaccessible link.

### Updating Personal Information
To change your name, title, bio, or contact information, you will need to edit `index.html`:
1. **Hero Section**: Locate the `.hero-copy` div to update your name and tagline.
2. **About Section**: Locate the `#about` section to update your biography.
3. **Contact Section**: Locate the `#contacts` section to update your email, phone number, and social media links.
4. **Profile Image**: Replace `Akash.jpg` while keeping the filename, or update the image inside `.hero-portrait`.

### Updating Your CV
The "Download CV" button in the hero section links to `CV.pdf` at the root of the project. To update your CV without touching any code:
1. Export your new CV as a PDF.
2. Overwrite the existing `CV.pdf` file in the project root (keep the exact filename `CV.pdf`):
   ```bash
   cp /path/to/your/new-cv.pdf ./CV.pdf
   ```
3. Commit and push the change. The button will automatically serve the new file.

**Note:** The link uses a stable filename (`CV.pdf`) plus the HTML `download` attribute, so no HTML edits are ever needed when your CV changes. If visitors appear to see an old version, it is browser caching — a hard refresh (Ctrl+Shift+R) fixes it, and GitHub Pages caches expire within minutes.

---

## Customization

### Changing the Color Scheme
The color scheme is controlled by CSS variables located at the top of the `<style>` block in `index.html`. 

To change colors, modify the variables in the `:root` pseudo-class:
```css
:root {
    --color-bg: #111a24;
    --color-text: #ffffff;
    --color-accent: #f2705a;
    /* ... */
}
```

---

## Deployment

This project is perfectly suited for static hosting platforms like GitHub Pages, Netlify, or Vercel.

### GitHub Pages Deployment
1. Initialize a Git repository if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Push your code to a GitHub repository.
3. In your GitHub repository settings, navigate to **Pages**.
4. Select the `main` branch as the source and click **Save**.
5. Your portfolio will be live at `https://<your-username>.github.io/<repository-name>/`.
*(Note: Since you have a `CNAME` file, GitHub Pages will automatically attempt to route the domain specified in that file to your site).*

---
*Documentation last updated: November 2026*
