"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { TourPackage } from "@/lib/catalogue";
import { contactChannels } from "@/lib/enquiry";
import { localized, type SupportedLanguage } from "@/lib/i18n";
import { mediaAssets } from "@/lib/media";
import { siteCopy } from "@/lib/site-copy";
import { buildBookingMessage, buildWhatsAppLink } from "@/lib/whatsapp";
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
    photo: "Атмосферное фото", priceNote: "ориентир · наличие по запросу", request: "Запросить",
    teamPhoto: "Атмосферное фото · реальная команда будет добавлена после письменного разрешения",
    fillForm: "Заполнить форму", openWhatsApp: "Открыть WhatsApp", otherChannels: "Другие каналы:",
    formEyebrow: "Заявка на бронирование", chooseRoute: "Выберите маршрут", formIntro: "Укажите дату и детали поездки. Мы свяжемся с вами, подтвердим наличие и поможем завершить бронирование.",
    sent: "Заявка отправлена.", sentDetail: "Ориентир ответа: в течение рабочего дня. Номер:", sendError: "Не получилось отправить.",
    name: "Имя *", whatsapp: "WhatsApp с кодом страны *", date: "Дата начала *", datePlaceholder: "", endDate: "Дата окончания (необязательно)",
    guests: "Количество гостей *", route: "Маршрут", channel: "Как связаться *", optional: "необязательно", pickup: "Отель или район",
    pickupPlaceholder: "Можно сообщить позже", language: "Язык общения *", wishes: "Пожелания", wishesPlaceholder: "Темп, интересы, особые потребности",
    consent: "Я согласен(-на) на обработку данных заявки и обратную связь.", details: "Подробнее", sending: "Отправляем…", send: "Отправить заявку",
    footerRoutes: "Маршруты", footerContact: "Контакты", footerPrivacy: "Данные заявки", errorMessage: "Не удалось отправить запрос.", detailsLabel: "Подробнее", includedLabel: "Что включено", routeLabel: "Маршрут и остановки", priceLabel: "Условия цены",
  },
  en: {
    brand: "BALI · CLOSER", navLabel: "Main navigation", openMenu: "Open menu", closeMenu: "Close menu",
    photo: "Atmospheric image", priceNote: "indicative · availability on request", request: "Request",
    teamPhoto: "Atmospheric image · the real team will be added after written permission",
    fillForm: "Complete the form", openWhatsApp: "Open WhatsApp", otherChannels: "Other channels:",
    formEyebrow: "Booking request", chooseRoute: "Choose a journey", formIntro: "Share your date and trip details. We will contact you, confirm availability, and help complete your booking.",
    sent: "Enquiry sent.", sentDetail: "Expected reply: within one business day. Reference:", sendError: "Unable to send.",
    name: "Name *", whatsapp: "WhatsApp with country code *", date: "Start date *", datePlaceholder: "", endDate: "End date (optional)",
    guests: "Number of guests *", route: "Journey", channel: "Preferred contact *", optional: "optional", pickup: "Hotel or area",
    pickupPlaceholder: "You can tell us later", language: "Communication language *", wishes: "Your wishes", wishesPlaceholder: "Pace, interests, special requirements",
    consent: "I agree to the processing of my enquiry data and to being contacted.", details: "Learn more", sending: "Sending…", send: "Send enquiry",
    footerRoutes: "Journeys", footerContact: "Contact", footerPrivacy: "Enquiry data", errorMessage: "Unable to send the enquiry.", detailsLabel: "View details", includedLabel: "What's included", routeLabel: "Route and stops", priceLabel: "Price terms",
  },
} as const;

const services = {
  ru: { eyebrow: "Сервисы на Бали", title: "Всё необходимое для поездки и жизни на острове.", body: "Закажите транспорт для одного дня или всей поездки, а также получите помощь с практическими вопросами переезда и жизни на Бали.", items: ["Аренда скутеров и мотоциклов", "Автомобили с водителем или без", "Минивэны и трансферы для групп", "Визы, земля и документы", "Строительство виллы и открытие бизнеса", "Счёт в местном банке"], cta: "Отправить запрос" },
  en: { eyebrow: "Bali services", title: "Everything you need for the journey—and life on the island.", body: "Arrange transport for a single day or your whole stay, and get practical support for relocating or establishing life in Bali.", items: ["Scooter and motorbike rental", "Self-drive or chauffeured cars", "Minivans and group transfers", "Visas, land and documentation", "Villa construction and business setup", "Local bank account"], cta: "Send a request" },
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
  const [selectedPackageId, setSelectedPackageId] = useState(packages[0]?.id || "");
  const [preferredChannel, setPreferredChannel] = useState<(typeof contactChannels)[number]>("WhatsApp");
  const language: SupportedLanguage = locale;
  const [whatsAppDraft, setWhatsAppDraft] = useState({ date: "", guests: "2", pickup: "", notes: "" });
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const copy = siteCopy[locale];
  const labels = ui[locale];
  const text = (value: Parameters<typeof localized>[0]) => localized(value, locale);

  const selectedPackage = useMemo(
    () => packages.find((tour) => tour.id === selectedPackageId) || packages[0],
    [packages, selectedPackageId],
  );
  const directWhatsApp = buildWhatsAppLink(whatsappNumber, {
    packageTitle: selectedPackage ? text(selectedPackage.title) : labels.chooseRoute,
    language: locale,
    ...whatsAppDraft,
  });

  useEffect(() => {
    document.documentElement.lang = locale;
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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const animateScroll = () => {
      if (reducedMotion) return;
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
    return () => { observer.disconnect(); window.removeEventListener("scroll", animateScroll); cancelAnimationFrame(frame); };
  }, [locale]);

  function choosePackage(id: string) {
    setSelectedPackageId(id);
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      packageId: data.get("packageId"),
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
      packageTitle: selectedPackage ? text(selectedPackage.title) : labels.chooseRoute,
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
          {packages.map((tour, index) => (
            <article className={`route-card ${index === 0 || index === 4 ? "featured" : ""}`} key={tour.id} data-reveal>
              <div className={`route-image ${curatedMedia[tour.id] ? "has-media" : "media-pending"}`} style={curatedMedia[tour.id] ? { backgroundImage: `url(${resolveAssetUrl(curatedMedia[tour.id])})` } : undefined} role="img" aria-label={text(tour.title)} />
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
                </details>
                <div className="route-bottom">
              <div><strong>{text(tour.price.label)}</strong><small>{labels.priceNote}</small></div>
                  <button className="circle-button" type="button" onClick={() => choosePackage(tour.id)} aria-label={`${labels.request}: ${text(tour.title)}`}>↗</button>
                </div>
              </div>
            </article>
          ))}
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
        <div className="service-list" data-reveal>{services[locale].items.map((item) => <span key={item}>{item}</span>)}</div>
        <a className="button primary" href="#request">{services[locale].cta} <ArrowIcon /></a>
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
            <h3>{selectedPackage ? text(selectedPackage.title) : labels.chooseRoute}</h3>
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
            <label><span>{labels.date}</span><input name="date" type="date" value={whatsAppDraft.date} onChange={(event) => setWhatsAppDraft((value) => ({ ...value, date: event.target.value }))} required /></label>
            <label><span>{labels.endDate}</span><input name="endDate" type="date" min={whatsAppDraft.date || undefined} /></label>
          </div>
          <div className="form-grid two">
            <label><span>{labels.guests}</span><select name="guests" value={whatsAppDraft.guests} onChange={(event) => setWhatsAppDraft((value) => ({ ...value, guests: event.target.value }))} required>{["1", "2", "3", "4", "5", "6+"].map((value) => <option key={value}>{value}</option>)}</select></label>
            <label><span>{labels.route}</span><select name="packageId" value={selectedPackageId} onChange={(event) => setSelectedPackageId(event.target.value)}>{packages.map((tour) => <option value={tour.id} key={tour.id}>{text(tour.title)}</option>)}</select></label>
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
        <small>© {new Date().getFullYear()} · {copy.footer.copyrightSuffix}</small>
      </footer>
      <a className="whatsapp-fab" href={directWhatsApp} target="_blank" rel="noreferrer" aria-label={labels.openWhatsApp} title={labels.openWhatsApp}>
        <SocialIcon name="whatsapp" />
      </a>
    </main>
  );
}
