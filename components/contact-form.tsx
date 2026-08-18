"use client";

import { useState } from "react";
import {
  contactValidationMessages,
  validateContactForm,
  type ContactFormErrors,
} from "@/lib/contact";
import type { ContactFormContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export function ContactForm({
  locale,
  labels,
}: {
  locale: Locale;
  labels: ContactFormContent;
}) {
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage("");
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    const result = validateContactForm({
      company: formData.get("company"),
      email: formData.get("email"),
      message: formData.get("message"),
      name: formData.get("name"),
      website: formData.get("website"),
    }, contactValidationMessages[locale]);

    if (!result.success) {
      setErrors(result.errors);
      setStatus("error");
      setStatusMessage(labels.validationMessage);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-locale": locale,
        },
        body: JSON.stringify(result.data),
      });

      const responseBody = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(responseBody?.message ?? labels.error);
      }

      formElement.reset();
      setStatus("success");
      setStatusMessage(labels.success);
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : labels.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-slate-950/30">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-200">
          <span>{labels.name}</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
            name="name"
            autoComplete="name"
          />
          {errors.name ? <span className="text-rose-300">{errors.name}</span> : null}
        </label>
        <label className="space-y-2 text-sm text-slate-200">
          <span>{labels.company}</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
            name="company"
            autoComplete="organization"
          />
          {errors.company ? <span className="text-rose-300">{errors.company}</span> : null}
        </label>
        <label className="space-y-2 text-sm text-slate-200 sm:col-span-2">
          <span>{labels.email}</span>
          <input
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
            name="email"
            autoComplete="email"
            type="email"
          />
          {errors.email ? <span className="text-rose-300">{errors.email}</span> : null}
        </label>
        <label className="hidden">
          <span>{labels.website}</span>
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-200 sm:col-span-2">
          <span>{labels.message}</span>
          <textarea
            className="min-h-40 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
            name="message"
          />
          {errors.message ? <span className="text-rose-300">{errors.message}</span> : null}
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-300" role="status">
          {statusMessage}
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? labels.submitting : labels.submit}
        </button>
      </div>
    </form>
  );
}
