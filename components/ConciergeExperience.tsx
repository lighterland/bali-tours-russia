"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { TourPackage } from "@/lib/catalogue";
import { contactChannels } from "@/lib/enquiry";
import { localized, type SupportedLanguage } from "@/lib/i18n";
import { mediaAssets } from "@/lib/media";
import { siteCopy } from "@/lib/site-copy";
import { buildBookingMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { baliServiceOptions, findBaliService, generalBaliService } from "@/lib/bali-services";
import Link from "next/link";

type Props = {
  packages: TourPackage[];
  locale: "ru" | "en";
  whatsappNumber: string;
  telegramUrl: string;
  vkUrl: string;
  businessEmail: string;
};

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; enquiryId: string }
  | { status: "error"; message: string };

const resolveAssetUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) return url;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${basePath}${url}`;
};

const heroFallback = resolveAssetUrl(mediaAssets.riceTerraces.url);

const curatedMedia: Record<string, string> = {
  kintamani: "/media/incoming/ubud-rice-terraces.webp",
  "northwest-bali": "/media/northwest-bali.jpg",
  "east-bali": "/media/incoming/tirta-gangga.webp",
  "temple-tour": "/media/incoming/temple-carving.webp",
  "beach-tour": "/media/incoming/bali-winding-road.webp",
  rafting: "/media/rafting-bali.webp",
  fishing: "/media/fishing.jpg",
  "turtle-snorkeling": "/media/turtle-snorkeling.jpg",
  surfing: "/media/incoming/Bali%20surfing.jpg",
  safari: "/media/safari-bali.jpg",
  "batur-sunrise": "/media/batur-sunrise.jpg",
  "water-sports": "/media/water-sports.jpg",
  atv: "/media/atv-bali.webp",
  "nusa-penida": "/media/incoming/kelingking-beach.webp",
  "craft-jewellery": "/media/craft-jewellery.webp",
  "romantic-dinner": "/media/incoming/bali-winding-road.webp",
  "vehicle-rental": "/media/vehicle-rental.jpg",
  "java-bromo-ijen": "/media/incoming/Mount%20Bromo%20sunrise.jpg",
  "java-yogyakarta": "/media/incoming/Borobudur%20Temple.jpg",
};

const ui = {
  ru: {
    brand: "BALI · БЛИЖЕ", navLabel: "Главная навигация", openMenu: "Открыть меню", closeMenu: "Закрыть меню",
    photo: "Атмосферное фото", priceNote: "", request: "Добавить",
    teamPhoto: "Атмосферное фото · реальная команда будет добавлена после письменного разрешения",
    fillForm: "Заполнить форму", openWhatsApp: "Открыть WhatsApp", otherChannels: "Другие каналы:",
    formEyebrow: "Заявка", chooseRoute: "Выберите маршрут или услугу", formIntro: "Укажите даты и детали запроса. Мы свяжемся с вами, уточним условия и поможем со следующим шагом.",
    sent: "Заявка отправлена.", sentDetail: "Ориентир ответа: в течение рабочего дня. Номер:", sendError: "Не получилось отправить.",
    name: "Имя *", whatsapp: "WhatsApp с кодом страны *", date: "Дата начала *", serviceDate: "Предпочтительная дата (необязательно)", datePlaceholder: "", endDate: "Дата окончания (необязательно)",
    guests: "Количество гостей *", serviceGuests: "Количество человек (необязательно)", route: "Что вас интересует?", journeysGroup: "Маршруты", servicesGroup: "Услуги на Бали · наличие по запросу", channel: "Как связаться *", optional: "необязательно", pickup: "Отель или район",
    pickupPlaceholder: "Можно сообщить позже", language: "Язык общения *", wishes: "Пожелания", wishesPlaceholder: "Темп, интересы, особые потребности",
    consent: "Я согласен(-на) на обработку данных заявки и обратную связь.", details: "Подробнее", sending: "Отправляем…", send: "Отправить заявку",
    footerRoutes: "Маршруты", footerContact: "Контакты", footerPrivacy: "Данные заявки", footerTerms: "Бронирование и оплата", offerCode: "Код предложения", errorMessage: "Не удалось отправить запрос.", detailsLabel: "Подробнее", includedLabel: "Что включено", routeLabel: "Маршрут и остановки", priceLabel: "Условия цены",
    add: "Добавить в план", added: "В плане", remove: "Удалить", plannerEyebrow: "Ваш план", plannerTitle: "Соберите поездку", plannerEmpty: "Добавляйте маршруты — расчёт появится здесь.", subtotal: "Стоимость", saving: "Выгода комбинации", estimate: "Ориентировочный итог", bookingFee: "Для бронирования · 20%", balance: "Остаток на Бали · 80%", bundle: "Цена комбинации", bundleManual: "6+ впечатлений: запросите индивидуальную цену до 15%", guestsShort: "Гостей", rentalDays: "Дней аренды", vehicleChoice: "Вариант транспорта", estimateNote: "Итог подтверждается после проверки дат и выбранных опций.", free: "Бесплатно",
  },
  en: {
    brand: "BALI · CLOSER", navLabel: "Main navigation", openMenu: "Open menu", closeMenu: "Close menu",
    photo: "Atmospheric image", priceNote: "", request: "Add",
    teamPhoto: "Atmospheric image · the real team will be added after written permission",
    fillForm: "Complete the form", openWhatsApp: "Open WhatsApp", otherChannels: "Other channels:",
    formEyebrow: "Enquiry", chooseRoute: "Choose a journey or service", formIntro: "Share your dates and request details. We will contact you, confirm the arrangements, and help with the next step.",
    sent: "Enquiry sent.", sentDetail: "Expected reply: within one business day. Reference:", sendError: "Unable to send.",
    name: "Name *", whatsapp: "WhatsApp with country code *", date: "Start date *", serviceDate: "Preferred date (optional)", datePlaceholder: "", endDate: "End date (optional)",
    guests: "Number of guests *", serviceGuests: "People or group size (optional)", route: "What are you interested in?", journeysGroup: "Journeys", servicesGroup: "Bali services · availability on request", channel: "Preferred contact *", optional: "optional", pickup: "Hotel or area",
    pickupPlaceholder: "You can tell us later", language: "Communication language *", wishes: "Your wishes", wishesPlaceholder: "Pace, interests, special requirements",
    consent: "I agree to the processing of my enquiry data and to being contacted.", details: "Learn more", sending: "Sending…", send: "Send enquiry",
    footerRoutes: "Journeys", footerContact: "Contact", footerPrivacy: "Enquiry data", footerTerms: "Booking & payment", offerCode: "Offer code", errorMessage: "Unable to send the enquiry.", detailsLabel: "View details", includedLabel: "What's included", routeLabel: "Route and stops", priceLabel: "Price terms",
    add: "Add to trip", added: "In your plan", remove: "Remove", plannerEyebrow: "Your plan", plannerTitle: "Build your Bali trip", plannerEmpty: "Add journeys and your estimate will appear here.", subtotal: "Trip value", saving: "Combination saving", estimate: "Estimated total", bookingFee: "To reserve · 20%", balance: "Balance in Bali · 80%", bundle: "Combination price", bundleManual: "6+ experiences: ask for a tailored rate up to 15%", guestsShort: "Guests", rentalDays: "Rental days", vehicleChoice: "Vehicle option", estimateNote: "Your total is confirmed after dates and selected options are checked.", free: "Free",
  },
} as const;

const services = {
  ru: { eyebrow: "Сервисы на Бали", title: "Всё необходимое для поездки и жизни на острове.", body: "Закажите транспорт для одного дня или всей поездки, а также получите помощь с практическими вопросами переезда и жизни на Бали.", cta: "Отправить запрос" },
  en: { eyebrow: "Bali services", title: "Everything you need for the journey—and life on the island.", body: "Arrange transport for a single day or your whole stay, and get practical support for relocating or establishing life in Bali.", cta: "Send a request" },
} as const;

const bookingFaq = {
  ru: {
    eyebrow: "Оплата и условия", title: "Понятно до бронирования.", body: "Вы получаете программу, итоговую стоимость и порядок оплаты в одном подтверждении.", terms: "Полные условия бронирования",
    items: [
      ["Как подтвердить бронирование?", "После согласования программы и даты вносится невозвратный booking fee 20%. Он закрепляет дату и запускает организацию поездки."],
      ["Можно оплатить booking fee в рублях?", "Да. Доступный способ, сумма и срок оплаты будут указаны в персональном подтверждении."],
      ["Как оплатить оставшиеся 80%?", "Остаток оплачивается на Бали перед началом услуги способом, указанным в подтверждении бронирования."],
      ["Как работает цена комбинации?", "Для 3–4 подходящих маршрутов расчёт включает 5% выгоды, для 5 — 10%. Для 6 и более мы подготовим индивидуальное предложение до 15%."],
      ["Что произойдёт при отмене?", "Booking fee не возвращается при отмене гостем. Остальные возвраты зависят от срока отмены и уже оплаченных поставщикам расходов. При отмене с нашей стороны полученная сумма возвращается полностью."],
    ],
  },
  en: {
    eyebrow: "Payment & terms", title: "Clear before you reserve.", body: "Your programme, final total, and payment steps are recorded in one confirmation.", terms: "Full booking terms",
    items: [
      ["How is a booking confirmed?", "After the programme and date are agreed, a non-refundable 20% booking fee reserves your date and starts the arrangements."],
      ["Can I pay the booking fee in RUB?", "Yes. The available method, amount, and payment window will be included in your personal confirmation."],
      ["How do I pay the remaining 80%?", "The balance is paid in Bali before the service begins using the method stated in your booking confirmation."],
      ["How does combination pricing work?", "Three or four eligible journeys receive a 5% combination saving; five receive 10%. For six or more, we prepare a tailored offer of up to 15%."],
      ["What happens if I cancel?", "The booking fee is non-refundable when the guest cancels. Any other refund depends on timing and supplier costs already paid. If we cancel, the amount received is refunded in full."],
    ],
  },
} as const;

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function MenuIcon({ open }: { open: boolean }) {
  return <span aria-hidden="true" className="menu-icon">{open ? "×" : "☰"}</span>;
}

function SocialIcon({ name }: { name: "instagram" | "vk" | "telegram" | "whatsapp" }) {
  const paths = {
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></>,
    vk: <path d="M3 7h4c.4 3 1.8 5 3 5.4V7h4v3.1c1.2-.2 2.6-1.8 3.3-3.1H21c-.6 2-2.2 3.7-3.4 4.7 1.2.8 3.1 2.3 4.4 5.3h-4.4c-.8-1.7-2.1-3-3.6-3.3V17h-.5C7.8 17 4.4 13.2 3 7Z"/>,
    telegram: <path d="m3 11 17-7-3 16-5-4-3 3v-5l8-7-10 6-4-2Z"/>,
    whatsapp: <><path d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.1A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.5 3 2.2 4.7 5 5.5l1-1.5 2 1c-.5 2-1.7 3-3.3 2.7-3.7-.7-6.1-3-6.9-6.4C6.5 8.3 7.5 7 9 8.5Z"/></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="social-icon" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export function ConciergeExperience({
  packages,
  locale,
  whatsappNumber,
  telegramUrl,
  vkUrl,
  businessEmail,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPackageIds, setSelectedPackageIds] = useState<string[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [vehicleVariantId, setVehicleVariantId] = useState("scooter-city");
  const [rentalDays, setRentalDays] = useState(1);
  const [preferredChannel, setPreferredChannel] = useState<(typeof contactChannels)[number]>("WhatsApp");
  const language: SupportedLanguage = locale;
  const [whatsAppDraft, setWhatsAppDraft] = useState({ date: "", guests: "2", pickup: "", notes: "" });
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [showHeroVideo, setShowHeroVideo] = useState(false);
  const copy = siteCopy[locale];
  const labels = ui[locale];
  const text = (value: Parameters<typeof localized>[0]) => localized(value, locale);

  const selectedPackages = useMemo(
    () => selectedPackageIds.map((id) => packages.find((tour) => tour.id === id)).filter((item): item is TourPackage => Boolean(item)),
    [packages, selectedPackageIds],
  );
  const selectedService = findBaliService(selectedServiceId);
  const selectedInterestTitle = selectedPackages.length
    ? selectedPackages.map((item) => text(item.title)).join(", ")
    : selectedService
      ? text(selectedService.title)
      : labels.chooseRoute;
  const guestCount = Math.max(1, Number.parseInt(whatsAppDraft.guests, 10) || 1);
  const vehiclePackage = packages.find((item) => item.id === "vehicle-rental");
  const vehicleVariant = vehiclePackage?.pricing.variants?.find((item) => item.id === vehicleVariantId) || vehiclePackage?.pricing.variants?.[0];
  const lineTotal = (tour: TourPackage) => {
    if (tour.pricing.model === "free") return 0;
    if (tour.id === "vehicle-rental" && vehicleVariant) return vehicleVariant.amountUsd * rentalDays;
    if (tour.pricing.model === "per_guest") return tour.pricing.amountUsd * guestCount;
    if (tour.pricing.model === "per_group") {
      const extraGuests = Math.max(0, guestCount - (tour.pricing.includedGuests || guestCount));
      return tour.pricing.amountUsd + extraGuests * (tour.pricing.extraGuestUsd || 0);
    }
    return tour.pricing.amountUsd;
  };
  const subtotal = selectedPackages.reduce((sum, tour) => sum + lineTotal(tour), 0);
  const eligiblePackages = selectedPackages.filter((tour) => tour.pricing.discountEligible);
  const eligibleCount = eligiblePackages.length;
  const eligibleSubtotal = eligiblePackages.reduce((sum, tour) => sum + lineTotal(tour), 0);
  const discountRate = eligibleCount >= 5 ? 0.1 : eligibleCount >= 3 ? 0.05 : 0;
  const saving = eligibleCount >= 6 ? 0 : Math.round(eligibleSubtotal * discountRate);
  const estimatedTotal = subtotal - saving;
  const planSummary = selectedPackages.length
    ? locale === "ru"
      ? `${selectedInterestTitle} · гостей: ${guestCount} · ориентировочно: $${estimatedTotal}`
      : `${selectedInterestTitle} · guests: ${guestCount} · estimated: $${estimatedTotal}`
    : selectedInterestTitle;
  const directWhatsApp = buildWhatsAppLink(whatsappNumber, {
    packageTitle: planSummary,
    language: locale,
    ...whatsAppDraft,
  });

  useEffect(() => {
    document.documentElement.lang = locale;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean; effectiveType?: string };
    }).connection;
    const updateHeroVideo = () => {
      const slowConnection = ["slow-2g", "2g"].includes(connection?.effectiveType || "");
      setShowHeroVideo(!connection?.saveData && !slowConnection && !motionQuery.matches);
    };
    updateHeroVideo();
    motionQuery.addEventListener("change", updateHeroVideo);
    connection?.addEventListener("change", updateHeroVideo);

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    let frame = 0;
    const animateScroll = () => {
      if (motionQuery.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.querySelectorAll<HTMLElement>(".route-image.has-media").forEach((image) => {
          const rect = image.getBoundingClientRect();
          const offset = Math.max(-18, Math.min(18, (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.035));
          image.style.backgroundPosition = `center calc(50% + ${offset}px)`;
        });
      });
    };
    animateScroll();
    window.addEventListener("scroll", animateScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", animateScroll);
      motionQuery.removeEventListener("change", updateHeroVideo);
      connection?.removeEventListener("change", updateHeroVideo);
      cancelAnimationFrame(frame);
    };
  }, [locale]);

  function selectInterest(id: string) {
    setSelectedServiceId(id);
    if (id.startsWith("service-")) setSelectedPackageIds([]);
    setWhatsAppDraft((value) => ({
      ...value,
      guests: id.startsWith("service-") ? "" : value.guests || "2",
    }));
  }

  function choosePackage(id: string) {
    setSelectedServiceId("");
    setWhatsAppDraft((value) => ({ ...value, guests: value.guests || "2" }));
    setSelectedPackageIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({ status: "submitting" });
    const form = event.currentTarget;
    const data = new FormData(form);
    const enquiryId = crypto.randomUUID();
    const payload = {
      enquiryId,
      name: data.get("name"),
      whatsapp: data.get("whatsapp"),
      email: data.get("email"),
      preferredChannel: data.get("preferredChannel"),
      date: [data.get("date"), data.get("endDate")].filter(Boolean).join(" — "),
      guests: data.get("guests"),
      packageIds: selectedPackageIds,
      serviceId: selectedPackages.length ? "" : selectedServiceId || generalBaliService.id,
      pickup: data.get("pickup"),
      notes: data.get("notes"),
      language: data.get("language"),
      consent: data.get("consent") === "on",
      source: data.get("source") || "website",
      website: data.get("website") || "",
      submittedAt: new Date().toISOString(),
    };
    const selectedChannel = String(data.get("preferredChannel"));
    const bookingDraft = {
      packageTitle: planSummary,
      date: [data.get("date"), data.get("endDate")].filter(Boolean).join(" — "),
      guests: String(data.get("guests") || ""), pickup: String(data.get("pickup") || ""), notes: String(data.get("notes") || ""), language: locale,
    } as const;

    try {
      if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
        const message = buildBookingMessage(bookingDraft);
        if (selectedChannel === "WhatsApp" && whatsappNumber) {
          window.open(buildWhatsAppLink(whatsappNumber, bookingDraft), "_blank", "noopener,noreferrer");
        } else if (selectedChannel === "Telegram" && telegramUrl) {
          await navigator.clipboard?.writeText(message);
          window.open(telegramUrl, "_blank", "noopener,noreferrer");
        } else if (selectedChannel === "VK" && vkUrl) {
          await navigator.clipboard?.writeText(message);
          window.open(vkUrl, "_blank", "noopener,noreferrer");
        } else if (selectedChannel === "Email" && businessEmail) {
          window.location.href = `mailto:${businessEmail}?subject=${encodeURIComponent(`Booking enquiry · ${bookingDraft.packageTitle}`)}&body=${encodeURIComponent(message)}`;
        }
        setSubmitState({ status: "success", enquiryId });
        form.reset();
        setPreferredChannel("WhatsApp");
        setWhatsAppDraft({ date: "", guests: selectedService ? "" : "2", pickup: "", notes: "" });
        return;
      }
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string; enquiryId?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || labels.errorMessage);
      setSubmitState({ status: "success", enquiryId: result.enquiryId || enquiryId });
      if (selectedChannel === "WhatsApp" && whatsappNumber) {
        window.open(buildWhatsAppLink(whatsappNumber, bookingDraft), "_blank", "noopener,noreferrer");
      } else if (selectedChannel === "Telegram" && telegramUrl) {
        await navigator.clipboard?.writeText(buildBookingMessage(bookingDraft));
        window.open(telegramUrl, "_blank", "noopener,noreferrer");
      } else if (selectedChannel === "VK" && vkUrl) {
        await navigator.clipboard?.writeText(buildBookingMessage(bookingDraft));
        window.open(vkUrl, "_blank", "noopener,noreferrer");
      }
      form.reset();
      setPreferredChannel("WhatsApp");
      setWhatsAppDraft({ date: "", guests: selectedService ? "" : "2", pickup: "", notes: "" });
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : labels.errorMessage,
      });
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={labels.brand}>
          <span className="brand-mark">B</span>
          <span>{labels.brand}</span>
        </a>
        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label={labels.navLabel}>
          <a href="#routes" onClick={() => setMenuOpen(false)}>{copy.nav.routes}</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>{copy.nav.process}</a>
          <a href="#trust" onClick={() => setMenuOpen(false)}>{copy.nav.trust}</a>
          <a href="#request" onClick={() => setMenuOpen(false)}>{copy.nav.contact}</a>
        </nav>
        <div className="header-actions">
          <div className="language-toggle" role="group" aria-label="Language">
            {(["ru", "en"] as const).map((value) => <a key={value} href={resolveAssetUrl(`/${value}/`)} className={locale === value ? "active" : ""} aria-current={locale === value ? "page" : undefined}>{value.toUpperCase()}</a>)}
          </div>
          <a className="header-cta" href="#request">{copy.nav.cta}</a>
        </div>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-sticky">
          <div className="hero-media" style={{ backgroundImage: `url(${heroFallback})` }} aria-hidden="true">
            {showHeroVideo ? <video autoPlay muted loop playsInline preload="none" poster={heroFallback} src={resolveAssetUrl("/media/hero-bali.mp4")} /> : null}
            <div className="hero-scrim" />
          </div>
          <div className="hero-content">
          <p className="eyebrow">{copy.hero.eyebrow}</p>
          <h1>{copy.hero.title}<br /><em>{copy.hero.accent}</em></h1>
          <p className="hero-lead">{copy.hero.lead}</p>
          <div className="hero-actions">
            <a className="button primary" href="#routes">{copy.hero.routesCta} <ArrowIcon /></a>
            <a className="button glass" href="#contact-form">
              {copy.hero.whatsappCta}
            </a>
          </div>
          </div>
          <div className="hero-footer">
            {copy.hero.footer.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="statement section" data-reveal>
        <p className="eyebrow dark">{copy.statement.eyebrow}</p>
        <div className="statement-grid">
          <h2>{copy.statement.title}</h2>
          <div>
            <p>{copy.statement.body}</p>
            <a className="text-link" href="#process">{copy.statement.link} <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <section className="routes section" id="routes">
        <div className="section-heading" data-reveal>
          <div><p className="eyebrow dark">{copy.routes.eyebrow}</p><h2>{copy.routes.title}</h2></div>
          <p>{copy.routes.body}</p>
        </div>
        <div className="route-grid">
          {packages.map((tour) => {
            const secondaryPrice = tour.price.secondaryLabel ? text(tour.price.secondaryLabel) : undefined;
            const isSelected = selectedPackageIds.includes(tour.id);
            return <article className={`route-card ${tour.promotion?.spotlight ? "featured" : ""} ${isSelected ? "selected" : ""}`} key={tour.id} data-reveal>
              <div className={`route-image ${curatedMedia[tour.id] ? "has-media" : "media-pending"}`} style={curatedMedia[tour.id] ? { backgroundImage: `url(${resolveAssetUrl(curatedMedia[tour.id])})` } : undefined} role="img" aria-label={text(tour.title)}>
                {tour.promotion && <span className="offer-badge">{text(tour.promotion.badge)}</span>}
              </div>
              <div className="route-body">
                <div className="route-kicker"><span>{text(tour.family)}</span><span>{text(tour.duration)}</span></div>
                <h3>{text(tour.title)}</h3>
                <p>{text(tour.summary)}</p>
                {tour.promotion && <div className="route-offer"><strong>{text(tour.promotion.note)}</strong></div>}
                <div className="route-tags">{tour.highlights.map((item) => <span key={item.ru}>{text(item)}</span>)}</div>
                <details className="route-details">
                  <summary>{labels.detailsLabel}</summary>
                  <p className="experience-copy">{text(tour.experience)}</p>
                  <div><strong>{text(tour.itineraryLabel)}</strong><ul>{tour.itinerary.map((item) => <li key={item.ru}>{text(item)}</li>)}</ul></div>
                  <div><strong>{text(tour.includedLabel)}</strong><p>{text(tour.included)}</p></div>
                   <div><strong>{text(tour.priceDetailLabel)}</strong><p>{text(tour.priceDetail)}</p></div>
                   {tour.pricing.variants ? <div><strong>{labels.vehicleChoice}</strong><ul>{tour.pricing.variants.map((variant) => <li key={variant.id}>{text(variant.title)} — ${variant.amountUsd} / {locale === "ru" ? "день" : "day"}</li>)}</ul></div> : null}
                 </details>
                <div className="route-bottom">
                  <div className="route-price">
                    <strong className="route-price-primary">{text(tour.price.label)}</strong>
                    {secondaryPrice && <span className="route-price-secondary">{secondaryPrice}</span>}
                  </div>
                  <button className={`plan-toggle ${isSelected ? "is-added" : ""}`} type="button" onClick={() => choosePackage(tour.id)} aria-pressed={isSelected}>{isSelected ? labels.added : labels.add}</button>
                </div>
              </div>
            </article>;
          })}
         </div>
        <aside className="trip-planner" id="trip-planner" data-reveal>
          <div className="planner-heading"><p className="eyebrow dark">{labels.plannerEyebrow}</p><h3>{labels.plannerTitle}</h3></div>
          <label className="planner-guests"><span>{labels.guestsShort}</span><select value={whatsAppDraft.guests} onChange={(event) => setWhatsAppDraft((value) => ({ ...value, guests: event.target.value }))}>{["1", "2", "3", "4", "5", "6+"].map((value) => <option key={value}>{value}</option>)}</select></label>
          {selectedPackages.length ? <>
            <div className="planner-items">{selectedPackages.map((tour) => <div className="planner-item" key={tour.id}><div><strong>{text(tour.title)}</strong><small>{tour.id === "vehicle-rental" && vehicleVariant ? text(vehicleVariant.title) : text(tour.price.label)}</small></div><span>{tour.pricing.model === "free" ? labels.free : `$${lineTotal(tour)}`}</span><button type="button" onClick={() => choosePackage(tour.id)} aria-label={`${labels.remove}: ${text(tour.title)}`}>×</button></div>)}</div>
            {selectedPackageIds.includes("vehicle-rental") && vehiclePackage?.pricing.variants ? <div className="planner-rental"><label className="planner-vehicle"><span>{labels.vehicleChoice}</span><select value={vehicleVariantId} onChange={(event) => setVehicleVariantId(event.target.value)}>{vehiclePackage.pricing.variants.map((variant) => <option value={variant.id} key={variant.id}>{text(variant.title)} · ${variant.amountUsd}/{locale === "ru" ? "день" : "day"}</option>)}</select></label><label className="planner-vehicle"><span>{labels.rentalDays}</span><input type="number" min="1" max="60" value={rentalDays} onChange={(event) => setRentalDays(Math.max(1, Number(event.target.value) || 1))} /></label></div> : null}
            <div className="planner-totals"><div><span>{labels.subtotal}</span><strong>${subtotal}</strong></div>{saving > 0 ? <div className="planner-saving"><span>{labels.saving} · {discountRate * 100}%</span><strong>−${saving}</strong></div> : null}<div className="planner-grand"><span>{labels.estimate}</span><strong>${estimatedTotal}</strong></div><div><span>{labels.bookingFee}</span><strong>${Math.round(estimatedTotal * 0.2)}</strong></div><div><span>{labels.balance}</span><strong>${Math.round(estimatedTotal * 0.8)}</strong></div></div>
            {eligibleCount >= 6 ? <p className="planner-bundle">{labels.bundleManual}</p> : eligibleCount >= 3 ? <p className="planner-bundle">{labels.bundle}: {discountRate * 100}%</p> : null}
            <p className="planner-note">{labels.estimateNote}</p>
            <a className="button primary" href="#request">{labels.fillForm} <ArrowIcon /></a>
          </> : <p className="planner-empty">{labels.plannerEmpty}</p>}
        </aside>
      </section>

      <section className="process section" id="process">
        <div className="process-title" data-reveal>
          <p className="eyebrow">{copy.process.eyebrow}</p>
          <h2>{copy.process.title}</h2>
        </div>
        <div className="process-list">
          {copy.process.steps.map((step) => (
            <article className="process-step" key={step.number} data-reveal>
              <span>{step.number}</span><h3>{step.title}</h3><p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="booking-faq section" id="booking-terms">
        <div className="faq-intro" data-reveal>
          <p className="eyebrow dark">{bookingFaq[locale].eyebrow}</p>
          <h2>{bookingFaq[locale].title}</h2>
          <p>{bookingFaq[locale].body}</p>
          <Link className="text-link" href={`/terms#${locale}`}>{bookingFaq[locale].terms} <ArrowIcon /></Link>
        </div>
        <div className="faq-list">
          {bookingFaq[locale].items.map(([question, answer]) => (
            <details className="faq-item" key={question} data-reveal>
              <summary>{question}<span aria-hidden="true">+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="trust section" id="trust">
        <div className="trust-image" style={{ backgroundImage: `url(${resolveAssetUrl('/media/incoming/Bali%20local%20hospitality%20hands%20detail.jpg')})` }} data-reveal />
        <div className="trust-copy" data-reveal>
          <p className="eyebrow dark">{copy.trust.eyebrow}</p>
          <h2>{copy.trust.title}</h2>
          <p>{copy.trust.body}</p>
        </div>
      </section>

      <section className="services section" id="services">
        <div data-reveal><p className="eyebrow dark">{services[locale].eyebrow}</p><h2>{services[locale].title}</h2><p>{services[locale].body}</p></div>
        <div className="service-list" data-reveal>{baliServiceOptions.map((service) => <span key={service.id}>{text(service.title)}</span>)}</div>
        <a className="button primary" href="#request" onClick={() => selectInterest(generalBaliService.id)}>{services[locale].cta} <ArrowIcon /></a>
      </section>

      <section className="contact section" id="request">
        <div className="contact-intro" data-reveal>
          <p className="eyebrow">{copy.contact.eyebrow}</p>
          <h2>{copy.contact.formTitle}</h2>
          <p className="booking-lead">{copy.contact.formBody}</p>
        </div>

        <form className="contact-form" id="contact-form" onSubmit={submitEnquiry} data-reveal>
          <div className="form-heading">
            <p className="eyebrow dark">{labels.formEyebrow}</p>
            <h3>{selectedInterestTitle}</h3>
            <p>{labels.formIntro}</p>
          </div>
          {submitState.status === "success" ? (
            <div className="form-status success" role="status">
              <strong>{labels.sent}</strong>
              <span>{labels.sentDetail} {submitState.enquiryId.slice(0, 8)}</span>
            </div>
          ) : null}
          {submitState.status === "error" ? (
            <div className="form-status error" role="alert"><strong>{labels.sendError}</strong><span>{submitState.message}</span></div>
          ) : null}
          <div className="form-grid two">
            <label><span>{labels.name}</span><input name="name" autoComplete="name" required minLength={2} /></label>
            <label><span>{labels.whatsapp}</span><input name="whatsapp" autoComplete="tel" inputMode="tel" placeholder="+7 …" required pattern="\+?[1-9][0-9]{7,14}" /></label>
          </div>
          <div className="form-grid two">
            <label><span>{selectedPackages.length ? labels.date : labels.serviceDate}</span><input name="date" type="date" value={whatsAppDraft.date} onChange={(event) => setWhatsAppDraft((value) => ({ ...value, date: event.target.value }))} required={selectedPackages.length > 0} /></label>
            <label><span>{labels.endDate}</span><input name="endDate" type="date" min={whatsAppDraft.date || undefined} /></label>
          </div>
          <div className="form-grid two">
            <label><span>{selectedPackages.length ? labels.guests : labels.serviceGuests}</span><select name="guests" value={whatsAppDraft.guests} onChange={(event) => setWhatsAppDraft((value) => ({ ...value, guests: event.target.value }))} required={selectedPackages.length > 0}>{selectedPackages.length ? null : <option value="">—</option>}{["1", "2", "3", "4", "5", "6+"].map((value) => <option key={value}>{value}</option>)}</select></label>
            {selectedPackages.length ? <div className="form-plan-summary"><span>{labels.route}</span><strong>{selectedPackages.length} · {selectedInterestTitle}</strong><a href="#trip-planner">{labels.detailsLabel}</a></div> : <label><span>{labels.route}</span><select value={selectedServiceId || generalBaliService.id} onChange={(event) => selectInterest(event.target.value)}><option value={generalBaliService.id}>{text(generalBaliService.title)}</option>{baliServiceOptions.map((service) => <option value={service.id} key={service.id}>{text(service.title)}</option>)}</select></label>}
          </div>
          <div className="form-grid two">
            <label><span>{labels.channel}</span><select name="preferredChannel" value={preferredChannel} onChange={(event) => setPreferredChannel(event.target.value as (typeof contactChannels)[number])}>{contactChannels.map((channel) => <option key={channel}>{channel}</option>)}</select></label>
            <label><span>Email {preferredChannel === "Email" ? "*" : `(${labels.optional})`}</span><input name="email" type="email" autoComplete="email" required={preferredChannel === "Email"} /></label>
          </div>
          <div className="form-grid two">
            <label><span>{labels.pickup}</span><input name="pickup" autoComplete="street-address" placeholder={labels.pickupPlaceholder} value={whatsAppDraft.pickup} onChange={(event) => setWhatsAppDraft((value) => ({ ...value, pickup: event.target.value }))} /></label>
          </div>
          <input type="hidden" name="language" value={language} />
          <label><span>{labels.wishes}</span><textarea name="notes" maxLength={1500} placeholder={labels.wishesPlaceholder} value={whatsAppDraft.notes} onChange={(event) => setWhatsAppDraft((value) => ({ ...value, notes: event.target.value }))} /></label>
          <label className="consent"><input type="checkbox" name="consent" required /><span>{labels.consent} <Link href="/privacy">{labels.details}</Link>.</span></label>
          <label className="honeypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
          <input type="hidden" name="source" value="website-home" />
          <button className="button submit-button" type="submit" disabled={submitState.status === "submitting"}>
            {submitState.status === "submitting" ? labels.sending : labels.send} <ArrowIcon />
          </button>
        </form>
      </section>

      <footer className="site-footer">
        <div className="brand"><span className="brand-mark">B</span><span>{labels.brand}</span></div>
        <p>{copy.footer.body}</p>
        <div className="footer-actions"><nav className="footer-links" aria-label={labels.navLabel}><a href="#routes">{labels.footerRoutes}</a><a href="#request">{labels.footerContact}</a></nav><div className="footer-socials"><a className="social-link" href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><SocialIcon name="instagram" /></a><a className="social-link" href="https://vk.com/" target="_blank" rel="noreferrer" aria-label="VK"><SocialIcon name="vk" /></a>{telegramUrl ? <a className="social-link" href={telegramUrl} target="_blank" rel="noreferrer" aria-label="Telegram"><SocialIcon name="telegram" /></a> : null}<a className="social-link" href={directWhatsApp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><SocialIcon name="whatsapp" /></a></div></div>
        <nav className="footer-links" aria-label={labels.footerTerms}><Link href={`/terms#${locale}`}>{labels.footerTerms}</Link><Link href="/privacy">{labels.footerPrivacy}</Link></nav>
        <small>© {new Date().getFullYear()} · {copy.footer.copyrightSuffix}</small>
      </footer>
      <a className="whatsapp-fab" href={directWhatsApp} target="_blank" rel="noreferrer" aria-label={labels.openWhatsApp} title={labels.openWhatsApp}>
        <SocialIcon name="whatsapp" />
      </a>
    </main>
  );
}
