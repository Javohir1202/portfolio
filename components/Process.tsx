"use client";

import { process } from "@/data/process";
import { palette } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { dictionaries } from "@/lib/i18n/dictionaries";

export function Process() {
  const { locale } = useLocale();
  const dict = dictionaries[locale];

  return (
    <section id="process" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{dict.process.eyebrow}</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            {dict.process.heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-4 md:gap-6">
          {process.map(({ index, icon: Icon }, i) => {
            const theme = palette[i % palette.length];
            const step = dict.process.steps[i];
            return (
              <Reveal key={index} delay={i * 0.08}>
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-semibold text-ink-faint">{index}</span>
                    <div className={cn("inline-flex h-9 w-9 items-center justify-center rounded-lg border", theme.badge, theme.icon)}>
                      <Icon size={16} aria-hidden />
                    </div>
                  </div>
                  <div className={cn("mt-4 h-0.5 w-full rounded-full", theme.bar, "opacity-70")} aria-hidden />
                  <h3 className="mt-4 text-lg font-medium text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {step.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-border bg-bg-raised px-2 py-1 font-mono text-[10px] text-ink-faint"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
