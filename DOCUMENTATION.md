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
└── CNAME            # Custom domain configuration for GitHub Pages
```

## Architecture and Features

### 1. Dynamic Data Loading
The website uses the Fetch API to load `data.json` asynchronously when the DOM is fully loaded. This JSON file acts as a simple database for the portfolio.
- **Skills**: Rendered dynamically into the `#skills-grid`.
- **Projects**: Rendered dynamically into the `#projects-grid`.

### 2. Filtering System
The projects section includes a filtering mechanism. It allows users to filter projects by categories (e.g., Web, Fullstack, Data). The filtering logic is handled in JavaScript by listening to click events on the `.filter-btn` elements and re-rendering the `projects-grid` with the filtered array.

### 3. Intersection Observer (Scroll Animations)
To provide a smooth and engaging user experience, an `IntersectionObserver` is used to detect when elements enter the viewport. Elements with the `.fade-in` class are given a `.visible` class when scrolled into view, triggering CSS transition animations.

### 4. Dark Mode Theme Toggle
The website supports a built-in dark mode.
- A toggle button switches between light and dark themes by modifying the `data-theme` attribute on the `<html>` tag.
- CSS variables (Custom Properties) are used to seamlessly swap colors.
- The user's preference is saved in the browser's `localStorage` so that the theme persists across visits.

---

## How to Update Content

You can easily update the content of your portfolio without touching the HTML file. All textual content regarding your skills and projects is stored in `data.json`.

### Updating Skills
To add or remove a skill, edit the `skills` array in `data.json`:
```json
"skills": [
  "JavaScript",
  "React",
  "Python",
  "New Skill"
]
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
- **category**: Must match one of the categories defined in the filter buttons in `index.html` (e.g., `Web`, `Fullstack`, `Data`) to be filtered correctly. If you add a new category here, remember to add a corresponding `<button class="filter-btn" data-filter="NewCategory">NewCategory</button>` in `index.html`.
- **url**: This is optional. If provided, a "Live Demo" link will appear on the project card.

### Updating Personal Information
To change your name, title, bio, or contact information, you will need to edit `index.html`:
1. **Hero Section**: Locate the `.hero-text` div to update your name and tagline.
2. **About Section**: Locate the `#about` section to update your biography.
3. **Contact Section**: Locate the `#contact` section to update your email, phone number, and social media links.
4. **Profile Image**: Replace `Akash.jpg` with your own image, ensuring the filename remains the same or update the `src` attribute of the `<img class="avatar">` in `index.html`.

---

## Customization

### Changing the Color Scheme
The color scheme is controlled by CSS variables located at the top of the `<style>` block in `index.html`. 

To change colors, modify the variables in the `:root` pseudo-class:
```css
:root {
    --bg-primary: #ffffff;
    --text-primary: #1a1a1a;
    --accent: #2563eb; /* Change your primary accent color here */
    /* ... */
}
```
For dark mode colors, modify the `[data-theme="dark"]` selector block.

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
*Documentation last updated: May 2026*
