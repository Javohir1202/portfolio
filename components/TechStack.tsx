"use client";

import { techStack } from "@/data/techStack";
import { palette } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { TechConstellation } from "./TechConstellation";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { dictionaries } from "@/lib/i18n/dictionaries";

export function TechStack() {
  const { locale } = useLocale();
  const dict = dictionaries[locale];
  const groupLabels = [
    dict.techStack.groupLabels.frontend,
    dict.techStack.groupLabels.backend,
    dict.techStack.groupLabels.database,
    dict.techStack.groupLabels.tools,
  ];

  return (
    <section id="stack" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-content px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{dict.techStack.eyebrow}</p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
              {dict.techStack.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="hidden lg:block">
            <TechConstellation />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((group, i) => {
            const theme = palette[i % palette.length];
            return (
              <Reveal key={group.label} delay={i * 0.06}>
                <div className="h-full bg-bg-raised p-8">
                  <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-ink-faint">
                    <span className={cn("h-1.5 w-1.5 rounded-full", theme.dot)} aria-hidden />
                    {groupLabels[i]}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
                      >
                        {item}
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
