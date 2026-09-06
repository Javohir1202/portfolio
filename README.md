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

### Verifying a sending domain on Resend (to deliver beyond the sandbox restriction)

Right now `from` in `app/api/contact/route.ts` is Resend's shared sandbox address
(`onboarding@resend.dev`), which can only deliver to the email your Resend account itself was
signed up with — fine for testing, not for real visitors emailing in. To lift that restriction:

1. **You need a domain you control DNS for.** This site's `nodirbekov.netlify.app` subdomain
   doesn't count — Netlify owns that domain, so you can't add DNS records to it. If you don't
   already own a domain, buy one from any registrar (Cloudflare Registrar, Namecheap, Porkbun,
   etc. — doesn't need to be the one the site itself is on; a domain bought purely to send email
   from works fine).
2. In the Resend dashboard: **Domains → Add Domain**, enter that domain.
3. Resend shows you a set of DNS records to add (typically an **MX** record and two or three
   **TXT** records — SPF and DKIM; it may also suggest a **DMARC** TXT record, worth adding too).
   Add each one exactly as shown, in whatever DNS panel manages that domain (your registrar's
   own DNS page, or Cloudflare's if you're using it as a DNS provider).
4. Back in Resend, click **Verify DNS Records**. Propagation is often fast but can take up to
   ~48 hours; Resend will show a pending/verified status per record.
5. Once verified, change the `from` line in `app/api/contact/route.ts` from
   `Portfolio Contact <onboarding@resend.dev>` to `Portfolio Contact <contact@yourdomain.com>`
   (or any address `@` that verified domain — it doesn't need to be a real inbox, just a valid
   address on the verified domain).
6. `CONTACT_TO_EMAIL` can then be any address you want — the sandbox's "only your own signup
   email" restriction only applies to the shared `onboarding@resend.dev` sender.

Tell me once a domain's verified and I'll make the one-line `from` change.

## Known/accepted trade-off

`npm audit` reports a few advisories against Next.js 14.2.x itself (Server Actions /
Middleware-related CVEs, patched only in Next 15/16). This site uses neither Server Actions
nor Middleware — every route is statically generated — so none of the vulnerable code paths
are exercised. Noted here rather than silently ignored; revisit if the site later grows
Server Actions, middleware, or rewrites.
