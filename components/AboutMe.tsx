"use client";

import { Reveal } from "./Reveal";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { dictionaries } from "@/lib/i18n/dictionaries";

export function AboutMe() {
  const { locale } = useLocale();
  const dict = dictionaries[locale];

  return (
    <section id="about" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-content px-6">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start md:gap-16">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{dict.aboutMe.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-2xl text-xl leading-relaxed text-ink md:text-2xl">{dict.siteDescription}</p>
            <p className="mt-6 max-w-xl text-ink-muted">
              {dict.aboutMe.paragraph} {dict.aboutMe.basedIn(dict.aboutMe.location)}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
