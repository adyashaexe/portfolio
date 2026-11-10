# Adyasha — Portfolio

A monochrome editorial portfolio for an ML and electronics student: preloader, big metallic hero with a portrait slot, a scroll-expanding About, a horizontal journey timeline, a 3D drag-reel of projects, an accordion focus carousel, a project detail modal, a résumé download button and a contact section.

Plain HTML, CSS and JavaScript. No build step, no frameworks, no dependencies.

The overall look and flow were inspired by the ECHO portfolio by Jishnu Mondal. All code, copy and artwork here are original.

---

## 1. Run it locally

You need either Python 3 or Node.js. Pick one.

```bash
cd adyasha-portfolio

# Option A: Python (nothing to install)
python3 -m http.server 8080

# Option B: Node
npx serve .
```

Then open **http://localhost:8080** (Option B prints its own address, usually `http://localhost:3000`).

You can also use the **Live Server** extension in VS Code: right-click `index.html` → *Open with Live Server*.

> Double-clicking `index.html` mostly works too, but the résumé button's "file missing" check only runs over a server, so use one of the options above while testing.

`npm start` runs the Python option if you prefer that.

---

## 2. Make it yours (5 minutes)

| What | Where |
|---|---|
| Email, GitHub, LinkedIn, tagline | `js/config.js` |
| **Your photo** | Save a portrait as `assets/photo.png`. A transparent PNG cut-out looks best. Until then a placeholder silhouette is shown. |
| **Your résumé** | Save your PDF as `assets/Adyasha_Resume.pdf` (or change the path in `js/config.js`). All the "Résumé ↓" buttons use it. |
| Projects (reel + popups) | `js/projects-data.js` → `PROJECTS` |
| Focus cards | `js/projects-data.js` → `FOCUS` |
| Journey / timeline panels | the `<article class="panel">` blocks in `index.html` |
| Toolbox skills | the `skillgrid` block in `index.html` |
| Colors and fonts | the `:root` variables at the top of `css/styles.css` |

Tips:
- The hero photo is shown in black and white to match the theme. To keep it in color, delete `filter:grayscale(1) contrast(1.05);` from `.hero-photo img` in `css/styles.css`.
- Search the project for `TODO` to find placeholders (email, LinkedIn, repo links for projects that don't have a repo yet).
- Project artwork is generated. Re-create or tweak it with `python3 scripts/generate_art.py`, or drop in your own screenshots and point `image:` at them.

---

## 3. Put it on GitHub

1. On github.com create a new **empty** repository named `adyasha-portfolio` (no README, no license).
2. In the project folder:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/adyashaexe/adyasha-portfolio.git
git push -u origin main
```

---

## 4. Deploy it (free)

- **GitHub Pages:** repo → *Settings → Pages* → source `main`, folder `/ (root)`. Your site appears at `https://adyashaexe.github.io/adyasha-portfolio/`.
- **Vercel:** import the GitHub repo, framework preset *Other*, no build command, output directory `.`.
- **Netlify:** import the repo (or drag the folder onto app.netlify.com/drop). No build command, publish directory `.`.

---

## Project structure

```
adyasha-portfolio/
├── index.html                 # page markup
├── css/styles.css             # all styles
├── js/
│   ├── config.js              # your personal details  ← edit first
│   ├── projects-data.js       # projects + focus cards ← edit second
│   ├── main.js                # loader, nav, toast, résumé button, modal
│   ├── scroll-expand-media.js # About: card expands as you scroll
│   ├── experience-section.js  # horizontal journey timeline
│   ├── works-wheel.js         # 3D drum reel of projects
│   └── flex-carousel.js       # accordion focus carousel
├── assets/
│   ├── photo-placeholder.svg  # shown until you add assets/photo.png
│   ├── about-art.svg
│   ├── projects/*.svg         # project card artwork
│   └── focus/*.svg            # focus card artwork
├── scripts/generate_art.py    # regenerates the SVG artwork
├── package.json
├── LICENSE
└── README.md
```

## Accessibility and performance

- Respects `prefers-reduced-motion`: the journey stacks vertically and the About card shows fully expanded.
- The project reel works with the keyboard (arrow keys, Enter); modals close with Esc.
- Mouse users drag the reel vertically. On touch screens it responds to horizontal swipes so the page can still scroll normally.

## License

MIT — see `LICENSE`.
