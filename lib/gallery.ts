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
  { slug: "handara-gate", caption: { ru: "Ворота Хандара", en: "Handara Gate" }, width: 1200, height: 1601, layout: "tall" },
  { slug: "ulun-danu", caption: { ru: "Храм Улун Дану", en: "Ulun Danu temple" }, width: 1200, height: 800, layout: "wide" },
  { slug: "bali-waterfall", caption: { ru: "Водопад на Бали", en: "Bali waterfall" }, width: 1200, height: 1800, layout: "small" },
  { slug: "canang-sari", caption: { ru: "Подношение кананг сари", en: "Canang sari offering" }, width: 1200, height: 800, layout: "large" },
  { slug: "monkey-forest", caption: { ru: "Лес обезьян", en: "Monkey Forest" }, width: 1200, height: 1800, layout: "tall" },
  { slug: "kecak-dance", caption: { ru: "Танец кечак", en: "Kecak dance" }, width: 1200, height: 800, layout: "wide" },
  { slug: "bali-sunset", caption: { ru: "Закат на пляже Бали", en: "Bali beach sunset" }, width: 1200, height: 1600, layout: "small" },
  { slug: "bali-ceremony", caption: { ru: "Балийская церемония", en: "Balinese ceremony" }, width: 1200, height: 800, layout: "tall" },
  { slug: "gates-of-heaven", caption: { ru: "Ворота рая в храме Лемпуянг", en: "Gates of Heaven at Lempuyang" }, width: 1200, height: 2133, layout: "wide" },
];
