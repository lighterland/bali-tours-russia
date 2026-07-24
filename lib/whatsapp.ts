type WhatsAppDraft = {
  packageTitle: string;
  date?: string;
  guests?: string;
  pickup?: string;
  notes?: string;
  language?: "ru" | "en";
  totalUsd?: number;
  vehicle?: string;
  rentalDays?: number;
};

const lineValue = (value?: string) => value?.trim() || "—";

export function buildBookingMessage(draft: WhatsAppDraft) {
  const totalLine = draft.totalUsd === undefined
    ? []
    : [draft.language === "en" ? `Total: $${draft.totalUsd}` : `Итого: $${draft.totalUsd}`];
  const rentalLines = draft.vehicle ? draft.language === "en"
    ? [`Vehicle: ${draft.vehicle}`, `Rental duration: ${draft.rentalDays || 1} days`]
    : [`Транспорт: ${draft.vehicle}`, `Срок аренды: ${draft.rentalDays || 1} дн.`]
    : [];
  return draft.language === "en"
    ? ["Hello! I would like to plan a Bali trip.", "", `Selected plan: ${lineValue(draft.packageTitle)}`, ...totalLine, ...rentalLines, `Travel period: ${lineValue(draft.date)}`, `Guests: ${lineValue(draft.guests)}`, `Hotel or area: ${lineValue(draft.pickup)}`, `Requests: ${lineValue(draft.notes)}`, "", "Please send the final itinerary and 20% booking fee details."].join("\n")
    : ["Здравствуйте! Я хочу спланировать поездку на Бали.", "", `Выбранный план: ${lineValue(draft.packageTitle)}`, ...totalLine, ...rentalLines, `Период поездки: ${lineValue(draft.date)}`, `Количество гостей: ${lineValue(draft.guests)}`, `Отель или район: ${lineValue(draft.pickup)}`, `Пожелания: ${lineValue(draft.notes)}`, "", "Пожалуйста, отправьте итоговую программу и реквизиты для взноса 20%."].join("\n");
}

export function buildWhatsAppLink(number: string, draft: WhatsAppDraft) {
  const cleanNumber = number.replace(/\D/g, "");
  if (!cleanNumber) return "#request";
  const message = buildBookingMessage(draft);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
