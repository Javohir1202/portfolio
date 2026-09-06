# Javohir — Portfolio

Personal developer portfolio built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.
Design-inspired by [nex.is-a.dev](https://nex.is-a.dev/) (structure, density, typography, tone) —
no copied text, layout, or code; content and visuals are specific to this site.

## Stack

- **Next.js 14** (App Router, static generation for every route)
- **TypeScript**, **Tailwind CSS**
- No animation library — scroll reveals use a plain `IntersectionObserver` + CSS transitions
  (see [components/Reveal.tsx](components/Reveal.tsx)), with a timeout fallback so content is
  never permanently hidden if the observer doesn't fire.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Project structure

```
/app                  routes (home, /work/[slug] case studies, sitemap, robots, favicon)
/components           Navbar, Hero, About, TechStack, CapabilitySection, ArchitectureSection,
                       Process, ProjectCard, ProjectShowcase, ProjectDetail, Contact, Footer,
                       Reveal, BrowserFrame, MobileFrame
/data                 site.ts (personal info + links), projects.ts (case study content),
                       techStack.ts, capabilities.ts, process.ts
/lib                  utils.ts (cn), config.ts (APP_URL), publicFile.ts (asset-exists check)
/public               profile/ and projects/<slug>/ — drop real screenshots here (see below)
```

All personal/project content lives in `/data` as plain objects — no markup to hunt through
to change a name, a link, or a case-study sentence.

## Adding real assets

Nothing here is faked. Until real files are supplied, the site shows either an initials
avatar (profile photo) or a clearly-labelled "Screenshot coming soon" placeholder frame
(project images) — never a broken image or invented content.

- **Profile photo:** drop it at `public/profile/javohir.jpg` (see that folder's README).
- **Project screenshots:** drop them into `public/projects/<serviceflow|finance-pwa|finance-bot>/`
  using the exact filenames listed in that folder's README — `data/projects.ts` already
  points at those paths, so no code changes are needed once the files exist.
- **Fiverr link:** set `links.fiverr` in [data/site.ts](data/site.ts) once available.

## Before deploying

1. Set `NEXT_PUBLIC_APP_URL` in the Vercel project's environment variables to the real
   deployed URL — it drives canonical URLs, `sitemap.xml`, `robots.txt`, and Open Graph tags
   (see `.env.example`).
2. Add the profile photo and project screenshots (above).
3. Add the Fiverr URL once you have it.

## Known/accepted trade-off

`npm audit` reports a few advisories against Next.js 14.2.x itself (Server Actions /
Middleware-related CVEs, patched only in Next 15/16). This site uses neither Server Actions
nor Middleware — every route is statically generated — so none of the vulnerable code paths
are exercised. Noted here rather than silently ignored; revisit if the site later grows
Server Actions, middleware, or rewrites.
