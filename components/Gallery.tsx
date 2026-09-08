"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const PHOTOS = [
  {
    file: "IMG_9730-merged-images-0.jpg",
    alt: "Finished bathroom renovation with glass shower enclosure and patterned tile floor by Everline Plumbing in Toronto",
  },
  {
    file: "IMG_9730-merged-images-1.jpg",
    alt: "Powder room plumbing installation with toilet and vanity completed by Everline Plumbing",
  },
  {
    file: "IMG_9730-merged-images-2.jpg",
    alt: "Rough-in copper and PEX pipe framing during a bathroom renovation in the GTA",
  },
  {
    file: "IMG_9730-merged-images-3.jpg",
    alt: "Water heater and pressure tank installation in a Toronto-area basement",
  },
  {
    file: "IMG_9730-merged-images-4.jpg",
    alt: "Plumbing rough-in with PEX water lines run through wall framing",
  },
  {
    file: "IMG_9730-merged-images-5.jpg",
    alt: "Basement utility room plumbing rough-in with organized pipe runs",
  },
  {
    file: "IMG_9730-merged-images-6.jpg",
    alt: "Completed bathroom with pedestal sink, toilet, and glass shower niche",
  },
  {
    file: "IMG_9730-merged-images-7.jpg",
    alt: "Luxury marble shower installation with rainfall shower head",
  },
  {
    file: "IMG_9730-merged-images-8.jpg",
    alt: "Marble shower with dual shower heads installed by Everline Plumbing",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white py-24 dark:bg-ink">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 flex max-w-xl flex-col items-center justify-center text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700 dark:text-gold">
            Gallery
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-ink dark:text-white sm:text-4xl">
            Recent Jobs Across the GTA
          </h2>
          <p className="mt-5 text-ink/60 dark:text-white/60">
            A look at real installs and repairs completed by our team.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="mx-auto max-w-5xl"
        >
          <CarouselContent>
            {PHOTOS.map((photo) => (
              <CarouselItem
                key={photo.file}
                className="sm:basis-1/2 lg:basis-1/3"
              >
                <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
                  <Image
                    src={`/photos/${photo.file}`}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
