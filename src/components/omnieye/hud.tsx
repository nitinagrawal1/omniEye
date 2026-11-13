"use client";

import { useState } from "react";
import { EyeMark } from "./eye-mark";

/** Mono chip announcing a completed capture. */
export function CaptureChip({
  label = "Lasso Context Capture · 240ms",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={`lasso-chip inline-flex items-center gap-2 border border-sapphire/60 bg-ink/85 px-3 py-1.5 mono-label text-bone/90 capture-glow ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-sapphire" aria-hidden="true" />
      <span className="tnum">{label}</span>
    </span>
  );
}

/** Global hotkey pill — Alt + Space, per the client mockups. */
export function HotkeyPill({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex flex-col items-center gap-2.5 ${className}`}
      aria-label="Hotkey: Alt plus Space, OmniEye overlay activated"
    >
      <span className="inline-flex items-center gap-2" aria-hidden="true">
        <kbd className="border border-rule bg-ink/85 px-3 py-1.5 font-mono text-sm text-bone shadow-[inset_0_-2px_0_rgba(234,227,210,0.14)]">
          Alt
        </kbd>
        <span className="mono-label text-graphite">+</span>
        <kbd className="border border-rule bg-ink/85 px-3 py-1.5 font-mono text-sm text-bone shadow-[inset_0_-2px_0_rgba(234,227,210,0.14)]">
          Space
        </kbd>
      </span>
      <span className="mono-label text-graphite">OmniEye Overlay Activated</span>
    </span>
  );
}

export type HudRow = { k: string; v: string };

/**
 * The floating HUD answer card, rebuilt live in HTML (crisper than the
 * supplied mockups). Copy button copies the extracted rows.
 */
export function HudCard({
  headline = "Extracted Data",
  rows,
  source,
  className = "",
}: {
  headline?: string;
  rows: HudRow[];
  source?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = rows.map((r) => `${r.k}: ${r.v}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={`lasso-hud w-[min(92vw,340px)] border border-rule bg-ink/95 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
        <span className="inline-flex items-center gap-2 mono-label text-bone/90">
          <EyeMark size={14} />
          OmniEye HUD
        </span>
        <span className="mono-label text-aureate tnum">240ms</span>
      </div>
      <div className="px-4 py-3">
        <p className="mono-label text-graphite">{headline}</p>
        <dl className="mt-2 space-y-1.5">
          {rows.map((r) => (
            <div key={r.k} className="flex items-baseline justify-between gap-4">
              <dt className="text-sm text-graphite">{r.k}</dt>
              <dd className="font-mono text-[13px] text-bone tnum text-right">{r.v}</dd>
            </div>
          ))}
        </dl>
        {source ? (
          <p className="mt-3 border-t border-rule pt-2 font-mono text-[11px] text-graphite">
            SRC · {source}
          </p>
        ) : null}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-rule px-4 py-2.5">
        <span className="truncate font-mono text-[11px] text-graphite" aria-hidden="true">
          Ask a question…
        </span>
        <button
          type="button"
          onClick={copy}
          className="min-h-[32px] border border-rule px-3 py-1 mono-label text-bone/90 hover:border-aureate hover:text-aureate transition-colors"
          aria-label="Copy extracted data"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
