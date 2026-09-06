#!/usr/bin/env node
/**
 * Fires one real POST at /api/contact so you can confirm Resend actually
 * delivers, without clicking through the UI. Prints the exact response.
 *
 * Usage:
 *   node scripts/test-contact.mjs                # targets http://localhost:3000
 *   node scripts/test-contact.mjs https://nodirbekov.netlify.app   # targets prod
 *
 * Requires the dev server (or the target deployment) to already be running.
 * This hits the real Resend API — it counts against your Resend quota and,
 * if delivery is working, a real email will land in CONTACT_TO_EMAIL/your
 * inbox. Delete this file once you're done debugging, or keep it — it's
 * not imported by the app, so it never ships in the production build.
 */

const base = process.argv[2] || "http://localhost:3000";
const url = `${base.replace(/\/$/, "")}/api/contact`;

const payload = {
  name: "Test Script",
  email: "test-script@example.com",
  subject: "test-contact.mjs run",
  message: `Manual delivery check — sent ${new Date().toISOString()}.`,
};

console.log(`POST ${url}`);
console.log("Payload:", payload);

try {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => null);

  console.log(`\nStatus: ${res.status}`);
  console.log("Response body:", body);

  if (res.ok && body?.ok) {
    console.log("\n✅ Resend accepted the message. Check your inbox (and spam) to confirm it arrived.");
  } else if (res.status === 429) {
    console.log("\n⏳ Rate-limited — you've hit 5 requests/hour from this IP. Wait or restart the dev server (in-memory limiter resets on restart).");
  } else if (body?.error === "not_configured") {
    console.log("\n⚠️  RESEND_API_KEY isn't set in the environment the server is running with.");
  } else {
    console.log("\n❌ Something failed — see the status/body above, and check the server's own console for a more detailed [contact] log line.");
  }
} catch (err) {
  console.error(`\n❌ Request itself failed — is the server running at ${base}?`);
  console.error(err);
  process.exit(1);
}
