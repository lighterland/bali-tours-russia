import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return [
    { url: `${siteUrl}/ru`, lastModified: new Date(), changeFrequency: "weekly", priority: 1, alternates: { languages: { ru: `${siteUrl}/ru`, en: `${siteUrl}/en` } } },
    { url: `${siteUrl}/en`, lastModified: new Date(), changeFrequency: "weekly", priority: 1, alternates: { languages: { ru: `${siteUrl}/ru`, en: `${siteUrl}/en` } } },
    { url: `${siteUrl}/ru/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3, alternates: { languages: { ru: `${siteUrl}/ru/privacy`, en: `${siteUrl}/en/privacy` } } },
    { url: `${siteUrl}/en/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3, alternates: { languages: { ru: `${siteUrl}/ru/privacy`, en: `${siteUrl}/en/privacy` } } },
    { url: `${siteUrl}/ru/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3, alternates: { languages: { ru: `${siteUrl}/ru/terms`, en: `${siteUrl}/en/terms` } } },
    { url: `${siteUrl}/en/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3, alternates: { languages: { ru: `${siteUrl}/ru/terms`, en: `${siteUrl}/en/terms` } } },
  ];
}
