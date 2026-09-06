"use client";

import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github, Send } from "lucide-react";
import type { Project } from "@/data/projects";
import { BrowserFrame } from "./BrowserFrame";
import { MobileFrame } from "./MobileFrame";
import { CoverImage } from "./CoverImage";
import { Reveal } from "./Reveal";
import { Parallax } from "./Parallax";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { t } from "@/lib/i18n/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { ImageAvailability } from "@/lib/projectImages";

function TechTags({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tech.map((item) => (
        <li
          key={item}
          className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-ink-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.06] hover:text-ink"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ExternalLinks({ project, dict }: { project: Project; dict: Dictionary }) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      {project.links.live && (
        <a
          href={project.links.live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-ink transition-colors hover:text-accent"
        >
          {dict.work.liveDemo} <ArrowUpRight size={14} aria-hidden />
        </a>
      )}
      {project.links.telegram && (
        <a
          href={project.links.telegram}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-ink transition-colors hover:text-accent"
        >
          <Send size={14} aria-hidden /> {dict.work.openInTelegram}
        </a>
      )}
      {project.links.github && (
        <a
          href={project.links.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-ink-muted transition-colors hover:text-accent"
        >
          <Github size={14} aria-hidden /> {dict.work.source}
        </a>
      )}
    </div>
  );
}

function StatusTag({ project, dict }: { project: Project; dict: Dictionary }) {
  const label = project.links.live ? dict.work.statusLive : project.links.telegram ? dict.work.statusTelegram : dict.work.caseStudy;
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-emerald-400">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
      {label}
    </span>
  );
}

/** Hover overlay with quick-action icon buttons over a project screenshot. */
function HoverActions({ project, dict }: { project: Project; dict: Dictionary }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-3 rounded-xl bg-bg/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
      <Link
        href={`/work/${project.slug}`}
        aria-label={`${dict.work.viewCaseStudy}: ${project.name}`}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink transition-colors hover:border-accent/50 hover:text-accent"
      >
        <ArrowUpRight size={16} aria-hidden />
      </Link>
      {project.links.live && (
        <a
          href={project.links.live}
          target="_blank"
          rel="noreferrer"
          aria-label={`${dict.work.liveDemo}: ${project.name}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink transition-colors hover:border-accent/50 hover:text-accent"
        >
          <ExternalLink size={16} aria-hidden />
        </a>
      )}
      {project.links.telegram && (
        <a
          href={project.links.telegram}
          target="_blank"
          rel="noreferrer"
          aria-label={`${dict.work.openInTelegram}: ${project.name}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink transition-colors hover:border-accent/50 hover:text-accent"
        >
          <Send size={16} aria-hidden />
        </a>
      )}
    </div>
  );
}

export function FeaturedProjectCard({
  project,
  imageAvailability,
}: {
  project: Project;
  imageAvailability: ImageAvailability;
}) {
  const { locale } = useLocale();
  const dict = dictionaries[locale];

  return (
    <Reveal>
      <article className="grid gap-10 rounded-2xl border border-border bg-surface/40 p-6 md:grid-cols-2 md:gap-12 md:p-10">
        <div className="flex min-w-0 flex-col justify-center">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">01 — {t(project.category, locale)}</p>
            <StatusTag project={project} dict={dict} />
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">{project.name}</h3>
          <p className="mt-4 text-ink-muted">{t(project.summary, locale)}</p>
          <ul className="mt-6 space-y-2.5">
            {project.caseStudy.features.slice(0, 4).map((f, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-ink-muted">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{t(f, locale)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7">
            <TechTags tech={project.tech} />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <ExternalLinks project={project} dict={dict} />
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              {dict.work.viewCaseStudy} <ArrowUpRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
        <div
          className="group relative flex min-w-0 items-center"
          data-cursor="project"
          data-cursor-label={dict.work.viewCaseStudy}
        >
          <Parallax strength={18} className="w-full">
            <BrowserFrame
              url={project.links.live?.replace(/^https?:\/\//, "")}
              image={project.images[0]}
              hasImage={imageAvailability[`${project.slug}:${project.images[0].key}`]}
              label={t(project.images[0].label, locale)}
              comingSoonLabel={dict.work.screenshotComingSoon}
              className="w-full"
            />
          </Parallax>
          <HoverActions project={project} dict={dict} />
        </div>
      </article>
    </Reveal>
  );
}

export function ProjectCard({
  project,
  index,
  imageAvailability,
}: {
  project: Project;
  index: number;
  imageAvailability: ImageAvailability;
}) {
  const { locale } = useLocale();
  const dict = dictionaries[locale];
  const isTelegram = Boolean(project.links.telegram) && !project.links.live;

  return (
    <Reveal delay={index * 0.08}>
      <article className="flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
            0{index + 2} — {t(project.category, locale)}
          </p>
          <StatusTag project={project} dict={dict} />
        </div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">{project.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t(project.summary, locale)}</p>

        <div
          className="group relative mt-6"
          data-cursor="project"
          data-cursor-label={dict.work.viewCaseStudy}
        >
          {project.images[0].isCover ? (
            <CoverImage
              image={project.images[0]}
              hasImage={imageAvailability[`${project.slug}:${project.images[0].key}`]}
              label={t(project.images[0].label, locale)}
              comingSoonLabel={dict.work.screenshotComingSoon}
            />
          ) : isTelegram ? (
            <MobileFrame
              image={project.images[0]}
              hasImage={imageAvailability[`${project.slug}:${project.images[0].key}`]}
              label={t(project.images[0].label, locale)}
              comingSoonLabel={dict.work.screenshotComingSoon}
            />
          ) : (
            <BrowserFrame
              url={project.links.live?.replace(/^https?:\/\//, "")}
              image={project.images[0]}
              hasImage={imageAvailability[`${project.slug}:${project.images[0].key}`]}
              label={t(project.images[0].label, locale)}
              comingSoonLabel={dict.work.screenshotComingSoon}
            />
          )}
          <HoverActions project={project} dict={dict} />
        </div>

        <ul className="mt-6 space-y-2">
          {project.caseStudy.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-ink-muted">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
              <span>{t(f, locale)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <TechTags tech={project.tech} />
        </div>

        <div className="mt-auto pt-8 flex flex-wrap items-center justify-between gap-4">
          <ExternalLinks project={project} dict={dict} />
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
          >
            {dict.work.caseStudy} <ArrowUpRight size={14} aria-hidden />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
