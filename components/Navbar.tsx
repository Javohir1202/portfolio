"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { LanguageToggle } from "./LanguageToggle";

const SECTION_IDS = ["work", "capabilities", "process", "about", "contact"] as const;

export function Navbar() {
  const { locale } = useLocale();
  const dict = dictionaries[locale];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const navLinks = [
    { href: "/#work", id: "work", label: dict.nav.work },
    { href: "/#capabilities", id: "capabilities", label: dict.nav.whatIBuild },
    { href: "/#process", id: "process", label: dict.nav.process },
    { href: "/#about", id: "about", label: dict.nav.about },
    { href: "/#contact", id: "contact", label: dict.nav.contact },
  ];

  useEffect(() => {
    const lastId = SECTION_IDS[SECTION_IDS.length - 1];
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // The scroll-spy band below is a thin strip around mid-viewport, which
      // the last section can fail to ever cross if the page can't scroll far
      // enough past it (nothing to push it up through the band) — so once
      // the user is effectively at the bottom, force that last link active.
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      if (atBottom) setActive(lastId);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    // A thin band just above the vertical center of the viewport counts as
    // "current" — the usual scroll-spy trick, so the active link updates
    // right around when a section actually takes over the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: lock body scroll, trap focus inside the header while open,
  // close on Escape, and return focus to the trigger button on close —
  // without this, background content stayed scrollable and tabbable behind
  // an open menu that only visually overlapped it.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !headerRef.current) return;

      // offsetParent is null for display:none elements (among other cases) — filters
      // out the desktop-only nav links/CTA, which stay in the DOM (just hidden via
      // `lg:flex`) and would otherwise pollute the first/last boundary this trap uses.
      const focusable = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-6"
      >
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
        >
          {site.name}<span className="text-accent">.</span>dev
        </Link>

        {/* lg:flex (not md:flex): at 768px the nav's content — logo, links, language
            switcher, CTA — overflows the available row, and flexbox's default
            min-width:auto shrinks whichever text CAN still wrap (multi-word labels)
            before single-word ones budge. That wrapped "What I Build"/"Let's talk" in
            English and, worse, "Что делаю"/"Обо мне" (Russian) and "Nima qilaman"/"Men
            haqimda" (Uzbek) — Uzbek still wrapped even with this gap reduced to 0, so a
            smaller gap alone can't fix every language at 768px. Moving the desktop-nav
            breakpoint to lg (1024px) instead gives the 768–1023px range the (already
            fixed) hamburger menu, which has no width constraint to wrap against; lg+ has
            room to spare for all three languages at the original gap-8. Verified: 768px
            now shows the hamburger button in all 3 locales, and 1024px fits the full
            desktop nav single-line in Russian/Uzbek (the longest two) at gap-8. */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "text-sm underline-offset-[6px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm",
                    isActive ? "text-ink underline decoration-accent" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageToggle />
          <Link
            href="/#contact"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            {dict.nav.letsTalk}
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageToggle />
          <button
            ref={triggerRef}
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              {open ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        // Full-height overlay (not a short dropdown) so it covers the hero
        // content behind it cleanly instead of overlapping/clipping it —
        // combined with the body-scroll-lock effect above, nothing behind
        // this panel is visible, scrollable, or tabbable while it's open.
        <div
          id="mobile-nav"
          className="animate-dropdown-in fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-border bg-bg px-6 pb-6 pt-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-base text-ink-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
