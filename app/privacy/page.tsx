import Link from "next/link";

export const metadata = { title: "Обработка данных заявки" };

export default function PrivacyPage() {
  const email = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "business email shown on the website";
  return (
    <main className="legal-page">
      <Link href="/" className="text-link">← На главную</Link>
      <p className="eyebrow">Privacy</p>
      <h1>Обработка данных заявки</h1>
      <p>
        Мы используем данные формы только для ответа на запрос, подготовки предложения и координации выбранной поездки. Обязательные данные: имя, WhatsApp, даты, количество гостей и согласие на обратную связь.
      </p>
      <p>
        Уведомление о новой заявке отправляется в рабочий почтовый ящик через настроенного email-провайдера. После квалификации запроса данные переносятся в структурированную сводку бронирования.
      </p>
      <p>
        Чтобы запросить доступ, исправление или удаление данных, напишите на <a href={`mailto:${email}`}>{email}</a>.
      </p>
      <div className="legal-note">
        Перед публичным запуском владелец бизнеса должен добавить юридическое наименование, адрес, сроки хранения и формулировки, требуемые применимым законодательством.
      </div>
    </main>
  );
}
