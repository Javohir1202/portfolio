import fs from "node:fs";
import path from "node:path";

/**
 * Checks whether a file referenced by its /public URL actually exists on disk.
 * Used so optional assets (profile photo, project screenshots) that haven't
 * been supplied yet degrade to a placeholder instead of a broken <Image>.
 * Server-side only — do not import from a "use client" component.
 */
export function publicFileExists(publicPath: string): boolean {
  if (!publicPath) return false;
  const clean = publicPath.replace(/^\//, "");
  try {
    return fs.existsSync(path.join(process.cwd(), "public", clean));
  } catch {
    return false;
  }
}
