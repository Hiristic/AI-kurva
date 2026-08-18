import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { CookieBanner } from "@/components/cookie-banner";
import { LanguageSwitcher } from "@/components/language-switcher";
import { siteContent } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = siteContent[locale as Locale];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <p className="text-lg font-semibold tracking-wide text-cyan-300">Hiristic</p>
            <p className="text-sm text-slate-300">{content.header.tagline}</p>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden gap-6 text-sm text-slate-200 md:flex">
              <a href="#services">{content.header.services}</a>
              <a href="#security">{content.header.security}</a>
              <a href="#process">{content.header.process}</a>
              <a href="#contact">{content.header.contact}</a>
            </nav>
            <LanguageSwitcher currentLocale={locale as Locale} currentPath={`/${locale}`} />
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-28">
          <div className="space-y-8">
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              {content.hero.badge}
            </span>
            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                {content.hero.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">{content.hero.description}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
              >
                {content.hero.primaryCta}
              </a>
              <Link
                href={`/${locale}/privacy`}
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-medium text-white transition hover:border-cyan-300 hover:text-cyan-200"
              >
                {content.hero.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-950/20">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              {content.hero.cardEyebrow}
            </p>
            <ul className="mt-6 space-y-5 text-sm text-slate-200">
              {content.hero.highlights.map((highlight) => (
                <li key={highlight.title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="font-semibold text-white">{highlight.title}</p>
                  <p className="mt-2 leading-6 text-slate-300">{highlight.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              {content.services.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{content.services.title}</h2>
            <p className="mt-4 text-lg text-slate-300">{content.services.description}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {content.services.items.map((service) => (
              <article key={service.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="security" className="border-y border-white/10 bg-slate-900/70">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                {content.security.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{content.security.title}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">{content.security.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.security.points.map((point) => (
                <div key={point.title} className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-5">
                  <p className="text-base font-semibold text-white">{point.title}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              {content.process.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{content.process.title}</h2>
            <p className="mt-4 text-lg text-slate-300">{content.process.description}</p>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {content.process.steps.map((step, index) => (
              <li key={step.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-sm font-semibold text-slate-950">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="border-t border-white/10 bg-gradient-to-b from-slate-950 to-slate-900">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                {content.contact.eyebrow}
              </p>
              <h2 className="text-3xl font-semibold text-white">{content.contact.title}</h2>
              <p className="text-lg leading-8 text-slate-300">{content.contact.description}</p>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-300">
                <p className="font-semibold text-white">{content.contact.complianceTitle}</p>
                <p className="mt-3">{content.contact.complianceDescription}</p>
              </div>
            </div>
            <ContactForm locale={locale as Locale} labels={content.contact.form} />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>{content.footer.copy}</p>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/privacy`} className="transition hover:text-cyan-200">
              {content.footer.privacy}
            </Link>
            <a href={`/${locale}`} className="transition hover:text-cyan-200">
              {content.footer.home}
            </a>
          </div>
        </div>
      </footer>

      <CookieBanner locale={locale as Locale} content={content.cookieBanner} />
    </div>
  );
}
