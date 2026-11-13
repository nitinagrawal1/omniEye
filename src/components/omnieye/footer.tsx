import { LogoLockup } from "./eye-mark";

/**
 * Footer — a drawing title block: ruled cells for Project, Sheet, Scale,
 * Rev; tagline, © line, Privacy Policy and the trademark line.
 * Sheet numbers and scale labels are decoration only.
 */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-rule bg-ink pb-[env(safe-area-inset-bottom)]" aria-label="Footer">
      <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,640px)] lg:gap-16">
          <div>
            <LogoLockup size={30} />
            <p className="mt-4 font-serif text-2xl text-bone/90">
              SAS — See Analyze Show
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-graphite">
              Product names and logos are trademarks of their respective owners.
              No affiliation or endorsement implied.
            </p>
          </div>

          {/* title block cells — decoration, never copy that claims anything */}
          <div className="grid grid-cols-2 border border-rule sm:grid-cols-4">
            <div className="border-b border-r border-rule p-4 sm:border-b-0">
              <p className="mono-label text-graphite">Project</p>
              <p className="mt-2 font-mono text-xs text-bone/85">OMNIEYE</p>
            </div>
            <div className="border-b border-rule p-4 sm:border-b-0 sm:border-r">
              <p className="mono-label text-graphite">Sheet</p>
              <p className="mt-2 font-mono text-xs text-bone/85 tnum">01 / 01</p>
            </div>
            <div className="border-r border-rule p-4">
              <p className="mono-label text-graphite">Scale</p>
              <p className="mt-2 font-mono text-xs text-bone/85 tnum">1:1</p>
            </div>
            <div className="p-4">
              <p className="mono-label text-graphite">Rev</p>
              <p className="mt-2 font-mono text-xs text-bone/85">A · BETA</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
          <p className="text-sm text-graphite">© 2026 OmniEye. Dubai, UAE.</p>
          <a
            href="/privacy"
            className="inline-flex min-h-[44px] items-center mono-label text-bone/80 transition-colors hover:text-aureate"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
