"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { COPY, type Copy, type Lang } from "./copy";

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** The full bilingual copy deck for the active language. */
  c: Copy;
  /** True when the active language renders right-to-left. */
  rtl: boolean;
};

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "omnieye-lang";

/**
 * Client-side language switch (English default, Arabic for the Dubai
 * market). Persists the choice in localStorage and flips <html lang/dir>
 * so the whole document renders RTL for Arabic.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // restore the saved choice after hydration (SSR always renders English;
  // swapping post-hydration is intentional to avoid a text-content mismatch)
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-hydration restore to avoid SSR mismatch
      if (saved === "ar" || saved === "en") setLangState(saved);
    } catch {
      /* private mode — ignore */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang === "ar" ? "ar" : "en";
    root.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, c: COPY[lang], rtl: lang === "ar" }),
    [lang, setLang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}

/** Compact EN / العربية toggle used in the header. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, c } = useLang();
  return (
    <div
      role="group"
      aria-label={c.misc.langAria}
      className={`inline-flex items-center border border-rule ${className}`}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`min-h-[36px] px-2.5 mono-label tnum transition-colors ${
          lang === "en" ? "bg-aureate text-ink" : "text-graphite hover:text-bone"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
        className={`min-h-[36px] px-2.5 text-sm leading-none transition-colors ${
          lang === "ar" ? "bg-aureate text-ink" : "text-graphite hover:text-bone"
        }`}
        style={{ fontFamily: "var(--font-arabic-sans), system-ui" }}
      >
        العربية
      </button>
    </div>
  );
}
