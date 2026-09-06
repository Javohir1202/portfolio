"use client";

import { useId, useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { dictionaries } from "@/lib/i18n/dictionaries";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-lg border border-border bg-surface/60 px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-colors focus-visible:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40";

export function ContactForm() {
  const { locale } = useLocale();
  const dict = dictionaries[locale];
  const form = dict.contact.form;
  const formId = useId();

  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [company, setCompany] = useState(""); // honeypot — real visitors leave this empty
  const [status, setStatus] = useState<Status>("idle");
  const [fieldError, setFieldError] = useState<string | null>(null);

  const update = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = (): string | null => {
    if (!values.name.trim()) return form.validation.nameRequired;
    if (!EMAIL_RE.test(values.email.trim())) return form.validation.emailInvalid;
    if (!values.message.trim()) return form.validation.messageRequired;
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setFieldError(error);
      return;
    }
    setFieldError(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface/40 px-6 py-12 text-center">
        <CheckCircle2 className="text-emerald-400" size={28} aria-hidden />
        <p className="text-lg font-medium text-ink">{form.successTitle}</p>
        <p className="max-w-sm text-sm text-ink-muted">{form.successBody}</p>
        <button
          type="button"
          onClick={() => {
            setValues({ name: "", email: "", subject: "", message: "" });
            setStatus("idle");
          }}
          className="mt-2 text-sm font-medium text-accent transition-opacity hover:opacity-80"
        >
          {form.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full text-left">
      {/* Honeypot: hidden from real visitors, invisible-but-present for simple bots that fill every field.
          Tailwind's `sr-only` clips via `clip-rect`, not a huge negative offset, so it can't introduce
          horizontal scroll the way `absolute -left-[9999px]` can on an unconstrained ancestor. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="mb-1.5 block text-xs font-medium text-ink-muted">
            {form.nameLabel}
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            autoComplete="name"
            placeholder={form.namePlaceholder}
            className={inputClass}
            value={values.name}
            onChange={update("name")}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="mb-1.5 block text-xs font-medium text-ink-muted">
            {form.emailLabel}
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            autoComplete="email"
            placeholder={form.emailPlaceholder}
            className={inputClass}
            value={values.email}
            onChange={update("email")}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`${formId}-subject`} className="mb-1.5 block text-xs font-medium text-ink-muted">
          {form.subjectLabel}
        </label>
        <input
          id={`${formId}-subject`}
          type="text"
          placeholder={form.subjectPlaceholder}
          className={inputClass}
          value={values.subject}
          onChange={update("subject")}
        />
      </div>

      <div className="mt-5">
        <label htmlFor={`${formId}-message`} className="mb-1.5 block text-xs font-medium text-ink-muted">
          {form.messageLabel}
        </label>
        <textarea
          id={`${formId}-message`}
          rows={5}
          placeholder={form.messagePlaceholder}
          className={`${inputClass} resize-none`}
          value={values.message}
          onChange={update("message")}
        />
      </div>

      {(fieldError || status === "error") && (
        <p className="mt-4 flex items-center gap-2 text-sm text-red-400">
          <AlertCircle size={15} aria-hidden />
          {fieldError ?? form.errorBody}
        </p>
      )}

      <div className="mt-6 flex justify-center">
        <Magnetic strength={0.25}>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-60"
          >
            <Send size={16} aria-hidden />
            {status === "submitting" ? form.sending : form.send}
          </button>
        </Magnetic>
      </div>
    </form>
  );
}
