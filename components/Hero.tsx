const PHONE_TEL = "6475448904";
const PHONE_DISPLAY = "647-544-8904";

export default function Hero() {
  const kicker = (
    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gold">
      Toronto &amp; the GTA
    </p>
  );

  const heading = (
    <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
      Toronto&rsquo;s Premium Plumbing Services You Can Trust
    </h1>
  );

  const description = (
    <p className="mx-auto max-w-xl text-lg text-white/80 sm:mt-6">
      From emergency repairs to full bathroom renovations, Everline
      Plumbing delivers reliable, high-quality work across the Greater
      Toronto Area.
    </p>
  );

  const buttons = (
    <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row">
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
  );

  return (
    <section className="relative flex h-dvh min-h-[640px] w-full flex-col justify-between overflow-hidden bg-ink sm:justify-center">
      <video
        className="absolute inset-0 h-full w-full object-cover portrait:object-contain"
        src="/hero-video.mp4"
        poster="/hero-poster.webp"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      {/* Mobile only: heading pinned to the top letterbox band, description +
          buttons pinned to the bottom band, so text doesn't sit over the
          video itself (which is letterboxed via object-contain in portrait). */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-24 text-center sm:hidden">
        {kicker}
        {heading}
      </div>
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-10 text-center sm:hidden">
        {description}
        {buttons}
      </div>

      {/* sm and up: original single centered block */}
      <div className="relative z-10 mx-auto hidden w-full max-w-3xl px-6 text-center sm:block">
        {kicker}
        {heading}
        {description}
        {buttons}
      </div>
    </section>
  );
}
