type WhatsAppDraft = {
  packageTitle: string;
  date?: string;
  guests?: string;
  pickup?: string;
  notes?: string;
  language?: "ru" | "en";
  vehicle?: string;
  rentalDays?: number;
  rentalSubtotalUsd?: number;
};

const lineValue = (value?: string) => value?.trim() || "—";

export function buildBookingMessage(draft: WhatsAppDraft) {
  const rentalLines = draft.vehicle ? draft.language === "en"
    ? [`Vehicle: ${draft.vehicle}`, `Rental duration: ${draft.rentalDays || 1} days`, `Rental subtotal: ${draft.rentalSubtotalUsd === undefined ? "On request" : `$${draft.rentalSubtotalUsd}`}`]
    : [`Транспорт: ${draft.vehicle}`, `Срок аренды: ${draft.rentalDays || 1} дн.`, `Сумма аренды: ${draft.rentalSubtotalUsd === undefined ? "По запросу" : `$${draft.rentalSubtotalUsd}`}`]
    : [];
  return draft.language === "en"
    ? ["Hello! I would like to plan a Bali trip.", "", `Selected plan: ${lineValue(draft.packageTitle)}`, ...rentalLines, `Travel period: ${lineValue(draft.date)}`, `Guests: ${lineValue(draft.guests)}`, `Hotel or area: ${lineValue(draft.pickup)}`, `Requests: ${lineValue(draft.notes)}`, "", "Please send the final itinerary, total, and 20% booking fee details."].join("\n")
    : ["Здравствуйте! Я хочу спланировать поездку на Бали.", "", `Выбранный план: ${lineValue(draft.packageTitle)}`, ...rentalLines, `Период поездки: ${lineValue(draft.date)}`, `Количество гостей: ${lineValue(draft.guests)}`, `Отель или район: ${lineValue(draft.pickup)}`, `Пожелания: ${lineValue(draft.notes)}`, "", "Пожалуйста, отправьте итоговую программу, стоимость и реквизиты для взноса 20%."].join("\n");
}

export function buildWhatsAppLink(number: string, draft: WhatsAppDraft) {
  const cleanNumber = number.replace(/\D/g, "");
  if (!cleanNumber) return "#request";
  const message = buildBookingMessage(draft);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
