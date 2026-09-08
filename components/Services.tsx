const PHONE_TEL = "6475448904";

const SERVICES = [
  {
    title: "Emergency Plumbing Repair",
    description:
      "24/7 rapid response for burst pipes, major leaks, and urgent plumbing failures.",
    cta: "Call now",
    href: `tel:${PHONE_TEL}`,
  },
  {
    title: "Drain & Sewer Cleaning",
    description:
      "Professional clearing of clogged drains and sewer lines using modern equipment.",
    cta: "Get a quote",
    href: "#contact",
  },
  {
    title: "Water Heater Installation",
    description:
      "Sales, installation, and repair of tank and tankless water heaters.",
    cta: "Get a quote",
    href: "#contact",
  },
  {
    title: "Leak Detection & Repair",
    description:
      "Accurate leak detection and lasting repairs to protect your home from water damage.",
    cta: "Get a quote",
    href: "#contact",
  },
  {
    title: "Pipe Repair & Repiping",
    description:
      "Fixing damaged pipes or fully repiping older homes with durable materials.",
    cta: "Get a quote",
    href: "#contact",
  },
  {
    title: "Fixture & Faucet Installation",
    description:
      "Expert installation of sinks, faucets, toilets, and showers for renovations.",
    cta: "Get a quote",
    href: "#contact",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-neutral-50 py-24 dark:bg-charcoal">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700 dark:text-gold">
              What We Do
            </p>
            <h2 className="mt-3 font-serif text-4xl font-extrabold tracking-tight text-ink dark:text-white sm:text-5xl">
              Our Plumbing Services
            </h2>
          </div>
          <p className="max-w-sm text-ink/60 dark:text-white/60 lg:text-right">
            Residential and commercial work across Toronto and the GTA, with
            same-day availability on most jobs.
          </p>
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="flex h-full flex-col border-t-2 border-t-gold pt-8"
            >
              <h3 className="font-serif text-xl font-bold text-ink dark:text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-ink/70 dark:text-white/70">
                {service.description}
              </p>
              <a
                href={service.href}
                className="mt-6 text-sm font-semibold text-amber-700 transition hover:brightness-110 dark:text-gold"
              >
                {service.cta} &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
