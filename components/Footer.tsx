"use client";

import { site } from "@/data/site";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { dictionaries } from "@/lib/i18n/dictionaries";

export function Footer() {
  const { locale } = useLocale();
  const dict = dictionaries[locale];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-mono text-sm text-ink">{site.name}</p>
          <p className="text-xs text-ink-faint">{dict.footer.tagline}</p>
        </div>
        <nav aria-label="Social" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {site.links.github && (
            <a href={site.links.github} target="_blank" rel="noreferrer" className="text-xs text-ink-muted hover:text-accent">
              GitHub
            </a>
          )}
          {site.links.linkedin && (
            <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="text-xs text-ink-muted hover:text-accent">
              LinkedIn
            </a>
          )}
          {site.links.upwork && (
            <a href={site.links.upwork} target="_blank" rel="noreferrer" className="text-xs text-ink-muted hover:text-accent">
              Upwork
            </a>
          )}
          {site.links.fiverr && (
            <a href={site.links.fiverr} target="_blank" rel="noreferrer" className="text-xs text-ink-muted hover:text-accent">
              Fiverr
            </a>
          )}
          {site.links.instagram && (
            <a href={site.links.instagram} target="_blank" rel="noreferrer" className="text-xs text-ink-muted hover:text-accent">
              Instagram
            </a>
          )}
          {site.links.telegram && (
            <a href={site.links.telegram} target="_blank" rel="noreferrer" className="text-xs text-ink-muted hover:text-accent">
              Telegram
            </a>
          )}
          <a href={`mailto:${site.email}`} className="text-xs text-ink-muted hover:text-accent">
            Email
          </a>
        </nav>
        <p className="text-xs text-ink-faint">{dict.footer.rights(year, site.name)}</p>
      </div>
    </footer>
  );
}
