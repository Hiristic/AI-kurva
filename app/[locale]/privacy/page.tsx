import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { siteContent } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = siteContent[locale as Locale].privacy;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              Hiristic
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-white">{content.title}</h1>
          </div>
          <LanguageSwitcher currentLocale={locale as Locale} currentPath={`/${locale}/privacy`} />
        </div>

        <div className="mt-10 space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-lg leading-8 text-slate-300">{content.introduction}</p>
          {content.sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
              <p className="leading-7 text-slate-300">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
          >
            {content.backToHome}
          </Link>
          <a
            href="mailto:privacy@hiristic.eu"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-medium text-white transition hover:border-cyan-300 hover:text-cyan-200"
          >
            privacy@hiristic.eu
          </a>
        </div>
      </div>
    </main>
  );
}
