import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/data/site";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = { name: 200, email: 320, subject: 300, message: 5000 };

/**
 * Basic per-IP rate limit: max 5 requests/hour. Deliberately simple —
 * in-memory, module-scoped state. This resets on a cold start and isn't
 * shared across concurrent function instances, so it's a soft deterrent
 * against casual abuse/retries, not a hard guarantee under real load or
 * distributed attack. If that ever matters, swap this for a shared store
 * (Upstash Redis, Netlify Blobs, etc.) — same call site, new backing store.
 */
const RATE_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 };
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT.windowMs;
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= RATE_LIMIT.max) {
    requestLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);

  // Bound memory: without this, a long-running warm instance hit by many
  // distinct IPs would accumulate entries forever.
  if (requestLog.size > 5000) {
    for (const [key, times] of requestLog) {
      if (times.every((t) => t <= windowStart)) requestLog.delete(key);
    }
  }

  return false;
}

function getClientIp(request: Request): string {
  // Netlify (and most CDNs/proxies) set x-forwarded-for as "client, proxy1, proxy2…".
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-nf-client-connection-ip") || "unknown";
}

type Payload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  /** Honeypot — a real visitor never fills this in; a bot filling every field usually does. */
  company?: unknown;
};

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  // Honeypot tripped — pretend success so the bot doesn't learn anything, but send nothing.
  if (clean(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX_LEN.name);
  const email = clean(body.email, MAX_LEN.email);
  const subject = clean(body.subject, MAX_LEN.subject);
  const message = clean(body.message, MAX_LEN.message);

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — cannot send.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
      text: `From: ${name} <${email}>\nSubject: ${subject || "(no subject)"}\n\n${message}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; font-size: 14px; color: #111;">
          <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
          ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
          <p style="white-space: pre-wrap; margin-top: 16px;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
