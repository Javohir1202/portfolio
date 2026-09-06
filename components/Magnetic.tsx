"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps a single interactive child (a button/link) and gives it a subtle
 * magnetic pull toward the cursor while hovered, springing back smoothly on
 * leave. No rAF loop — the follow itself is an instant, untransitioned
 * transform write (so it tracks the cursor tightly, which is what actually
 * reads as "magnetic"), and only the release gets a CSS transition.
 * Reserved for a couple of primary CTAs — not applied broadly.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotionRef = useRef<boolean | null>(null);

  const prefersReducedMotion = () => {
    if (reduceMotionRef.current === null) {
      reduceMotionRef.current =
        typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return reduceMotionRef.current;
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    el.style.transition = "";
    el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </div>
  );
}
