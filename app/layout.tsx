import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bali · Ближе — частные туры на Бали",
    template: "%s | Bali · Ближе",
  },
  description:
    "Частные маршруты по Бали для путешественников из России: понятная стоимость, живая консультация и подтверждение местной команды.",
  openGraph: {
    title: "Bali · Ближе — частные туры на Бали",
    description:
      "Выберите маршрут, расскажите о поездке и получите персональный расчёт.",
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
  },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#081612",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
