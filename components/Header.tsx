"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Logo from "./Logo";
import { ThemeToggle } from "./ui/theme-toggle";

const PHONE_DISPLAY = "647-544-8904";
const PHONE_TEL = "6475448904";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Unscrolled, the header always floats over the (always-dark) hero video,
  // so it stays in its dark glass styling regardless of theme. Only once
  // scrolled past the hero does it need to adapt to the active theme.
  const isLightTheme = mounted && resolvedTheme === "light";
  const lightPill = scrolled && isLightTheme;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border backdrop-blur-md transition-all duration-300 ${
          lightPill
            ? "border-black/10 bg-white/80 shadow-lg shadow-black/10"
            : "border-white/10"
        } ${
          scrolled
            ? `px-4 py-2 ${lightPill ? "" : "bg-black/80 shadow-lg shadow-black/40"}`
            : "bg-black/40 px-5 py-3"
        }`}
      >
        <Logo compact={scrolled} light={lightPill} />

        <nav
          className={`hidden items-center gap-1 text-sm font-medium md:flex ${
            lightPill ? "text-ink/80" : "text-white/90"
          }`}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 transition ${
                activeHash === link.href
                  ? lightPill
                    ? "bg-black/5 text-ink"
                    : "bg-white/10 text-white"
                  : lightPill
                    ? "hover:bg-black/5 hover:text-amber-700"
                    : "hover:bg-white/5 hover:text-gold"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:flex" />

          <a
            href={`tel:${PHONE_TEL}`}
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110 md:px-5"
          >
            <span className="md:hidden">Call</span>
            <span className="hidden md:inline">
              {scrolled ? "Call now" : `Call ${PHONE_DISPLAY}`}
            </span>
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition hover:border-gold hover:text-gold md:hidden ${
              lightPill ? "border-black/15 text-ink" : "border-white/15 text-white"
            }`}
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              {menuOpen ? (
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className={`mx-auto mt-2 flex max-w-6xl flex-col overflow-hidden rounded-3xl border p-2 text-sm font-medium backdrop-blur-md md:hidden ${
            lightPill
              ? "border-black/10 bg-white/95 text-ink/80"
              : "border-white/10 bg-black/90 text-white/90"
          }`}
        >
          <div className="flex items-center justify-between px-2 py-2 sm:hidden">
            <span
              className={`text-xs font-semibold uppercase tracking-widest ${
                lightPill ? "text-ink/50" : "text-white/50"
              }`}
            >
              Theme
            </span>
            <ThemeToggle />
          </div>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-2xl px-4 py-3 transition ${
                activeHash === link.href
                  ? lightPill
                    ? "bg-black/5 text-ink"
                    : "bg-white/10 text-white"
                  : lightPill
                    ? "hover:bg-black/5 hover:text-amber-700"
                    : "hover:bg-white/5 hover:text-gold"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
