export const LOCALES = ["en", "ru", "uz"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  uz: "UZ",
};

export type LocalizedText = Record<Locale, string>;

export function t(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.en;
}
