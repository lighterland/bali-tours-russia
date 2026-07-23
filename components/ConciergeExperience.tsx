"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { TourPackage } from "@/lib/catalogue";
import { contactChannels } from "@/lib/enquiry";
import { localized, type SupportedLanguage } from "@/lib/i18n";
import { mediaAssets } from "@/lib/media";
import { siteCopy } from "@/lib/site-copy";
import { buildBookingMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { baliServicesCard, generalBaliService, type BaliService } from "@/lib/bali-services";
import { calculateTripEstimate, conditionalTransferUsdFor, nextBundleTarget } from "@/lib/trip-pricing";
import { readyMadeCollections } from "@/lib/ready-made-collections";
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
    add: "Добавить в план", added: "В плане", remove: "Удалить", plannerEyebrow: "Ваш план", plannerTitle: "Соберите поездку", plannerEmpty: "Добавляйте маршруты — итог появится здесь.", subtotal: "До скидок", saving: "Вы экономите", estimate: "Итого к оплате", bookingFee: "Для бронирования · 20%", balance: "Остаток на Бали · 80%", guestsShort: "Гостей", rentalDays: "Дней аренды", vehicleChoice: "Вариант транспорта", estimateNote: "Итог уже включает скидки и применимые налоги Индонезии.", taxIncluded: "Включая применимый PPN", guestSaving: "Скидка для компании", free: "Бесплатно", expandPlan: "Открыть план", collapsePlan: "Свернуть", selectedCount: "выбрано", craftLocked: "Добавьте любой платный маршрут", chooseServices: "Выберите нужные сервисы", servicesSelected: "Сервисы в заявке", bestDeals: "Готовые подборки", selectDeal: "Выбрать подборку",
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
    add: "Add to trip", added: "In your plan", remove: "Remove", plannerEyebrow: "Your plan", plannerTitle: "Build your Bali trip", plannerEmpty: "Add journeys and your total will appear here.", subtotal: "Before discounts", saving: "You save", estimate: "Total to pay", bookingFee: "To reserve · 20%", balance: "Balance in Bali · 80%", guestsShort: "Guests", rentalDays: "Rental days", vehicleChoice: "Vehicle option", estimateNote: "Your total already includes discounts and applicable Indonesian taxes.", taxIncluded: "Including applicable VAT", guestSaving: "Group saving", free: "Free", expandPlan: "Open plan", collapsePlan: "Collapse", selectedCount: "selected", craftLocked: "Add any paid journey first", chooseServices: "Choose the services you need", servicesSelected: "Services in your enquiry", bestDeals: "Ready-made collections", selectDeal: "Select collection",
  },
} as const;

const services = {
  ru: { eyebrow: "Сервисы на Бали", title: "Всё необходимое на Бали — проще.", body: "Визы, вопросы с недвижимостью, бизнесом и банками — получите доступ к проверенной локальной поддержке в одном плане. Отметьте всё, что может понадобиться, и мы подготовим персональное предложение.", cta: "Посмотреть план", choose: "Сначала выберите сервис" },
  en: { eyebrow: "Bali services", title: "Bali support, made simple.", body: "From visas and property matters to business and banking support, connect with trusted local assistance through one shared plan. Select everything you may need—we’ll review your request and prepare a tailored quotation.", cta: "View your plan", choose: "Choose a service first" },
} as const;

const cartCopy = {
  ru: { cart: "Ваш план", items: "позиций", journeys: "Маршруты", services: "Сервисы · цена по запросу", close: "Закрыть план", view: "Открыть план", quote: "По запросу", option: "Выберите вариант", add: "Добавить в план", craftFree: "Бесплатный трансфер · подходящий маршрут", craftPaid: "Трансфер · $10 за автомобиль", continue: "Перейти к заявке", explore: "Разделы", support: "Поддержка", connect: "Связь", email: "Email" },
  en: { cart: "Your plan", items: "items", journeys: "Journeys", services: "Services · price on request", close: "Close plan", view: "View your plan", quote: "On request", option: "Choose an option", add: "Add to cart", craftFree: "Free transfer — eligible itinerary", craftPaid: "Transfer · $10 per car", continue: "Continue to enquiry", explore: "Explore", support: "Support", connect: "Connect", email: "Email" },
} as const;

const collectionCopy = {
  ru: { heading: "Рекомендации для разных путешествий", craftNote: "Бесплатный трансфер из Нуса-Дуа или Джимбарана", craftIncluded: "Включено в выбранный маршрут" },
  en: { heading: "Curated for different ways to experience Bali", craftNote: "Free transfer from Nusa Dua or Jimbaran", craftIncluded: "Included with your selected itinerary" },
} as const;

const enquiryCopy = {
  ru: { title: "Расскажите нам о вашей поездке на Бали.", journeys: "маршрутов", services: "сервисов", guests: "гостей", total: "Ориентировочно", all: "Все маршруты", view: "Смотреть подборку", viewing: "Показано" },
  en: { title: "Tell us about your Bali plan.", journeys: "journeys", services: "services", guests: "guests", total: "Estimated total", all: "All journeys", view: "View collection", viewing: "Viewing" },
} as const;

const bookingFaq = {
  ru: {
    eyebrow: "Оплата и условия", title: "Понятно до бронирования.", body: "Вы получаете программу, итоговую стоимость и порядок оплаты в одном подтверждении.", terms: "Полные условия бронирования",
    items: [
      ["Как подтвердить бронирование?", "После согласования программы и даты вносится невозвратный взнос за бронирование 20%. Он закрепляет дату и запускает организацию поездки."],
      ["Можно оплатить взнос в рублях?", "Да. Доступный способ, сумма и срок оплаты будут указаны в персональном подтверждении."],
      ["Как оплатить оставшиеся 80%?", "Остаток оплачивается на Бали перед началом услуги способом, указанным в подтверждении бронирования."],
      ["Как работают скидки?", "Скидка применяется автоматически: 3% для 3–4 подходящих маршрутов, 5% для пяти и 8% для шести и более. Итог сразу виден в вашем плане."],
      ["Что произойдёт при отмене?", "Взнос за бронирование не возвращается при отмене гостем. Остальные возвраты зависят от срока отмены и уже оплаченных поставщикам расходов. При отмене с нашей стороны полученная сумма возвращается полностью."],
    ],
  },
  en: {
    eyebrow: "Payment & terms", title: "Clear before you reserve.", body: "Your programme, final total, and payment steps are recorded in one confirmation.", terms: "Full booking terms",
    items: [
      ["How is a booking confirmed?", "After the programme and date are agreed, a non-refundable 20% booking fee reserves your date and starts the arrangements."],
      ["Can I pay the booking fee in RUB?", "Yes. The available method, amount, and payment window will be included in your personal confirmation."],
      ["How do I pay the remaining 80%?", "The balance is paid in Bali before the service begins using the method stated in your booking confirmation."],
      ["How do trip discounts work?", "Discounts apply automatically: 3% for three or four eligible journeys, 5% for five, and 8% for six or more. Your plan shows the final total immediately."],
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
  const [serviceAdded, setServiceAdded] = useState(false);
  const [selectedServiceOptionIds, setSelectedServiceOptionIds] = useState<string[]>([]);
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [vehicleVariantId, setVehicleVariantId] = useState("");
  const [rentalDays, setRentalDays] = useState(1);
  const [preferredChannel, setPreferredChannel] = useState<(typeof contactChannels)[number]>("WhatsApp");
  const language: SupportedLanguage = locale;
  const [whatsAppDraft, setWhatsAppDraft] = useState({ date: "", guests: "2", pickup: "", notes: "" });
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [showHeroVideo, setShowHeroVideo] = useState(false);
  const copy = siteCopy[locale];
  const labels = ui[locale];
  const cartLabels = cartCopy[locale];
  const publicEmail = businessEmail || "booking@balicloser.com";
  const text = (value: Parameters<typeof localized>[0]) => localized(value, locale);

  const selectedPackages = useMemo(
    () => selectedPackageIds.map((id) => packages.find((tour) => tour.id === id)).filter((item): item is TourPackage => Boolean(item)),
    [packages, selectedPackageIds],
  );
  const selectedServices = serviceAdded ? [baliServicesCard] : [];
  const serviceTitle = (service: BaliService) => {
    const options = service.options.filter((item) => selectedServiceOptionIds.includes(item.id)).map((item) => text(item.title));
    return options.length ? `${text(service.title)} · ${options.join(" · ")}` : text(service.title);
  };
  const guestCount = Math.max(1, Number.parseInt(whatsAppDraft.guests, 10) || 1);
  const vehiclePackage = packages.find((item) => item.id === "vehicle-rental");
  const vehicleVariant = vehiclePackage?.pricing.variants?.find((item) => item.id === vehicleVariantId);
  const onRequestTransport = selectedPackages.find((item) => item.id === "vehicle-rental" && vehicleVariant?.status === "on_request");
  const pricedSelectedPackages = selectedPackages.filter((item) => item !== onRequestTransport);
  const onRequestItemCount = selectedServices.length + (onRequestTransport ? 1 : 0);
  const selectedInterestTitle = [...selectedPackages.map((item) => item.id === "vehicle-rental" && vehicleVariant ? `${text(item.title)} · ${text(vehicleVariant.title)}` : text(item.title)), ...selectedServices.map(serviceTitle)].join(", ") || labels.chooseRoute;
  const craftPackage = packages.find((item) => item.id === "craft-jewellery");
  const calculatedCraftTransferUsd = craftPackage ? conditionalTransferUsdFor(craftPackage, selectedPackageIds) : 10;
  const craftTransferFree = calculatedCraftTransferUsd === 0;
  const vehicleEstimateUsd = vehicleVariant?.status === "fixed" ? vehicleVariant.amountUsd : 0;
  const estimate = calculateTripEstimate(selectedPackages, guestCount, rentalDays, vehicleEstimateUsd);
  const rentalSubtotalUsd = vehicleVariant?.status === "fixed" ? (vehicleVariant.amountUsd || 0) * rentalDays : undefined;
  const rentalMessageDetails = selectedPackageIds.includes("vehicle-rental") && vehicleVariant ? { vehicle: text(vehicleVariant.title), rentalDays, rentalSubtotalUsd } : {};
  const activeCollection = readyMadeCollections.find((collection) => collection.id === activeCollectionId);
  const visiblePackages = activeCollection ? packages.filter((tour) => (activeCollection.packageIds as readonly string[]).includes(tour.id)) : packages;
  const eligibleCount = selectedPackages.filter((tour) => tour.pricing.discountEligible).length;
  const nextDeal = nextBundleTarget(eligibleCount);
  const hasPaidJourney = selectedPackages.some((tour) => tour.pricing.model !== "free");
  const cartItemCount = selectedPackages.length + selectedServices.length;
  const cartVisible = plannerOpen && cartItemCount > 0;
  const dealHint = nextDeal
    ? locale === "ru"
      ? `Добавьте подходящих маршрутов: ${nextDeal.remaining} — и получите скидку ${nextDeal.rate * 100}%`
      : `Add ${nextDeal.remaining} more eligible journeys to unlock ${nextDeal.rate * 100}% off`
    : locale === "ru" ? "Лучшая скидка 8% уже применена" : "Your best 8% deal is applied";
  const lineTotal = (tour: TourPackage) => estimate.lines.find((line) => line.id === tour.id)?.totalUsd || 0;
  const planSummary = selectedPackages.length
    ? locale === "ru"
      ? `${selectedInterestTitle} · гостей: ${guestCount} · итого: $${estimate.totalUsd}`
      : `${selectedInterestTitle} · guests: ${guestCount} · total: $${estimate.totalUsd}`
    : selectedInterestTitle;
  const directWhatsApp = buildWhatsAppLink(whatsappNumber, {
    packageTitle: planSummary,
    language: locale,
    ...rentalMessageDetails,
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

  useEffect(() => {
    document.body.classList.toggle("cart-open", cartVisible);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPlannerOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("cart-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [cartVisible]);

  function toggleService() {
    if (!serviceAdded && !selectedServiceOptionIds.length) return;
    const next = !serviceAdded;
    setServiceAdded(next);
    if (!next && !selectedPackageIds.length) setPlannerOpen(false);
  }

  function toggleServiceOption(optionId: string) {
    setSelectedServiceOptionIds((current) => {
      const next = current.includes(optionId) ? current.filter((item) => item !== optionId) : [...current, optionId];
      if (!next.length) {
        setServiceAdded(false);
        if (!selectedPackageIds.length) setPlannerOpen(false);
      }
      return next;
    });
  }

  function choosePackage(id: string) {
    setWhatsAppDraft((value) => ({ ...value, guests: value.guests || "2" }));
    const isSelected = selectedPackageIds.includes(id);
    if (isSelected) {
      const withoutItem = selectedPackageIds.filter((item) => item !== id);
      const next = withoutItem.some((item) => item !== "craft-jewellery") ? withoutItem : withoutItem.filter((item) => item !== "craft-jewellery");
      setSelectedPackageIds(next);
      if (!next.length && !serviceAdded) setPlannerOpen(false);
      return;
    }
    if (id === "craft-jewellery" && !hasPaidJourney) return;
    if (id === "vehicle-rental" && !vehicleVariantId) return;
    setSelectedPackageIds([...selectedPackageIds, id]);
  }

  function toggleCollectionFilter(dealId: string) {
    setActiveCollectionId((current) => current === dealId ? null : dealId);
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
      packageSelections: selectedPackageIds.map((packageId) => ({ packageId, optionId: packageId === "vehicle-rental" ? vehicleVariantId : packageId === "craft-jewellery" ? (craftTransferFree ? "transfer-free-route" : "transfer-10-usd-per-car") : undefined, quantity: packageId === "vehicle-rental" ? rentalDays : undefined })),
      serviceSelections: serviceAdded ? [{ serviceId: baliServicesCard.id, optionIds: selectedServiceOptionIds }] : selectedPackages.length ? [] : [{ serviceId: generalBaliService.id, optionIds: ["general"] }],
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
      ...rentalMessageDetails,
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
          window.location.assign(`mailto:${businessEmail}?subject=${encodeURIComponent(`Booking enquiry · ${bookingDraft.packageTitle}`)}&body=${encodeURIComponent(message)}`);
        }
        setSubmitState({ status: "idle" });
        form.reset();
        setPreferredChannel("WhatsApp");
        setWhatsAppDraft({ date: "", guests: "2", pickup: "", notes: "" });
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
      setWhatsAppDraft({ date: "", guests: "2", pickup: "", notes: "" });
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
          <a href="#services" onClick={() => setMenuOpen(false)}>{copy.nav.routes}</a>
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
            <a className="button primary" href="#services">{copy.hero.routesCta} <ArrowIcon /></a>
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

      <section className="routes section" id="services">
        <div className="section-heading" data-reveal>
          <div><p className="eyebrow dark">{copy.routes.eyebrow}</p><h2>{copy.routes.title}</h2></div>
          <p>{copy.routes.body}</p>
        </div>
        <div className="deal-collections" data-reveal>
          <div className="deal-collections-heading"><span>{labels.bestDeals}</span><small>{collectionCopy[locale].heading}</small><button className={`collection-reset ${activeCollectionId === null ? "selected" : ""}`} type="button" onClick={() => setActiveCollectionId(null)}>{enquiryCopy[locale].all}</button></div>
          {readyMadeCollections.map((deal) => { const isActive = activeCollectionId === deal.id; return <article className={`deal-collection ${isActive ? "selected" : ""}`} key={deal.id} role="button" tabIndex={0} aria-pressed={isActive} onClick={() => toggleCollectionFilter(deal.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggleCollectionFilter(deal.id); } }}><div><strong>{text(deal.title)}</strong><span>{text(deal.note)}</span></div><span className="deal-collection-action">{isActive ? enquiryCopy[locale].viewing : enquiryCopy[locale].view} <ArrowIcon /></span></article>; })}
        </div>
        <div className="route-grid">
          {visiblePackages.map((tour) => {
            const secondaryPrice = tour.price.secondaryLabel ? text(tour.price.secondaryLabel) : undefined;
            const isSelected = selectedPackageIds.includes(tour.id);
            const isCraft = tour.id === "craft-jewellery";
            const isCraftLocked = tour.id === "craft-jewellery" && !hasPaidJourney;
            return <article className={`route-card ${tour.promotion?.spotlight ? "featured" : ""} ${isSelected ? "selected" : ""}`} key={tour.id}>
              <div className={`route-image ${curatedMedia[tour.id] ? "has-media" : "media-pending"}`} style={curatedMedia[tour.id] ? { backgroundImage: `url(${resolveAssetUrl(curatedMedia[tour.id])})` } : undefined} role="img" aria-label={text(tour.title)}>
                {tour.promotion && <span className="offer-badge">{text(tour.promotion.badge)}</span>}
              </div>
              <div className="route-body">
                <div className="route-kicker"><span>{text(tour.family)}</span><span>{text(tour.duration)}</span></div>
                <h3>{text(tour.title)}</h3>
                <p>{text(tour.summary)}</p>
                <div className="route-tags">{tour.highlights.map((item) => <span key={item.ru}>{text(item)}</span>)}</div>
                <details className="route-details">
                  <summary>{labels.detailsLabel}</summary>
                  <p className="experience-copy">{text(tour.experience)}</p>
                  <div><strong>{text(tour.itineraryLabel)}</strong><ul>{tour.itinerary.map((item) => <li key={item.ru}>{text(item)}</li>)}</ul></div>
                  <div><strong>{text(tour.includedLabel)}</strong><p>{text(tour.included)}</p></div>
                   <div><strong>{text(tour.priceDetailLabel)}</strong><p>{text(tour.priceDetail)}</p></div>
                   {tour.pricing.variants ? <div><strong>{labels.vehicleChoice}</strong><ul>{tour.pricing.variants.map((variant) => <li key={variant.id}>{text(variant.title)} — {variant.status === "fixed" ? `$${variant.amountUsd} / ${locale === "ru" ? "день" : "day"}` : cartLabels.quote}</li>)}</ul></div> : null}
                 </details>
                {tour.id === "vehicle-rental" && vehiclePackage?.pricing.variants ? <div className="route-config rental-config"><label><span>{labels.vehicleChoice}</span><select value={vehicleVariantId} onChange={(event) => setVehicleVariantId(event.target.value)}><option value="">{cartLabels.option}</option>{vehiclePackage.pricing.variants.map((variant) => <option value={variant.id} key={variant.id}>{text(variant.title)}{variant.status === "fixed" ? ` · $${variant.amountUsd}/${locale === "ru" ? "день" : "day"}` : ` · ${cartLabels.quote}`}</option>)}</select></label><label><span>{labels.rentalDays}</span><input type="number" min="1" max="365" value={rentalDays} onChange={(event) => setRentalDays(Math.max(1, Number(event.target.value) || 1))} /></label>{vehicleVariant ? <strong className="rental-calculation">{vehicleVariant.status === "fixed" ? `$${vehicleVariant.amountUsd}/${locale === "ru" ? "день" : "day"} × ${rentalDays} = $${rentalSubtotalUsd}` : `${rentalDays} ${locale === "ru" ? "дн. · по запросу" : "days · on request"}`}</strong> : null}</div> : null}
                <div className="route-bottom">
                  <div className="route-price">
                    {isCraft && craftTransferFree ? <div className="craft-free-price"><span>{text(tour.price.label)}</span><strong>{labels.free}</strong><em>{collectionCopy[locale].craftIncluded}</em></div> : <strong className="route-price-primary">{text(tour.price.label)}</strong>}
                    {secondaryPrice && <span className="route-price-secondary">{secondaryPrice}</span>}
                    {isCraft ? <small className="craft-price-note">{collectionCopy[locale].craftNote}</small> : null}
                  </div>
                  <button className={`plan-toggle ${isSelected ? "is-added" : ""}`} type="button" onClick={() => choosePackage(tour.id)} aria-pressed={isSelected} disabled={isCraftLocked || (tour.id === "vehicle-rental" && !vehicleVariantId)}>{isCraftLocked ? labels.craftLocked : isSelected ? labels.added : cartLabels.add}</button>
                </div>
              </div>
            </article>;
          })}
          <article className={`route-card service-route-card ${selectedServices.length ? "selected" : ""}`}>
            <div className="route-body">
              <div className="route-kicker"><span>{services[locale].eyebrow}</span><span>{cartLabels.quote}</span></div>
              <h3>{services[locale].title}</h3>
              <p>{services[locale].body}</p>
              <fieldset className="service-multi-select"><legend>{text(baliServicesCard.prompt)}</legend>{baliServicesCard.options.map((option) => <label key={option.id}><input type="checkbox" checked={selectedServiceOptionIds.includes(option.id)} onChange={() => toggleServiceOption(option.id)} /><span>{text(option.title)}</span></label>)}</fieldset>
              <div className="route-bottom"><div className="route-price"><strong className="route-price-primary">{cartLabels.quote}</strong><small>{locale === "ru" ? "Рассчитывается отдельно" : "Quoted separately"}</small></div><button className={`plan-toggle ${selectedServices.length ? "is-added" : ""}`} type="button" onClick={toggleService} disabled={!selectedServices.length && !selectedServiceOptionIds.length}>{selectedServices.length ? labels.remove : cartLabels.add}</button></div>
            </div>
          </article>
         </div>
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
          <Link className="text-link" href={`/${locale}/terms`}>{bookingFaq[locale].terms} <ArrowIcon /></Link>
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

      <section className="contact section" id="request">
        <div className="contact-intro" data-reveal>
          <p className="eyebrow">{copy.contact.eyebrow}</p>
          <h2>{copy.contact.formTitle}</h2>
          <p className="booking-lead">{copy.contact.formBody}</p>
        </div>

        <form className="contact-form" id="contact-form" onSubmit={submitEnquiry} data-reveal>
          <div className="form-heading">
            <p className="eyebrow dark">{labels.formEyebrow}</p>
            <h3>{enquiryCopy[locale].title}</h3>
            <p>{labels.formIntro}</p>
            <div className="enquiry-summary"><span>{selectedPackages.length} {enquiryCopy[locale].journeys}</span><span>{selectedServices.length} {enquiryCopy[locale].services}</span><span>{guestCount} {enquiryCopy[locale].guests}</span>{pricedSelectedPackages.length ? <strong>{enquiryCopy[locale].total}: ${estimate.totalUsd}</strong> : null}</div>
          </div>
          {submitState.status === "success" ? (
            <div className="form-status success" role="status">
              <strong>{labels.sent}</strong>
              <span>{locale === "ru" ? "Мы свяжемся с вами в течение рабочего дня." : "We will reply within one business day."}</span>
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
            <label><span>{selectedPackages.length ? labels.guests : labels.serviceGuests}</span><input name="guests" type="number" min="1" value={whatsAppDraft.guests} onChange={(event) => setWhatsAppDraft((value) => ({ ...value, guests: event.target.value }))} required={selectedPackages.length > 0} /></label>
            <div className="form-plan-summary"><span>{labels.route}</span><strong>{cartItemCount ? `${selectedPackages.length} ${enquiryCopy[locale].journeys} · ${selectedServices.length} ${enquiryCopy[locale].services}` : labels.chooseRoute}</strong></div>
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
          <label className="consent"><input type="checkbox" name="consent" required /><span>{labels.consent} <Link href={`/${locale}/privacy`}>{labels.details}</Link>.</span></label>
          <label className="honeypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
          <input type="hidden" name="source" value="website-home" />
          <button className="button submit-button" type="submit" disabled={submitState.status === "submitting"}>
            {submitState.status === "submitting" ? labels.sending : labels.send} <ArrowIcon />
          </button>
        </form>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><div className="brand"><span className="brand-mark">B</span><span>{labels.brand}</span></div><p>{copy.footer.body}</p></div>
        <nav className="footer-column" aria-label={cartLabels.explore}><strong>{cartLabels.explore}</strong><a href="#services">{labels.footerRoutes}</a><a href="#services">{services[locale].eyebrow}</a></nav>
        <nav className="footer-column" aria-label={cartLabels.support}><strong>{cartLabels.support}</strong><a href="#request">{labels.footerContact}</a><Link href={`/${locale}/privacy`}>{labels.footerPrivacy}</Link><Link href={`/${locale}/terms`}>{labels.footerTerms}</Link></nav>
        <div className="footer-column footer-connect"><strong>{cartLabels.connect}</strong><a href={`mailto:${publicEmail}`}>{publicEmail}</a><div className="footer-socials"><a className="social-link" href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><SocialIcon name="instagram" /></a><a className="social-link" href="https://vk.com/" target="_blank" rel="noreferrer" aria-label="VK"><SocialIcon name="vk" /></a>{telegramUrl ? <a className="social-link" href={telegramUrl} target="_blank" rel="noreferrer" aria-label="Telegram"><SocialIcon name="telegram" /></a> : null}<a className="social-link" href={directWhatsApp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><SocialIcon name="whatsapp" /></a></div></div>
        <div className="footer-bottom"><small>© {new Date().getFullYear()} · {copy.footer.copyrightSuffix}</small><div><Link href={`/${locale}/privacy`}>{labels.footerPrivacy}</Link><Link href={`/${locale}/terms`}>{labels.footerTerms}</Link></div></div>
      </footer>
      {cartItemCount ? <>
        <div className="cart-dock" aria-live="polite" key={cartItemCount}>
          <button type="button" onClick={() => setPlannerOpen(true)} aria-label={cartLabels.view}>
            <span className="cart-count">{cartItemCount}</span>
            <span><small>{cartLabels.cart}</small><strong>{cartItemCount} {cartLabels.items}</strong></span>
            {selectedPackages.length ? <span className="cart-deal-hint">{dealHint}</span> : <span className="cart-deal-hint">{cartLabels.quote}</span>}
            <span className="cart-dock-total"><small>{labels.estimate}</small><strong>{pricedSelectedPackages.length ? `$${estimate.totalUsd}` : cartLabels.quote}</strong></span>
            <span className="cart-dock-action">{cartLabels.view} <ArrowIcon /></span>
          </button>
        </div>
        {cartVisible ? <div className="cart-layer" role="presentation"><button className="cart-backdrop" type="button" onClick={() => setPlannerOpen(false)} aria-label={cartLabels.close} /><aside className="cart-drawer" id="trip-planner" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <header className="cart-drawer-header"><div><p className="eyebrow">{labels.plannerEyebrow}</p><h3 id="cart-title">{cartLabels.cart}</h3><span>{cartItemCount} {cartLabels.items}</span></div><button type="button" onClick={() => setPlannerOpen(false)} aria-label={cartLabels.close}>×</button></header>
          <div className="cart-drawer-body">
            {pricedSelectedPackages.length ? <section className="cart-section"><div className="cart-section-title"><strong>{cartLabels.journeys}</strong><span>{pricedSelectedPackages.length}</span></div><label className="cart-field"><span>{labels.guestsShort}</span><input type="number" min="1" value={whatsAppDraft.guests} onChange={(event) => setWhatsAppDraft((value) => ({ ...value, guests: event.target.value }))} /></label>{pricedSelectedPackages.map((tour) => <div className="cart-line" key={tour.id}><div><strong>{text(tour.title)}</strong><small>{tour.id === "vehicle-rental" && vehicleVariant ? `${text(vehicleVariant.title)} · ${rentalDays} ${locale === "ru" ? "дн." : "days"}` : tour.id === "craft-jewellery" ? (craftTransferFree ? cartLabels.craftFree : cartLabels.craftPaid) : text(tour.price.label)}</small></div><span>${lineTotal(tour)}</span><button type="button" onClick={() => choosePackage(tour.id)} aria-label={`${labels.remove}: ${text(tour.title)}`}>×</button></div>)}{selectedPackageIds.includes("vehicle-rental") && vehiclePackage?.pricing.variants ? <div className="cart-config"><label><span>{labels.vehicleChoice}</span><select value={vehicleVariantId} onChange={(event) => setVehicleVariantId(event.target.value)}>{vehiclePackage.pricing.variants.map((variant) => <option value={variant.id} key={variant.id}>{text(variant.title)}{variant.status === "fixed" ? ` · $${variant.amountUsd}` : ` · ${cartLabels.quote}`}</option>)}</select></label><label><span>{labels.rentalDays}</span><input type="number" min="1" max="365" value={rentalDays} onChange={(event) => setRentalDays(Math.max(1, Number(event.target.value) || 1))} /></label></div> : null}</section> : null}
            {onRequestItemCount ? <section className="cart-section"><div className="cart-section-title"><strong>{cartLabels.services}</strong><span>{onRequestItemCount}</span></div>{onRequestTransport && vehiclePackage?.pricing.variants ? <div className="cart-line cart-line-service"><div><strong>{text(onRequestTransport.title)}</strong><select className="cart-service-option" value={vehicleVariantId} onChange={(event) => setVehicleVariantId(event.target.value)}>{vehiclePackage.pricing.variants.map((variant) => <option value={variant.id} key={variant.id}>{text(variant.title)}{variant.status === "fixed" ? ` · $${variant.amountUsd}` : ` · ${cartLabels.quote}`}</option>)}</select><label className="cart-service-duration"><span>{labels.rentalDays}</span><input type="number" min="1" max="365" value={rentalDays} onChange={(event) => setRentalDays(Math.max(1, Number(event.target.value) || 1))} /></label></div><span>{cartLabels.quote}</span><button type="button" onClick={() => choosePackage(onRequestTransport.id)} aria-label={`${labels.remove}: ${text(onRequestTransport.title)}`}>×</button></div> : null}{selectedServices.length ? <div className="cart-line cart-line-service"><div><strong>{text(baliServicesCard.title)}</strong><div className="cart-service-options">{baliServicesCard.options.map((option) => <label key={option.id}><input type="checkbox" checked={selectedServiceOptionIds.includes(option.id)} onChange={() => toggleServiceOption(option.id)} /><span>{text(option.title)}</span></label>)}</div></div><span>{cartLabels.quote}</span><button type="button" onClick={toggleService} aria-label={`${labels.remove}: ${text(baliServicesCard.title)}`}>×</button></div> : null}</section> : null}
            {pricedSelectedPackages.length ? <section className="cart-totals"><div><span>{labels.subtotal}</span><strong>${estimate.subtotalUsd + estimate.guestSavingUsd}</strong></div>{estimate.guestSavingUsd > 0 ? <div className="saving"><span>{labels.guestSaving}</span><strong>−${estimate.guestSavingUsd}</strong></div> : null}{estimate.bundleSavingUsd > 0 ? <div className="saving"><span>{labels.saving} · {estimate.bundleRate * 100}%</span><strong>−${estimate.bundleSavingUsd}</strong></div> : null}<div className="grand"><span>{labels.estimate}</span><strong>${estimate.totalUsd}</strong></div><div><span>{labels.taxIncluded} · 1.1%</span><strong>${estimate.taxIncludedUsd.toFixed(2)}</strong></div><div><span>{labels.bookingFee}</span><strong>${estimate.bookingFeeUsd}</strong></div><div><span>{labels.balance}</span><strong>${estimate.balanceUsd}</strong></div><p>{labels.estimateNote}</p></section> : <p className="cart-quote-note">{cartLabels.services}</p>}
          </div>
          <footer className="cart-drawer-footer"><a className="button primary" href="#request" onClick={() => setPlannerOpen(false)}>{cartLabels.continue} <ArrowIcon /></a></footer>
        </aside></div> : null}
      </> : null}
      <a className="whatsapp-fab" href={directWhatsApp} target="_blank" rel="noreferrer" aria-label={labels.openWhatsApp} title={labels.openWhatsApp}>
        <SocialIcon name="whatsapp" />
      </a>
    </main>
  );
}
