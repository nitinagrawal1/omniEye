"use client";

import { useInView } from "./hooks";
import { useLang } from "./lang";

/**
 * Problem — the one light "paper" band on bone. The heading words are
 * struck through in sequence as the section scrolls into view.
 */
export function Problem() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const { c } = useLang();

  return (
    <section id="problem" className="bg-bone text-ink" aria-labelledby="problem-heading">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex items-center gap-3">
          <span className="mono-label tnum text-ember">S-02</span>
          <span className="mono-label text-ink/60">{c.problem.sheetTag}</span>
          <span className="h-px flex-1 bg-ink/25" aria-hidden="true" />
          <span className="mono-label text-ink/60 hidden sm:block">{c.problem.sheetMeta}</span>
        </div>

        <div ref={ref} className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <h2
            id="problem-heading"
            className="font-serif text-[clamp(2.5rem,4vw+1rem,5.25rem)] leading-[1.02] tracking-[-0.01em] lg:col-span-8"
          >
            {c.problem.hA}
            <span className={`strike ${inView ? "is-struck" : ""}`} style={{ "--strike-delay": "150ms" } as React.CSSProperties}>
              {c.problem.hS1}
            </span>
            {c.problem.hM1}
            <span className={`strike ${inView ? "is-struck" : ""}`} style={{ "--strike-delay": "650ms" } as React.CSSProperties}>
              {c.problem.hS2}
            </span>
            {c.problem.hM2}
            <span className={`strike ${inView ? "is-struck" : ""}`} style={{ "--strike-delay": "1150ms" } as React.CSSProperties}>
              {c.problem.hS3}
            </span>
            {c.problem.hM3}
            {c.problem.hEnd}
          </h2>

          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="max-w-md text-base leading-relaxed text-ink/70 md:text-lg">
              {c.problem.body}
            </p>
          </div>
        </div>

        {/* the "before" strip collapsing into a single lasso gesture */}
        <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-4 md:mt-20" aria-hidden="true">
          {c.problem.oldSteps.map((step, i) => (
            <span key={step} className="inline-flex items-center gap-3">
              <span className="border border-ink/30 px-3 py-1.5 mono-label text-ink/55 line-through decoration-ink/70 decoration-2 tnum">
                {`0${i + 1} · ${step}`}
              </span>
              <svg width="26" height="10" viewBox="0 0 26 10" fill="none" className="text-ink/40 shrink-0">
                <path d="M0 5 H23 M19 1 L24 5 L19 9" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </span>
          ))}
          {/* one glowing lasso gesture */}
          <span className="relative inline-flex items-center">
            <svg width="112" height="44" viewBox="0 0 112 44" fill="none" className="capture-glow rounded-[2px]">
              <rect x="4" y="6" width="104" height="32" stroke="#4D7CFF" strokeWidth="2" strokeDasharray="8 6" fill="rgba(77,124,255,0.10)" />
              <rect x="0" y="2" width="9" height="9" fill="#EAE3D2" stroke="#4D7CFF" strokeWidth="1.5" />
              <rect x="103" y="2" width="9" height="9" fill="#EAE3D2" stroke="#4D7CFF" strokeWidth="1.5" />
              <rect x="0" y="33" width="9" height="9" fill="#EAE3D2" stroke="#4D7CFF" strokeWidth="1.5" />
              <rect x="103" y="33" width="9" height="9" fill="#EAE3D2" stroke="#4D7CFF" strokeWidth="1.5" />
            </svg>
            <span className="sr-only">{c.problem.lassoSr}</span>
          </span>
          <span className="mono-label text-ink/70">{c.problem.oneGesture}</span>
        </div>
      </div>
    </section>
  );
}
