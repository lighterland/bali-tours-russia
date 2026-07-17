import Link from "next/link";

export const metadata = { title: "Booking & payment terms | Bali Closer" };

export default function TermsPage() {
  return (
    <main className="legal-page">
      <p><Link href="/ru" className="text-link">← Русская версия</Link> · <Link href="/en" className="text-link">English version</Link></p>
      <p className="eyebrow">Booking terms</p>
      <h1>Бронирование и оплата / Booking and payment</h1>
      <h2 id="ru">Кратко по-русски</h2>
      <p>Бронирование подтверждается после проверки даты, программы и получения 20% booking fee. Оставшиеся 80% оплачиваются на Бали согласованному представителю до начала услуги. Валюта и сумма каждого платежа фиксируются в подтверждении бронирования.</p>
      <p>Базовая цена каталога указана в USD. При оплате booking fee в RUB сумма округляется вверх до следующих 100 ₽ и фиксируется в предложении на 24 часа. Округлённая сумма RUB является окончательной суммой booking fee; остаток сохраняется как 80% базовой цены USD и не пересчитывается из-за округления.</p>
      <p>Booking fee резервирует дату и работу по организации поездки. При отмене гостем возврат зависит от срока отмены и уже понесённых невозвратных расходов. При отмене со стороны организатора гость получает полный возврат полученной суммы.</p>
      <p>Предложения для групп и специальные цены действуют только после письменного подтверждения. Код предложения сам по себе не гарантирует скидку или наличие мест.</p>
      <p>Специальная цена на комбинацию применяется при бронировании двух подходящих туров или активностей. Итоговая цена, программа, дата и наличие подтверждаются письменно.</p>
      <h2 id="en">English summary</h2>
      <p>Your booking is confirmed after the date and programme are checked and a 20% booking fee is received. The remaining 80% is paid in Bali to the agreed representative before the service starts. The currency and amount of every payment are recorded in your booking confirmation.</p>
      <p>USD is the base catalogue price. When the booking fee is paid in RUB, it is rounded up to the next ₽100 and fixed in a 24-hour quote. The rounded RUB figure is the final booking-fee amount; the balance remains 80% of the USD base price and is not recalculated because of that rounding.</p>
      <p>The booking fee reserves the date and covers booking administration. If you cancel, any refund depends on the cancellation timing and documented non-refundable third-party costs already incurred. If the organiser cancels, the amount received from you is refunded in full.</p>
      <p>Group offers and special rates apply only when confirmed in writing. An offer code does not by itself guarantee a discount or availability.</p>
      <p>Combination offers apply when two eligible tours or activities are booked together. Their final price, inclusions, date, and availability are stated in the written quote.</p>
      <h2>Cancellation schedule proposed for the pilot</h2>
      <ul>
        <li>More than 7 days before the service: refund received payments less documented non-refundable third-party costs.</li>
        <li>Between 72 hours and 7 days: the 20% booking fee may be retained only to the extent stated before payment and permitted by applicable law.</li>
        <li>Less than 72 hours or no-show: refund is assessed against costs already committed and supplier terms disclosed in the booking confirmation.</li>
        <li>Organiser or supplier cancellation: full refund of the amount received from the guest.</li>
      </ul>
      <div className="legal-note">These are pilot terms, not a final legal instrument. Merchant identity, governing law, payment provider, tax treatment, and final cancellation wording require review before public bookings are accepted.</div>
    </main>
  );
}
