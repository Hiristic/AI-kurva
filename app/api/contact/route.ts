import { NextResponse } from "next/server";
import { contactValidationMessages, validateContactForm } from "@/lib/contact";
import { isLocale } from "@/lib/i18n";

const DEFAULT_TIMEOUT_MS = 10000;

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const requestLocale = request.headers.get("x-locale");
  const locale = requestLocale && isLocale(requestLocale) ? requestLocale : "en";
  const validation = validateContactForm(payload, contactValidationMessages[locale]);

  if (!validation.success) {
    return NextResponse.json(
      { ok: false, errors: validation.errors, message: "Validation failed." },
      { status: 400 },
    );
  }

  const endpoint = process.env.CONTACT_API_URL;

  if (!endpoint) {
    return NextResponse.json(
      { ok: false, message: "CONTACT_API_URL is not configured." },
      { status: 500 },
    );
  }

  const controller = new AbortController();
  const timeout = Number(process.env.CONTACT_API_TIMEOUT_MS ?? DEFAULT_TIMEOUT_MS);
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const upstreamResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.CONTACT_API_BEARER_TOKEN
          ? { authorization: "Bearer " + process.env.CONTACT_API_BEARER_TOKEN }
          : {}),
      },
      body: JSON.stringify({
        ...validation.data,
        source: "hiristic-website",
        submittedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        { ok: false, message: "Unable to submit the request right now." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to reach the contact service." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
