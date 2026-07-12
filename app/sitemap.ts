import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return [
    { url: `${siteUrl}/ru`, lastModified: new Date(), changeFrequency: "weekly", priority: 1, alternates: { languages: { ru: `${siteUrl}/ru`, en: `${siteUrl}/en` } } },
    { url: `${siteUrl}/en`, lastModified: new Date(), changeFrequency: "weekly", priority: 1, alternates: { languages: { ru: `${siteUrl}/ru`, en: `${siteUrl}/en` } } },
    { url: `${siteUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];
}
