export type LegalSection = { title: string; paragraphs: string[] };

export const termsCopy = {
  ru: {
    title: "Условия бронирования и оплаты",
    back: "На главную",
    effective: "Действует с 22 июля 2026 года",
    sections: [
      { title: "1. Подтверждение бронирования", paragraphs: ["Бронирование считается подтверждённым после согласования программы, даты, количества гостей, итоговой стоимости и получения взноса за бронирование в размере 20%. Подтверждение направляется письменно в выбранном канале связи."] },
      { title: "2. Стоимость, налоги и оплата", paragraphs: ["Итоговая стоимость в подтверждении уже учитывает применимые скидки и налоги Индонезии. После подтверждения к ней не добавляются обязательные сборы, если гость не меняет программу или количество участников.", "Взнос за бронирование является вознаграждением Bali Closer за подбор, координацию и резервирование услуг после начала организации поездки. Оставшиеся 80% оплачиваются на Бали до начала услуги способом, указанным в подтверждении."] },
      { title: "3. Изменения", paragraphs: ["Изменение даты, маршрута или количества гостей возможно при наличии мест. Если изменение влияет на транспорт, билеты, размещение или услуги поставщиков, новая итоговая стоимость согласуется до подтверждения изменения."] },
      { title: "4. Отмена гостем", paragraphs: ["Взнос за бронирование не возвращается при отмене гостем, кроме случаев, когда возврат обязателен по применимому законодательству. Другие полученные суммы возвращаются за вычетом документированных невозвратных расходов поставщиков. При отмене менее чем за 72 часа или неявке возврат зависит от уже подтверждённых услуг."] },
      { title: "5. Отмена с нашей стороны", paragraphs: ["Если подтверждённая услуга не может быть предоставлена с нашей стороны и равноценная замена не согласована, все полученные за неё платежи возвращаются полностью."] },
      { title: "6. Погода и обстоятельства вне контроля", paragraphs: ["Безопасность имеет приоритет. Погода, состояние моря, вулканическая активность, ограничения властей или другие обстоятельства вне разумного контроля могут потребовать изменения или переноса программы. Мы предложим подходящую замену, другую дату или доступный возврат после невозвратных расходов поставщиков."] },
      { title: "7. Ответственность гостя", paragraphs: ["Гость отвечает за действительные документы, соблюдение времени встречи и правил безопасности, а также за своевременное сообщение о медицинских ограничениях и особых потребностях."] },
      { title: "8. Обращения", paragraphs: ["Вопросы по бронированию и претензии можно направить через контактный канал, указанный на сайте. Мы подтвердим получение обращения и ответим по существу."] },
    ] satisfies LegalSection[],
  },
  en: {
    title: "Booking and payment terms",
    back: "Back to home",
    effective: "Effective 22 July 2026",
    sections: [
      { title: "1. Booking confirmation", paragraphs: ["A booking is confirmed after the programme, date, guest count, and final total are agreed and a 20% booking fee is received. Written confirmation is sent through your selected contact channel."] },
      { title: "2. Price, taxes, and payment", paragraphs: ["The confirmed total already includes applicable discounts and Indonesian taxes. No mandatory charge is added after confirmation unless the guest changes the programme or participant count.", "The booking fee is earned by Bali Closer for selecting, coordinating, and reserving services once arrangements begin. The remaining 80% is paid in Bali before the service starts using the method stated in the confirmation."] },
      { title: "3. Changes", paragraphs: ["Changes to the date, route, or guest count are subject to availability. If a change affects transport, tickets, accommodation, or supplier services, the new total will be agreed before the change is confirmed."] },
      { title: "4. Guest cancellation", paragraphs: ["The booking fee is non-refundable when the guest cancels, except where a refund is required by applicable law. Other amounts received are refunded less documented non-refundable supplier costs. For cancellation within 72 hours or a no-show, any refund depends on services already committed."] },
      { title: "5. Cancellation by us", paragraphs: ["If we cannot provide a confirmed service and an equivalent alternative is not accepted, all payments received for that service will be refunded in full."] },
      { title: "6. Weather and events outside our control", paragraphs: ["Safety comes first. Weather, sea conditions, volcanic activity, government restrictions, or other events outside reasonable control may require a change or postponement. We will offer a suitable alternative, another date, or the refundable balance after non-refundable supplier costs."] },
      { title: "7. Guest responsibilities", paragraphs: ["Guests are responsible for valid travel documents, meeting times, following safety instructions, and disclosing relevant medical restrictions or special needs in advance."] },
      { title: "8. Questions and concerns", paragraphs: ["Booking questions or concerns can be sent through the contact channel shown on the website. We will acknowledge the message and respond on its merits."] },
    ] satisfies LegalSection[],
  },
} as const;

export const privacyCopy = {
  ru: {
    title: "Политика конфиденциальности",
    back: "На главную",
    effective: "Действует с 22 июля 2026 года",
    sections: [
      { title: "1. Кто обрабатывает данные", paragraphs: ["Bali Closer обрабатывает данные, отправленные через этот сайт, чтобы ответить на запрос и организовать выбранные услуги."] },
      { title: "2. Какие данные мы собираем", paragraphs: ["Мы можем получить имя, контакт WhatsApp, email, даты поездки, количество гостей, район проживания, выбранные маршруты и сервисы, язык общения и пожелания, которые вы сообщаете добровольно."] },
      { title: "3. Для чего используются данные", paragraphs: ["Данные используются для ответа на запрос, подготовки итоговой программы и стоимости, подтверждения бронирования, координации с выбранными поставщиками и поддержки во время поездки."] },
      { title: "4. Передача данных", paragraphs: ["Мы передаём только необходимые данные email-провайдеру и местным поставщикам, участвующим в вашем бронировании. Мы не продаём персональные данные и не используем их для чужой рекламы."] },
      { title: "5. Хранение и безопасность", paragraphs: ["Данные заявки хранятся не дольше 24 месяцев после последнего контакта, если более длительный срок не требуется для исполнения бронирования, бухгалтерского учёта или закона. Доступ ограничен людьми и сервисами, которым он нужен для работы."] },
      { title: "6. Ваши права", paragraphs: ["Вы можете запросить доступ, исправление или удаление данных, а также отозвать согласие на дальнейшую связь. Некоторые сведения могут сохраняться, если этого требует закон или защита законных требований."] },
      { title: "7. Cookies и локальные настройки", paragraphs: ["Сайт может сохранять только технические настройки, необходимые для языка и работы интерфейса. Мы не используем рекламные cookies без отдельного уведомления и согласия."] },
      { title: "8. Контакты и обновления", paragraphs: ["По вопросам конфиденциальности напишите на {email}. Существенные изменения политики публикуются на этой странице с новой датой действия."] },
    ] satisfies LegalSection[],
  },
  en: {
    title: "Privacy policy",
    back: "Back to home",
    effective: "Effective 22 July 2026",
    sections: [
      { title: "1. Who handles your data", paragraphs: ["Bali Closer handles information submitted through this website so we can answer your enquiry and arrange the selected services."] },
      { title: "2. Information we collect", paragraphs: ["We may receive your name, WhatsApp number, email, travel dates, guest count, hotel area, selected journeys and services, communication language, and any requests you choose to share."] },
      { title: "3. How we use it", paragraphs: ["We use the information to answer your enquiry, prepare the final itinerary and total, confirm the booking, coordinate relevant suppliers, and support your trip."] },
      { title: "4. When information is shared", paragraphs: ["We share only the information needed with our email provider and local suppliers involved in your booking. We do not sell personal data or use it for third-party advertising."] },
      { title: "5. Retention and security", paragraphs: ["Enquiry data is kept for no longer than 24 months after the last contact unless a longer period is needed to complete a booking, keep accounting records, or comply with law. Access is limited to people and services that need it for their work."] },
      { title: "6. Your choices and rights", paragraphs: ["You may ask to access, correct, or delete your information, or withdraw consent to further contact. Some records may be retained where required by law or to protect legitimate claims."] },
      { title: "7. Cookies and local settings", paragraphs: ["The website may store only technical settings needed for language and interface operation. We do not use advertising cookies without a separate notice and consent."] },
      { title: "8. Contact and updates", paragraphs: ["For privacy questions, contact {email}. Material changes will be published on this page with a new effective date."] },
    ] satisfies LegalSection[],
  },
} as const;
