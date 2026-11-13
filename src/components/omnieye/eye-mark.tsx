import Image from "next/image";

/**
 * OmniEye brand mark — the client's emblem: a glowing eye set in a diamond
 * with circuit traces (sapphire + aureate). Transparent PNG, provided
 * 2026-11-10. Used for nav, footer, HUD cards, favicon and OG artwork.
 */
export function EyeMark({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/brand/emblem.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
      priority={false}
    />
  );
}

/** Wordmark lockup: "Omni" bone + "Eye" aureate, per the mockups. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-sans font-medium tracking-tight text-bone leading-none ${className}`}
    >
      Omni<span className="text-aureate">Eye</span>
    </span>
  );
}

export function LogoLockup({
  size = 26,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <EyeMark size={size} />
      <Wordmark className="text-lg" />
    </span>
  );
}
