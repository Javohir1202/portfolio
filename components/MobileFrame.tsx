import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/data/projects";
import { ScreenshotPlaceholder } from "./BrowserFrame";

type MobileFrameProps = {
  image: ProjectImage;
  /** Whether image.src actually exists on disk — computed server-side via getImageAvailability(). */
  hasImage: boolean;
  /** Already resolved to the current locale by the caller (a client component). */
  label: string;
  comingSoonLabel: string;
  className?: string;
};

export function MobileFrame({ image, hasImage, label, comingSoonLabel, className }: MobileFrameProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[220px] overflow-hidden rounded-[28px] border border-border bg-bg-raised p-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[20px] bg-bg-raised">
        <div className="absolute left-1/2 top-2 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/60" aria-hidden />
        {hasImage ? (
          <Image src={image.src!} alt={image.alt} fill sizes="220px" className="object-cover object-top" />
        ) : (
          <ScreenshotPlaceholder label={label} comingSoonLabel={comingSoonLabel} />
        )}
      </div>
    </div>
  );
}
