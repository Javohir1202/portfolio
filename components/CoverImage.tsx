import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/data/projects";
import { ScreenshotPlaceholder } from "./BrowserFrame";

type CoverImageProps = {
  image: ProjectImage;
  /** Whether image.src actually exists on disk — same convention as BrowserFrame/MobileFrame. */
  hasImage: boolean;
  label: string;
  comingSoonLabel: string;
  priority?: boolean;
  className?: string;
};

/**
 * Plain, undecorated presentation for project *cover art* — deliberately
 * not wrapped in BrowserFrame/MobileFrame's device chrome. Those frames
 * imply "this is a captured screenshot of the real UI"; a designed cover
 * graphic isn't that, and dressing it up as one would misrepresent it.
 * Used for Finance Bot, whose chat-interface screenshots don't make for a
 * good visual on their own — this stands in as honest brand art instead.
 */
export function CoverImage({ image, hasImage, label, comingSoonLabel, priority, className }: CoverImageProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-bg-raised shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <div className="relative w-full" style={{ aspectRatio: image.aspect ?? 1.8 }}>
        {hasImage ? (
          <Image
            src={image.src!}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          <ScreenshotPlaceholder label={label} comingSoonLabel={comingSoonLabel} />
        )}
      </div>
    </div>
  );
}
