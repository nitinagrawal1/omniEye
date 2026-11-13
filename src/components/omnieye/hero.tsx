"use client";

import { useCallback, useRef, useState } from "react";
import { CadView } from "./cad-view";
import { CropCorners } from "./chrome";
import { CaptureChip } from "./hud";
import { VideoModal } from "./video-modal";
import { useMediaQuery } from "./hooks";

/**
 * Hero — "the viewfinder". Huge left-aligned serif headline overlapping an
 * offset 16:9 video box framed by crop marks. Decorative crosshair follows
 * the pointer on fine-pointer devices with motion allowed.
 */
export function Hero({ demoVideoUrl }: { demoVideoUrl?: string | null }) {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const frame = useRef<number | null>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = sectionRef.current;
      if (!el || reducedMotion) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        el.style.setProperty("--ch-x", `${x}px`);
        el.style.setProperty("--ch-y", `${y}px`);
      });
    },
    [reducedMotion]
  );

  const onEnter = useCallback(() => {
    if (!reducedMotion) sectionRef.current?.classList.add("crosshair-live");
  }, [reducedMotion]);

  const onLeave = useCallback(() => {
    sectionRef.current?.classList.remove("crosshair-live");
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="blueprint-grid relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* decorative crosshair */}
      <div className="crosshair-x" aria-hidden="true" />
      <div className="crosshair-y" aria-hidden="true" />

      {/* vertical tagline along the right edge */}
      <span
        aria-hidden="true"
        className="absolute right-5 top-1/2 hidden -translate-y-1/2 mono-label text-graphite/70 [writing-mode:vertical-rl] xl:block"
      >
        SEE · ANALYZE · SHOW
      </span>

      <div className="mx-auto max-w-[1400px] px-5 pt-28 pb-16 md:px-8 md:pt-36 lg:pb-24">
        <div className="mb-8 flex items-center gap-3 md:mb-12">
          <span className="mono-label tnum text-aureate">S-01</span>
          <span className="mono-label text-graphite">SEE</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          <span className="mono-label text-graphite hidden sm:block">BETA WAITLIST OPEN</span>
        </div>

        <p className="mb-6 inline-flex items-center gap-2 border border-rule bg-ink/60 px-3.5 py-2 mono-label text-aureate">
          SAS · See · Analyze · Show
        </p>

        <h1
          id="hero-heading"
          className="pointer-events-none relative z-20 max-w-[15ch] font-serif text-[clamp(2.9rem,4.6vw+1.6rem,7.5rem)] leading-[0.98] tracking-[-0.01em] text-bone"
        >
          Your AI <em className="italic text-aureate">Sees</em> What You See—In Real&nbsp;Time.
        </h1>

        <div className="mt-8 xl:mt-10 xl:grid xl:grid-cols-[minmax(0,35rem)_minmax(0,1fr)] xl:gap-10">
          <div className="relative z-20 max-w-xl">
            <p className="text-base leading-relaxed text-graphite md:text-lg">
              OmniEye is an intent-aware desktop overlay that bridges the
              workspace-AI context gap. Capture any screen region with sub-300ms
              lasso computer vision and get instant AI answers without breaking
              your workflow.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#join"
                className="inline-flex min-h-[48px] items-center bg-aureate px-6 py-3 mono-label text-ink transition-transform hover:-translate-y-px hover:brightness-105"
              >
                Request Beta Access
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex min-h-[48px] items-center gap-3 border border-rule bg-ink/40 px-6 py-3 mono-label text-bone transition-colors hover:border-aureate hover:text-aureate"
                aria-haspopup="dialog"
              >
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
                  <path d="M1 1 L11 7 L1 13 Z" fill="currentColor" />
                </svg>
                Watch 60-Second Demo
              </button>
            </div>
          </div>

          {/* the viewfinder-framed video box, offset lower right */}
          <div className="relative z-10 mt-14 xl:mt-0 xl:-mt-[17rem]">
            <div className="relative xl:mr-4 2xl:mr-10">
              <CropCorners className="-inset-3" color="border-bone/45" />
              {/* dimension line above the box */}
              <div className="absolute -top-9 left-0 right-0 hidden items-center gap-3 md:flex" aria-hidden="true">
                <span className="h-px flex-1 bg-rule" />
                <span className="mono-label text-graphite/80 tnum">16:9</span>
                <span className="h-px w-10 bg-rule" />
              </div>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="group relative block w-full text-left"
                aria-haspopup="dialog"
                aria-label="Open the 60-second demo video"
              >
                <CadView box className="aspect-video w-full" />
                {/* readout */}
                <span className="absolute left-4 top-4 mono-label text-bone/90 tnum bg-ink/70 px-2.5 py-1.5 border border-rule">
                  DEMO · 00:00 / 01:00
                </span>
                {/* play button */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-bone/60 bg-ink/55 backdrop-blur-[2px] transition-all group-hover:scale-105 group-hover:border-aureate group-hover:bg-ink/75 md:h-[72px] md:w-[72px]">
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true">
                      <path d="M2 1.5 L16.5 10 L2 18.5 Z" fill="#EAE3D2" />
                    </svg>
                  </span>
                </span>
                <span className="absolute bottom-4 left-4">
                  <CaptureChip />
                </span>
              </button>
              <p className="mt-4 mono-label text-graphite">
                Sub-300ms refers to screen-region capture. AI response time varies.
              </p>
            </div>
          </div>
        </div>
      </div>

      <VideoModal open={open} onOpenChange={setOpen} demoVideoUrl={demoVideoUrl} />
    </section>
  );
}
