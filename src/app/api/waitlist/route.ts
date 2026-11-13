import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;

// Basic in-memory rate limiting (per instance; a first-line guard only).
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  return false;
}

function extractUtm(pageUrl?: string): string | undefined {
  if (!pageUrl) return undefined;
  try {
    const url = new URL(pageUrl);
    const utm: Record<string, string> = {};
    for (const [k, v] of url.searchParams.entries()) {
      if (k.startsWith("utm_") && v) utm[k] = v.slice(0, 120);
    }
    return Object.keys(utm).length ? JSON.stringify(utm) : undefined;
  } catch {
    return undefined;
  }
}

async function forwardToWebhook(entry: {
  name: string;
  email: string;
  role: string;
  roleOther?: string;
  pageUrl?: string;
  utm?: string;
}): Promise<boolean> {
  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (!webhook) return false;
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.WAITLIST_SECRET
          ? { "x-waitlist-secret": process.env.WAITLIST_SECRET }
          : {}),
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...entry,
        // Apps Script web apps cannot read custom headers, so the shared
        // secret travels in the body (over HTTPS) and is checked there.
        secret: process.env.WAITLIST_SECRET || "",
        notifyEmail: process.env.NOTIFY_EMAIL,
      }),
      signal: AbortSignal.timeout(6000),
    });
    return res.ok;
  } catch (err) {
    console.error("[waitlist] webhook forward failed:", err);
    return false;
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ status: "error" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  // Honeypot: pretend success, record nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ status: "ok" });
  }

  if (rateLimited(ip)) {
    return NextResponse.json(
      { status: "error", message: "Too many submissions. Please try again shortly." },
      { status: 429 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const role = typeof body.role === "string" ? body.role.trim().slice(0, 80) : "";
  const roleOther =
    typeof body.roleOther === "string" && body.roleOther.trim()
      ? body.roleOther.trim().slice(0, 120)
      : undefined;
  const pageUrl = typeof body.pageUrl === "string" ? body.pageUrl.slice(0, 500) : undefined;

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Please add your name.";
  if (!email) fieldErrors.email = "Please add your work email.";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "That email doesn't look right—check it once more.";
  if (!role) fieldErrors.role = "Choose the closest match.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ status: "invalid", fieldErrors }, { status: 400 });
  }

  const utm = extractUtm(pageUrl);

  // Store locally — the single source for duplicate detection.
  try {
    await db.waitlistEntry.create({
      data: { name, email, role, roleOther, pageUrl, utm },
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return NextResponse.json({ status: "duplicate" });
    }
    console.error("[waitlist] db insert failed:", err);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }

  // Forward to the client's Google Apps Script webhook (non-fatal on failure:
  // the lead is already stored). See README for the Apps Script setup.
  const forwarded = await forwardToWebhook({ name, email, role, roleOther, pageUrl, utm });
  if (process.env.WAITLIST_WEBHOOK_URL && !forwarded) {
    console.warn("[waitlist] webhook not ok — lead stored locally, will need manual sync");
  }

  return NextResponse.json({
    status: "ok",
    message: "You're on the list. We'll email you when your beta invite is ready.",
  });
}

export async function GET() {
  return NextResponse.json({ status: "error" }, { status: 405 });
}
