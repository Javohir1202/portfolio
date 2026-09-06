"use client";

import { Quote, ArrowUpRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Reveal } from "./Reveal";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { dictionaries } from "@/lib/i18n/dictionaries";

/**
 * Renders nothing at all until real testimonials replace the placeholder
 * entries in data/testimonials.ts — see that file's `isPlaceholder` field.
 * This is deliberate: a section full of "Client name" / "Role, Company"
 * would look worse than no section at all, so it simply doesn't mount
 * rather than ever risking that.
 */
export function Testimonials() {
  const { locale } = useLocale();
  const dict = dictionaries[locale];
  const real = testimonials.filter((t) => !t.isPlaceholder);

  if (real.length === 0) return null;

  return (
    <section id="testimonials" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{dict.testimonials.eyebrow}</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            {dict.testimonials.heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {real.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-8">
                <Quote className="text-accent/60" size={24} aria-hidden />
                <blockquote className="mt-4 flex-1 text-ink-muted">
                  <p className="leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-ink">{t.name}</p>
                    <p className="text-xs text-ink-faint">{t.role}</p>
                  </div>
                  {t.link && (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-ink-muted transition-colors hover:text-accent"
                      aria-label={`Source for ${t.name}'s testimonial`}
                    >
                      Source <ArrowUpRight size={12} aria-hidden />
                    </a>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
