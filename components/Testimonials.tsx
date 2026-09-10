"use client";

import { motion } from "framer-motion";
import {
  TestimonialsColumn,
  type Testimonial,
} from "@/components/ui/testimonial-v2";
import type { GoogleReviewsResult } from "@/lib/google-reviews";

// Real reviews fetched at build time as a fallback, in case the live
// Google Places API call ever fails at request time.
const FALLBACK_REVIEWS: Testimonial[] = [
  {
    text: "Hard working team that is on time and always delivers great results! Highly recommend",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocK5DV0qBeO6VGaKg3upB81A7SzWrjFy3Vma5VrrxsRSQHqzPn8L=s128-c0x00000000-cc-rp-mo-ba2",
    name: "Faisal Islam",
    role: "Google review",
  },
  {
    text: "Very professional and top notch quality service! thank you so much.",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocIKQHF4_u7nH0MGu-qLFAYTmmgt4vub6ZPDXyp4tKen2Rmw_Q=s128-c0x00000000-cc-rp-mo",
    name: "Talal Al-Saymaree",
    role: "Google review",
  },
  {
    text: "Very high quality and professional service at reasonable cost.",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocKf6dehX6qPLcdyEzyMOYIZ0C21Tpz-jv-Jr-t6mp5reb6OvA=s128-c0x00000000-cc-rp-mo",
    name: "Mohsen Alempour",
    role: "Google review",
  },
  {
    text: "Amazing service provided. We have always reached out to them for any home improvement tasks and they execute it perfectly. Will recommend anyone else to go ahead with Everline.",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocJCG70Uo3EZgEIRFREG8BsFPNYOcT9AsHXE0TPlBtqqqivw1w=s128-c0x00000000-cc-rp-mo-ba3",
    name: "Anuj Kumar",
    role: "Google review",
  },
  {
    text: "Absolutely fantastic service! Everything was done perfectly, with great attention to detail and care. Professional, efficient, friendly, and clearly takes pride in the work.",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjUeVCGesBWckLtoEwfOWUR2bi6b7SisX5X_AltpuaB4WFGf9IsOYA=s128-c0x00000000-cc-rp-mo",
    name: "Marija Dimitrovska",
    role: "Google review",
  },
];

function splitIntoColumns<T>(items: T[], columnCount: number): T[][] {
  const columns: T[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, i) => columns[i % columnCount].push(item));
  return columns;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="mb-3 flex items-center justify-center gap-1 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < Math.round(rating) ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={i < Math.round(rating) ? 0 : 1.5}
          className="h-5 w-5"
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6L10 14.9l-5.4 2.9 1.3-6L1.3 7.7l6.1-.6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({
  googleReviews,
}: {
  googleReviews?: GoogleReviewsResult;
}) {
  const testimonials: Testimonial[] =
    googleReviews && googleReviews.reviews.length > 0
      ? googleReviews.reviews.map((r) => ({
          text: r.text,
          image: r.image ?? "",
          name: r.name,
          role: r.role,
        }))
      : FALLBACK_REVIEWS;

  const columns = splitIntoColumns(
    testimonials,
    Math.min(3, testimonials.length)
  );

  const overallRating = googleReviews?.overallRating ?? 5;
  const totalReviewCount = googleReviews?.totalReviewCount ?? null;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-white py-24 dark:bg-ink"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto max-w-6xl px-6"
      >
        <div className="mx-auto mb-16 flex max-w-xl flex-col items-center justify-center text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700 dark:text-gold">
            Testimonials
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-ink dark:text-white sm:text-4xl">
            What Our Customers Say
          </h2>

          <Stars rating={overallRating} />
          <p className="text-ink/60 dark:text-white/60">
            {overallRating.toFixed(1)} rating
            {totalReviewCount ? ` · ${totalReviewCount} Google reviews` : ""}
          </p>

          <p className="mt-5 text-ink/60 dark:text-white/60">
            Real feedback from homeowners across Toronto and the GTA who
            trusted us with their plumbing.
          </p>

          {googleReviews?.mapsUri && (
            <a
              href={googleReviews.mapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:underline dark:text-gold"
            >
              Reviews from Google — see all &rarr;
            </a>
          )}
        </div>

        <div
          className="flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          {columns.map((col, i) => (
            <TestimonialsColumn
              key={i}
              testimonials={col}
              duration={15 + i * 2}
              className={
                i === 1 ? "hidden md:block" : i === 2 ? "hidden lg:block" : ""
              }
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
