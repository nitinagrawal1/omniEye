"use client";

import { LogoLockup } from "@/components/omnieye/eye-mark";
import { LanguageProvider, useLang } from "@/components/omnieye/lang";

function PrivacyContent() {
  const { c } = useLang();

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <header className="border-b border-rule">
        <div className="mx-auto flex h-16 max-w-[1000px] items-center justify-between px-5 md:px-8">
          <a href="/" className="inline-flex min-h-[44px] items-center" aria-label="OmniEye — back to landing page">
            <LogoLockup />
          </a>
          <a
            href="/"
            className="inline-flex min-h-[44px] items-center mono-label text-graphite transition-colors hover:text-bone"
          >
            {c.privacy.back}
          </a>
        </div>
      </header>

      <main id="main" className="flex-1">
        <article className="mx-auto max-w-[1000px] px-5 py-16 md:px-8 md:py-24">
          <div className="flex items-center gap-3">
            <span className="mono-label tnum text-aureate">S-PP</span>
            <span className="mono-label text-graphite">{c.privacy.sheetTag}</span>
            <span className="h-px flex-1 bg-rule" aria-hidden="true" />
            <span className="mono-label text-graphite">REV 0</span>
          </div>

          <h1 className="mt-8 font-serif text-[clamp(2.5rem,3vw+1rem,4rem)] leading-[1.05] text-bone">
            {c.privacy.heading}
          </h1>
          <p className="mt-3 text-sm text-graphite">
            {c.privacy.updated}
          </p>

          <div
            role="note"
            className="mt-8 border border-aureate/50 bg-aureate/10 px-4 py-3"
          >
            <p className="mono-label text-aureate">
              {c.privacy.draft}
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {c.privacy.sections.map((s, i) => (
              <section key={s.h} aria-labelledby={`pp-${i}`}>
                <h2 id={`pp-${i}`} className="flex items-baseline gap-4 font-serif text-2xl text-bone md:text-3xl">
                  <span className="mono-label tnum text-aureate">{`0${i + 1}`}</span>
                  {s.h}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-4 max-w-[65ch] text-base leading-relaxed text-graphite">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>

      <footer className="mt-auto border-t border-rule pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-between gap-3 px-5 py-6 md:px-8">
          <p className="text-sm text-graphite">{c.privacy.copyright}</p>
          <p className="mono-label text-graphite">{c.privacy.tagline}</p>
        </div>
      </footer>
    </div>
  );
}

export default function PrivacyPageContent() {
  return (
    <LanguageProvider>
      <PrivacyContent />
    </LanguageProvider>
  );
}
