"use client";

import { ChevronDown } from "lucide-react";
import { projects } from "@/data/projects";
import { palette, type AccentTheme } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { t } from "@/lib/i18n/types";

function FlowDiagram({ steps, theme }: { steps: string[]; theme: AccentTheme }) {
  return (
    <ol className="flex flex-col items-stretch">
      {steps.map((step, i) => (
        <li key={step} className="flex flex-col items-center">
          <div
            className={cn(
              "w-full rounded-lg border-l-2 border-y border-r border-border bg-bg-raised px-4 py-3 text-center font-mono text-[13px] leading-snug text-ink",
              theme.borderL
            )}
          >
            {step}
          </div>
          {i < steps.length - 1 && <ChevronDown size={16} className="my-1.5 text-ink-faint" aria-hidden />}
        </li>
      ))}
    </ol>
  );
}

export function ArchitectureSection() {
  const { locale } = useLocale();
  const dict = dictionaries[locale];
  const serviceflow = projects.find((p) => p.slug === "serviceflow")!;
  const finance = projects.find((p) => p.slug === "finance-pwa")!;

  return (
    <section id="architecture" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{dict.architecture.eyebrow}</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            {dict.architecture.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-muted">{dict.architecture.intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-surface/40 p-8">
              <h3 className="flex items-center gap-2 text-lg font-medium text-ink">
                <span className={cn("h-1.5 w-1.5 rounded-full", palette[0].dot)} aria-hidden />
                {serviceflow.name}
              </h3>
              <p className="mt-1 text-sm text-ink-muted">{t(serviceflow.category, locale)}</p>
              <div className="mt-6">
                <FlowDiagram steps={serviceflow.caseStudy.architecture.flow} theme={palette[0]} />
              </div>
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                {t(serviceflow.caseStudy.architecture.description, locale)}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-surface/40 p-8">
              <h3 className="flex items-center gap-2 text-lg font-medium text-ink">
                <span className={cn("h-1.5 w-1.5 rounded-full", palette[1].dot)} aria-hidden />
                {finance.name} + Finance Bot
              </h3>
              <p className="mt-1 text-sm text-ink-muted">{dict.architecture.oneBackendTwoClients}</p>
              <div className="mt-6">
                <FlowDiagram steps={finance.caseStudy.architecture.flow} theme={palette[1]} />
              </div>
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                {t(finance.caseStudy.architecture.description, locale)}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
