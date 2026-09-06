"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Fade-and-rise reveal on scroll, used for section-level and card-level entrances.
 * Implemented with a plain IntersectionObserver + CSS transitions (no animation
 * library) so it never depends on a requestAnimationFrame-driven engine to actually
 * paint — only the browser's native style/compositor pipeline. A short timeout is a
 * second line of defense: if the observer never fires for any reason, content still
 * becomes visible on its own rather than staying hidden forever. Respects
 * prefers-reduced-motion by skipping the transform and showing content immediately.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mql.matches);

    if (mql.matches) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.01 }
    );
    observer.observe(node);

    // Safety net: never leave content permanently invisible if the observer
    // doesn't cooperate for some reason.
    const fallback = setTimeout(() => setVisible(true), 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        // min-w-0 matters when this div is a direct grid/flex item (e.g. inside a
        // grid-cols-2 row of cards): without it, a grid item's automatic minimum
        // size is based on its content's min-content width, which can force the
        // whole track (and the page) wider than the viewport on narrow screens.
        "min-w-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        reduceMotion ? "" : visible ? "translate-y-0" : "translate-y-5",
        visible ? "opacity-100" : "opacity-0",
        className
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
