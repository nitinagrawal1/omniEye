"use client";

import { useEffect, useRef, useState } from "react";
import { CadView } from "./cad-view";
import { CaptureChip, HotkeyPill, HudCard } from "./hud";
import { useInView, useMediaQuery } from "./hooks";
import { useLang } from "./lang";

/**
 * How OmniEye Works — scrollytelling: one sticky CAD stage that changes as
 * three large numbered steps scroll past. The lasso demo is rebuilt live
 * in SVG and runs once when step 02 enters view, with a Replay control.
 */
export function HowItWorks() {
  const { c } = useLang();
  const [step, setStep] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const timer = useRef<number | null>(null);
  const playedRef = useRef(false);

  const runLasso = () => {
    playedRef.current = true;
    setPlayKey((k) => k + 1);
    setPlaying(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPlaying(false), 3200);
  };

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const center = { once: false, threshold: 0, rootMargin: "-45% 0px -45% 0px" };

  // which step is centred in the viewport; step 2 also auto-plays the
  // lasso demo once (subscription callbacks, not effect bodies)
  const refs = [
    useInView<HTMLDivElement>({ ...center, onEnter: () => setStep(1) }),
    useInView<HTMLDivElement>({
      ...center,
      onEnter: () => {
        setStep(2);
        if (!playedRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          runLasso();
        }
      },
    }),
    useInView<HTMLDivElement>({ ...center, onEnter: () => setStep(3) }),
  ];

  const box = step >= 2;
  const live = step === 2 && playing && !reducedMotion;
  const canReplay = step === 2;
  const played = playKey > 0;

  return (
    <section id="how-it-works" className="bg-ink" aria-labelledby="how-heading">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex items-center gap-3">
          <span className="mono-label tnum text-aureate">S-03</span>
          <span className="mono-label text-graphite">{c.how.sheetTag}</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          <span className="mono-label text-graphite hidden sm:block">{c.how.sheetMeta}</span>
        </div>

        <h2
          id="how-heading"
          className="mt-8 font-serif text-[clamp(2.5rem,3.4vw+1rem,4.75rem)] leading-[1.02] text-bone"
        >
          {c.how.heading}
        </h2>

        <div className="mt-12 lg:grid lg:grid-cols-[46%_minmax(0,1fr)] lg:gap-12">
          {/* sticky stage — a short sticky strip above each step on mobile */}
          <div className="sticky top-16 z-30 -mx-5 bg-ink/95 px-5 pb-4 pt-4 backdrop-blur-sm lg:top-24 lg:z-auto lg:mx-0 lg:self-start lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0 lg:backdrop-blur-none">
            <div className="relative">
              <CadView
                key={playKey}
                play={played}
                box={box}
                dim={box}
                cursor={live}
                scan={live}
                className="aspect-video w-full border border-rule"
              />

              {/* step 1: hotkey pill */}
              <div
                className={`absolute left-[40%] top-[7%] -translate-x-1/2 transition-all duration-300 ${
                  step === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                }`}
                aria-hidden={step !== 1}
              >
                {step === 1 ? <HotkeyPill /> : <span className="sr-only">Hotkey step</span>}
              </div>

              {/* step 2: capture chip */}
              <div
                className={`lasso-chip absolute left-[4%] top-[6%] transition-opacity duration-300 ${
                  step >= 2 ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <CaptureChip />
              </div>

              {/* step 3: HUD answer card */}
              <div
                className={`lasso-hud absolute bottom-[7%] right-[4%] hidden transition-all duration-300 sm:block ${
                  step === 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
                }`}
                aria-hidden={step !== 3}
              >
                {step === 3 ? (
                  <HudCard
                    rows={c.how.hudRows}
                    source="BEAM B-2 · 250 × 500 MM"
                  />
                ) : null}
              </div>

              {/* replay control lives in the caption row below the stage */}
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="mono-label text-graphite">
                {c.how.stageCaption}
              </p>
              {canReplay && played && !reducedMotion ? (
                <button
                  type="button"
                  onClick={runLasso}
                  className="border border-rule bg-ink/80 px-3 py-2 mono-label text-bone/90 transition-colors hover:border-aureate hover:text-aureate"
                >
                  {c.how.replay}
                </button>
              ) : null}
            </div>
          </div>

          {/* the three steps */}
          <ol className="space-y-6 lg:space-y-0">
            {c.how.steps.map((s, i) => (
              <li
                key={s.n}
                ref={refs[i].ref}
                className="flex min-h-[38vh] flex-col justify-center border-t border-rule py-8 lg:min-h-[64vh] lg:border-t-0 lg:py-0"
                data-active={step === i + 1 || undefined}
              >
                <div
                  className={`flex items-baseline gap-5 transition-opacity duration-500 ${
                    step === i + 1 ? "opacity-100" : "opacity-45"
                  }`}
                >
                  <span
                    className={`font-serif text-6xl md:text-7xl leading-none ${
                      step === i + 1 ? "text-aureate" : "text-graphite"
                    } tnum`}
                  >
                    {s.n}
                  </span>
                  <h3 className="font-serif text-3xl leading-tight text-bone md:text-4xl">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-graphite md:text-lg">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
