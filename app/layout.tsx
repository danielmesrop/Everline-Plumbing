import type { Metadata } from "next";
import { Bitter, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const bitter = Bitter({ subsets: ["latin"], variable: "--font-bitter" });
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});

const SITE_URL = "https://everlineplumbing.ca";
const SITE_NAME = "Everline Plumbing";
const SITE_TITLE = "Everline Plumbing | Emergency Plumber in Toronto & the GTA";
const SITE_DESCRIPTION =
  "24/7 emergency plumber serving Toronto and the GTA. Drain cleaning, water heater installation, leak detection, and more. Call 647-544-8904 for a free estimate.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "plumber Toronto",
    "emergency plumber Toronto",
    "GTA plumbing services",
    "drain cleaning Toronto",
    "water heater installation Toronto",
    "leak detection and repair",
    "pipe repair GTA",
    "24/7 plumber near me",
    "residential plumber Toronto",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_CA",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Everline Plumbing — Toronto & GTA plumbing services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const AREA_SERVED = [
  "Toronto",
  "Mississauga",
  "North York",
  "Etobicoke",
  "Scarborough",
  "Vaughan",
  "Markham",
  "Richmond Hill",
  "Brampton",
].map((name) => ({ "@type": "City", name }));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: SITE_NAME,
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/logo-full.png`,
  url: SITE_URL,
  telephone: "+16475448904",
  priceRange: "$$",
  areaServed: AREA_SERVED,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  makesOffer: [
    "Emergency Plumbing Repair",
    "Drain & Sewer Cleaning",
    "Water Heater Installation & Repair",
    "Leak Detection & Repair",
    "Pipe Repair & Repiping",
    "Fixture & Faucet Installation",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name,
      areaServed: AREA_SERVED,
    },
  })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${bitter.variable} ${sourceSans.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
