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

export const baliServiceOptions = [
  {
    id: "service-visas-documents",
    title: { ru: "Визы, земля и документы", en: "Visas, land and documentation" },
    prompt: { ru: "Выберите направление", en: "Choose a request type" },
    options: [
      { id: "visa", title: { ru: "Виза и продление", en: "Visa and extension" } },
      { id: "land", title: { ru: "Земля и проверка документов", en: "Land and document checks" } },
      { id: "documents", title: { ru: "Другие документы", en: "Other documentation" } },
    ],
  },
  {
    id: "service-villa-business",
    title: { ru: "Строительство виллы и бизнес", en: "Villa construction and business setup" },
    prompt: { ru: "Выберите направление", en: "Choose a request type" },
    options: [
      { id: "villa", title: { ru: "Строительство или ремонт виллы", en: "Villa construction or renovation" } },
      { id: "business", title: { ru: "Открытие бизнеса", en: "Business setup" } },
      { id: "consultation", title: { ru: "Первичная консультация", en: "Initial consultation" } },
    ],
  },
  {
    id: "service-bank-account",
    title: { ru: "Счёт в местном банке", en: "Local bank account" },
    prompt: { ru: "Выберите тип запроса", en: "Choose a request type" },
    options: [
      { id: "personal", title: { ru: "Личный счёт", en: "Personal account" } },
      { id: "business", title: { ru: "Бизнес-счёт", en: "Business account" } },
      { id: "consultation", title: { ru: "Проверка требований", en: "Eligibility consultation" } },
    ],
  },
] as const satisfies ReadonlyArray<BaliService>;

export function findBaliService(id: string) {
  if (id === generalBaliService.id) return generalBaliService;
  return baliServiceOptions.find((service) => service.id === id);
}
