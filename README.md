# Adyasha — Portfolio

<p align="center">
  <a href="https://portfolio-mu-sandy-12.vercel.app/">
    <img src="https://img.shields.io/badge/✦%20VISIT%20LIVE%20PORTFOLIO-8B5CF6?style=for-the-badge&labelColor=11111B" alt="Visit Live Portfolio" />
  </a>
</p>

<p align="center">
  <b>An interactive portfolio exploring the intersection of machine learning, electronics and design.</b>
  <br />
  <sub>Built with curiosity. Refined through iteration. Deployed on Vercel.</sub>
</p>

<p align="center">
  <a href="https://github.com/adyashaexe/portfolio">
    <img src="https://img.shields.io/badge/GitHub-Repository-18181B?style=flat-square&logo=github" alt="GitHub Repository" />
  </a>
  <a href="https://portfolio-mu-sandy-12.vercel.app/">
    <img src="https://img.shields.io/badge/Deployment-Vercel-18181B?style=flat-square&logo=vercel" alt="Vercel Deployment" />
  </a>
  <img src="https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JavaScript-18181B?style=flat-square" alt="Technology Stack" />
</p>

---

## Overview

This is my personal portfolio: an editorial-inspired, interactive space to showcase my projects, technical interests, experience and writing.

The experience combines a dark/light theme, expressive typography, motion and interactive components without relying on a frontend framework or build pipeline.

### What's inside?

| Feature | Description |
|---|---|
| Multilingual preloader | A rotating greeting animation in different languages |
| Interactive hero | Large metallic typography, portrait and parallax effects |
| Scroll-expanding About | An immersive introduction that responds to scrolling |
| Journey timeline | Horizontal experience timeline with an animated path |
| 3D project reel | Interactive project carousel with drag navigation |
| Focus carousel | Accordion-style exploration of technical interests |
| Project detail modal | Expanded project descriptions, technologies and links |
| Animated toolbox | Technology categories, chips and marquee |
| Writing section | Selected articles from Medium |
| Résumé | Downloadable PDF |
| Contact form | Message form powered by FormSubmit |
| Theme switcher | Dark and light modes with saved preference |

## Design philosophy

The overall look and flow take inspiration from the **ECHO portfolio by Jishnu Mondal**.

The implementation, copy, code and artwork in this repository are original.

A few principles guided the design:

- **Clarity over clutter:** Information should be easy to find.
- **Motion with purpose:** Animation should support the experience, not compete with it.
- **Technical and personal:** A portfolio should communicate both what I build and how I think.
- **No unnecessary dependencies:** The site stays lightweight and straightforward to maintain.

---

## Tech stack

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/FormSubmit-6D28D9?style=flat-square" alt="FormSubmit" />
</p>

**Architecture:** Plain HTML, CSS and JavaScript.

No React. No build step. No framework. No dependency-heavy setup.

---

## Getting started

### Prerequisites

You only need one of the following:

- Python 3
- Node.js

### Run locally

Clone the repository:

```bash
git clone https://github.com/adyashaexe/portfolio.git
cd portfolio
```

**Option A — Python**

```bash
python3 -m http.server 8080
```

**Option B — Node.js**

```bash
npx serve .
```

Open the local address:

```text
http://localhost:8080
```

For Node.js, use the address printed in your terminal, usually `http://localhost:3000`.

You can also use the Live Server extension in VS Code.

> Running through a local server is recommended. Some features, such as résumé file checks, behave differently when opening the HTML file directly.

---

## Personalisation

Most of the personal content is separated from the main application logic, so updating the portfolio does not require digging through every script.

| What to customise | File |
|---|---|
| Name, email, social links, tagline and form endpoint | `js/config.js` |
| Profile photograph | `assets/photo.png` |
| Résumé PDF | `assets/Adyasha_Resume.pdf` |
| Project cards and modal content | `js/projects-data.js` → `PROJECTS` |
| Focus carousel | `js/projects-data.js` → `FOCUS` |
| Toolbox categories | `js/projects-data.js` → `TOOLBOX` |
| Medium articles | `js/projects-data.js` → `WRITING` |
| Journey timeline | `index.html` |
| Loader greetings | `js/main.js` → `GREET` |
| Colours, typography and layout | `css/styles.css` |

### Profile photograph

Save your photograph as:

```text
assets/photo.png
```

A transparent PNG cut-out works well with the existing hero design.

### Résumé

Place your PDF at:

```text
assets/Adyasha_Resume.pdf
```

Alternatively, update the résumé path in `js/config.js`.

### Contact form

The contact form uses [FormSubmit](https://formsubmit.co/).

1. Configure the email address in `js/config.js`.
2. Deploy the website.
3. Send a test message.
4. Confirm the email address using the one-time confirmation email from FormSubmit.

If form submission fails, the application has an email-client fallback.

### Theme preferences

The theme follows the visitor's system preference by default. Visitors can switch between dark and light modes, and their choice is remembered.

### Artwork

Project artwork is generated using the included script:

```bash
python3 scripts/generate_art.py
```

You can also replace the SVG artwork with your own assets and update the corresponding paths in `js/projects-data.js`.

---

## Project structure

```text
portfolio/
│
├── index.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── config.js
│   ├── projects-data.js
│   ├── main.js
│   ├── scroll-expand-media.js
│   ├── experience-section.js
│   ├── works-wheel.js
│   ├── flex-carousel.js
│   ├── effects.js
│   ├── toolbox.js
│   ├── writing.js
│   └── contact.js
│
├── assets/
│   ├── Adyasha_Resume.pdf
│   ├── photo.png
│   ├── photo-placeholder.svg
│   ├── about-art.svg
│   ├── projects/
│   └── focus/
│
├── scripts/
│   └── generate_art.py
│
├── package.json
├── LICENSE
└── README.md
```

---

## Deployment

The portfolio is currently deployed on **Vercel**.

<p align="center">
  <a href="https://portfolio-mu-sandy-12.vercel.app/">
    <img src="https://img.shields.io/badge/OPEN%20LIVE%20WEBSITE-8B5CF6?style=for-the-badge&logo=vercel&logoColor=white" alt="Open live website" />
  </a>
</p>

### Deploy your own version

**Vercel**

1. Import the GitHub repository into Vercel.
2. Select `Other` as the framework preset.
3. Leave the build command empty.
4. Set the output directory to `.`.
5. Deploy.

**GitHub Pages**

1. Open repository Settings.
2. Navigate to Pages.
3. Select the `main` branch.
4. Select the root directory.
5. Save.

**Netlify**

Import the repository and use the root directory as the publish directory. No build command is required.

---

## Accessibility and performance

- Respects `prefers-reduced-motion`.
- Provides keyboard navigation for the project reel.
- Supports Enter to open projects and Escape to close modals.
- Supports touch interactions on mobile devices.
- Uses responsive layouts.
- Loads the preferred theme before the first page paint to minimise theme flashing.

---

## License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE) for details.

---

<p align="center">
  <b>Have a look around.</b>
  <br />
  <a href="https://portfolio-mu-sandy-12.vercel.app/">Visit the live portfolio ↗</a>
  <br /><br />
  <sub>Designed and developed by Adyasha Mohanty · 2026</sub>
</p>
