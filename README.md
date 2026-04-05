# chrisallen.dev

Personal portfolio site for [Chris Allen](https://chrisallen.dev) — Software Architect & Platform Engineer.

## Tech stack

- **[Astro](https://astro.build)** — static site generator, zero client JS by default
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first CSS via Vite plugin
- **[MDX](https://mdxjs.com)** — blog posts as Markdown with component support
- **[Netlify](https://netlify.com)** — hosting, forms, and CDN

## Local development

```sh
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # production build to ./dist/
npm run preview    # preview the production build locally
```

## Project structure

```
src/
├── components/       # Reusable Astro components
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Hero.astro
│   ├── About.astro
│   ├── Skills.astro
│   ├── Experience.astro
│   ├── Contact.astro
│   └── SEO.astro
├── content/
│   └── blog/         # Blog posts as .md / .mdx files
├── layouts/
│   ├── BaseLayout.astro
│   └── BlogPost.astro
├── pages/
│   ├── index.astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   ├── rss.xml.ts
│   └── contact-success.astro
├── styles/
│   └── global.css    # Tailwind import + CSS custom properties
└── config.ts         # Feature flags
```

## Feature flags

Feature flags live in `src/config.ts`:

```ts
export const BLOG_ENABLED = false;
```

### Enabling the blog

When you're ready to launch the blog, set `BLOG_ENABLED = true`. This restores:

- **Nav link** — "Blog" appears in the header navigation
- **Hero CTA** — "Read My Blog" button reappears in the hero section
- **Blog index** — `/blog` listing page becomes accessible
- **Blog posts** — all posts in `src/content/blog/` that are not `draft: true` are built and served
- **RSS feed** — `/rss.xml` becomes active
- **RSS link in `<head>`** — the `<link rel="alternate">` tag is re-added
- **Sitemap** — blog routes are included in `sitemap-index.xml`

## Writing blog posts

Add a `.md` or `.mdx` file to `src/content/blog/`. Required frontmatter:

```yaml
---
title: "Post title"
description: "One-sentence summary shown in cards and meta tags."
pubDate: 2026-04-05
tags: ["tag-one", "tag-two"]
draft: false
---
```

Set `draft: true` to prevent a post from building in production while still previewing it in development.

## Contact form

The contact form uses [Netlify Forms](https://docs.netlify.com/forms/setup/). No backend required — Netlify handles submission and forwards to email. The form action redirects to `/contact-success` on submission.

## Deployment

The site deploys automatically via Netlify on push to the main branch.

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 22

Security headers, cache control rules, and redirect configuration are in `netlify.toml`.
