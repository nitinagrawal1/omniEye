import { useId } from "react";

/**
 * The AutoCAD-style drawing sheet, rebuilt live in SVG (the supplied
 * mockups are AI-rendered with garbled text, so every UI element the
 * site shows is drawn here in the brand palette instead).
 *
 * Modes (independent toggles so parents can transition between states):
 *  - box   dashed sapphire lasso selection
 *  - dim   dims everything outside the selection (mask hole)
 *  - cursor  animated pointer that drags the lasso
 *  - scan  scan line sweeping the selected region
 *  - play  runs the chained lasso animation (parent adds .lasso-play)
 */
export const LASSO_RECT = { x: 240, y: 415, w: 370, h: 120 };

export function CadView({
  className = "",
  box = false,
  dim = false,
  cursor = false,
  scan = false,
  play = false,
}: {
  className?: string;
  box?: boolean;
  dim?: boolean;
  cursor?: boolean;
  scan?: boolean;
  play?: boolean;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const maskId = `cad-mask-${uid}`;
  const hatchId = `cad-hatch-${uid}`;
  const gridId = `cad-grid-${uid}`;
  const R = LASSO_RECT;

  return (
    <svg
      viewBox="0 0 1280 720"
      className={`${play ? "lasso-play" : ""} ${className}`}
      role="img"
      aria-label="Floor plan drawing sheet with a lasso selection around structural beam B-2"
    >
      <defs>
        <pattern id={hatchId} width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 8 L8 0" stroke="rgba(234,227,210,0.22)" strokeWidth="1" />
        </pattern>
        <pattern id={gridId} width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M26 0 H0 V26" fill="none" stroke="rgba(234,227,210,0.05)" strokeWidth="1" />
        </pattern>
        <mask id={maskId}>
          <rect x="0" y="0" width="1280" height="720" fill="white" />
          <rect x={R.x} y={R.y} width={R.w} height={R.h} rx="2" fill="black" />
        </mask>
      </defs>

      {/* sheet background */}
      <rect width="1280" height="720" fill="#101A30" />
      <rect x="24" y="24" width="1232" height="672" fill={`url(#${gridId})`} />

      {/* drawing frame + corner ticks */}
      <rect x="24" y="24" width="1232" height="672" fill="none" stroke="rgba(234,227,210,0.16)" strokeWidth="1.5" />
      <g stroke="rgba(234,227,210,0.35)" strokeWidth="1.5">
        <path d="M24 44 V24 H44" fill="none" />
        <path d="M1236 44 V24 H1216" fill="none" />
        <path d="M24 676 V696 H44" fill="none" />
        <path d="M1236 676 V696 H1216" fill="none" />
      </g>

      {/* column grid bubbles */}
      <g stroke="rgba(234,227,210,0.35)" fill="none" strokeWidth="1.2" className="font-mono">
        <circle cx="390" cy="96" r="15" />
        <circle cx="860" cy="96" r="15" />
        <circle cx="130" cy="250" r="15" />
        <circle cx="130" cy="490" r="15" />
        <text x="390" y="101" textAnchor="middle" fill="rgba(234,227,210,0.6)" fontSize="13">1</text>
        <text x="860" y="101" textAnchor="middle" fill="rgba(234,227,210,0.6)" fontSize="13">2</text>
        <text x="130" y="255" textAnchor="middle" fill="rgba(234,227,210,0.6)" fontSize="13">A</text>
        <text x="130" y="495" textAnchor="middle" fill="rgba(234,227,210,0.6)" fontSize="13">B</text>
      </g>

      {/* dimension lines */}
      <g stroke="rgba(231,178,74,0.5)" strokeWidth="1" className="font-mono">
        <line x1="170" y1="76" x2="610" y2="76" />
        <line x1="610" y1="76" x2="1110" y2="76" />
        <line x1="170" y1="68" x2="170" y2="84" />
        <line x1="610" y1="68" x2="610" y2="84" />
        <line x1="1110" y1="68" x2="1110" y2="84" />
        <line x1="90" y1="130" x2="90" y2="610" />
        <line x1="82" y1="130" x2="98" y2="130" />
        <line x1="82" y1="610" x2="98" y2="610" />
        <text x="390" y="66" textAnchor="middle" fill="rgba(231,178,74,0.75)" fontSize="12" stroke="none">4400</text>
        <text x="860" y="66" textAnchor="middle" fill="rgba(231,178,74,0.75)" fontSize="12" stroke="none">5000</text>
        <text x="82" y="370" textAnchor="middle" fill="rgba(231,178,74,0.75)" fontSize="12" stroke="none" transform="rotate(-90 82 370)">4800</text>
      </g>

      {/* plan walls */}
      <g stroke="rgba(234,227,210,0.75)" fill="none">
        <rect x="170" y="130" width="940" height="480" strokeWidth="3.5" />
        <line x1="610" y1="130" x2="610" y2="316" strokeWidth="2" />
        <line x1="610" y1="368" x2="610" y2="610" strokeWidth="2" />
        <line x1="170" y1="370" x2="470" y2="370" strokeWidth="2" />
        <line x1="518" y1="370" x2="610" y2="370" strokeWidth="2" />
        <line x1="610" y1="300" x2="1110" y2="300" strokeWidth="2" />
        {/* door swings */}
        <path d="M610 316 A52 52 0 0 1 662 368" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="610" y1="316" x2="610" y2="368" strokeWidth="1.5" />
        <path d="M470 370 A48 48 0 0 0 518 418" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="470" y1="370" x2="470" y2="418" strokeWidth="1.5" />
      </g>

      {/* windows */}
      <g stroke="rgba(231,178,74,0.6)" strokeWidth="1.5">
        <line x1="250" y1="130" x2="330" y2="130" />
        <line x1="250" y1="124" x2="330" y2="124" />
        <line x1="750" y1="130" x2="830" y2="130" />
        <line x1="750" y1="124" x2="830" y2="124" />
        <line x1="170" y1="200" x2="170" y2="280" />
        <line x1="164" y1="200" x2="164" y2="280" />
        <line x1="700" y1="610" x2="780" y2="610" />
        <line x1="700" y1="616" x2="780" y2="616" />
      </g>

      {/* furniture */}
      <g stroke="rgba(234,227,210,0.4)" fill="none" strokeWidth="1.5">
        <rect x="230" y="160" width="130" height="46" />
        <line x1="230" y1="174" x2="360" y2="174" />
        <rect x="330" y="236" width="180" height="106" strokeDasharray="6 5" />
        <circle cx="420" cy="289" r="24" />
        <rect x="220" y="556" width="190" height="30" />
        <circle cx="470" cy="560" r="9" />
        <rect x="890" y="470" width="130" height="92" />
        <line x1="890" y1="496" x2="1020" y2="496" />
        <circle cx="1052" cy="520" r="9" />
        <rect x="830" y="330" width="90" height="26" />
      </g>

      {/* beam schedule */}
      <g className="font-mono">
        <text x="782" y="144" fill="rgba(231,178,74,0.8)" fontSize="12" letterSpacing="2">BEAM SCHEDULE</text>
        <rect x="780" y="154" width="310" height="118" fill="rgba(13,12,18,0.5)" stroke="rgba(234,227,210,0.3)" strokeWidth="1" />
        <line x1="780" y1="186" x2="1090" y2="186" stroke="rgba(234,227,210,0.3)" />
        <line x1="780" y1="218" x2="1090" y2="218" stroke="rgba(234,227,210,0.14)" />
        <line x1="780" y1="240" x2="1090" y2="240" stroke="rgba(234,227,210,0.14)" />
        <text x="792" y="176" fill="rgba(154,148,132,0.9)" fontSize="11" letterSpacing="1.5">MARK</text>
        <text x="858" y="176" fill="rgba(154,148,132,0.9)" fontSize="11" letterSpacing="1.5">SIZE</text>
        <text x="948" y="176" fill="rgba(154,148,132,0.9)" fontSize="11" letterSpacing="1.5">REINF.</text>
        <text x="792" y="208" fill="rgba(234,227,210,0.85)" fontSize="12">B-1</text>
        <text x="858" y="208" fill="rgba(234,227,210,0.85)" fontSize="12">200 × 400</text>
        <text x="948" y="208" fill="rgba(234,227,210,0.85)" fontSize="12">2Ø12</text>
        <text x="792" y="234" fill="#E7B24A" fontSize="12">B-2</text>
        <text x="858" y="234" fill="#E7B24A" fontSize="12">250 × 500</text>
        <text x="948" y="234" fill="#E7B24A" fontSize="12">4Ø14+2Ø10</text>
        <text x="792" y="262" fill="rgba(234,227,210,0.85)" fontSize="12">B-3</text>
        <text x="858" y="262" fill="rgba(234,227,210,0.85)" fontSize="12">200 × 400</text>
        <text x="948" y="262" fill="rgba(234,227,210,0.85)" fontSize="12">2Ø12</text>
      </g>

      {/* structural beam B-2 in the studio room */}
      <g>
        <rect x="270" y="470" width="260" height="36" fill={`url(#${hatchId})`} stroke="rgba(231,178,74,0.85)" strokeWidth="1.5" />
        <circle cx="560" cy="432" r="14" fill="rgba(13,12,18,0.85)" stroke="#E7B24A" strokeWidth="1.5" />
        <text x="560" y="437" textAnchor="middle" className="font-mono" fill="#E7B24A" fontSize="11">B-2</text>
        <line x1="552" y1="443" x2="528" y2="468" stroke="rgba(231,178,74,0.7)" strokeWidth="1" />
      </g>

      {/* room labels */}
      <g className="font-mono" fill="rgba(154,148,132,0.95)" fontSize="12" letterSpacing="3">
        <text x="390" y="255" textAnchor="middle">ROOM 01 · LIVING</text>
        <text x="390" y="590" textAnchor="middle">ROOM 02 · STUDIO</text>
        <text x="700" y="220" textAnchor="middle">HALL</text>
        <text x="860" y="450" textAnchor="middle">ROOM 03</text>
      </g>

      {/* title block */}
      <g className="font-mono" stroke="rgba(234,227,210,0.25)" fill="none">
        <rect x="170" y="636" width="940" height="42" />
        <line x1="470" y1="636" x2="470" y2="678" />
        <line x1="690" y1="636" x2="690" y2="678" />
        <line x1="880" y1="636" x2="880" y2="678" />
      </g>
      <g className="font-mono" fill="rgba(234,227,210,0.65)" fontSize="11" letterSpacing="1.5">
        <text x="184" y="662">FLOOR PLAN — LEVEL 01</text>
        <text x="484" y="662">SCALE 1:100</text>
        <text x="704" y="662">REV A · BETA</text>
        <text x="894" y="662">SHEET S-01</text>
      </g>

      {/* north arrow */}
      <g stroke="rgba(234,227,210,0.4)" fill="none" strokeWidth="1.2" className="font-mono">
        <circle cx="1178" cy="112" r="20" />
        <path d="M1178 98 L1186 122 L1178 116 L1170 122 Z" fill="rgba(234,227,210,0.5)" stroke="none" />
        <text x="1178" y="146" textAnchor="middle" fill="rgba(154,148,132,0.9)" fontSize="11" stroke="none">N</text>
      </g>

      {/* ── lasso pieces ─────────────────────────────────────────── */}

      {/* dim everything outside the selection */}
      <g
        className={`transition-opacity duration-300 ${dim ? "opacity-100" : "opacity-0"} lasso-dim`}
        aria-hidden="true"
      >
        <rect x="0" y="0" width="1280" height="720" fill="#0D0C12" opacity="0.6" mask={`url(#${maskId})`} />
      </g>

      {/* dashed selection box + handles */}
      <g
        className={`lasso-box transition-opacity duration-300 ${box ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
        style={{ filter: "drop-shadow(0 0 10px rgba(77,124,255,0.35))" }}
      >
        <rect x={R.x} y={R.y} width={R.w} height={R.h} rx="2" fill="rgba(77,124,255,0.08)" stroke="#4D7CFF" strokeWidth="2.5" strokeDasharray="12 8" />
        <g fill="#0D0C12" stroke="#4D7CFF" strokeWidth="1.5">
          <rect x={R.x - 5} y={R.y - 5} width="10" height="10" />
          <rect x={R.x + R.w - 5} y={R.y - 5} width="10" height="10" />
          <rect x={R.x - 5} y={R.y + R.h - 5} width="10" height="10" />
          <rect x={R.x + R.w - 5} y={R.y + R.h - 5} width="10" height="10" />
        </g>
      </g>

      {/* scan line sweeping the selection */}
      <g
        className={`lasso-scan transition-opacity duration-300 ${scan ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      >
        <rect x={R.x} y={R.y} width={R.w} height="3" fill="#4D7CFF" opacity="0.9" />
      </g>

      {/* pointer that drags the lasso */}
      <g
        className={`lasso-cursor transition-opacity duration-300 ${cursor ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      >
        <path
          d="M226 401 L226 418 L230.6 414.4 L233.6 421 L236.8 419.5 L233.8 413 L238.4 412.4 Z"
          fill="#EAE3D2"
          stroke="#0D0C12"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}
