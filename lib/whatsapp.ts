type WhatsAppDraft = {
  packageTitle: string;
  date?: string;
  guests?: string;
  pickup?: string;
  notes?: string;
  language?: "ru" | "en";
};

const lineValue = (value?: string) => value?.trim() || "—";

export function buildBookingMessage(draft: WhatsAppDraft) {
  return draft.language === "en"
    ? ["Hello! I am interested in a Bali journey or service.", "", `Journey or service: ${lineValue(draft.packageTitle)}`, `Date: ${lineValue(draft.date)}`, `Guests: ${lineValue(draft.guests)}`, `Hotel or area: ${lineValue(draft.pickup)}`, `Requests: ${lineValue(draft.notes)}`, "", "Please send the final details and price in USD."].join("\n")
    : ["Здравствуйте! Меня интересует маршрут или услуга на Бали.", "", `Маршрут или услуга: ${lineValue(draft.packageTitle)}`, `Дата: ${lineValue(draft.date)}`, `Количество гостей: ${lineValue(draft.guests)}`, `Отель или район: ${lineValue(draft.pickup)}`, `Пожелания: ${lineValue(draft.notes)}`, "", "Пожалуйста, пришлите финальные детали и стоимость в USD."].join("\n");
}

export function buildWhatsAppLink(number: string, draft: WhatsAppDraft) {
  const cleanNumber = number.replace(/\D/g, "");
  if (!cleanNumber) return "#request";
  const message = buildBookingMessage(draft);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
