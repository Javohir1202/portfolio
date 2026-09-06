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
- **Project screenshots:** drop them into `public/projects/<serviceflow|finance-pwa>/`
  using the exact filenames listed in that folder's README — `data/projects.ts` already
  points at those paths, so no code changes are needed once the files exist.
- **Fiverr link:** set `links.fiverr` in [data/site.ts](data/site.ts) once available.

## Deployment

Live at **https://nodirbekov.netlify.app**, hosted on Netlify (auto-deploys from the `main`
branch of this repo). `netlify.toml` pins the Node version and build command; Netlify's
Next.js Runtime handles SSR/API routes with no other config needed.

Environment variables (set under Netlify's Site configuration → Environment variables, see
`.env.example` for what each one does):

- `NEXT_PUBLIC_APP_URL` — the live URL above; drives canonical URLs, `sitemap.xml`,
  `robots.txt`, and Open Graph tags.
- `RESEND_API_KEY` — powers the contact form (`app/api/contact/route.ts`). Without a verified
  sending domain on Resend, its sandbox sender can only deliver to the email address the
  Resend account itself was created with.
- `CONTACT_TO_EMAIL` — optional; defaults to `data/site.ts`'s `email` if unset.

A new deploy is required after adding/changing any environment variable — Netlify doesn't
apply changes to an already-running deploy.

## Known/accepted trade-off

`npm audit` reports a few advisories against Next.js 14.2.x itself (Server Actions /
Middleware-related CVEs, patched only in Next 15/16). This site uses neither Server Actions
nor Middleware — every route is statically generated — so none of the vulnerable code paths
are exercised. Noted here rather than silently ignored; revisit if the site later grows
Server Actions, middleware, or rewrites.
