import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/data/projects";

type BrowserFrameProps = {
  url?: string;
  image: ProjectImage;
  /** Whether image.src actually exists on disk — computed server-side via getImageAvailability(), since this component may be rendered from a Client Component and can't touch fs itself. */
  hasImage: boolean;
  /** Already resolved to the current locale by the caller (a client component). */
  label: string;
  comingSoonLabel: string;
  priority?: boolean;
  className?: string;
};

/**
 * Wraps a real product screenshot in a lightweight browser chrome. When no screenshot
 * has been supplied yet (image.src is empty), renders a clearly-labelled placeholder —
 * never a fabricated mockup — so real screenshots can be dropped in later with no
 * markup changes.
 */
export function BrowserFrame({ url, image, hasImage, label, comingSoonLabel, priority, className }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-bg-raised shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
        {url && (
          <div className="ml-3 min-w-0 flex-1 truncate rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-ink-faint">
            {url}
          </div>
        )}
      </div>
      <div className="relative w-full bg-bg-raised" style={{ aspectRatio: image.aspect ?? 1.6 }}>
        {hasImage ? (
          <Image
            src={image.src!}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-contain object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          <ScreenshotPlaceholder label={label} comingSoonLabel={comingSoonLabel} />
        )}
      </div>
    </div>
  );
}

export function ScreenshotPlaceholder({ label, comingSoonLabel }: { label: string; comingSoonLabel: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,rgba(110,140,255,0.06),transparent_60%)] bg-bg-raised">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">{label}</p>
      <p className="relative text-sm text-ink-muted">{comingSoonLabel}</p>
    </div>
  );
}
