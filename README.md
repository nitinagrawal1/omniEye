# OmniEye Website

OmniEye's marketing website, product demo, privacy page, and beta waitlist.

## Technology

Next.js App Router, React, TypeScript, Tailwind CSS, and Prisma with SQLite.

## Setup

Requirements: Node.js 20.9 or later and npm.

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`. Set `DATABASE_URL` to a SQLite file, for
   example `file:./dev.db` (relative to `prisma/schema.prisma`). Set
   `NEXT_PUBLIC_SITE_URL` to the site's origin when known. The remaining
   integrations are optional for local development.
3. Generate the Prisma client and create/update the local database:
   `npm run db:generate` and `npm run db:push`.
4. Start the development server with `npm run dev` and open
   `http://localhost:3000`.
5. Create a production build with `npm run build`; run it with `npm run start`.

## Environment

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | SQLite connection string used by Prisma and the waitlist. |
| `NEXT_PUBLIC_SITE_URL` | Public site origin for canonical metadata, sitemap, and robots. |
| `SITE_URL` | Fallback site origin when `NEXT_PUBLIC_SITE_URL` is unset. |
| `DEMO_VIDEO_URL` | Optional URL for the demo modal; defaults to the included video. |
| `WAITLIST_WEBHOOK_URL` | Optional Google Apps Script web-app endpoint. |
| `WAITLIST_SECRET` | Shared secret validated by the Apps Script endpoint. |
| `NOTIFY_EMAIL` | Optional notification address sent to the Apps Script endpoint. |

## Demo video

Set `DEMO_VIDEO_URL` in the deployment environment (or local `.env`) to the
video's public URL. The modal supports Jumpshare, YouTube, Vimeo, and direct
video URLs. Leave it empty to use `public/videos/omnieye-demo.mp4`.

## Waitlist and Google Sheets

The form submits to `POST /api/waitlist`. The server validates and stores each
entry in SQLite, then forwards it to `WAITLIST_WEBHOOK_URL` when configured.
Deploy a Google Apps Script web app that validates the shared secret and
appends the submitted name, email, role, page URL, and campaign data to the
desired sheet. Configure its deployment URL, matching `WAITLIST_SECRET`, and
optional `NOTIFY_EMAIL` in the hosting environment. Without a webhook, entries
remain in SQLite.

## Deployment

Deploy as a Node.js Next.js application. Configure the environment variables
in the hosting provider, generate the Prisma client, apply the schema with
`npm run db:push`, and run `npm run build`. The production start command is
`npm run start`. Because the current database provider is SQLite, the host must
provide persistent storage for the configured database file.

## Project structure

- `src/app/` — routes, metadata, styles, and the waitlist API.
- `src/components/omnieye/` — landing page and privacy-page components.
- `src/components/ui/` — shared dialog component.
- `src/lib/` — Prisma client and shared utilities.
- `prisma/` — database schema.
- `public/` — brand, mockup, social-preview, and demo-video assets.
- Root configuration files — Next.js, TypeScript, PostCSS, and ESLint
  settings.
