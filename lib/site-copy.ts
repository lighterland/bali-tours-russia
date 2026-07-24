type ProcessStep = { number: string; title: string; body: string };

export type SiteCopy = {
  nav: { routes: string; process: string; trust: string; contact: string; cta: string };
  hero: { eyebrow: string; title: string; accent: string; lead: string; routesCta: string; whatsappCta: string; footer: string[] };
  statement: { eyebrow: string; title: string; body: string; link: string };
  routes: { eyebrow: string; title: string; body: string };
  process: { eyebrow: string; title: string; steps: ProcessStep[] };
  trust: { eyebrow: string; title: string; body: string; stats: Array<{ value: string; label: string }> };
  contact: { eyebrow: string; title: string; formTitle: string; formBody: string; directTitle: string; directBody: string };
  footer: { body: string; copyrightSuffix: string };
};

export const siteCopy: Record<"ru" | "en", SiteCopy> = {
  ru: {
    nav: { routes: "Маршруты", process: "Как всё проходит", trust: "Почему мы", contact: "Контакты", cta: "Обсудить поездку" },
    hero: {
      eyebrow: "Частные маршруты · Бали · живая консультация",
      title: "Бали ближе,",
      accent: "чем кажется.",
      lead: "Выберите лучшие впечатления Бали, объедините их в один план и путешествуйте спокойно — маршрут, команда и детали уже собраны для вас.",
      routesCta: "Выбрать маршрут",
      whatsappCta: "Написать в WhatsApp",
      footer: ["01 · Ваш ритм", "02 · Понятный расчёт", "03 · Подтверждение команды"],
    },
    statement: {
      eyebrow: "Не просто список экскурсий",
      title: "Сначала понимаем поездку. Потом собираем маршрут.",
      body: "Для пары, семьи или небольшой компании — в вашем ритме, с продуманным маршрутом и поддержкой от первого сообщения до возвращения в отель.",
      link: "Посмотреть процесс",
    },
    routes: { eyebrow: "Маршруты", title: "Соберите свой Бали.", body: "Добавляйте любимые маршруты, смотрите итоговую стоимость сразу или выберите готовую подборку Best Deal." },
    process: {
      eyebrow: "Путь клиента",
      title: "От выбора маршрута до дня поездки.",
      steps: [
        { number: "01", title: "Расскажите о поездке", body: "Дата, количество гостей, район отеля, интересы и особые пожелания." },
        { number: "02", title: "Получите предложение", body: "Подходящий маршрут, понятная стоимость и всё, что входит в программу." },
        { number: "03", title: "Подтвердите бронирование", body: "Согласуйте детали и внесите 20% для подтверждения бронирования." },
        { number: "04", title: "Познакомьтесь с командой на Бали", body: "В течение 24 часов после подтверждения оплаты мы создадим общий чат с локальным партнёром для координации поездки." },
      ],
    },
    trust: {
      eyebrow: "Путешествия, которые остаются с вами",
      title: "Ваш Бали. Ваш ритм.",
      body: "Путешествуйте с семьёй или друзьями без посторонних. Вы выбираете настроение и маршрут, а местные гиды знакомят вас с культурой, традициями и самыми красивыми местами острова.",
      stats: [{ value: "Private", label: "ваша компания" }, { value: "Bali", label: "местная команда" }, { value: "RU / EN", label: "поддержка" }],
    },
    contact: {
      eyebrow: "Два удобных способа",
      title: "Начните так, как вам комфортно.",
      formTitle: "Оставить заявку",
      formBody: "Вы заполняете короткую форму. Наша команда первой напишет вам в выбранном канале.",
      directTitle: "Написать напрямую",
      directBody: "Напишите нам в WhatsApp, чтобы выбрать маршрут, проверить дату и оформить бронирование.",
    },
    footer: { body: "Частные маршруты и личная поддержка для путешественников из России.", copyrightSuffix: "Bali Closer · путешествия в вашем ритме." },
  },
  en: {
    nav: { routes: "Journeys", process: "How it works", trust: "Why us", contact: "Contact", cta: "Plan your trip" },
    hero: {
      eyebrow: "Private journeys · Bali · personal consultation",
      title: "Bali is closer",
      accent: "than it seems.",
      lead: "Choose Bali's standout experiences, combine them in one plan, and travel with ease—your route, local team, and details are brought together for you.",
      routesCta: "Explore journeys",
      whatsappCta: "Chat on WhatsApp",
      footer: ["01 · Your pace", "02 · Clear pricing", "03 · Local confirmation"],
    },
    statement: {
      eyebrow: "More than a list of tours",
      title: "First we understand your trip. Then we shape the journey.",
      body: "For couples, families, and small groups—planned around your pace, with thoughtful support from the first message until you return to your hotel.",
      link: "See how it works",
    },
    routes: { eyebrow: "Journeys", title: "Shape your own Bali.", body: "Add the journeys you love, see your total instantly, or start with a ready-made Best Deal collection." },
    process: {
      eyebrow: "Your journey",
      title: "From choosing a journey to the day you travel.",
      steps: [
        { number: "01", title: "Tell us about your trip", body: "Dates, number of guests, hotel area, interests, and special requests." },
        { number: "02", title: "Receive your trip plan", body: "A suitable journey, clear price, and everything included in the experience." },
        { number: "03", title: "Confirm your booking", body: "Agree the details and pay 20% to confirm your booking." },
        { number: "04", title: "Meet your Bali team", body: "Within 24 hours after payment confirmation, we will introduce your local operations partner in a shared chat." },
      ],
    },
    trust: {
      eyebrow: "Travel that stays with you",
      title: "Your Bali. Your pace.",
      body: "Travel privately with family or friends. You choose the mood and route while local guides introduce you to Bali's culture, traditions, and remarkable places.",
      stats: [{ value: "Private", label: "your own group" }, { value: "Bali", label: "local team" }, { value: "RU / EN", label: "support" }],
    },
    contact: {
      eyebrow: "Two easy ways to start",
      title: "Begin in the way that suits you.",
      formTitle: "Send an enquiry",
      formBody: "Complete a short form. Our team will contact you first through your preferred channel.",
      directTitle: "Message us directly",
      directBody: "Message us on WhatsApp to choose a journey, check your date, and complete your booking.",
    },
    footer: { body: "Private Bali journeys with local planning and personal support.", copyrightSuffix: "Bali Closer · travel at your own pace." },
  },
};
