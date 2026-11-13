import { SiteHeader } from "@/components/omnieye/header";
import { Hero } from "@/components/omnieye/hero";
import { Problem } from "@/components/omnieye/problem";
import { HowItWorks } from "@/components/omnieye/how-it-works";
import { Features } from "@/components/omnieye/features";
import { About } from "@/components/omnieye/about";
import { Industries } from "@/components/omnieye/industries";
import { FinalCTA } from "@/components/omnieye/final-cta";
import { SiteFooter } from "@/components/omnieye/footer";

export default function LandingPage() {
  // One config value for the final demo video (YouTube / Vimeo / MP4 /
  // Jumpshare). Defaults to the client's delivered 15-second Jumpshare demo.
  const demoVideoUrl =
    process.env.DEMO_VIDEO_URL || "https://jumpshare.com/embed/S18O80bFo59a70lm79Tf";

  return (
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
  );
}
