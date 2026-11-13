import Image from "next/image";
import { Reveal } from "./reveal";

/**
 * About — editorial: large serif statement, drop cap, two newspaper
 * columns on desktop, small mono margin notes, plus a filmstrip of the
 * client's real product concept frames (toned toward the palette).
 */

const FRAMES = [
  {
    src: "/mockups/hotkey-900.webp",
    alt: "OmniEye overlay activation: an Alt plus Space key pill glowing over a blurred engineering desktop",
    fig: "P-01",
    label: "HOTKEY ACTIVATION",
  },
  {
    src: "/mockups/hud-autocad-900.webp",
    alt: "OmniEye HUD over AutoCAD showing extracted data: area 42.5 square meters, material Type B Concrete",
    fig: "P-02",
    label: "EXTRACTED DATA · AUTOCAD",
  },
  {
    src: "/mockups/privacy-panel-900.webp",
    alt: "OmniEye privacy and app whitelisting panel with AutoCAD, Acrobat and Chrome visible while banking and messaging apps stay hidden",
    fig: "P-03",
    label: "PRIVACY & WHITELISTING",
  },
] as const;
export function About() {
  return (
    <section id="about" className="bg-ink" aria-labelledby="about-heading">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex items-center gap-3">
          <span className="mono-label tnum text-aureate">S-05</span>
          <span className="mono-label text-graphite">SHOW</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          <span className="mono-label text-graphite hidden sm:block">EDITORIAL</span>
        </div>

        <div className="relative mx-auto mt-10 max-w-5xl">
          {/* mono margin notes — wide screens only, in the side margins */}
          <span
            aria-hidden="true"
            className="absolute -left-40 top-2 hidden w-36 mono-label leading-relaxed text-graphite/80 2xl:block"
          >
            NOTE — HUMAN-AI COLLABORATION, NOT ANOTHER CHAT TAB
          </span>
          <span
            aria-hidden="true"
            className="absolute -left-40 bottom-2 hidden w-36 mono-label leading-relaxed text-graphite/80 2xl:block"
          >
            NOTE — BRINGS INTELLIGENCE DIRECTLY TO THE SCREEN
          </span>

          <Reveal>
            <p className="inline-flex items-center gap-2 border border-aureate/50 px-3 py-1.5 mono-label text-aureate">
              Private Beta
            </p>
            <h2
              id="about-heading"
              className="mt-6 max-w-3xl font-serif text-[clamp(2.5rem,3.4vw+1rem,4.75rem)] leading-[1.04] text-bone"
            >
              A New Era of <em className="italic text-aureate">Human-AI</em>{" "}
              Collaboration
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 gap-12 text-graphite md:columns-2 md:[column-rule:1px_solid_rgba(234,227,210,0.14)]">
              <p className="drop-cap mb-6 text-base leading-relaxed md:text-lg [break-inside:avoid-column]">
                OmniEye is a revolutionary desktop AI overlay built to make human
                life simpler, faster, and more productive. Instead of forcing you
                to switch tabs, copy text, or upload screenshots, OmniEye brings
                instant intelligence directly to whatever is on your screen—saving
                hours of daily effort and eliminating repetitive manual work.
              </p>
              <p className="text-base leading-relaxed md:text-lg [break-inside:avoid-column]">
                Designed for the future of computing, OmniEye works seamlessly
                across every major platform and desktop application with
                ultra-fast, sub-300ms processing speed and rock-solid reliability.
              </p>
            </div>
          </Reveal>

          {/* product concept frames — the client's real captures, toned */}
          <Reveal delay={160}>
            <div className="mt-16 border-t border-rule pt-8">
              <div className="flex items-center gap-3">
                <span className="mono-label tnum text-aureate">FIG · P-01 — P-03</span>
                <span className="h-px flex-1 bg-rule" aria-hidden="true" />
                <span className="mono-label text-graphite">PRODUCT CONCEPT FRAMES</span>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-5">
                {FRAMES.map((f) => (
                  <figure key={f.fig} className="group">
                    <div className="relative overflow-hidden border border-rule">
                      <Image
                        src={f.src}
                        alt={f.alt}
                        width={900}
                        height={506}
                        sizes="(min-width: 640px) 300px, 100vw"
                        className="w-full transition-transform duration-500 group-hover:scale-[1.015]"
                      />
                    </div>
                    <figcaption className="mt-3 flex items-center justify-between gap-2">
                      <span className="mono-label text-bone/80 tnum" style={{ fontSize: "10px" }}>
                        {f.fig} · {f.label}
                      </span>
                      <span className="mono-label text-graphite" style={{ fontSize: "10px" }}>
                        Product concept
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
