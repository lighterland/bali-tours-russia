import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ConciergeExperience } from "@/components/ConciergeExperience";
import { packages } from "@/lib/catalogue";

export function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const english = locale === "en";
  return {
    title: english ? "Private Bali tours and experiences" : "Частные туры и экскурсии на Бали",
    description: english ? "Explore 19 private Bali tours, activities, island trips, and travel services." : "Выберите из 19 частных туров, активностей и путешествий по Бали и соседним островам.",
    alternates: { canonical: `/${english ? "en" : "ru"}`, languages: { ru: "/ru", en: "/en" } },
  };
}

export default async function LocalizedHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "ru" && locale !== "en") notFound();
  return <ConciergeExperience packages={packages} locale={locale} whatsappNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "79011822653"} telegramUrl={process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/+79011822653"} vkUrl={process.env.NEXT_PUBLIC_VK_URL || "https://vk.com/"} businessEmail={process.env.NEXT_PUBLIC_BUSINESS_EMAIL || ""} heroVideoUrl="/media/hero-bali.mp4" />;
}
