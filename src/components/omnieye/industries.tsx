"use client";

import { useState } from "react";
import Image from "next/image";
import { CropCorners } from "./chrome";
import { CaptureChip } from "./hud";

/**
 * Industries — three huge serif index rows that expand on hover, focus or
 * tap. Built as an accessible accordion; previews are rebuilt in HTML/SVG.
 */
export function Industries() {
  const [active, setActive] = useState<number>(0);

  const rows = [
    {
      n: "01",
      title: "Education & Research",
      body: "Students, educators, and researchers can instantly highlight complex formulas, textbook diagrams, or dense academic papers to get clear explanations and summaries in real time.",
      visual: <EducationVisual />,
    },
    {
      n: "02",
      title: "Healthcare & Diagnostics",
      body: "Medical professionals and analysts can quickly cross-reference clinical reports, lab tables, and patient records with privacy-first controls that keep sensitive data protected.",
      visual: <HealthcareVisual />,
    },
    {
      n: "03",
      title: "IT & Software Engineering",
      body: "Developers and tech teams can lasso error logs, code blocks, or system architectures right inside their IDE to debug and build faster without breaking focus.",
      visual: <ItVisual />,
    },
  ];

  return (
    <section id="industries" className="bg-ink" aria-labelledby="industries-heading">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex items-center gap-3">
          <span className="mono-label tnum text-aureate">S-06</span>
          <span className="mono-label text-graphite">SHOW</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          <span className="mono-label text-graphite hidden sm:block">INDEX LIST · HOVER OR TAP TO EXPAND</span>
        </div>

        <h2
          id="industries-heading"
          className="mt-8 font-serif text-[clamp(2.5rem,3.4vw+1rem,4.75rem)] leading-[1.02] text-bone"
        >
          Transforming Every Industry
        </h2>

        <div className="mt-12 border-t border-rule">
          {rows.map((row, i) => {
            const open = active === i;
            return (
              <div key={row.n} className="border-b border-rule">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`industry-panel-${i}`}
                  id={`industry-button-${i}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex w-full items-center justify-between gap-6 py-7 text-left md:py-9"
                >
                  <span className="flex min-w-0 items-baseline gap-4 md:gap-8">
                    <span
                      className={`font-serif text-2xl leading-none tnum transition-colors md:text-3xl ${
                        open ? "text-aureate" : "text-graphite"
                      }`}
                    >
                      {row.n}
                    </span>
                    <span
                      className={`font-serif text-[clamp(1.6rem,2.6vw+0.6rem,3.4rem)] leading-tight transition-colors ${
                        open ? "text-bone" : "text-bone/55 group-hover:text-bone/85"
                      }`}
                    >
                      {row.title}
                    </span>
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                    className={`shrink-0 transition-transform duration-300 ${open ? "rotate-45 text-aureate" : "text-graphite"}`}
                  >
                    <path d="M9 1 V17 M1 9 H17" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>

                {open ? (
                  <div
                    id={`industry-panel-${i}`}
                    role="region"
                    aria-labelledby={`industry-button-${i}`}
                    className="animate-[lasso-rise_0.35s_cubic-bezier(0.22,1,0.36,1)_both] pb-10 md:pb-12"
                  >
                    <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                      <p className="max-w-lg text-base leading-relaxed text-graphite md:text-lg">
                        {row.body}
                      </p>
                      <div className="relative md:justify-self-end">
                        {row.visual}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── visuals: the client's real product captures, toned toward the palette ── */

function ConceptTag() {
  return (
    <span className="mono-label text-graphite" style={{ fontSize: "10px" }}>
      Product concept
    </span>
  );
}

function VisualFrame({
  children,
  label,
  caption,
}: {
  children: React.ReactNode;
  label: string;
  caption?: string;
}) {
  return (
    <figure className="w-full max-w-[520px]">
      <div className="relative border border-rule bg-midnight">
        <CropCorners className="-inset-2.5" color="border-bone/35" size={14} />
        {children}
      </div>
      <figcaption className="mt-3 flex items-center justify-between gap-3">
        <ConceptTag />
        <span className="mono-label text-graphite" style={{ fontSize: "10px" }}>
          {label}
        </span>
      </figcaption>
      {caption ? (
        <p className="mt-1 mono-label leading-relaxed text-graphite" style={{ fontSize: "10px" }}>
          {caption}
        </p>
      ) : null}
    </figure>
  );
}

function EducationVisual() {
  return (
    <VisualFrame label="FIG · E-01">
      <div className="flex aspect-[16/10] flex-col justify-between p-5">
        <span className="mono-label text-graphite" style={{ fontSize: "10px" }}>
          TEXTBOOK · CH. 04 — GEOMETRY
        </span>
        <div className="flex items-center justify-between gap-4">
          <span className="font-serif text-3xl text-bone/90 md:text-4xl">
            a<sup className="text-lg">2</sup> + b<sup className="text-lg">2</sup> = c
            <sup className="text-lg">2</sup>
          </span>
          <svg width="72" height="64" viewBox="0 0 72 64" fill="none" aria-hidden="true">
            <path d="M6 58 L64 58 L6 10 Z" stroke="rgba(234,227,210,0.6)" strokeWidth="1.5" fill="none" />
            <path d="M6 52 H12 M6 46 H12 M6 40 H12" stroke="rgba(231,178,74,0.7)" strokeWidth="1" />
            <rect x="34" y="30" width="60" height="44" transform="rotate(90 34 30)" stroke="rgba(77,124,255,0.6)" strokeDasharray="4 3" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <CaptureChip label="Summary ready · 240ms" className="self-start" />
      </div>
    </VisualFrame>
  );
}

function HealthcareVisual() {
  return (
    <VisualFrame
      label="FIG · H-01"
      caption="Illustrative concept. OmniEye is not a medical device."
    >
      <div className="relative aspect-[16/10]">
        {/* the client's patient-lab capture (HIPAA chip removed) */}
        <Image
          src="/mockups/healthcare-1208.webp"
          alt="OmniEye overlay on a patient lab report, with extracted clinical insights: HbA1c, creatinine and cholesterol values correlated with a chest CT impression"
          fill
          sizes="(min-width: 768px) 520px, 100vw"
          className="object-cover"
        />
        {/* tone toward ink/bone */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink/20" />
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-rule px-4 py-2.5">
        <span
          className="inline-flex items-center gap-2 mono-label text-bone/90"
          style={{ fontSize: "10px" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sapphire" aria-hidden="true" />
          Extracted Clinical Insights
        </span>
        <span className="mono-label text-graphite" style={{ fontSize: "10px" }}>
          Privacy-first
        </span>
      </div>
    </VisualFrame>
  );
}

function ItVisual() {
  return (
    <VisualFrame label="FIG · IT-01">
      <div className="relative aspect-[10/11]">
        {/* the client's IDE capture — OmniEye HUD over the code editor */}
        <Image
          src="/mockups/it-code-542.webp"
          alt="OmniEye HUD over a code editor, reporting that code structure analysis is complete with three warnings identified in server logs"
          fill
          sizes="(min-width: 768px) 520px, 100vw"
          className="object-cover"
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink/20" />
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-rule px-4 py-2.5">
        <span
          className="inline-flex items-center gap-2 mono-label text-bone/90"
          style={{ fontSize: "10px" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sapphire" aria-hidden="true" />
          Code structure analysis · inside your IDE
        </span>
        <span className="mono-label text-graphite" style={{ fontSize: "10px" }}>
          No context switch
        </span>
      </div>
    </VisualFrame>
  );
}
