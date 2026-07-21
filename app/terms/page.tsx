import Link from "next/link";

export const metadata = { title: "Booking & payment terms | Bali Closer" };

export default function TermsPage() {
  return (
    <main className="legal-page">
      <p><Link href="/ru" className="text-link">← Русская версия</Link> · <Link href="/en" className="text-link">English version</Link></p>
      <p className="eyebrow">Bali Closer</p>
      <h1>Бронирование и оплата / Booking and payment</h1>
      <p>Действует с 22 июля 2026 года / Effective 22 July 2026</p>

      <section id="ru">
        <h2>Условия бронирования</h2>
        <h3>1. Подтверждение</h3>
        <p>Бронирование считается подтверждённым после согласования программы, даты, количества гостей и получения booking fee в размере 20% от итоговой стоимости. Подтверждение направляется письменно в согласованном канале связи.</p>
        <h3>2. Оплата</h3>
        <p>Booking fee является вознаграждением Bali Closer за подбор, координацию и резервирование услуг; право на него возникает после подтверждения бронирования и начала организации поездки. Оставшиеся 80% оплачиваются на Бали до начала услуги. Доступные способы оплаты, суммы и получатель указываются в подтверждении бронирования.</p>
        <h3>3. Изменения</h3>
        <p>Изменение даты, маршрута или количества гостей возможно при наличии мест. Если изменение влияет на транспорт, билеты, размещение или услуги поставщиков, стоимость пересчитывается и согласуется до подтверждения изменения.</p>
        <h3>4. Отмена гостем</h3>
        <p>Booking fee не возвращается при отмене гостем, кроме случаев, когда возврат обязателен по применимому законодательству. Суммы, оплаченные сверх booking fee, возвращаются за вычетом документированных невозвратных расходов поставщиков. При отмене менее чем за 72 часа или неявке возврат определяется с учётом уже подтверждённых услуг и условий поставщиков.</p>
        <h3>5. Отмена с нашей стороны</h3>
        <p>Если подтверждённая услуга не может быть предоставлена с нашей стороны и равноценная замена не согласована, все полученные за неё платежи возвращаются полностью.</p>
        <h3>6. Погода и форс-мажор</h3>
        <p>Безопасность имеет приоритет. Из-за погоды, состояния моря, вулканической активности, ограничений властей или иных обстоятельств вне разумного контроля программа может быть перенесена или изменена. Мы предложим подходящую замену, новую дату или возврат доступной суммы после удержания невозвратных расходов поставщиков.</p>
        <h3>7. Комбинации маршрутов</h3>
        <p>Для трёх или четырёх подходящих маршрутов может применяться выгода до 5%, для пяти — до 10%. Для шести и более маршрутов готовится индивидуальное предложение с выгодой до 15%. Комбинационная цена зависит от согласованной программы, не суммируется с другими специальными предложениями и действует только после письменного подтверждения.</p>
        <h3>8. Ответственность гостя и обращения</h3>
        <p>Гость отвечает за действительные документы, соблюдение времени встречи, правила безопасности и своевременное сообщение о медицинских ограничениях или особых потребностях. Вопросы по бронированию и претензии направляются через контактный канал, указанный на сайте; мы подтверждаем получение и рассматриваем обращение по существу.</p>
      </section>

      <section id="en">
        <h2>Booking terms</h2>
        <h3>1. Confirmation</h3>
        <p>A booking is confirmed after the programme, date, guest count, and final price are agreed and a 20% booking fee is received. Written confirmation is sent through the agreed contact channel.</p>
        <h3>2. Payment</h3>
        <p>The booking fee is earned by Bali Closer for selecting, coordinating, and reserving services once the booking is confirmed and arrangements begin. The remaining 80% is paid in Bali before the service begins. Available payment methods, amounts, and the recipient are stated in the booking confirmation.</p>
        <h3>3. Changes</h3>
        <p>Changes to the date, route, or guest count are subject to availability. If a change affects transport, tickets, accommodation, or supplier services, the price will be recalculated and agreed before the change is confirmed.</p>
        <h3>4. Guest cancellation</h3>
        <p>The booking fee is non-refundable when the guest cancels, except where a refund is required by applicable law. Amounts paid above the booking fee are refunded less documented non-refundable supplier costs. For cancellation within 72 hours or a no-show, any refund is determined by services already committed and the applicable supplier terms.</p>
        <h3>5. Cancellation by us</h3>
        <p>If we cannot provide a confirmed service and an equivalent alternative is not accepted, all payments received for that service will be refunded in full.</p>
        <h3>6. Weather and force majeure</h3>
        <p>Safety comes first. Weather, sea conditions, volcanic activity, government restrictions, or other events outside reasonable control may require a change or postponement. We will offer a suitable alternative, another date, or the refundable balance after non-refundable supplier costs.</p>
        <h3>7. Journey combinations</h3>
        <p>Three or four eligible journeys may receive savings of up to 5%; five may receive up to 10%. Six or more receive a tailored offer with savings of up to 15%. Combination pricing depends on the agreed programme, cannot be combined with other special offers, and applies only when confirmed in writing.</p>
        <h3>8. Guest responsibilities and concerns</h3>
        <p>Guests are responsible for valid travel documents, meeting times, following safety instructions, and disclosing relevant medical restrictions or special needs in advance. Booking questions or concerns can be sent through the contact channel shown on the website; we will acknowledge and address them on their merits.</p>
      </section>
    </main>
  );
}
