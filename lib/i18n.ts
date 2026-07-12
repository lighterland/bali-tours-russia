export const supportedLanguages = ["ru", "en", "id"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export type LocalizedText = {
  ru: string;
  en?: string;
  id?: string;
};

export function russian(text: LocalizedText) {
  return text.ru;
}

export function localized(text: LocalizedText, language: "ru" | "en") {
  return text[language] || text.ru;
}

export const languageLabels: Record<SupportedLanguage, string> = {
  ru: "Русский",
  en: "English",
  id: "Bahasa Indonesia",
};
