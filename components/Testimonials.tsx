"use client";

import { motion } from "framer-motion";
import {
  TestimonialsColumn,
  type Testimonial,
} from "@/components/ui/testimonial-v2";

const testimonials: Testimonial[] = [
  {
    text: "Placeholder review — replace with a real customer testimonial. Fast, professional, and cleaned up after the job.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=facearea&facepad=2&h=200",
    name: "Sarah T.",
    role: "Toronto, ON",
  },
  {
    text: "Placeholder review — replace with a real customer testimonial. Fixed our emergency leak within the hour.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=facearea&facepad=2&h=200",
    name: "Mike R.",
    role: "Mississauga, ON",
  },
  {
    text: "Placeholder review — replace with a real customer testimonial. Great communication and fair pricing.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=facearea&facepad=2&h=200",
    name: "Priya K.",
    role: "North York, ON",
  },
  {
    text: "Placeholder review — replace with a real customer testimonial. Our drain was completely clogged and they cleared it same-day.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=facearea&facepad=2&h=200",
    name: "James O.",
    role: "Etobicoke, ON",
  },
  {
    text: "Placeholder review — replace with a real customer testimonial. They repiped our basement bathroom and the quality was outstanding.",
    image:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=200&auto=format&fit=facearea&facepad=2&h=200",
    name: "Amanda Liu",
    role: "Scarborough, ON",
  },
  {
    text: "Placeholder review — replace with a real customer testimonial. Quick, clean install of our new tankless water heater.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=facearea&facepad=2&h=200",
    name: "David Chen",
    role: "Vaughan, ON",
  },
  {
    text: "Placeholder review — replace with a real customer testimonial. Caught a slow leak before it caused real damage.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=facearea&facepad=2&h=200",
    name: "Lauren Bianchi",
    role: "Markham, ON",
  },
  {
    text: "Placeholder review — replace with a real customer testimonial. Installed all new fixtures for our kitchen reno, right on schedule.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=facearea&facepad=2&h=200",
    name: "Tariq Nasser",
    role: "Richmond Hill, ON",
  },
  {
    text: "Placeholder review — replace with a real customer testimonial. Their 24/7 emergency line actually means 24/7.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=facearea&facepad=2&h=200",
    name: "Emily Foster",
    role: "Brampton, ON",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

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
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </motion.div>
    </section>
  );
}
