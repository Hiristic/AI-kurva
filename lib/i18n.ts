export const locales = ["sv", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sv";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  sv: "SV",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function switchLocalePathname(currentPath: string, nextLocale: Locale) {
  const segments = currentPath.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${nextLocale}`;
  }

  if (isLocale(segments[0])) {
    segments[0] = nextLocale;
    return `/${segments.join("/")}`;
  }

  return `/${nextLocale}/${segments.join("/")}`;
}
