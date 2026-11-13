"use client";

import { useState } from "react";
import { useLang } from "./lang";

type App = { id: string; tile: string; note: "hidden" | "locked" | "visible" | "blind"; visible: boolean; locked: boolean };

const INITIAL_APPS: App[] = [
  { id: "autocad", tile: "AUTOCAD", note: "visible", visible: true, locked: false },
  { id: "acrobat", tile: "ACROBAT", note: "visible", visible: true, locked: false },
  { id: "chrome", tile: "CHROME", note: "visible", visible: true, locked: false },
  { id: "bank", tile: "BANKING", note: "hidden", visible: false, locked: true },
  { id: "messages", tile: "MESSAGES", note: "locked", visible: false, locked: true },
];

const TILES: Record<string, React.CSSProperties> = {
  autocad: { left: "4%", top: "10%", width: "50%", height: "52%" },
  acrobat: { left: "60%", top: "10%", width: "36%", height: "34%" },
  chrome: { left: "60%", top: "50%", width: "36%", height: "30%" },
  bank: { left: "4%", top: "68%", width: "26%", height: "24%" },
  messages: { left: "34%", top: "68%", width: "26%", height: "24%" },
};

export function Features() {
  const { c } = useLang();
  const [apps, setApps] = useState<App[]>(INITIAL_APPS);

  const toggle = (id: string) => {
    setApps((prev) =>
      prev.map((a) => (a.id === id && !a.locked ? { ...a, visible: !a.visible, note: !a.visible ? "visible" : "blind" } : a))
    );
  };

  const blindCount = apps.filter((a) => !a.visible).length;
  const status = c.features.statusAria.replace("{n}", String(blindCount)).replace("{total}", String(apps.length));

  return (
    <section id="features" className="bg-midnight" aria-labelledby="features-heading">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex items-center gap-3">
          <span className="mono-label tnum text-aureate">S-04</span>
          <span className="mono-label text-graphite">{c.features.sheetTag}</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          <span className="mono-label text-graphite hidden sm:block">{c.features.sheetMeta}</span>
        </div>

        <h2
          id="features-heading"
          className="mt-8 font-serif text-[clamp(2.5rem,3.4vw+1rem,4.75rem)] leading-[1.02] text-bone"
        >
          {c.features.heading}
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
          {/* spec sheet */}
          <div className="border-t border-rule">
            {c.features.specs.map((row, i) => (
              <div
                key={row.label}
                className="grid gap-2 border-b border-rule py-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:gap-8 sm:py-10"
              >
                <div>
                  <p
                    className={`tnum leading-none text-bone ${
                      i < 2
                        ? "font-serif text-[clamp(2.75rem,3.4vw+1.25rem,4.5rem)]"
                        : "font-serif italic text-[clamp(1.9rem,2.2vw+1rem,3rem)] text-aureate"
                    }`}
                  >
                    {row.numeral}
                  </p>
                  <p className="mt-3 mono-label text-aureate">{row.label}</p>
                </div>
                <p className="max-w-md self-center text-base leading-relaxed text-graphite md:text-lg">
                  {row.body}
                </p>
              </div>
            ))}
          </div>

          {/* live privacy panel */}
          <div className="border border-rule bg-ink/60">
            <div className="flex items-center justify-between border-b border-rule px-5 py-3.5">
              <span className="mono-label text-bone/90">{c.features.panelTitle}</span>
              <span className="mono-label text-graphite">{c.features.panelMeta}</span>
            </div>

            {/* mini desktop */}
            <div className="relative h-44 border-b border-rule bg-[#0B0F1D]" aria-hidden="true">
              {apps.map((app) => {
                const blind = !app.visible;
                return (
                  <div
                    key={app.id}
                    className={`absolute flex flex-col overflow-hidden border transition-colors duration-300 ${
                      blind ? "border-ember/70 bg-ink" : "border-bone/35 bg-midnight"
                    }`}
                    style={TILES[app.id]}
                  >
                    <div
                      className={`flex items-center justify-between border-b px-2 py-1 ${
                        blind ? "border-ember/40" : "border-rule"
                      }`}
                    >
                      <span
                        className={`mono-label ${blind ? "text-ember" : "text-bone/70"}`}
                        style={{ fontSize: "9px", letterSpacing: "0.12em" }}
                      >
                        {app.tile}
                      </span>
                      {blind ? (
                        <span className="mono-label text-ember" style={{ fontSize: "9px" }}>
                          {c.features.blind}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex-1 p-2">
                      {blind ? (
                        <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                          <path d="M0 40 L40 0 M20 40 L60 0 M40 40 L80 0 M60 40 L100 0" stroke="rgba(232,85,63,0.35)" strokeWidth="1" />
                        </svg>
                      ) : (
                        <div className="flex h-full flex-col gap-1.5">
                          <span className="h-1.5 w-3/4 bg-bone/25" />
                          <span className="h-1.5 w-1/2 bg-bone/15" />
                          <span className="h-1.5 w-2/3 bg-bone/10" />
                          <span className="mt-auto h-1.5 w-1/3 bg-sapphire/50" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <span className="sr-only" aria-live="polite">{status}</span>
            </div>

            {/* switches */}
            <ul className="divide-y divide-rule">
              {apps.map((app) => (
                <li key={app.id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-bone/90">{c.features.apps[app.id]}</span>
                    <span
                      className={`mono-label ${app.visible ? "text-graphite" : "text-ember"}`}
                      style={{ fontSize: "10px" }}
                    >
                      {app.visible ? c.features.on : c.features.off.replace("{note}", c.features.notes[app.note])}
                    </span>
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={app.visible}
                    aria-label={`${c.features.apps[app.id]} — ${app.visible ? c.features.toggleAriaVisible : c.features.toggleAriaHidden}`}
                    disabled={app.locked}
                    title={app.locked ? c.features.sensitiveTitle : undefined}
                    onClick={() => toggle(app.id)}
                    className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center ${
                      app.locked ? "cursor-not-allowed opacity-60" : ""
                    }`}
                  >
                    <span
                      className={`relative block h-6 w-11 rounded-full border transition-colors duration-200 ${
                        app.visible ? "border-aureate/70 bg-aureate/25" : "border-rule bg-midnight"
                      }`}
                    >
                      <span
                        className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all duration-200 ${
                          app.visible ? "left-[24px] bg-aureate" : "left-[3px] bg-graphite"
                        }`}
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <p className="border-t border-rule px-5 py-3.5 mono-label text-graphite">
              {c.features.panelFoot}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
