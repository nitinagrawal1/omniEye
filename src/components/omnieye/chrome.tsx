import { EyeMark } from "./eye-mark";

/**
 * Drawing-sheet section tag: sheet number + title + hairline.
 * Pure decoration/structure; the sheet numbers never assert anything.
 */
export function SheetTag({
  sheet,
  title,
  tone = "dark",
  className = "",
}: {
  sheet: string;
  title: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const line = tone === "dark" ? "bg-rule" : "bg-ink/25";
  const text = tone === "dark" ? "text-graphite" : "text-ink/60";
  return (
    <RevealStatic className={`flex items-center gap-3 ${className}`}>
      <span className={`mono-label tnum text-aureate ${tone === "dark" ? "" : ""}`}>{sheet}</span>
      <span className={`mono-label ${text}`}>{title}</span>
      <span className={`h-px flex-1 ${line}`} aria-hidden="true" />
    </RevealStatic>
  );
}

/** Server-safe static reveal fallback (no delay). */
function RevealStatic({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

/** Viewfinder corner crop marks — decorative, aria-hidden. */
export function CropCorners({
  className = "",
  color = "border-bone/40",
  size = 18,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  const s = `${size}px`;
  const base = "absolute pointer-events-none";
  return (
    <span aria-hidden="true" className={base + " " + className}>
      <span className={`absolute border-t border-l ${color}`} style={{ top: 0, left: 0, width: s, height: s }} />
      <span className={`absolute border-t border-r ${color}`} style={{ top: 0, right: 0, width: s, height: s }} />
      <span className={`absolute border-b border-l ${color}`} style={{ bottom: 0, left: 0, width: s, height: s }} />
      <span className={`absolute border-b border-r ${color}`} style={{ bottom: 0, right: 0, width: s, height: s }} />
    </span>
  );
}

/** Tiny eye bullet used as a section glyph. */
export function EyeGlyph({ className = "" }: { className?: string }) {
  return <EyeMark size={16} className={className} />;
}
