import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  service: z.string().trim().min(1).max(200),
  urgency: z.string().trim().max(50).optional().or(z.literal("")),
  issue: z.string().trim().min(1).max(2000),
  // Honeypot: real users never fill this in; bots often do. Deliberately
  // unrestricted here — checked after parsing so bots get a fake success
  // instead of a validation error that would tip them off.
  company: z.string().max(500).optional().or(z.literal("")),
});

const MAX_PHOTOS = 4;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5MB per photo
const ACCEPTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const raw = {
    firstName: formData.get("firstName") ?? "",
    lastName: formData.get("lastName") ?? "",
    phone: formData.get("phone") ?? "",
    email: formData.get("email") ?? "",
    service: formData.get("service") ?? "",
    urgency: formData.get("urgency") ?? "",
    issue: formData.get("issue") ?? "",
    company: formData.get("company") ?? "",
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  // Honeypot tripped — pretend success so bots don't learn to adapt.
  if (parsed.data.company) {
    return NextResponse.json({ success: true });
  }

  const { firstName, lastName, phone, email, service, urgency, issue } =
    parsed.data;

  const photoFiles = formData
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (photoFiles.length > MAX_PHOTOS) {
    return NextResponse.json(
      { error: `Please attach at most ${MAX_PHOTOS} photos.` },
      { status: 400 }
    );
  }

  for (const file of photoFiles) {
    if (!ACCEPTED_IMAGE_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP, or HEIC photos are supported." },
        { status: 400 }
      );
    }
    if (file.size > MAX_PHOTO_BYTES) {
      return NextResponse.json(
        { error: "Each photo must be under 5MB." },
        { status: 400 }
      );
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_EMAIL;

  if (!apiKey || !toAddress) {
    console.error(
      "Contact form is not configured: missing RESEND_API_KEY or CONTACT_EMAIL env var."
    );
    return NextResponse.json(
      { error: "The contact form isn't set up yet. Please call us instead." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const attachments = await Promise.all(
      photoFiles.map(async (file, i) => ({
        filename: file.name || `photo-${i + 1}.jpg`,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const { error } = await resend.emails.send({
      from: "Everline Plumbing Website <onboarding@resend.dev>",
      to: toAddress,
      replyTo: email || undefined,
      subject: `New estimate request from ${firstName} ${lastName}`,
      text: [
        `Name: ${firstName} ${lastName}`,
        `Phone: ${phone}`,
        `Email: ${email || "Not provided"}`,
        `Service needed: ${service}`,
        `Urgency: ${urgency || "Not specified"}`,
        "",
        "Issue:",
        issue,
        photoFiles.length ? `\n(${photoFiles.length} photo(s) attached)` : "",
      ].join("\n"),
      html: `
        <h2>New estimate request</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email || "Not provided")}</p>
        <p><strong>Service needed:</strong> ${escapeHtml(service)}</p>
        <p><strong>Urgency:</strong> ${escapeHtml(urgency || "Not specified")}</p>
        <p><strong>Issue:</strong></p>
        <p>${escapeHtml(issue).replace(/\n/g, "<br />")}</p>
        ${photoFiles.length ? `<p><strong>${photoFiles.length} photo(s) attached</strong></p>` : ""}
      `,
      attachments: attachments.length ? attachments : undefined,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Something went wrong sending your request. Please call us instead." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your request. Please call us instead." },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
