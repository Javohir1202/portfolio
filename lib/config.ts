// Set NEXT_PUBLIC_APP_URL in Netlify's environment variables (the real deployed URL) —
// used for canonical URLs, sitemap.xml, and Open Graph metadata. Falls back to
// localhost for local development.
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// GA4 Measurement ID (format: G-XXXXXXXXXX) from analytics.google.com. Left unset
// locally on purpose — GoogleAnalytics.tsx renders nothing without it, so local dev
// traffic never pollutes real analytics data. Set only in Netlify's env vars.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
