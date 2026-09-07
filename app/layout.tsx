import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";
import { APP_URL } from "@/lib/config";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: site.seo.title,
    template: `%s — ${site.name}`,
  },
  description: site.seo.description,
  authors: [{ name: site.name, url: APP_URL }],
  creator: site.name,
  alternates: { canonical: APP_URL },
  openGraph: {
    type: "website",
    url: APP_URL,
    title: site.seo.title,
    description: site.seo.description,
    siteName: `${site.name} — Portfolio`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: site.seo.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    description: site.description,
    url: APP_URL,
    email: `mailto:${site.email}`,
    address: site.location ? { "@type": "PostalAddress", addressCountry: site.location } : undefined,
    sameAs: Object.values(site.links).filter(Boolean),
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        <GoogleAnalytics />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <SmoothScroll />
          <CustomCursor />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
