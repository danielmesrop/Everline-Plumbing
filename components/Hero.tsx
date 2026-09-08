const PHONE_TEL = "6475448904";
const PHONE_DISPLAY = "647-544-8904";

export default function Hero() {
  return (
    <section className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero-video.mp4"
        poster="/hero-poster.webp"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gold">
          Toronto &amp; the GTA
        </p>
        <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          Toronto&rsquo;s Premium Plumbing Services You Can Trust
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
          From emergency repairs to full bathroom renovations, Everline
          Plumbing delivers reliable, high-quality work across the Greater
          Toronto Area.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`tel:${PHONE_TEL}`}
            className="w-full rounded-full bg-gold px-8 py-3 text-center text-base font-semibold text-ink transition hover:brightness-110 sm:w-auto"
          >
            Call Now — {PHONE_DISPLAY}
          </a>
          <a
            href="#contact"
            className="w-full rounded-full border border-white/40 px-8 py-3 text-center text-base font-semibold text-white transition hover:border-gold hover:text-gold sm:w-auto"
          >
            Get a Free Quote
          </a>
        </div>
      </div>
    </section>
  );
}
