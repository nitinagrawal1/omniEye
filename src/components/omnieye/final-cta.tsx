import { CropCorners } from "./chrome";
import { WaitlistForm } from "./waitlist-form";

/**
 * Final CTA — the gold sheet. Full-bleed aureate, ink text, the page's
 * climax and the only gold-filled area. The form is styled like a title
 * block with underline inputs.
 */
export function FinalCTA() {
  return (
    <section id="join" className="bg-aureate text-ink" aria-labelledby="join-heading">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex items-center gap-3">
          <span className="mono-label tnum">S-07</span>
          <span className="mono-label text-ink/60">JOIN</span>
          <span className="h-px flex-1 bg-ink/25" aria-hidden="true" />
          <span className="mono-label text-ink/60 hidden sm:block">PRIVATE BETA · WINDOWS &amp; MACOS</span>
        </div>

        <div className="mt-10 max-w-3xl">
          <h2
            id="join-heading"
            className="font-serif text-[clamp(2.5rem,3.4vw+1rem,4.75rem)] leading-[1.02]"
          >
            Ready to Upgrade Your Desktop Workflow?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/75 md:text-lg">
            Join our private beta list for early access to OmniEye for Windows
            and macOS.
          </p>
        </div>

        <div className="relative mt-12">
          <CropCorners className="-inset-4" color="border-ink/50" size={22} />
          <div className="border border-ink/40 p-6 md:p-10">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}
