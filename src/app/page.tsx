import { SiteHeader } from "@/components/omnieye/header";
import { Hero } from "@/components/omnieye/hero";
import { Problem } from "@/components/omnieye/problem";
import { HowItWorks } from "@/components/omnieye/how-it-works";
import { Features } from "@/components/omnieye/features";
import { About } from "@/components/omnieye/about";
import { Industries } from "@/components/omnieye/industries";
import { FinalCTA } from "@/components/omnieye/final-cta";
import { SiteFooter } from "@/components/omnieye/footer";
import { LanguageProvider } from "@/components/omnieye/lang";

export default function LandingPage() {
  // One config value for the final demo video. Defaults to the client's
  // delivered 15-second demo, self-hosted so it plays (and autoplays)
  // everywhere — no third-party embed dependency. Override with
  // DEMO_VIDEO_URL (YouTube / Vimeo / Jumpshare embed / MP4) later.
  const demoVideoUrl =
    process.env.DEMO_VIDEO_URL || "/videos/omnieye-demo.mp4";

  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col bg-ink">
        <SiteHeader />
        <main id="main">
          <Hero demoVideoUrl={demoVideoUrl} />
          <Problem />
          <HowItWorks />
          <Features />
          <About />
          <Industries />
          <FinalCTA />
        </main>
        <SiteFooter />
      </div>
    </LanguageProvider>
  );
}
