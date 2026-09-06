"use client";

import { useLocale } from "@/lib/i18n/LanguageContext";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn("inline-flex items-center rounded-full border border-border p-0.5 font-mono text-xs", className)}
    >
      {LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => setLocale(loc)}
          aria-pressed={locale === loc}
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors",
            locale === loc ? "bg-ink text-bg" : "text-ink-muted hover:text-ink"
          )}
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
