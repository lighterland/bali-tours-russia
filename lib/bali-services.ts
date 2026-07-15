import type { LocalizedText } from "@/lib/i18n";

export const generalBaliService = {
  id: "service-general",
  title: { ru: "Общий запрос по услугам на Бали", en: "General Bali services enquiry" },
} as const satisfies { id: string; title: LocalizedText };

export const baliServiceOptions = [
  { id: "service-scooter-rental", title: { ru: "Аренда скутеров и мотоциклов", en: "Scooter and motorbike rental" } },
  { id: "service-car-rental", title: { ru: "Автомобили с водителем или без", en: "Self-drive or chauffeured cars" } },
  { id: "service-group-transfer", title: { ru: "Минивэны и трансферы для групп", en: "Minivans and group transfers" } },
  { id: "service-visas-documents", title: { ru: "Визы, земля и документы", en: "Visas, land and documentation" } },
  { id: "service-villa-business", title: { ru: "Строительство виллы и открытие бизнеса", en: "Villa construction and business setup" } },
  { id: "service-bank-account", title: { ru: "Счёт в местном банке", en: "Local bank account" } },
] as const satisfies ReadonlyArray<{ id: string; title: LocalizedText }>;

export function findBaliService(id: string) {
  if (id === generalBaliService.id) return generalBaliService;
  return baliServiceOptions.find((service) => service.id === id);
}
