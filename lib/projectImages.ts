import { projects } from "@/data/projects";
import { publicFileExists } from "@/lib/publicFile";

export type ImageAvailability = Record<string, boolean>;

/**
 * Server-only: precomputes which project screenshots actually exist on disk.
 * `publicFileExists` uses Node's fs, so this must run in a Server Component
 * and be passed down as plain data — BrowserFrame/MobileFrame themselves no
 * longer touch fs, which keeps them safe to import from Client Components
 * (needed for locale-aware text).
 */
export function getImageAvailability(): ImageAvailability {
  const map: ImageAvailability = {};
  for (const project of projects) {
    for (const image of project.images) {
      map[`${project.slug}:${image.key}`] = Boolean(image.src) && publicFileExists(image.src!);
    }
  }
  return map;
}
