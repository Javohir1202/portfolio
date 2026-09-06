"use client";

import { projects } from "@/data/projects";
import { FeaturedProjectCard, ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { dictionaries } from "@/lib/i18n/dictionaries";
import type { ImageAvailability } from "@/lib/projectImages";

export function ProjectShowcase({ imageAvailability }: { imageAvailability: ImageAvailability }) {
  const { locale } = useLocale();
  const dict = dictionaries[locale];
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{dict.work.eyebrow}</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            {dict.work.heading}
          </h2>
        </Reveal>

        <div className="mt-14 space-y-6">
          <FeaturedProjectCard project={featured} imageAvailability={imageAvailability} />
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} imageAvailability={imageAvailability} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
