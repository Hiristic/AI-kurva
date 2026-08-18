import { localeLabels, locales, switchLocalePathname, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  currentPath: string;
};

export function LanguageSwitcher({ currentLocale, currentPath }: LanguageSwitcherProps) {
  return (
    <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-sm text-slate-300">
      {locales.map((locale) => {
        const isActive = locale === currentLocale;

        return (
          <a
            key={locale}
            href={switchLocalePathname(currentPath, locale)}
            className={`rounded-full px-3 py-1.5 transition ${
              isActive ? "bg-cyan-400 text-slate-950" : "hover:text-white"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {localeLabels[locale]}
          </a>
        );
      })}
    </div>
  );
}
