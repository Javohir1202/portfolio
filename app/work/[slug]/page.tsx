import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, projectBySlug } from "@/data/projects";
import { ProjectDetail } from "@/components/ProjectDetail";
import { APP_URL } from "@/lib/config";
import { getImageAvailability } from "@/lib/projectImages";
import { t } from "@/lib/i18n/types";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = projectBySlug(params.slug);
  if (!project) return {};

  // Metadata is generated server-side once per build, independent of the
  // visitor's chosen locale (that's a client-side toggle) — English is the
  // canonical default here, same as the rest of the site's <head>.
  const summary = t(project.summary, "en");

  return {
    title: project.name,
    description: summary,
    alternates: { canonical: `${APP_URL}/work/${project.slug}` },
    openGraph: {
      title: project.name,
      description: summary,
      url: `${APP_URL}/work/${project.slug}`,
      type: "article",
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = projectBySlug(params.slug);
  if (!project) notFound();

  return <ProjectDetail project={project} imageAvailability={getImageAvailability()} />;
}
