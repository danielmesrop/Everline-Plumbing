"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const PHONE_DISPLAY = "647-544-8904";
const PHONE_TEL = "6475448904";
const CONTACT_EMAIL = "everlineplumbing@gmail.com";

const SERVICE_OPTIONS = [
  "Emergency Plumbing Repair",
  "Drain & Sewer Cleaning",
  "Water Heater Installation & Repair",
  "Leak Detection & Repair",
  "Pipe Repair & Repiping",
  "Fixture & Faucet Installation",
  "Other",
];

const URGENCY_OPTIONS = ["Emergency", "Today", "This week", "Flexible"];

const MAX_PHOTOS = 4;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

const INPUT_CLASSES =
  "w-full rounded-lg border border-black/15 bg-black/5 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/30 outline-none focus:border-gold dark:border-white/15 dark:bg-black/30 dark:text-white dark:placeholder:text-white/30";

const LABEL_CLASSES = "mb-1 block text-sm font-semibold text-ink dark:text-white";

function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-black/10 py-5 first:border-t-0 first:pt-0 dark:border-white/10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50 dark:text-white/50">
        {label}
      </p>
      <div className="mt-2 text-ink dark:text-white">{children}</div>
    </div>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [urgency, setUrgency] = useState<string | null>(null);
  const [issue, setIssue] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const urls = photos.map((file) => URL.createObjectURL(file));
    setPhotoPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [photos]);

  function handleFilesSelected(fileList: FileList | null) {
    if (!fileList) return;
    setErrorMessage("");

    const incoming = Array.from(fileList);
    const combined = [...photos, ...incoming];

    if (combined.length > MAX_PHOTOS) {
      setErrorMessage(`You can attach up to ${MAX_PHOTOS} photos.`);
      return;
    }

    for (const file of incoming) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setErrorMessage("Only JPG, PNG, WEBP, or HEIC photos are supported.");
        return;
      }
      if (file.size > MAX_PHOTO_BYTES) {
        setErrorMessage("Each photo must be under 5MB.");
        return;
      }
    }

    setPhotos(combined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.set("firstName", firstName);
      formData.set("lastName", lastName);
      formData.set("phone", phone);
      formData.set("email", email);
      formData.set("service", service);
      formData.set("urgency", urgency ?? "");
      formData.set("issue", issue);
      formData.set("company", company);
      photos.forEach((file) => formData.append("photos", file));

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(
          data.error || "Something went wrong. Please call us instead."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setService("");
      setUrgency(null);
      setIssue("");
      setPhotos([]);
    } catch {
      setErrorMessage(
        "Couldn't reach the server. Please check your connection or call us instead."
      );
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-neutral-50 py-24 dark:bg-charcoal">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Info column */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700 dark:text-gold">
            Get In Touch
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-ink dark:text-white sm:text-5xl">
            Ready to fix it?
            <br />
            Let&rsquo;s talk.
          </h2>
          <p className="mt-6 max-w-md text-ink/70 dark:text-white/70">
            Fill out the form and we&rsquo;ll get back to you within 60
            minutes during business hours. For emergencies, call us
            directly — we answer 24/7.
          </p>

          <div className="mt-8">
            <InfoRow label="Phone">
              <a
                href={`tel:${PHONE_TEL}`}
                className="text-lg font-bold hover:text-amber-700 dark:hover:text-gold"
              >
                {PHONE_DISPLAY}
              </a>
            </InfoRow>

            <InfoRow label="Email">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="hover:text-amber-700 dark:hover:text-gold"
              >
                {CONTACT_EMAIL}
              </a>
            </InfoRow>

            <InfoRow label="Hours">
              <p>Mon–Fri: 7am–7pm</p>
              <p>Sat–Sun: 8am–5pm</p>
              <p className="text-amber-700 dark:text-gold">Emergency: 24/7</p>
            </InfoRow>

            <InfoRow label="Service Area">
              <p>Toronto &amp; the GTA</p>
            </InfoRow>
          </div>

          <div className="mt-2 flex flex-col gap-4 rounded-2xl bg-gold p-6 text-ink sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-bold">Plumbing emergency?</p>
              <p className="text-sm text-ink/80">
                Don&rsquo;t wait — call us right now.
              </p>
            </div>
            <a
              href={`tel:${PHONE_TEL}`}
              className="text-xl font-bold whitespace-nowrap"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-3xl border border-black/10 p-5 dark:border-white/10 sm:p-6">
          <h3 className="font-serif text-xl font-bold text-ink dark:text-white sm:text-2xl">
            Get your free estimate
          </h3>
          <p className="mt-1.5 text-sm text-ink/60 dark:text-white/60">
            No obligation. Quick response guaranteed.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className={LABEL_CLASSES}>
                  First name{" "}
                  <span className="text-amber-700 dark:text-gold">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={INPUT_CLASSES}
                />
              </div>
              <div>
                <label htmlFor="lastName" className={LABEL_CLASSES}>
                  Last name{" "}
                  <span className="text-amber-700 dark:text-gold">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  placeholder="Smith"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={INPUT_CLASSES}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className={LABEL_CLASSES}>
                  Phone number{" "}
                  <span className="text-amber-700 dark:text-gold">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="(647) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={INPUT_CLASSES}
                />
              </div>
              <div>
                <label htmlFor="email" className={LABEL_CLASSES}>
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={INPUT_CLASSES}
                />
              </div>
            </div>

            <div>
              <label htmlFor="service" className={LABEL_CLASSES}>
                Service needed{" "}
                <span className="text-amber-700 dark:text-gold">*</span>
              </label>
              <select
                id="service"
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={`${INPUT_CLASSES} [&>option]:bg-white dark:[&>option]:bg-charcoal`}
              >
                <option value="" disabled>
                  Select a service...
                </option>
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className={`${LABEL_CLASSES} mb-1.5`}>How urgent is this?</p>
              <div className="flex flex-wrap gap-2">
                {URGENCY_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setUrgency(option)}
                    className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                      urgency === option
                        ? "border-gold bg-gold text-ink"
                        : "border-black/15 text-ink hover:border-gold hover:text-amber-700 dark:border-white/15 dark:text-white dark:hover:text-gold"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-ink/50 dark:text-white/50">
                We&rsquo;ll offer you the next few available windows.
              </p>
            </div>

            <div>
              <label htmlFor="issue" className={LABEL_CLASSES}>
                Describe the issue{" "}
                <span className="text-amber-700 dark:text-gold">*</span>
              </label>
              <textarea
                id="issue"
                rows={3}
                required
                placeholder="Tell us what's happening. The more detail, the better we can prepare..."
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                className={INPUT_CLASSES}
              />
            </div>

            <div>
              <label className={LABEL_CLASSES}>
                Add photos{" "}
                <span className="font-normal text-ink/50 dark:text-white/50">
                  (optional, up to {MAX_PHOTOS})
                </span>
              </label>

              {photos.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {photos.map((file, i) => (
                    <div
                      key={`${file.name}-${i}`}
                      className="group relative h-16 w-16 overflow-hidden rounded-lg border border-black/15 dark:border-white/15"
                    >
                      {photoPreviews[i] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={photoPreviews[i]}
                          alt={`Attached photo ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        aria-label={`Remove photo ${i + 1}`}
                        className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-xs text-white opacity-0 transition group-hover:opacity-100"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {photos.length < MAX_PHOTOS && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-lg border border-dashed border-black/20 px-3.5 py-3 text-sm text-ink/60 transition hover:border-gold hover:text-amber-700 dark:border-white/20 dark:text-white/60 dark:hover:text-gold"
                >
                  + Attach a photo of the issue
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                multiple
                className="hidden"
                onChange={(e) => handleFilesSelected(e.target.files)}
              />
            </div>

            {/* Honeypot field — hidden from real users, bots often fill it in */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            {status === "success" ? (
              <div className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm font-semibold text-amber-700 dark:text-gold">
                Thanks — your request is in. We&rsquo;ll get back to you
                shortly.
              </div>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-full bg-gold px-8 py-3 text-sm font-bold text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending..." : "Send my request"}
                </button>

                {errorMessage && (
                  <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400">
                    {errorMessage}
                  </p>
                )}

                <p className="text-center text-xs text-ink/50 dark:text-white/50">
                  Licensed &amp; insured · No obligation · We never share
                  your details
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
