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
    ? ["Hello! I would like to plan a Bali trip.", "", `Selected plan: ${lineValue(draft.packageTitle)}`, `Date: ${lineValue(draft.date)}`, `Guests: ${lineValue(draft.guests)}`, `Hotel or area: ${lineValue(draft.pickup)}`, `Requests: ${lineValue(draft.notes)}`, "", "Please check availability and confirm the plan."].join("\n")
    : ["Здравствуйте! Я хочу спланировать поездку на Бали.", "", `Выбранный план: ${lineValue(draft.packageTitle)}`, `Дата: ${lineValue(draft.date)}`, `Количество гостей: ${lineValue(draft.guests)}`, `Отель или район: ${lineValue(draft.pickup)}`, `Пожелания: ${lineValue(draft.notes)}`, "", "Пожалуйста, проверьте доступность и подтвердите программу."].join("\n");
}

export function buildWhatsAppLink(number: string, draft: WhatsAppDraft) {
  const cleanNumber = number.replace(/\D/g, "");
  if (!cleanNumber) return "#request";
  const message = buildBookingMessage(draft);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
