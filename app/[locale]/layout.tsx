import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { DocumentLanguage } from "@/components/document-language";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <>
      <DocumentLanguage locale={locale as Locale} />
      {children}
    </>
  );
}
