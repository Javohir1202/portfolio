"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Adds inertial/eased scrolling site-wide. Lenis drives the browser's real
 * scroll position via requestAnimationFrame (it's still `window.scrollY`
 * under the hood, not a transformed wrapper), so existing scroll-position
 * code — the Navbar's scroll-spy IntersectionObserver, Reveal's own
 * observer, anchor-link jumps — keeps working unmodified.
 *
 * Skipped entirely for prefers-reduced-motion: native scroll is the more
 * accessible choice there, not a lesser one.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return null;
}
