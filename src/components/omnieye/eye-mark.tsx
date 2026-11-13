import { useId } from "react";

/**
 * OmniEye line-art mark: an eye set in a diamond, sapphire→aureate stroke.
 * Used for nav, HUD cards, favicon and OG artwork.
 */
export function EyeMark({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gid = `eyeg-${uid}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={gid} x1="4" y1="44" x2="44" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4D7CFF" />
          <stop offset="1" stopColor="#E7B24A" />
        </linearGradient>
      </defs>
      {/* diamond frame */}
      <rect
        x="9.9"
        y="9.9"
        width="28.2"
        height="28.2"
        transform="rotate(45 24 24)"
        stroke={`url(#${gid})`}
        strokeWidth="2"
      />
      {/* eye */}
      <path
        d="M13.5 24c3.2-4.4 7-6.6 10.5-6.6S31.3 19.6 34.5 24c-3.2 4.4-7 6.6-10.5 6.6S16.7 28.4 13.5 24Z"
        stroke={`url(#${gid})`}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="4.6" stroke="#E7B24A" strokeWidth="2" />
      <circle cx="24" cy="24" r="1.7" fill="#E7B24A" />
    </svg>
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
