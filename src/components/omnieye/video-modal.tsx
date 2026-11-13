"use client";

import Image from "next/image";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CadView } from "./cad-view";

function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}
function vimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}
/** Jumpshare share links embed through jumpshare.com/embed/<id>. */
function jumpshareEmbed(url: string): string | null {
  const m = url.match(/jumpshare\.com\/(?:share\/|embed\/|v\/)?([A-Za-z0-9]{14,})/);
  return m ? `https://jumpshare.com/embed/${m[1]}` : null;
}

/**
 * Demo video dialog. Driven by one config value (DEMO_VIDEO_URL, passed
 * from the server). No autoplay; a clean placeholder when unset.
 */
export function VideoModal({
  open,
  onOpenChange,
  demoVideoUrl,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  demoVideoUrl?: string | null;
}) {
  let embed: { kind: "iframe" | "video"; src: string } | null = null;
  if (demoVideoUrl) {
    const yt = youtubeId(demoVideoUrl);
    const vm = vimeoId(demoVideoUrl);
    const js = jumpshareEmbed(demoVideoUrl);
    if (yt) embed = { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${yt}?rel=0` };
    else if (vm) embed = { kind: "iframe", src: `https://player.vimeo.com/video/${vm}` };
    else if (js) embed = { kind: "iframe", src: js };
    else if (/\.(mp4|webm|mov)(\?.*)?$/i.test(demoVideoUrl)) embed = { kind: "video", src: demoVideoUrl };
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[calc(100%-1.5rem)] max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-4xl rounded-none border-rule bg-ink p-0 gap-0 overscroll-contain"
        aria-describedby={undefined}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-rule bg-ink px-4 py-3 md:px-5">
          <DialogTitle className="mono-label text-bone/90 font-normal tracking-[0.18em] uppercase">
            Demo · 00:00 / 00:15
          </DialogTitle>
          <DialogClose
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-rule text-bone/80 transition-colors hover:border-aureate hover:text-aureate"
            aria-label="Close demo video"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2 L12 12 M12 2 L2 12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </DialogClose>
        </div>
        <DialogDescription className="sr-only">
          OmniEye product demo video.
        </DialogDescription>

        {embed ? (
          <div>
            <div className="aspect-video w-full bg-midnight">
              {embed.kind === "iframe" ? (
                <iframe
                  src={embed.src}
                  title="OmniEye product demo"
                  className="h-full w-full"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen; autoplay"
                  allowFullScreen
                />
              ) : (
                <video src={embed.src} controls preload="none" className="h-full w-full" />
              )}
            </div>
            {/* fallback for strict browsers / extensions that block third-party players */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-4 py-3 md:px-5">
              <span className="mono-label text-graphite">
                PLAYER BLOCKED?{" "}
                <a
                  href={demoVideoUrl?.includes("jumpshare.com")
                    ? `https://jumpshare.com/share/${demoVideoUrl.split("/").pop()}`
                    : demoVideoUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bone/90 underline decoration-rule underline-offset-4 transition-colors hover:text-aureate"
                >
                  Watch on the host site ↗
                </a>
              </span>
              <span className="mono-label text-graphite">15 SECONDS · NO AUTOPLAY</span>
            </div>
            {/* production reference: the full 60-second walkthrough plan */}
            <figure className="border-t border-rule px-4 py-5 md:px-5">
              <figcaption className="flex flex-wrap items-center justify-between gap-2">
                <span className="mono-label text-aureate">FIG · SB-01</span>
                <span className="mono-label text-graphite">
                  FULL 60-SECOND WALKTHROUGH · PRODUCTION REFERENCE
                </span>
              </figcaption>
              <Image
                src="/mockups/storyboard-1100.webp"
                alt="Four-panel storyboard of the OmniEye demo: opening AutoCAD and a PDF side by side, activating the overlay with Alt plus Space, lassoing a beam schedule, and the extracted beam information answer"
                width={1100}
                height={733}
                sizes="(min-width: 640px) 896px, 100vw"
                className="mt-4 w-full border border-rule"
              />
            </figure>
          </div>
        ) : (
          <div className="relative">
            <CadView className="aspect-video w-full" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/72 px-6 text-center">
              <span className="mono-label text-graphite">S-DEMO · PENDING DELIVERY</span>
              <p className="font-serif text-2xl text-bone md:text-3xl">
                Demo video coming soon
              </p>
              <p className="max-w-sm text-sm text-graphite">
                The 60-second walkthrough is in production. Join the beta list and
                we&apos;ll send it to you first.
              </p>
              <DialogClose asChild>
                <a
                  href="#join"
                  className="inline-flex min-h-[44px] items-center bg-aureate px-5 py-2 mono-label text-ink transition-transform hover:-translate-y-px"
                >
                  Join the waitlist
                </a>
              </DialogClose>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
