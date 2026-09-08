const PHONE_DISPLAY = "647-544-8904";
const PHONE_TEL = "6475448904";

export default function Footer() {
  return (
    <footer className="bg-white py-10 dark:bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-ink/60 dark:text-white/60 sm:flex-row">
        <p>
          Everline{" "}
          <span className="text-amber-700 dark:text-gold">Plumbing</span> —
          Toronto &amp; the GTA
        </p>
        <a
          href={`tel:${PHONE_TEL}`}
          className="hover:text-amber-700 dark:hover:text-gold"
        >
          {PHONE_DISPLAY}
        </a>
        <p>
          &copy; {new Date().getFullYear()} Everline Plumbing. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
