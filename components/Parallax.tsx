"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A restrained scroll-linked parallax: drifts its child a few pixels
 * vertically as the element crosses the viewport. Reserved for the
 * featured/hero project screenshot — not applied broadly, so the page still
 * reads as one calm surface rather than a set of competing moving parts.
 *
 * Plain scroll listener + rAF throttle (no library): Lenis already keeps
 * `window.scrollY` and native `scroll` events in sync (confirmed by the
 * existing Navbar scroll-spy), so this composes with it for free. No-ops
 * under prefers-reduced-motion.
 */
export function Parallax({
  children,
  strength = 20,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = outer.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 when the element's center sits at the viewport bottom, +1 at the top.
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const clamped = Math.max(-1, Math.min(1, progress));
      inner.style.transform = `translate3d(0, ${(-clamped * strength).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
