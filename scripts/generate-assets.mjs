/**
 * Generates the Open Graph image (1200×630) and the apple-touch icon
 * (180×180) with sharp. Run: node scripts/generate-assets.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const ink = "#0D0C12";
const bone = "#EAE3D2";
const aureate = "#E7B24A";
const sapphire = "#4D7CFF";
const graphite = "#9A9484";

function eyeMark(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s / 48})">
    <rect x="11.9" y="11.9" width="24.2" height="24.2" transform="rotate(45 24 24)" fill="none" stroke="url(#gold)" stroke-width="2.4"/>
    <path d="M15.5 24c2.9-3.9 6.3-5.9 8.5-5.9s5.6 2 8.5 5.9c-2.9 3.9-6.3 5.9-8.5 5.9s-5.6-2-8.5-5.9Z" fill="none" stroke="url(#gold)" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="24" cy="24" r="3.9" fill="none" stroke="${aureate}" stroke-width="2.2"/>
    <circle cx="24" cy="24" r="1.5" fill="${aureate}"/>
  </g>`;
}

function cornerTicks(x, y, w, h, len = 26) {
  return `<g stroke="${bone}" stroke-opacity="0.45" stroke-width="2" fill="none">
    <path d="M${x} ${y + len} V${y} H${x + len}"/>
    <path d="M${x + w - len} ${y} H${x + w} V${y + len}"/>
    <path d="M${x + w} ${y + h - len} V${y + h} H${x + w - len}"/>
    <path d="M${x + len} ${y + h} H${x} V${y + h - len}"/>
  </g>`;
}

function grid(id) {
  return `<pattern id="${id}" width="30" height="30" patternUnits="userSpaceOnUse">
    <path d="M30 0 H0 V30" fill="none" stroke="${bone}" stroke-opacity="0.05" stroke-width="1"/>
  </pattern>`;
}

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="gold" x1="0" y1="48" x2="48" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${sapphire}"/>
      <stop offset="1" stop-color="${aureate}"/>
    </linearGradient>
    <radialGradient id="glowBlue" cx="0.85" cy="0.95" r="0.55">
      <stop offset="0" stop-color="${sapphire}" stop-opacity="0.20"/>
      <stop offset="1" stop-color="${sapphire}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowGold" cx="0.12" cy="0.02" r="0.5">
      <stop offset="0" stop-color="${aureate}" stop-opacity="0.14"/>
      <stop offset="1" stop-color="${aureate}" stop-opacity="0"/>
    </radialGradient>
    ${grid("gridA")}
  </defs>

  <rect width="1200" height="630" fill="${ink}"/>
  <rect width="1200" height="630" fill="url(#glowBlue)"/>
  <rect width="1200" height="630" fill="url(#glowGold)"/>
  <rect width="1200" height="630" fill="url(#gridA)"/>
  ${cornerTicks(36, 36, 1128, 558)}

  <g font-family="'JetBrains Mono', monospace" font-size="13" letter-spacing="2" fill="${graphite}">
    <text x="64" y="60">S-01 · HERO SHEET</text>
    <text x="1136" y="60" text-anchor="end">PRIVATE BETA</text>
  </g>

  <text x="64" y="270" font-family="'Instrument Serif', Georgia, serif" font-size="88" fill="${bone}">Your AI <tspan font-style="italic" fill="${aureate}">Sees</tspan> What You See—</text>
  <text x="64" y="368" font-family="'Instrument Serif', Georgia, serif" font-size="88" fill="${bone}">In Real Time.</text>

  <text x="64" y="440" font-family="'JetBrains Mono', monospace" font-size="19" letter-spacing="6" fill="${aureate}">SAS — SEE · ANALYZE · SHOW</text>
  <text x="64" y="478" font-family="'JetBrains Mono', monospace" font-size="15" letter-spacing="2" fill="${graphite}">INTENT-AWARE AI DESKTOP OVERLAY</text>

  ${eyeMark(912, 58, 52)}
  <text x="978" y="98" font-family="Geist, system-ui, sans-serif" font-weight="600" font-size="30" letter-spacing="-0.5">
    <tspan fill="${bone}">Omni</tspan><tspan fill="${aureate}">Eye</tspan>
  </text>

  <g>
    <rect x="742" y="520" width="394" height="46" fill="${sapphire}" fill-opacity="0.08" stroke="${sapphire}" stroke-width="2" stroke-dasharray="10 7"/>
    <text x="762" y="550" font-family="'JetBrains Mono', monospace" font-size="14" letter-spacing="2" fill="${bone}" fill-opacity="0.9">LASSO CONTEXT CAPTURE · 240MS</text>
  </g>

  <line x1="64" y1="574" x2="1136" y2="574" stroke="${bone}" stroke-opacity="0.18" stroke-width="1"/>
  <g font-family="'JetBrains Mono', monospace" font-size="12" letter-spacing="2" fill="${graphite}">
    <text x="64" y="598">SUB-300MS SCREEN-REGION CAPTURE</text>
    <text x="1136" y="598" text-anchor="end">WINDOWS · MACOS</text>
  </g>
</svg>`;

const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <defs>
    <linearGradient id="gold" x1="20" y1="160" x2="160" y2="20" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${sapphire}"/>
      <stop offset="1" stop-color="${aureate}"/>
    </linearGradient>
  </defs>
  <rect width="180" height="180" fill="${ink}"/>
  <g transform="translate(42 42) scale(2)">
    <rect x="11.9" y="11.9" width="24.2" height="24.2" transform="rotate(45 24 24)" fill="none" stroke="url(#gold)" stroke-width="2.4"/>
    <path d="M15.5 24c2.9-3.9 6.3-5.9 8.5-5.9s5.6 2 8.5 5.9c-2.9 3.9-6.3 5.9-8.5 5.9s-5.6-2-8.5-5.9Z" fill="none" stroke="url(#gold)" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="24" cy="24" r="3.9" fill="none" stroke="${aureate}" stroke-width="2.2"/>
    <circle cx="24" cy="24" r="1.5" fill="${aureate}"/>
  </g>
</svg>`;

async function main() {
  mkdirSync(join(root, "public"), { recursive: true });
  await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(join(root, "public", "og.png"));
  await sharp(Buffer.from(appleSvg)).png().toFile(join(root, "src", "app", "apple-icon.png"));
  console.log("og.png (1200x630) and apple-icon.png (180x180) written.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
