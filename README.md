# OmniEye — Landing Page

Single high-converting landing page + Privacy Policy page for **OmniEye**, the
intent-aware AI desktop overlay (tagline: **SAS — See · Analyze · Show**).
Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4**, design
concept: **the Drawing Sheet** — crop marks, hairline dimension lines, mono
sheet numbers, title-block footer. Palette: ink `#0D0C12`, midnight `#101A30`,
bone `#EAE3D2`, aureate `#E7B24A`, sapphire `#4D7CFF` (capture states only),
ember `#E8553F` (Blind state / errors).

## Quick start

```bash
bun install
bun run dev        # http://localhost:3000
bun run lint       # ESLint
bun run db:push    # create/update the SQLite db (waitlist fallback store)
```

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | SQLite file (already set in `.env`) — stores waitlist entries and powers duplicate-email detection. |
| `NEXT_PUBLIC_SITE_URL` | prod | Canonical origin, e.g. `https://getomnieye.com`. Drives metadata, sitemap, robots. |
| `DEMO_VIDEO_URL` | no | One-line demo video config (see below). |
| `WAITLIST_WEBHOOK_URL` | prod | Google Apps Script web-app URL that appends rows to the client's Google Sheet. |
| `WAITLIST_SECRET` | prod | Shared secret checked by the Apps Script. |
| `NOTIFY_EMAIL` | prod | Passed through to the script; the inbox that receives instant sign-up notifications. |

Copy lives in `src/components/omnieye/*` — every section is one file, with the
client's verbatim copy as plain text (hero.tsx, problem.tsx, how-it-works.tsx,
features.tsx, about.tsx, industries.tsx, final-cta.tsx, footer.tsx,
privacy/page.tsx).

## Demo video (one config value)

The hero button and video box open an accessible modal. The client's delivered
demo (15-second walkthrough, hosted on Jumpshare) is wired in as the default;
override it any time with:

```bash
DEMO_VIDEO_URL="https://jumpshare.com/embed/S18O80bFo59a70lm79Tf"  # Jumpshare
DEMO_VIDEO_URL="https://www.youtube.com/watch?v=XXXXXXXXXXX"       # or YouTube
DEMO_VIDEO_URL="https://player.vimeo.com/video/000000"             # or Vimeo
DEMO_VIDEO_URL="https://cdn.example.com/demo.mp4"                  # or direct file
```

Supported: Jumpshare share/embed links (embedded via `jumpshare.com/embed`),
YouTube via `youtube-nocookie.com`, Vimeo via the Vimeo player, and direct
`.mp4/.webm/.mov` links in a native `<video>` element. Nothing autoplays.
If the variable is set to an empty string, the modal falls back to a clean
placeholder (poster frame + "Demo video coming soon" + a button to the
waitlist form).

Real product assets (hero poster, industry captures, concept frames,
storyboard, emblem) live in `public/mockups/` and `public/brand/`; regenerate
them from the originals with `python3 scripts/prepare-assets.py`, and the OG
image with `python3 scripts/generate-og.py`.

## Waitlist integration (Google Sheet + email notification)

Flow: form → `POST /api/waitlist` (serverless route) → (a) stored in SQLite
for duplicate detection, (b) forwarded to the client's Google Apps Script web
app, which appends a row (timestamp, name, email, role, page URL, UTM) and
emails the owner. Posting server-side avoids the opaque-response and CORS
problems of posting straight to Apps Script from the browser.

The script (paste into Extensions → Apps Script on the Google Sheet):

```js
const SHEET_ID = '';          // the Google Sheet ID (from its URL)
const SHEET_NAME = 'Waitlist';
const SECRET = '';            // same value as WAITLIST_SECRET
const NOTIFY_EMAIL = '';      // inbox that receives instant notifications

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.wait(20000);
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) {
      return ContentService.createTextOutput(JSON.stringify({ status: 'forbidden' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(['Timestamp', 'Name', 'Email', 'Role', 'Role (other)', 'Page URL', 'UTM']);
    }
    sh.appendRow([
      new Date(), data.name, data.email, data.role,
      data.roleOther || '', data.pageUrl || '', data.utm || ''
    ]);
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(
        NOTIFY_EMAIL,
        'New OmniEye beta signup: ' + data.email,
        data.name + ' (' + data.role + ') just joined the waitlist.\n\nPage: ' + (data.pageUrl || '')
      );
    }
    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error' }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

Setup (three steps):

1. Create the Google Sheet, copy its ID from the URL.
2. Extensions → Apps Script → paste the script (fill `SHEET_ID`, `SECRET`,
   `NOTIFY_EMAIL`) → Deploy → New deployment → type **Web app** → execute as
   **Me**, access **Anyone** → copy the web-app URL.
3. On the host (Vercel/Netlify/Cloudflare), set `WAITLIST_WEBHOOK_URL` to that
   URL, plus `WAITLIST_SECRET` and `NOTIFY_EMAIL`. Redeploy.

If the webhook is misconfigured or unreachable, submissions are still stored
in SQLite (`DATABASE_URL`) — the lead is never lost, and the UI always shows a
retry path. Duplicate emails are answered with a friendly "already on the
list" message. A honeypot field plus basic per-IP rate limiting are included;
no CAPTCHA at this stage. (Fallback option if the client prefers a managed
service: Formspree or Web3Forms — swap the fetch in
`src/components/omnieye/waitlist-form.tsx`.)

## Deploy

- **Vercel (recommended):** import the repo, add the env vars above, deploy.
  API routes work out of the box.
- **Netlify / Cloudflare Pages:** use the Next.js adapter (Netlify plugin /
  `@opennextjs/cloudflare`).
- Connect `getomnieye.com` or `omnieye.app` when DNS access is available;
  HTTPS and www→apex redirect are handled by the platform.
- Before launch, set `NEXT_PUBLIC_SITE_URL` to the final domain so canonical
  URLs, sitemap and OG previews resolve.

## Assets

- `public/og.png` — 1200×630 Open Graph image (dark sheet, logo, headline, SAS
  tagline, blue-gold glow).
- `src/app/icon.svg` + `src/app/apple-icon.png` — favicon and touch icon from
  the line-art eye mark.
- Regenerate both after brand tweaks: `node scripts/generate-assets.mjs`
  (requires the Instrument Serif / JetBrains Mono fonts to be installed for
  the OG render; falls back to system serif otherwise).

## Production notes & open client questions

- Hotkey shown as **Alt + Space** per the mockups; final hotkey awaits client
  confirmation (Windows reserves Alt+Space for the window menu).
- The hero footnote clarifies that sub-300ms refers to screen-region capture.
- Product UI is rebuilt live in HTML/SVG (no AI-rendered mockups on the page);
  concept visuals are tagged "Product concept". The healthcare visual carries
  the caption "Illustrative concept. OmniEye is not a medical device." and no
  compliance badges appear anywhere.
- Product is badged "Private Beta"; the AI vendor is never named; the
  trademark line is in the footer.
- Privacy Policy at `/privacy` is a plain-language draft marked for the
  client's legal review; contact addresses (`privacy@getomnieye.com`,
  `hello@getomnieye.com`) are placeholders pending the client's inboxes.

## Ownership

Full source is in this repository and transfers to the client. Phase 2 routes
(`/download`, `/login`, `/docs`, `/faq`, `/pricing`) can be added without a
rebuild — the layout is componentized under `src/components/omnieye`.
