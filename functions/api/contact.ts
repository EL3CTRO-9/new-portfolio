// Cloudflare Pages Function — POST /api/contact
// Sends contact form data via Resend email API.
//
// Required environment variables (set in Cloudflare dashboard):
//   RESEND_API_KEY  — API key from https://resend.com
//   CONTACT_EMAIL   — Destination inbox (e.g. sahil@sahilshaikh.in)
//
// TODO: When Resend is configured:
//   1. Create a Resend account and verify the sending domain (sahilshaikh.in)
//   2. Set RESEND_API_KEY and CONTACT_EMAIL in Cloudflare Pages env vars
//   3. Remove the stub response below and uncomment the real send block

interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
  // Optional comma-separated allowlist of origins permitted to POST this form.
  // Defaults to the production origin below when unset.
  ALLOWED_ORIGINS?: string;
}

const DEFAULT_ALLOWED_ORIGINS = ["https://sahilshaikh.in", "https://www.sahilshaikh.in"];

// Field length caps — reject obviously abusive payloads early.
const MAX_NAME = 100;
const MAX_HANDLE = 120;
const MAX_MESSAGE = 5000;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    // Reject non-JSON bodies.
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return new Response("Unsupported Media Type", { status: 415 });
    }

    // Same-origin check: block cross-origin/script-driven abuse of this endpoint.
    // (Browsers always send Origin on POST; legitimate form posts come from our own origin.)
    const allowed = (env.ALLOWED_ORIGINS?.split(",").map((o) => o.trim()).filter(Boolean) ??
      DEFAULT_ALLOWED_ORIGINS);
    const origin = request.headers.get("origin");
    if (origin && !allowed.includes(origin)) {
      return new Response("Forbidden", { status: 403 });
    }

    const { name, handle, message, company } = (await request.json()) as {
      name?: string;
      handle?: string;
      message?: string;
      company?: string; // honeypot — must stay empty
    };

    // Honeypot: real users never fill the hidden "company" field. Pretend success.
    if (company) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (
      typeof name !== "string" ||
      typeof handle !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !handle.trim() ||
      !message.trim()
    ) {
      return new Response("Missing fields", { status: 400 });
    }
    if (message.trim().length < 10) {
      return new Response("Message too short", { status: 400 });
    }
    if (name.length > MAX_NAME || handle.length > MAX_HANDLE || message.length > MAX_MESSAGE) {
      return new Response("Payload too large", { status: 413 });
    }

    // NOTE: durable per-IP rate limiting requires a binding (e.g. Cloudflare KV/Durable
    // Object) or a dashboard rate-limiting rule on /api/contact — configure one for launch.

    // --- STUB: Return success while Resend is not yet configured ---
    if (!env.RESEND_API_KEY) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // --- REAL SEND via Resend ---
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "deaddrop@sahilshaikh.in",
        to: env.CONTACT_EMAIL,
        subject: `Dead drop from ${name}`,
        text: `From: ${name}\nHandle: ${handle}\n\n${message}`,
      }),
    });

    if (!res.ok) {
      return new Response("Send failed", { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response("Bad request", { status: 400 });
  }
};
