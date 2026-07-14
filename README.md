# Interactive Portfolio SPA

A high-impact personal portfolio built with React, Vite, and TypeScript. The UI uses Tailwind CSS v4 and Framer Motion to deliver a smooth, modern, recruiter-friendly experience.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Framer Motion
- Lucide React icons

## Features

- Single Page Application with smooth scrolling navigation
- Interactive responsive menu (desktop + mobile)
- Hero section with CTA buttons and entry animations
- Floating dark/light mode toggle with persistent preference
- About section with animated technology cards
- Project gallery with category filters and interactive cards
- Experience and education vertical timeline with scroll animations
- Contact section with validation and social links

## Run Locally

```bash
npm install
npm run dev
```

### Contact Form (Formspree)

To receive real messages from the contact form:

1. Create a form at [Formspree](https://formspree.io/).
2. Copy `.env.example` to `.env.local`.
3. Set your endpoint:

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

4. Restart the dev server.

Production build:

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

This project is configured to deploy to a repository page (`https://<user>.github.io/portfolio/`).

1. Push your code to GitHub in a repo named `portfolio`.
2. Run:

```bash
npm run deploy
```

This will:
- Build with the correct base path (`/portfolio/`)
- Publish `dist/` to the `gh-pages` branch

Then in GitHub:
- Go to `Settings` -> `Pages`
- Source: `Deploy from a branch`
- Branch: `gh-pages` and folder `/ (root)`

If your repository name is different, update `base` in `vite.config.ts`.

## Project Structure

```text
src/
  components/
    layout/
    navigation/
    sections/
    theme/
  context/
  data/
  hooks/
  types/
```
