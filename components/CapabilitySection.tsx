"use client";

import { capabilities } from "@/data/capabilities";
import { palette } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { dictionaries } from "@/lib/i18n/dictionaries";

export function CapabilitySection() {
  const { locale } = useLocale();
  const dict = dictionaries[locale];

  return (
    <section id="capabilities" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{dict.capabilities.eyebrow}</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            {dict.capabilities.heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ icon: Icon }, i) => {
            const theme = palette[i % palette.length];
            const text = dict.capabilities.items[i];
            return (
              <Reveal key={text.title} delay={i * 0.07}>
                <div className="group h-full rounded-xl border border-border bg-surface/40 p-7 transition-colors hover:border-accent/40 hover:bg-surface">
                  <div
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors",
                      theme.badge,
                      theme.icon
                    )}
                  >
                    <Icon size={18} aria-hidden />
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-ink">{text.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
