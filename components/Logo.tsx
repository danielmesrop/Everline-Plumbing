import Image from "next/image";

export default function Logo({
  compact = false,
  light = false,
}: {
  compact?: boolean;
  light?: boolean;
}) {
  return (
    <a href="#" className="flex items-center gap-3">
      <span className="relative h-9 w-9 shrink-0 md:h-10 md:w-10">
        <Image
          src="/logo-icon.png"
          alt="Everline Plumbing"
          fill
          className="object-contain"
          priority
        />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-base font-bold md:text-lg ${
            light ? "text-ink" : "text-white"
          }`}
        >
          Everline
        </span>
        <span
          className={`overflow-hidden text-[10px] font-semibold tracking-[0.25em] transition-all duration-300 ${
            light ? "text-amber-700" : "text-gold"
          } ${compact ? "max-h-0 opacity-0" : "max-h-4 opacity-100"}`}
        >
          PLUMBING
        </span>
      </span>
    </a>
  );
}
