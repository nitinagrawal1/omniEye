"use client";

import Image from "next/image";
import { Reveal } from "./reveal";
import { useLang } from "./lang";

/**
 * About — editorial: large serif statement, drop cap, two newspaper
 * columns on desktop, small mono margin notes, plus a filmstrip of the
 * client's real product concept frames (toned toward the palette).
 */

const FRAMES = [
  {
    src: "/mockups/hotkey-900.webp",
    fig: "P-01",
  },
  {
    src: "/mockups/hud-autocad-900.webp",
    fig: "P-02",
  },
  {
    src: "/mockups/privacy-panel-900.webp",
    fig: "P-03",
  },
] as const;

export function About() {
  const { c } = useLang();

  const frameAlts = [
    "OmniEye overlay activation: an Alt plus Space key pill glowing over a blurred engineering desktop",
    "OmniEye HUD over AutoCAD showing extracted data: area 42.5 square meters, material Type B Concrete",
    "OmniEye privacy and app whitelisting panel with AutoCAD, Acrobat and Chrome visible while banking and messaging apps stay hidden",
  ];

  return (
    <section id="about" className="bg-ink" aria-labelledby="about-heading">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex items-center gap-3">
          <span className="mono-label tnum text-aureate">S-05</span>
          <span className="mono-label text-graphite">{c.about.sheetTag}</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          <span className="mono-label text-graphite hidden sm:block">{c.about.sheetMeta}</span>
        </div>

        <div className="relative mx-auto mt-10 max-w-5xl">
          {/* mono margin notes — wide screens only, in the side margins */}
          <span
            aria-hidden="true"
            className="absolute -start-40 top-2 hidden w-36 mono-label leading-relaxed text-graphite/80 2xl:block"
          >
            {c.about.noteA}
          </span>
          <span
            aria-hidden="true"
            className="absolute -start-40 bottom-2 hidden w-36 mono-label leading-relaxed text-graphite/80 2xl:block"
          >
            {c.about.noteB}
          </span>

          <Reveal>
            <p className="inline-flex items-center gap-2 border border-aureate/50 px-3 py-1.5 mono-label text-aureate">
              {c.about.badge}
            </p>
            <h2
              id="about-heading"
              className="mt-6 max-w-3xl font-serif text-[clamp(2.5rem,3.4vw+1rem,4.75rem)] leading-[1.04] text-bone"
            >
              {c.about.hA}
              <em className="italic text-aureate">{c.about.hEm}</em>
              {c.about.hB}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 gap-12 text-graphite md:columns-2 md:[column-rule:1px_solid_rgba(234,227,210,0.14)]">
              <p className="drop-cap mb-6 text-base leading-relaxed md:text-lg [break-inside:avoid-column]">
                {c.about.p1}
              </p>
              <p className="text-base leading-relaxed md:text-lg [break-inside:avoid-column]">
                {c.about.p2}
              </p>
            </div>
          </Reveal>

          {/* product concept frames — the client's real captures, toned */}
          <Reveal delay={160}>
            <div className="mt-16 border-t border-rule pt-8">
              <div className="flex items-center gap-3">
                <span className="mono-label tnum text-aureate">FIG · P-01 — P-03</span>
                <span className="h-px flex-1 bg-rule" aria-hidden="true" />
                <span className="mono-label text-graphite">{c.about.figMeta}</span>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-5">
                {FRAMES.map((f, i) => (
                  <figure key={f.fig} className="group">
                    <div className="relative overflow-hidden border border-rule">
                      <Image
                        src={f.src}
                        alt={frameAlts[i]}
                        width={900}
                        height={506}
                        sizes="(min-width: 640px) 300px, 100vw"
                        className="w-full transition-transform duration-500 group-hover:scale-[1.015]"
                      />
                    </div>
                    <figcaption className="mt-3 flex items-center justify-between gap-2">
                      <span className="mono-label text-bone/80 tnum" style={{ fontSize: "10px" }}>
                        {f.fig} · {c.about.frames[i].label}
                      </span>
                      <span className="mono-label text-graphite" style={{ fontSize: "10px" }}>
                        {c.about.figTag}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
