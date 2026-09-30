"use client";

import { motion } from "framer-motion";
import {
  TestimonialsColumn,
  type Testimonial,
} from "@/components/ui/testimonial-v2";

// Real Google reviews for Everline Plumbing.
const testimonials: Testimonial[] = [
  {
    text: "Amazing service, very professional. Will be recommending the family & friends.",
    image: "/reviews/frank.png",
    name: "Frank Filippo",
    role: "Google review",
  },
  {
    text: "Really happy with the service. They did a great job installing our toilet and were very professional the whole time.",
    image: "/reviews/andre.png",
    name: "Andre Tadevosyan",
    role: "Google review",
  },
  {
    text: "Great experience with Everline Plumbing! Friendly, professional, and reliable service. Everything was handled quickly and efficiently. Highly recommend!",
    image: "/reviews/lara.png",
    name: "Lara Veljovic",
    role: "Google review",
  },
  {
    text: "Amazing and fast service. Job well done and will be coming back to these guys.",
    image: "/reviews/sevon.png",
    name: "Sevon Zargarian",
    role: "Google review",
  },
  {
    text: "Professional and maintains the utmost standards of honesty and integrity. Would recommend 👍",
    image: "/reviews/arman.png",
    name: "Arman Abajian",
    role: "Google review",
  },
];

function splitIntoColumns<T>(items: T[], columnCount: number): T[][] {
  const columns: T[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, i) => columns[i % columnCount].push(item));
  return columns;
}

const columns = splitIntoColumns(testimonials, Math.min(3, testimonials.length));

export default function Testimonials() {
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
          <p className="mt-5 text-ink/60 dark:text-white/60">
            Real feedback from homeowners across Toronto and the GTA who
            trusted us with their plumbing.
          </p>
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
