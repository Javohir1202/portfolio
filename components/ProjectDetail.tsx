"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, Send } from "lucide-react";
import type { Project } from "@/data/projects";
import { BrowserFrame } from "./BrowserFrame";
import { MobileFrame } from "./MobileFrame";
import { CoverImage } from "./CoverImage";
import { Reveal } from "./Reveal";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { t } from "@/lib/i18n/types";
import type { ImageAvailability } from "@/lib/projectImages";

function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="border-t border-border py-12 first:border-t-0 first:pt-0">
        <div className="grid gap-4 md:grid-cols-[220px_1fr] md:gap-12">
          <div className="flex items-baseline gap-3 md:block">
            <span className="font-mono text-xs text-ink-faint">{index}</span>
            <h2 className="text-lg font-medium text-ink md:mt-1">{title}</h2>
          </div>
          <div className="max-w-2xl text-ink-muted [&_p]:leading-relaxed [&_li]:leading-relaxed">
            {children}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

export function ProjectDetail({
  project,
  imageAvailability,
}: {
  project: Project;
  imageAvailability: ImageAvailability;
}) {
  const { locale } = useLocale();
  const dict = dictionaries[locale];
  const isTelegramOnly = Boolean(project.links.telegram) && !project.links.live;
  const hasImage = (key: string) => imageAvailability[`${project.slug}:${key}`];

  return (
    <article className="pb-32 pt-32 md:pt-40">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} aria-hidden />
            {dict.projectDetail.backToWork}
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">{t(project.category, locale)}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">{project.name}</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-muted">{t(project.summary, locale)}</p>

          <div className="mt-7 flex flex-wrap items-center gap-6">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
              >
                {dict.work.liveDemo} <ArrowUpRight size={14} aria-hidden />
              </a>
            )}
            {project.links.telegram && (
              <a
                href={project.links.telegram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Send size={14} aria-hidden /> {dict.work.openInTelegram}
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
              >
                <Github size={14} aria-hidden /> {dict.work.source}
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14">
            {project.images[0].isCover ? (
              <CoverImage
                image={project.images[0]}
                hasImage={hasImage(project.images[0].key)}
                label={t(project.images[0].label, locale)}
                comingSoonLabel={dict.work.screenshotComingSoon}
                priority
              />
            ) : isTelegramOnly ? (
              <div className="flex flex-wrap justify-center gap-6 rounded-2xl border border-border bg-surface/30 p-10">
                {project.images.map((img) => (
                  <MobileFrame
                    key={img.key}
                    image={img}
                    hasImage={hasImage(img.key)}
                    label={t(img.label, locale)}
                    comingSoonLabel={dict.work.screenshotComingSoon}
                  />
                ))}
              </div>
            ) : (
              <BrowserFrame
                url={project.links.live?.replace(/^https?:\/\//, "")}
                image={project.images[0]}
                hasImage={hasImage(project.images[0].key)}
                label={t(project.images[0].label, locale)}
                comingSoonLabel={dict.work.screenshotComingSoon}
                priority
              />
            )}
          </div>
        </Reveal>

        {!isTelegramOnly && project.images.length > 1 && (
          <Reveal delay={0.15}>
            <div className="mt-6 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.images.slice(1).map((img) => (
                <BrowserFrame
                  key={img.key}
                  image={img}
                  hasImage={hasImage(img.key)}
                  label={t(img.label, locale)}
                  comingSoonLabel={dict.work.screenshotComingSoon}
                />
              ))}
            </div>
          </Reveal>
        )}

        <div className="mt-8">
          <Section index="01" title={dict.projectDetail.sections.overview}>
            <p>{t(project.caseStudy.overview, locale)}</p>
          </Section>

          <Section index="02" title={dict.projectDetail.sections.problem}>
            <p>{t(project.caseStudy.problem, locale)}</p>
          </Section>

          <Section index="03" title={dict.projectDetail.sections.solution}>
            <p>{t(project.caseStudy.solution, locale)}</p>
          </Section>

          <Section index="04" title={dict.projectDetail.sections.features}>
            <ul className="space-y-2.5">
              {project.caseStudy.features.map((f, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{t(f, locale)}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section index="05" title={dict.projectDetail.sections.architecture}>
            <p>{t(project.caseStudy.architecture.description, locale)}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {project.caseStudy.architecture.flow.map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded-md border border-border bg-bg-raised px-3 py-1.5 font-mono text-xs text-ink">
                    {step}
                  </span>
                  {i < project.caseStudy.architecture.flow.length - 1 && (
                    <span className="text-ink-faint" aria-hidden>
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
          </Section>

          <Section index="06" title={dict.projectDetail.sections.techStack}>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border px-3 py-1 font-mono text-xs text-ink-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.06] hover:text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section index="07" title={dict.projectDetail.sections.challenges}>
            <ul className="space-y-4">
              {project.caseStudy.challenges.map((c, i) => (
                <li key={i}>{t(c, locale)}</li>
              ))}
            </ul>
          </Section>

          <Section index="08" title={dict.projectDetail.sections.outcome}>
            <p>{t(project.caseStudy.outcome, locale)}</p>
          </Section>
        </div>
      </div>
    </article>
  );
}
