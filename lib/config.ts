// Set NEXT_PUBLIC_APP_URL in the Vercel dashboard once this is deployed (the assigned
// *.vercel.app URL, or a custom domain) — used for canonical URLs, sitemap.xml, and
// Open Graph metadata. Falls back to localhost for local development.
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
