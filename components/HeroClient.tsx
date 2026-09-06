"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Instagram, Send, Mail } from "lucide-react";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { Reveal } from "./Reveal";
import { ConstellationBackground } from "./ConstellationBackground";
import { Magnetic } from "./Magnetic";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { dictionaries } from "@/lib/i18n/dictionaries";

const socials = [
  { href: site.links.github, label: "GitHub", icon: Github },
  { href: site.links.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: site.links.upwork, label: "Upwork", icon: ArrowRight },
  { href: site.links.instagram, label: "Instagram", icon: Instagram },
  { href: site.links.telegram, label: "Telegram", icon: Send },
  { href: `mailto:${site.email}`, label: "Email", icon: Mail },
].filter((s) => s.href);

export function HeroClient({ hasPhoto }: { hasPhoto: boolean }) {
  const { locale } = useLocale();
  const dict = dictionaries[locale];

  return (
    <section className="relative overflow-hidden bg-grid-fade pb-24 pt-40 md:pt-48">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, black, transparent 75%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ maskImage: "linear-gradient(to bottom, black, transparent 70%)" }}
      >
        <ConstellationBackground />
      </div>

      <div className="relative mx-auto max-w-content px-6">
        {site.available && (
          <Reveal>
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-ink-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {dict.hero.availableBadge}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-ink-muted">
                {dict.hero.productsShipped(projects.length)}
              </div>
              {site.responseTime.enabled && (
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-ink-muted">
                  {dict.hero.responseTime(site.responseTime.hours)}
                </div>
              )}
            </div>
          </Reveal>
        )}

        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Reveal delay={0.05}>
              <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-6xl">
                {site.name}
                <span className="mt-2 block bg-gradient-to-r from-accent to-sky-400 bg-clip-text text-2xl font-normal text-transparent md:text-3xl">
                  {dict.hero.roleLine}
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{dict.hero.description}</p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.3}>
                  <Link
                    href="/#work"
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    {dict.hero.ctaWork}
                    <ArrowRight size={16} />
                  </Link>
                </Magnetic>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  {dict.hero.ctaContact}
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.35}>
              <ul className="mt-10 flex flex-wrap items-center gap-5">
                {socials.map(({ href, label, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      aria-label={label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-muted transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      <Icon size={16} aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {site.photo.enabled && (
            <Reveal delay={0.2} className="shrink-0 self-center md:self-auto">
              <div
                className="group/photo rounded-3xl bg-gradient-to-br from-accent/70 via-sky-400/40 to-transparent p-[2px] transition-transform duration-500 hover:-translate-y-1"
                data-cursor="image"
              >
                <div className="relative h-48 w-48 overflow-hidden rounded-3xl bg-surface sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72">
                  {hasPhoto ? (
                    <Image
                      src={site.photo.src}
                      alt={`Portrait of ${site.name}`}
                      fill
                      priority
                      sizes="(min-width: 1024px) 288px, (min-width: 768px) 256px, (min-width: 640px) 224px, 192px"
                      className="object-cover transition-transform duration-700 ease-out group-hover/photo:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-mono text-4xl text-ink-faint">
                      {site.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-20 hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint md:flex">
            {dict.hero.scroll}
            <span className="h-8 w-px bg-gradient-to-b from-ink-faint to-transparent" aria-hidden />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
