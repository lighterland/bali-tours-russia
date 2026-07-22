import type { LocalizedText } from "@/lib/i18n";

export type BaliService = {
  id: string;
  title: LocalizedText;
  prompt: LocalizedText;
  options: ReadonlyArray<{ id: string; title: LocalizedText }>;
};

export const generalBaliService = {
  id: "service-general",
  title: { ru: "Общий запрос по услугам на Бали", en: "General Bali services enquiry" },
  prompt: { ru: "Опишите, какая помощь вам нужна", en: "Tell us what support you need" },
  options: [{ id: "general", title: { ru: "Другое", en: "Other request" } }],
} as const satisfies BaliService;

export const baliServicesCard = {
    id: "service-visas-documents",
    title: { ru: "Сервисы на Бали", en: "Bali Services" },
    prompt: { ru: "Выберите один или несколько типов запроса", en: "Choose one or more request types" },
    options: [
      { id: "visa", title: { ru: "Визы и иммиграция", en: "Visa & immigration" } },
      { id: "land", title: { ru: "Земля и документы на недвижимость", en: "Land & property documentation" } },
      { id: "documents", title: { ru: "Другие документы", en: "Other documents" } },
      { id: "villa", title: { ru: "Строительство и ремонт вилл", en: "Villa construction & renovation" } },
      { id: "business", title: { ru: "Открытие бизнеса", en: "Business setup" } },
      { id: "bank", title: { ru: "Помощь с местным банковским счётом", en: "Local bank account assistance" } },
    ],
} as const satisfies BaliService;

export function findBaliService(id: string) {
  if (id === generalBaliService.id) return generalBaliService;
  return id === baliServicesCard.id ? baliServicesCard : undefined;
}
