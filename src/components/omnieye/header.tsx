"use client";

import { useEffect, useState } from "react";
import { LogoLockup } from "./eye-mark";

const NAV = [
  { sheet: "S-03", label: "How it works", href: "#how-it-works" },
  { sheet: "S-04", label: "Features", href: "#features" },
  { sheet: "S-06", label: "Industries", href: "#industries" },
  { sheet: "S-05", label: "About", href: "#about" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Close the mobile sheet whenever the hash changes (anchor navigation).
  useEffect(() => {
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-5 md:px-8">
        <a href="#top" className="min-h-[44px] inline-flex items-center" aria-label="OmniEye — back to top">
          <LogoLockup />
        </a>

        <nav aria-label="Sections" className="hidden lg:flex items-center gap-7">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group inline-flex min-h-[44px] items-center gap-2 mono-label text-graphite transition-colors hover:text-bone"
            >
              <span className="text-aureate/80 tnum">{item.sheet}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#join"
            className="hidden sm:inline-flex min-h-[44px] items-center bg-aureate px-5 py-2 mono-label text-ink transition-transform hover:-translate-y-px hover:brightness-105"
          >
            Join Early Access
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="lg:hidden inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-rule text-bone"
            aria-label={open ? "Close section index" : "Open section index"}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {open ? (
                <path d="M3 3 L15 15 M15 3 L3 15" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M2 5 H16 M2 9 H16 M2 13 H16" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="lg:hidden border-t border-rule bg-ink/95 backdrop-blur-md px-5 py-3"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex min-h-[48px] items-center gap-3 mono-label text-bone/90 border-b border-rule/60 last:border-0"
            >
              <span className="text-aureate/80 tnum">{item.sheet}</span>
              <span>{item.label}</span>
            </a>
          ))}
          <a
            href="#join"
            className="mt-3 mb-2 flex min-h-[48px] items-center justify-center bg-aureate px-5 mono-label text-ink"
          >
            Join Early Access
          </a>
        </nav>
      ) : null}
    </header>
  );
}
