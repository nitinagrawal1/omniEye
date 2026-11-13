"use client";

import { useRef, useState } from "react";

import { COPY, type Lang } from "./copy";
import { useLang } from "./lang";

type Status = "idle" | "submitting" | "success" | "duplicate" | "error";
type FieldErrors = { name?: string; email?: string; role?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm() {
  const { c, lang } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showOther, setShowOther] = useState(false);
  const [otherValue, setOtherValue] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);

  // stable option values come from the English deck; labels are localized
  const roleValues = COPY.en.form.roles;
  const roleLabels: Record<Lang, string[]> = { en: roleValues, ar: COPY.ar.form.roles };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!nameRef.current?.value.trim()) next.name = c.form.errName;
    const email = emailRef.current?.value.trim() ?? "";
    if (!email) next.email = c.form.errEmail;
    else if (!EMAIL_RE.test(email)) next.email = c.form.errEmailFormat;
    if (!roleRef.current?.value) next.role = c.form.errRole;
    return next;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const fieldErrors = validate();
    setErrors(fieldErrors);
    const first = fieldErrors.name ? nameRef : fieldErrors.email ? emailRef : fieldErrors.role ? roleRef : null;
    if (first) {
      first.current?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const form = e.currentTarget;
      const payload = {
        name: nameRef.current!.value.trim(),
        email: emailRef.current!.value.trim(),
        role: roleRef.current!.value,
        roleOther: roleRef.current!.value === "Other" ? otherValue.trim() : undefined,
        company: (form.elements.namedItem("company") as HTMLInputElement)?.value,
        pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
      };
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({ status: "error" }));

      if (data.status === "ok") setStatus("success");
      else if (data.status === "duplicate") setStatus("duplicate");
      else if (data.status === "invalid" && data.fieldErrors) {
        setErrors(data.fieldErrors as FieldErrors);
        setStatus("idle");
        const fe = data.fieldErrors as FieldErrors;
        (fe.name ? nameRef : fe.email ? emailRef : roleRef).current?.focus();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className="border border-ink/40 bg-ink/[0.06] p-6 md:p-8"
        role="status"
        aria-live="polite"
      >
        <p className="mono-label text-ink/70">{c.form.successTag}</p>
        <p className="mt-3 font-serif text-2xl leading-snug text-ink md:text-3xl">
          {c.form.successTitle}
        </p>
        <p className="mt-4 text-sm text-ink/70">
          {c.form.successBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-label={c.form.aria}>
      {/* honeypot — invisible to humans */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-8 md:grid-cols-3 md:gap-6">
        <div>
          <label htmlFor="wl-name" className="mono-label block text-ink/70">
            {c.form.name}
          </label>
          <input
            id="wl-name"
            ref={nameRef}
            name="name"
            type="text"
            required
            autoComplete="name"
            className="sheet-input mt-2"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "wl-name-err" : undefined}
          />
          {errors.name ? (
            <p id="wl-name-err" className="mt-2 text-sm font-medium text-ink">
              <span aria-hidden="true">▲ </span>{errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="wl-email" className="mono-label block text-ink/70">
            {c.form.email}
          </label>
          <input
            id="wl-email"
            ref={emailRef}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            required
            placeholder={c.form.emailPlaceholder}
            className="sheet-input mt-2"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "wl-email-err" : undefined}
          />
          {errors.email ? (
            <p id="wl-email-err" className="mt-2 text-sm font-medium text-ink">
              <span aria-hidden="true">▲ </span>{errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="wl-role" className="mono-label block text-ink/70">
            {c.form.role}
          </label>
          <div className="relative mt-2">
            <select
              id="wl-role"
              ref={roleRef}
              name="role"
              required
              defaultValue=""
              className="sheet-input appearance-none pr-8"
              aria-invalid={errors.role ? "true" : undefined}
              aria-describedby={errors.role ? "wl-role-err" : undefined}
              onChange={(e) => setShowOther(e.target.value === "Other")}
            >
              <option value="" disabled>
                {c.form.select}
              </option>
              {roleValues.map((r, i) => (
                <option key={r} value={r}>
                  {roleLabels[lang][i]}
                </option>
              ))}
            </select>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-ink/70"
            >
              <path d="M1 1 L6 6 L11 1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          {errors.role ? (
            <p id="wl-role-err" className="mt-2 text-sm font-medium text-ink">
              <span aria-hidden="true">▲ </span>{errors.role}
            </p>
          ) : null}
          {showOther ? (
            <input
              type="text"
              name="roleOther"
              autoComplete="off"
              aria-label={c.form.otherAria}
              placeholder={c.form.otherPlaceholder}
              value={otherValue}
              onChange={(e) => setOtherValue(e.target.value)}
              maxLength={120}
              className="sheet-input mt-3"
            />
          ) : null}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[52px] items-center gap-3 bg-ink px-7 py-3 mono-label text-bone transition-transform hover:-translate-y-px disabled:cursor-wait"
        >
          {status === "submitting" ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="animate-spin">
              <circle cx="8" cy="8" r="6.5" stroke="rgba(234,227,210,0.35)" strokeWidth="1.5" />
              <path d="M8 1.5 A6.5 6.5 0 0 1 14.5 8" stroke="#EAE3D2" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : null}
          {c.form.submit}
        </button>

        {status === "duplicate" ? (
          <p role="status" className="text-sm font-medium text-ink">
            {c.form.duplicate}
          </p>
        ) : null}

        {status === "error" ? (
          <div role="alert" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-ink">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-ember" aria-hidden="true" />
              {c.form.error}
            </span>
            <button
              type="submit"
              className="min-h-[44px] border border-ink/60 px-4 py-2 mono-label text-ink hover:border-ink"
            >
              {c.form.retry}
            </button>
            <a href="mailto:hello@getomnieye.com" className="min-h-[44px] inline-flex items-center underline underline-offset-4">
              {c.form.orEmail}
            </a>
          </div>
        ) : null}

        <p className="text-sm text-ink/70">
          {c.form.agree}{" "}
          <a href="/privacy" className="underline underline-offset-4 hover:text-ink">
            {c.form.privacyLink}
          </a>
          .
        </p>
      </div>
    </form>
  );
}
