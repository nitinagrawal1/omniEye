import type { Metadata } from "next";
import { LogoLockup } from "@/components/omnieye/eye-mark";

export const metadata: Metadata = {
  title: "Privacy Policy — OmniEye",
  description:
    "What OmniEye collects on this site (name, work email, role), why, where it is stored, and how to request deletion.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS: { h: string; body: string[] }[] = [
  {
    h: "What we collect",
    body: [
      "When you join the beta waitlist on this site, we collect the details you enter in the form: your name, your work email address, and your role or use-case. We also record the page address you joined from, including any campaign parameters (UTM) in the link you followed.",
      "We do not use tracking cookies on this site, and we do not run third-party analytics by default.",
    ],
  },
  {
    h: "Why we collect it",
    body: [
      "Your details are used for one purpose: to manage the OmniEye private beta. That means sending beta invitations, occasional product updates about the beta, and — if you ask us — support while you test the product.",
      "This site is a marketing site for a product in private beta. OmniEye itself is not installed through this page, and we do not collect any usage data about your computer here.",
    ],
  },
  {
    h: "Where it is stored",
    body: [
      "Waitlist submissions are stored in a Google Sheet inside Google Workspace. Access is limited to the OmniEye team members who need it to run the beta. Google's own privacy and security controls apply to that storage.",
      "We do not sell, rent, or share your personal data with anyone for advertising or any other commercial purpose.",
    ],
  },
  {
    h: "How to request deletion",
    body: [
      "You can ask us to delete your waitlist entry at any time. Email us with the address you signed up with and we will remove it, and confirm once it is done. You can also ask for a copy of the details we hold about you.",
    ],
  },
  {
    h: "Data protection law",
    body: [
      "OmniEye is operated from Dubai, United Arab Emirates. This notice is written with the UAE's federal data protection law in mind (Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data, “PDPL”), together with the general privacy expectations of the jurisdictions our beta users come from.",
      "If you have questions about your rights under the PDPL — access, correction, deletion, or stopping processing — contact us and we will help.",
    ],
  },
  {
    h: "Contact",
    body: [
      "For any privacy question, deletion request, or correction, email privacy@getomnieye.com. We aim to respond within five business days.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <header className="border-b border-rule">
        <div className="mx-auto flex h-16 max-w-[1000px] items-center justify-between px-5 md:px-8">
          <a href="/" className="inline-flex min-h-[44px] items-center" aria-label="OmniEye — back to landing page">
            <LogoLockup />
          </a>
          <a
            href="/"
            className="inline-flex min-h-[44px] items-center mono-label text-graphite transition-colors hover:text-bone"
          >
            ← Back to the site
          </a>
        </div>
      </header>

      <main id="main" className="flex-1">
        <article className="mx-auto max-w-[1000px] px-5 py-16 md:px-8 md:py-24">
          <div className="flex items-center gap-3">
            <span className="mono-label tnum text-aureate">S-PP</span>
            <span className="mono-label text-graphite">PRIVACY POLICY</span>
            <span className="h-px flex-1 bg-rule" aria-hidden="true" />
            <span className="mono-label text-graphite">REV 0</span>
          </div>

          <h1 className="mt-8 font-serif text-[clamp(2.5rem,3vw+1rem,4rem)] leading-[1.05] text-bone">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-graphite">
            Plain-language summary · Last updated 13 November 2026 · Applies to
            this website and the beta waitlist.
          </p>

          <div
            role="note"
            className="mt-8 border border-aureate/50 bg-aureate/10 px-4 py-3"
          >
            <p className="mono-label text-aureate">
              Draft for the client&apos;s legal review before launch — not legal advice.
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {SECTIONS.map((s, i) => (
              <section key={s.h} aria-labelledby={`pp-${i}`}>
                <h2 id={`pp-${i}`} className="flex items-baseline gap-4 font-serif text-2xl text-bone md:text-3xl">
                  <span className="mono-label tnum text-aureate">{`0${i + 1}`}</span>
                  {s.h}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-4 max-w-[65ch] text-base leading-relaxed text-graphite">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>

      <footer className="mt-auto border-t border-rule pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-between gap-3 px-5 py-6 md:px-8">
          <p className="text-sm text-graphite">© 2026 OmniEye. Dubai, UAE.</p>
          <p className="mono-label text-graphite">SAS — See Analyze Show</p>
        </div>
      </footer>
    </div>
  );
}
