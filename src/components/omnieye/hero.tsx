"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { CropCorners } from "./chrome";
import { VideoModal, jumpshareEmbed } from "./video-modal";
import { useLang } from "./lang";
import { useMediaQuery } from "./hooks";

/**
 * Hero — balanced two-column desktop layout: copy on the left, the live
 * demo player on the right. No overlapping elements, no dead space.
 * The Jumpshare embed plays automatically on load (muted-capable autoplay);
 * the client's AutoCAD capture stays underneath as a loading backdrop.
 */
export function Hero({ demoVideoUrl }: { demoVideoUrl?: string | null }) {
  const [open, setOpen] = useState(false);
  const { c } = useLang();
  const sectionRef = useRef<HTMLElement | null>(null);
  const frame = useRef<number | null>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const embedSrc = jumpshareEmbed(demoVideoUrl ?? "");
  const isFileVideo = !!demoVideoUrl && /\.(mp4|webm|mov)(\?.*)?$/i.test(demoVideoUrl);

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

      {/* vertical tagline along the outer edge (wide screens only) */}
      <span
        aria-hidden="true"
        className="absolute end-4 top-1/2 hidden -translate-y-1/2 mono-label text-graphite/70 [writing-mode:vertical-rl] 2xl:block"
      >
        {c.hero.verticalTag}
      </span>

      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32 lg:pb-24 lg:pt-36">
        <div className="mb-8 flex items-center gap-3 md:mb-10">
          <span className="mono-label tnum text-aureate">S-01</span>
          <span className="mono-label text-graphite">{c.hero.sheetTag}</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          <span className="mono-label text-graphite hidden sm:block">{c.hero.sheetMeta}</span>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,1fr)] lg:gap-10 xl:gap-14">
          {/* left column — the pitch */}
          <div className="relative z-20">
            <p className="mb-6 inline-flex items-center gap-2 border border-rule bg-ink/60 px-3.5 py-2 mono-label text-aureate">
              {c.hero.chip}
            </p>

            <h1
              id="hero-heading"
              className="pointer-events-none max-w-[16ch] font-serif text-[clamp(2.75rem,2.6vw+1.5rem,5.5rem)] leading-[1.02] tracking-[-0.01em] text-bone"
            >
              {c.hero.h1A}
              <em className="italic text-aureate">{c.hero.h1Em}</em>
              {c.hero.h1B}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite md:text-lg">
              {c.hero.sub}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#join"
                className="inline-flex min-h-[48px] items-center bg-aureate px-6 py-3 mono-label text-ink transition-transform hover:-translate-y-px hover:brightness-105"
              >
                {c.hero.primary}
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
                {c.hero.secondary}
              </button>
            </div>
          </div>

          {/* right column — the live demo player, framed */}
          <div className="relative z-10">
            <div className="relative lg:me-1 xl:me-4 2xl:me-8">
              <CropCorners className="-inset-3" color="border-bone/45" />
              {/* dimension line above the box */}
              <div className="absolute -top-9 left-0 right-0 hidden items-center gap-3 md:flex" aria-hidden="true">
                <span className="h-px flex-1 bg-rule" />
                <span className="mono-label text-graphite/80 tnum">16:9</span>
                <span className="h-px w-10 bg-rule" />
              </div>

              <div className="relative aspect-video w-full overflow-hidden border border-rule bg-midnight">
                {/* client's real AutoCAD capture — visible until the player paints */}
                <Image
                  src="/mockups/lasso-autocad-1376.webp"
                  alt={c.hero.posterAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 46vw, (min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                />
                {isFileVideo ? (
                  <video
                    src={demoVideoUrl}
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="auto"
                  />
                ) : embedSrc ? (
                  <iframe
                    src={`${embedSrc}?autoplay=1`}
                    title={c.hero.iframeTitle}
                    className="absolute inset-0 h-full w-full"
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                ) : null}
              </div>

              <p className="mt-4 mono-label text-graphite">{c.hero.footnote}</p>
            </div>
          </div>
        </div>
      </div>

      <VideoModal open={open} onOpenChange={setOpen} demoVideoUrl={demoVideoUrl} />
    </section>
  );
}
