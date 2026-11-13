import { Reveal } from "./reveal";

/**
 * About — editorial: large serif statement, drop cap, two newspaper
 * columns on desktop, small mono margin notes.
 */
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
        </div>
      </div>
    </section>
  );
}
