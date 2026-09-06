"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { LOCALES, type Locale } from "./types";

const STORAGE_KEY = "locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Client-side locale switcher (no URL-based routing) — the whole site is one
 * static build; only the displayed strings change. Server-rendered HTML is
 * always English so there's no hydration mismatch; a stored preference (or
 * the browser's language) is applied a moment after mount, same trade-off
 * ServiceFlow's own LanguageProvider makes.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && (LOCALES as readonly string[]).includes(stored)) {
        setLocaleState(stored as Locale);
        return;
      }
      const browserLang = window.navigator.language.slice(0, 2);
      if (browserLang === "ru") setLocaleState("ru");
      else if (browserLang === "uz") setLocaleState("uz");
    } catch {
      // localStorage unavailable (private browsing, etc.) — stay on English.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLocale(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLocale must be used within a LanguageProvider");
  return ctx;
}
