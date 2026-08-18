export const CONSENT_STORAGE_KEY = "hiristic-cookie-consent";
export const CONSENT_COOKIE_KEY = "hiristic-cookie-consent-status";

export type CookieConsent = {
  analytics: boolean;
  necessary: true;
  status: "accepted" | "rejected" | "custom";
  updatedAt: string;
};

export function acceptAllConsent(): CookieConsent {
  return {
    analytics: true,
    necessary: true,
    status: "accepted",
    updatedAt: new Date().toISOString(),
  };
}

export function rejectOptionalConsent(): CookieConsent {
  return {
    analytics: false,
    necessary: true,
    status: "rejected",
    updatedAt: new Date().toISOString(),
  };
}

export function deserializeConsent(value: string | null): CookieConsent | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<CookieConsent>;

    if (
      typeof parsed.analytics !== "boolean" ||
      parsed.necessary !== true ||
      !parsed.updatedAt ||
      !parsed.status
    ) {
      return null;
    }

    return {
      analytics: parsed.analytics,
      necessary: true,
      status: parsed.status,
      updatedAt: parsed.updatedAt,
    } satisfies CookieConsent;
  } catch {
    return null;
  }
}

export function shouldShowCookieBanner(consent: CookieConsent | null) {
  return consent === null;
}
