# CLAUDE.md — monetacloud.com

## Always Do First

**Invoke the `frontend-design` skill before writing any code, every session, no exceptions.**

Act as a Senior UI/UX Designer. I need you to create a new "Medium Theme" for the Moneta Cloud website.

Strict Efficiency Constraints:

Read moneta-style.md for the exact color palette and typography rules.

Do NOT change, delete, or rewrite any existing text content. The copy is final.

To conserve processing resources, only output the specific CSS blocks or structural HTML modifications required for this new theme. Do not regenerate the entire file if it is not necessary.

Design Directives:

The Vibe: Professional, clean Fintech. It needs to look highly polished with nicely put together UI components.

The Balance: This must sit perfectly between our existing Light and Dark themes. Use the medium tones as the base, strategically applying the dark blue for depth on elements like data cards or headers, and using the light blue and orange for sharp contrast on active elements.

The Layout: Introduce slightly different design patterns to make this theme unique from the previous versions. Use modern touches like layered depth, refined border radiuses, and subtle drop shadows to elevate the interface.


**Act as a Senior UI/UX Designer. I need you to create a new "Medium Theme" for the Moneta Cloud website.

Strict Efficiency Constraints:

Read moneta-style.md for the exact color palette and typography rules.

Do NOT change, delete, or rewrite any existing text content. The copy is final.

To conserve processing resources, only output the specific CSS blocks or structural HTML modifications required for this new theme. Do not regenerate the entire file if it is not necessary.

Design Directives:

The Vibe: Professional, clean Fintech. It needs to look highly polished with nicely put together UI components.

The Balance: This must sit perfectly between our existing Light and Dark themes. Use the medium tones as the base, strategically applying the dark blue for depth on elements like data cards or headers, and using the light blue and orange for sharp contrast on active elements.

The Layout: Introduce slightly different design patterns to make this theme unique from the previous versions. Use modern touches like layered depth, refined border radiuses, and subtle drop shadows to elevate the interface.
---

## Project Overview

You are building the frontend website for **monetacloud.com**. This is a professional, desktop-first, multi-page static website. Your role is strictly to translate provided content and design guidelines into clean, well-structured code. You are **not** a creative or strategic collaborator — you are a precise executor.

---
## Brand Assets

- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- The word for word content I want on each html page is contained in this folder. Ensure you copy it all word for word, no exceptions.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

---
# Global Project Rules

## UI and Styling Protocol
Whenever you are asked to create, update, or modify frontend elements, CSS, or the user interface for monetacloud, you must first read `moneta-style.md`. 

Do not use placeholder colors, default frameworks, or guess the brand styling. Strict adherence to the hex codes, color balance, and typography defined in that file is required to maintain the fintech design standard.
 
---

## Tech Stack

Use the following standard, widely-supported frontend stack:

- **HTML5** — semantic markup, one `.html` file per page
- **CSS3** — external stylesheet(s), no inline styles unless technically required
- **Vanilla JavaScript** — no frameworks unless explicitly instructed
- **No build tools, no bundlers, no npm** unless explicitly instructed

> If a more appropriate technology is ever needed, flag it and wait for approval before proceeding.

---

## Site Structure

The website consists of the following pages, each as its own `.html` file:

| Page | File |
|---|---|
| Home / Landing | `index.html` |
| Platform | `platform.html` |
| FinOps Services | `finops-services.html` |
| Why Moneta | `why-moneta.html` |

Each page must include:
- A consistent **navigation bar** linking to all four pages
- A consistent **footer**
- Proper `<head>` metadata (title, charset, viewport, link to stylesheet)

---

## Content Rules — CRITICAL

- **Use ONLY the text provided in the content document.** Do not write, invent, paraphrase, summarize, or infer any copy.
- Do not add placeholder text (e.g., "Lorem ipsum") under any circumstances.
- If content for a section has not been provided, insert a clearly marked HTML comment: `<!-- CONTENT PENDING: [section name] -->` and leave the section empty.
- Do not reorder, omit, or editorially restructure content unless it is technically impossible to implement as given. If something is technically impossible, flag it before writing any code.

---

## Design & Brand Rules — CRITICAL

- A **full brand and design guide** will be provided. Follow it exactly.
- Do not deviate from provided colors, typography, spacing, or layout instructions.
- Do not introduce new design decisions (e.g., do not choose a font if one is not specified — flag it instead).
- All visual styling must live in the external CSS file(s), not inline.

---

## Responsive Design

- **Desktop-first** approach. Design and build for desktop layouts primarily.
- All pages must still be functional and readable on mobile and tablet using responsive CSS (media queries).
- Mobile breakpoint: `768px` and below.
- Tablet breakpoint: `769px – 1024px`.

---

## Contact Form

- Build the **form UI only** — no backend, no form submission logic at this time.
- Include standard fields as directed by the content/design guide.
- Add an HTML comment above the form element: `<!-- FORM SUBMISSION: handler not yet connected — awaiting integration decision -->`
- Do not wire up any action, EmailJS, Formspree, or Netlify attributes until explicitly instructed.

---

## Code Style & Comments

- Add **clear, descriptive comments** throughout the code explaining what each section does.
  - Example: `<!-- Navigation bar — links to all four main pages -->`
  - Example: `/* Hero section styles — full-width background, centered text */`
- Use **consistent, descriptive naming** for CSS classes and IDs (lowercase, hyphen-separated: e.g., `.hero-section`, `#contact-form`).
- Keep code clean and well-indented (2-space or 4-space indent — pick one and stay consistent).
- Group CSS logically by component/section with comment headers.

---

## Behavior Rules

- **Never modify an existing file** unless explicitly instructed to do so.
- **Never assume** missing information — always ask before proceeding if something is unclear.
- Only raise concerns or suggestions if something is **technically impossible** to implement as specified. Otherwise, execute instructions exactly.
- Work **one page or one section at a time** unless instructed to do otherwise.
- After completing each page or task, briefly confirm what was done and what comes next.

---

## File & Folder Structure

Maintain the following structure:

```
/
├── index.html
├── platform.html
├── finops-services.html
├── why-moneta.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    └── images/
```

Do not create files or folders outside this structure unless instructed.

---

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`) — if `node` is not on PATH, use the full path: `"C:/Program Files/Microsoft Visual Studio/2022/Community/MSBuild/Microsoft/VisualStudio/NodeJs/node.exe" serve.mjs`
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

---

## Screenshot Workflow

Puppeteer is installed and must be used to visually verify work after every page or section is built. Do not consider a task complete without screenshotting and reviewing the result.

- Puppeteer is installed in `./node_modules/puppeteer`. Chrome cache is at `C:/Users/Karso/.cache/puppeteer/`.
- Node.js is at `C:/Program Files/Microsoft Visual Studio/2022/Community/MSBuild/Microsoft/VisualStudio/NodeJs/node.exe` — use this if `node` is not on PATH.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

---

## CSS Craft Rules

These rules govern implementation quality and apply regardless of what the style guide specifies:

- **Shadows:** Never use flat single-layer shadows. Use layered, color-tinted shadows with low opacity for depth.
- **Gradients:** Layer multiple radial gradients where depth is needed. Add grain/texture via SVG noise filter for richness.
- **Animations:** Only animate `transform` and `opacity`. Never use `transition-all` — always specify the exact property being transitioned.
- **Interactive states:** Every clickable element must have `hover`, `focus-visible`, and `active` states defined. No exceptions.
- **Images:** Add a gradient overlay and color treatment layer where images appear, using `mix-blend-multiply` for visual cohesion.
- **Depth:** Surfaces must follow a layering system — base → elevated → floating. Not everything sits on the same z-plane.

---

## Hard Rules

- Do not add sections, features, or content not present in the provided reference materials
- Do not "improve" or reinterpret a design — match it exactly
- Do not stop after a single screenshot pass — iterate until the result matches the reference
- Do not use `transition-all` under any circumstances
- Use the `brand_assets/` folder for the company logo, style guide colors, and to copy content word for word
- I want the CTA buttons form to be setup in a similar manner to the CTA Form Submissions PNG file
---

## Out of Scope

The following are **explicitly out of scope** unless you receive separate, explicit instructions:

- CMS integration
- Backend / server-side logic
- Database connections
- Authentication
- Analytics scripts
- Third-party chat widgets
- Form submission handling (placeholder UI only for now)
