import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/testimonial-demo",
          "/theme-toggle-demo",
          "/background-paths-demo",
        ],
      },
    ],
    sitemap: "https://everlineplumbing.ca/sitemap.xml",
  };
}
