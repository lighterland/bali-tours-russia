import type { LocalizedText } from "@/lib/i18n";

export type GalleryImage = {
  slug: string;
  caption: LocalizedText;
  width: 1200;
  height: number;
  layout: "small" | "wide" | "tall" | "large";
};

export const galleryImages: GalleryImage[] = [
  { slug: "rice-mountain", caption: { ru: "Рисовые террасы Бали", en: "Bali rice terraces" }, width: 1200, height: 900, layout: "large" },
  { slug: "nusa-penida", caption: { ru: "Побережье Нуса-Пениды", en: "Nusa Penida coastline" }, width: 1200, height: 1799, layout: "tall" },
  { slug: "tanah-lot", caption: { ru: "Храм Танах Лот", en: "Tanah Lot temple" }, width: 1200, height: 1835, layout: "small" },
  { slug: "bali-surfing", caption: { ru: "Серфинг на Бали", en: "Surfing in Bali" }, width: 1200, height: 800, layout: "wide" },
  { slug: "craft-studio", caption: { ru: "Балийские ремесленные мастерские", en: "Balinese craft studios" }, width: 1200, height: 1930, layout: "tall" },
  { slug: "bali-temple", caption: { ru: "Балийский храм", en: "Balinese temple" }, width: 1200, height: 1800, layout: "small" },
  { slug: "bali-snorkeling", caption: { ru: "Снорклинг на Бали", en: "Snorkeling in Bali" }, width: 1200, height: 675, layout: "wide" },
  { slug: "rice-terraces", caption: { ru: "Тропические рисовые поля", en: "Tropical rice fields" }, width: 1200, height: 1800, layout: "tall" },
  { slug: "ubud-landscape", caption: { ru: "Пейзажи Убуда", en: "Ubud landscapes" }, width: 1200, height: 900, layout: "small" },
  { slug: "bali-water-sports", caption: { ru: "Водные развлечения", en: "Bali water sports" }, width: 1200, height: 2135, layout: "tall" },
  { slug: "northwest-bali", caption: { ru: "Северо-запад Бали", en: "Northwest Bali" }, width: 1200, height: 797, layout: "wide" },
  { slug: "bali-fishing", caption: { ru: "Морская рыбалка", en: "Sea fishing" }, width: 1200, height: 1800, layout: "small" },
  { slug: "mount-batur", caption: { ru: "Рассвет на вулкане Батур", en: "Mount Batur at sunrise" }, width: 1200, height: 800, layout: "large" },
  { slug: "turtle-island", caption: { ru: "Черепаший остров", en: "Turtle Island" }, width: 1200, height: 1800, layout: "tall" },
  { slug: "bali-safari", caption: { ru: "Bali Safari", en: "Bali Safari" }, width: 1200, height: 800, layout: "wide" },
  { slug: "ocean-adventure", caption: { ru: "Океанские приключения", en: "Ocean adventures" }, width: 1200, height: 800, layout: "small" },
  { slug: "atv-adventure", caption: { ru: "Приключение на ATV", en: "ATV adventure" }, width: 1200, height: 2133, layout: "tall" },
  { slug: "bali-road", caption: { ru: "Дороги Бали", en: "Roads of Bali" }, width: 1200, height: 675, layout: "wide" },
];
