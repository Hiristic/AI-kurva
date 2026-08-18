"use client";

import { useEffect, useMemo, useState } from "react";
import {
  acceptAllConsent,
  CONSENT_COOKIE_KEY,
  CONSENT_STORAGE_KEY,
  deserializeConsent,
  rejectOptionalConsent,
  shouldShowCookieBanner,
  type CookieConsent,
} from "@/lib/consent";
import type { Locale } from "@/lib/i18n";
import type { CookieBannerContent } from "@/lib/content";

function persistConsent(consent: CookieConsent) {
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  document.cookie = `${CONSENT_COOKIE_KEY}=${consent.status}; path=/; max-age=${60 * 60 * 24 * 180}; samesite=lax`;
}

export function CookieBanner({
  locale,
  content,
}: {
  locale: Locale;
  content: CookieBannerContent;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const storedConsent = deserializeConsent(localStorage.getItem(CONSENT_STORAGE_KEY));
      setAnalyticsEnabled(storedConsent?.analytics ?? false);
      setIsOpen(shouldShowCookieBanner(storedConsent));
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const customConsent = useMemo<CookieConsent>(
    () => ({
      analytics: analyticsEnabled,
      necessary: true,
      status: analyticsEnabled ? "accepted" : "custom",
      updatedAt: new Date().toISOString(),
    }),
    [analyticsEnabled],
  );

  if (!isOpen) {
    return null;
  }

  const closeBanner = (consent: CookieConsent) => {
    persistConsent(consent);
    setShowSettings(false);
    setIsOpen(false);
  };

  return (
    <aside
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-3xl border border-white/15 bg-slate-900 p-6 shadow-2xl shadow-slate-950/60"
      aria-label={content.ariaLabel}
      data-locale={locale}
    >
      <div className="space-y-4">
        <div>
          <p className="text-lg font-semibold text-white">{content.title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{content.description}</p>
        </div>

        {showSettings ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-white">{content.necessaryTitle}</p>
                <p className="mt-1 text-slate-300">{content.necessaryDescription}</p>
              </div>
              <span className="rounded-full bg-cyan-400/20 px-3 py-1 text-xs text-cyan-100">
                {content.alwaysActive}
              </span>
            </div>
            <div className="mt-4 flex items-start justify-between gap-4 border-t border-white/10 pt-4">
              <div>
                <p className="font-medium text-white">{content.analyticsTitle}</p>
                <p className="mt-1 text-slate-300">{content.analyticsDescription}</p>
              </div>
              <label className="inline-flex items-center gap-2 text-sm text-slate-100">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/20 bg-transparent"
                  checked={analyticsEnabled}
                  onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                />
                {content.analyticsLabel}
              </label>
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => closeBanner(acceptAllConsent())}
            className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
          >
            {content.accept}
          </button>
          <button
            type="button"
            onClick={() => closeBanner(rejectOptionalConsent())}
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30"
          >
            {content.reject}
          </button>
          <button
            type="button"
            onClick={() => (showSettings ? closeBanner(customConsent) : setShowSettings(true))}
            className="rounded-full border border-cyan-400/30 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300"
          >
            {showSettings ? content.saveSettings : content.settings}
          </button>
        </div>
      </div>
    </aside>
  );
}
