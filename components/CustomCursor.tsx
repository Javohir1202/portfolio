"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "link" | "project" | "image";

const RING_SIZE: Record<CursorState, number> = {
  default: 16,
  link: 44,
  project: 76,
  image: 64,
};

/**
 * Reusable custom cursor: a small dot glued exactly to the pointer, plus a
 * ring that trails a beat behind it (a CSS transition on transform, not a
 * JS animation loop — the browser's own compositor handles the easing).
 * State is read from the hovered element's nearest `data-cursor` attribute,
 * falling back to tag-based detection (a/button) so most of the site needs
 * no markup changes at all.
 *
 * Inert on touch devices (no mouse to track) and under prefers-reduced-motion
 * (the native cursor is the more accessible choice there) — in both cases
 * this renders nothing and never hides the real cursor.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduceMotion) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const resolveState = (target: HTMLElement) => {
      const explicit = target.closest<HTMLElement>("[data-cursor]");
      if (explicit) {
        return {
          state: (explicit.dataset.cursor as CursorState) || "default",
          label: explicit.dataset.cursorLabel || null,
        };
      }
      if (target.closest("button, a")) return { state: "link" as CursorState, label: null };
      return { state: "default" as CursorState, label: null };
    };

    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      // translate3d for position, then a static -50%/-50% to center the
      // element on the point — both live in the same `transform`, since
      // setting el.style.transform always replaces the whole property and
      // would otherwise wipe out a centering translate applied via a class.
      const centered = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      if (dotRef.current) dotRef.current.style.transform = centered;
      if (ringRef.current) ringRef.current.style.transform = centered;
      const { state: next, label: nextLabel } = resolveState(e.target as HTMLElement);
      setState((prev) => (prev === next ? prev : next));
      setLabel(nextLabel);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("custom-cursor-active");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  const size = RING_SIZE[state];

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 rounded-full bg-accent transition-opacity duration-150"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full border border-accent/60 bg-accent/[0.06] backdrop-blur-[1px]"
        style={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          transitionProperty: "width, height, opacity, transform",
          transitionDuration: "200ms, 200ms, 150ms, 220ms",
          transitionTimingFunction: "ease-out, ease-out, ease-out, cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {label && (
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.1em] text-ink">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
