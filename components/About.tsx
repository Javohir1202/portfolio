"use client";

import { Reveal } from "./Reveal";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { dictionaries } from "@/lib/i18n/dictionaries";

export function About() {
  const { locale } = useLocale();
  const dict = dictionaries[locale];
  const points = [dict.about.cards.frontend, dict.about.cards.backend, dict.about.cards.database, dict.about.cards.automation];

  return (
    <section id="about-intro" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-content px-6">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{dict.about.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
              {dict.about.heading}
            </h2>
            <p className="mt-6 max-w-md text-ink-muted">{dict.about.intro}</p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {points.map((point, i) => (
              <Reveal key={point.label} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-surface/50 p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-faint">{point.label}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{point.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
