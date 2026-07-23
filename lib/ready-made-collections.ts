import type { LocalizedText } from "@/lib/i18n";

export type ReadyMadeCollection = {
  id: string;
  packageIds: readonly string[];
  title: LocalizedText;
  note: LocalizedText;
};

export const readyMadeCollections = [
  { id: "first-time", packageIds: ["nusa-penida", "kintamani", "beach-tour"], title: { ru: "Первый раз на Бали", en: "First Time in Bali" }, note: { ru: "Сбалансированное знакомство с островом: символы Бали, культура и закат.", en: "A balanced first look at the island—Bali icons, culture, and sunset." } },
  { id: "adventure", packageIds: ["batur-sunrise", "rafting", "atv", "water-sports", "surfing"], title: { ru: "Приключения и энергия", en: "Adventure & Energy" }, note: { ru: "Активные дни, природа и яркие впечатления на свежем воздухе.", en: "Active days, wild landscapes, and memorable outdoor experiences." } },
  { id: "beyond", packageIds: ["nusa-penida", "kintamani", "northwest-bali", "east-bali", "rafting", "atv"], title: { ru: "Бали за пределами главного", en: "Bali Beyond the Highlights" }, note: { ru: "Более глубокое путешествие по спокойному, локальному и разнообразному Бали.", en: "A deeper journey into Bali’s quieter, local, and more varied side." } },
] as const satisfies readonly ReadyMadeCollection[];
