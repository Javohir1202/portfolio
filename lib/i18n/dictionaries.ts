import type { Locale } from "./types";

export type Dictionary = {
  nav: {
    work: string;
    whatIBuild: string;
    process: string;
    about: string;
    contact: string;
    letsTalk: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
  };
  hero: {
    roleLine: string;
    availableBadge: string;
    productsShipped: (count: number) => string;
    description: string;
    ctaWork: string;
    ctaContact: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    intro: string;
    cards: {
      frontend: { label: string; text: string };
      backend: { label: string; text: string };
      database: { label: string; text: string };
      automation: { label: string; text: string };
    };
  };
  techStack: {
    eyebrow: string;
    heading: string;
    groupLabels: { frontend: string; backend: string; database: string; tools: string };
  };
  capabilities: {
    eyebrow: string;
    heading: string;
    items: { title: string; description: string }[];
  };
  architecture: {
    eyebrow: string;
    heading: string;
    intro: string;
    oneBackendTwoClients: string;
  };
  process: {
    eyebrow: string;
    heading: string;
    steps: { title: string; description: string; tags: string[] }[];
  };
  work: {
    eyebrow: string;
    heading: string;
    liveDemo: string;
    openInTelegram: string;
    source: string;
    viewCaseStudy: string;
    caseStudy: string;
    statusLive: string;
    statusTelegram: string;
    screenshotComingSoon: string;
  };
  projectDetail: {
    backToWork: string;
    sections: {
      overview: string;
      problem: string;
      solution: string;
      features: string;
      architecture: string;
      techStack: string;
      challenges: string;
      outcome: string;
    };
  };
  aboutMe: {
    eyebrow: string;
    paragraph: string;
    basedIn: (location: string) => string;
    location: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    /** Small kicker shown above the contact form. */
    startProject: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      subjectLabel: string;
      subjectPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      send: string;
      sending: string;
      successTitle: string;
      successBody: string;
      sendAnother: string;
      errorBody: string;
      validation: {
        nameRequired: string;
        emailInvalid: string;
        messageRequired: string;
      };
    };
  };
  footer: {
    tagline: string;
    rights: (year: number, name: string) => string;
  };
  siteDescription: string;
};

function ruPluralProducts(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "продукт";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "продукта";
  return "продуктов";
}

const en: Dictionary = {
  nav: {
    work: "Work",
    whatIBuild: "What I Build",
    process: "Process",
    about: "About",
    contact: "Contact",
    letsTalk: "Let's talk",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",
  },
  hero: {
    roleLine: "Software Developer — SaaS, Automation & Business Systems",
    availableBadge: "Available for freelance projects",
    productsShipped: (count) => `${count} Products Shipped`,
    description:
      "I build software that solves real business problems — full-stack applications, CRM systems, dashboards, and automation, from the database to the interface.",
    ctaWork: "View Selected Work",
    ctaContact: "Let's Work Together",
    scroll: "Scroll",
  },
  about: {
    eyebrow: "02 — About",
    heading: "Building practical software for real-world problems.",
    intro:
      "I work across the full stack — frontend, backend, database, and the integrations that connect a product to the outside world. The goal is always the same: a system a business can actually run on.",
    cards: {
      frontend: {
        label: "Frontend",
        text: "Interfaces people actually use daily — dashboards, forms, and data-heavy views that stay fast and clear.",
      },
      backend: {
        label: "Backend",
        text: "Server-side logic and APIs that validate input, enforce access rules, and don't trust the client.",
      },
      database: {
        label: "Database",
        text: "Schemas designed around the real relationships in the business, not just the first screen that needs data.",
      },
      automation: {
        label: "Automation",
        text: "Bots and background jobs that read and write the same backend as the app — one source of truth, not a copy.",
      },
    },
  },
  techStack: {
    eyebrow: "03 — Stack",
    heading: "Technology I actually use, in production.",
    groupLabels: { frontend: "Frontend", backend: "Backend", database: "Database", tools: "Tools" },
  },
  capabilities: {
    eyebrow: "04 — What I Build",
    heading: "Software that maps to how a business runs.",
    items: [
      {
        title: "SaaS & Web Applications",
        description:
          "Full-stack web applications with authentication, a real database, and a production-ready interface — from the marketing site down to the private app.",
      },
      {
        title: "CRM & Business Systems",
        description:
          "Customer records, lead pipelines, jobs, and internal workflows that mirror how a business actually operates day to day.",
      },
      {
        title: "Dashboards",
        description:
          "Analytics views, charts, and reporting interfaces that turn raw records into numbers people can act on.",
      },
      {
        title: "Automation",
        description:
          "Telegram bots and background jobs that read and write the same backend as the web app, so the data never drifts out of sync.",
      },
      {
        title: "Backend & APIs",
        description:
          "Server-side logic, schema design, and integrations — validated input, scoped access, and data that stays consistent under real use.",
      },
    ],
  },
  architecture: {
    eyebrow: "05 — Engineering",
    heading: "From interface to backend.",
    intro:
      "No microservices, no infrastructure I don't actually run — just the real request path in two of the projects below, as they're actually deployed today.",
    oneBackendTwoClients: "One backend, two clients",
  },
  process: {
    eyebrow: "06 — How I Work",
    heading: "A straightforward process, kept short on purpose.",
    steps: [
      {
        title: "Understand",
        description: "Understand the business problem and the requirements behind it before writing anything.",
        tags: ["Requirements", "Constraints"],
      },
      {
        title: "Plan",
        description:
          "Define the user flow, the feature set, and the technical architecture — data model, auth, integrations.",
        tags: ["Data model", "Auth flow"],
      },
      {
        title: "Build",
        description:
          "Develop the frontend, backend, database, and integrations as one working system, not disconnected pieces.",
        tags: ["TypeScript", "Zod validation"],
      },
      {
        title: "Ship",
        description: "Test, polish, and deploy the final product — then keep it working.",
        tags: ["Vitest", "Vercel deploy"],
      },
    ],
  },
  work: {
    eyebrow: "07 — Selected Work",
    heading: "Real products I've designed and built.",
    liveDemo: "Live demo",
    openInTelegram: "Open in Telegram",
    source: "Source",
    viewCaseStudy: "View case study",
    caseStudy: "Case study",
    statusLive: "Live",
    statusTelegram: "Live on Telegram",
    screenshotComingSoon: "Screenshot coming soon",
  },
  projectDetail: {
    backToWork: "Back to selected work",
    sections: {
      overview: "Overview",
      problem: "Problem",
      solution: "Solution",
      features: "Features",
      architecture: "Technical Architecture",
      techStack: "Tech Stack",
      challenges: "Challenges",
      outcome: "Outcome",
    },
  },
  aboutMe: {
    eyebrow: "08 — About Me",
    paragraph:
      "I like taking a business problem and turning it into a clean, working application — from the interface and the database to the APIs that connect it to everything else.",
    basedIn: (location) => `Based in ${location}.`,
    location: "Uzbekistan",
  },
  contact: {
    eyebrow: "09 — Contact",
    heading: "Let's build something useful.",
    subtitle: "Have a product, automation or business system in mind?",
    startProject: "Start a Project",
    form: {
      nameLabel: "Full Name",
      namePlaceholder: "Your name",
      emailLabel: "Email Address",
      emailPlaceholder: "you@example.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "What's this about?",
      messageLabel: "Message",
      messagePlaceholder: "Tell me about your project, idea, or just say hi…",
      send: "Send Message",
      sending: "Sending…",
      successTitle: "Message sent.",
      successBody: "Thanks — I'll get back to you within a day or two.",
      sendAnother: "Send another message",
      errorBody: "Something went wrong. Please try again, or email me directly.",
      validation: {
        nameRequired: "Please enter your name.",
        emailInvalid: "Please enter a valid email address.",
        messageRequired: "Please write a short message.",
      },
    },
  },
  footer: {
    tagline: "Software Developer — SaaS, Automation & Business Systems",
    rights: (year, name) => `© ${year} ${name}. All rights reserved.`,
  },
  siteDescription:
    "I build practical software products for businesses — including SaaS platforms, CRM systems, dashboards, and automation tools. I work across the frontend, backend, database, and integrations to turn real business requirements into working products.",
};

const ru: Dictionary = {
  nav: {
    work: "Проекты",
    whatIBuild: "Что делаю",
    process: "Процесс",
    about: "Обо мне",
    contact: "Контакты",
    letsTalk: "Обсудим",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    skipToContent: "Перейти к содержимому",
  },
  hero: {
    roleLine: "Разработчик ПО — SaaS, автоматизация и бизнес-системы",
    availableBadge: "Открыт для фриланс-проектов",
    productsShipped: (count) => `${count} ${ruPluralProducts(count)}`,
    description:
      "Я создаю программное обеспечение, которое решает реальные бизнес-задачи — full-stack приложения, CRM-системы, дашборды и автоматизацию, от базы данных до интерфейса.",
    ctaWork: "Смотреть проекты",
    ctaContact: "Давайте работать вместе",
    scroll: "Вниз",
  },
  about: {
    eyebrow: "02 — Обо мне",
    heading: "Создаю практичное ПО для реальных бизнес-задач.",
    intro:
      "Я работаю над всем стеком — фронтенд, бэкенд, база данных и интеграции, которые связывают продукт с внешним миром. Цель всегда одна: система, на которой бизнес реально может работать.",
    cards: {
      frontend: {
        label: "Фронтенд",
        text: "Интерфейсы, которыми реально пользуются каждый день — дашборды, формы и насыщенные данными экраны, которые остаются быстрыми и понятными.",
      },
      backend: {
        label: "Бэкенд",
        text: "Серверная логика и API, которые проверяют входные данные, соблюдают правила доступа и не доверяют клиенту.",
      },
      database: {
        label: "База данных",
        text: "Схемы, спроектированные вокруг реальных связей в бизнесе, а не просто под первый экран, которому нужны данные.",
      },
      automation: {
        label: "Автоматизация",
        text: "Боты и фоновые задачи, которые читают и пишут в тот же бэкенд, что и приложение — единый источник данных, а не копия.",
      },
    },
  },
  techStack: {
    eyebrow: "03 — Стек",
    heading: "Технологии, которые я реально использую в проде.",
    groupLabels: { frontend: "Фронтенд", backend: "Бэкенд", database: "База данных", tools: "Инструменты" },
  },
  capabilities: {
    eyebrow: "04 — Что делаю",
    heading: "ПО, которое отражает то, как работает бизнес.",
    items: [
      {
        title: "SaaS и веб-приложения",
        description:
          "Full-stack веб-приложения с аутентификацией, реальной базой данных и готовым к продакшену интерфейсом — от маркетингового сайта до приватного приложения.",
      },
      {
        title: "CRM и бизнес-системы",
        description:
          "Клиентские базы, воронки лидов, заказы и внутренние процессы, отражающие то, как бизнес реально работает изо дня в день.",
      },
      {
        title: "Дашборды",
        description:
          "Аналитические экраны, графики и отчётные интерфейсы, превращающие сырые данные в цифры, на основе которых можно действовать.",
      },
      {
        title: "Автоматизация",
        description:
          "Telegram-боты и фоновые задачи, которые читают и пишут в тот же бэкенд, что и веб-приложение, поэтому данные никогда не расходятся.",
      },
      {
        title: "Бэкенд и API",
        description:
          "Серверная логика, проектирование схем и интеграции — проверенные данные, ограниченный доступ и данные, остающиеся согласованными при реальной нагрузке.",
      },
    ],
  },
  architecture: {
    eyebrow: "05 — Инженерия",
    heading: "От интерфейса до бэкенда.",
    intro:
      "Никаких микросервисов и инфраструктуры, которую я реально не эксплуатирую — только настоящий путь запроса в двух проектах ниже, как они развёрнуты сегодня на самом деле.",
    oneBackendTwoClients: "Один бэкенд, два клиента",
  },
  process: {
    eyebrow: "06 — Как я работаю",
    heading: "Простой процесс, специально короткий.",
    steps: [
      {
        title: "Понять",
        description: "Понимаю бизнес-проблему и требования, стоящие за ней, прежде чем писать хоть строчку кода.",
        tags: ["Требования", "Ограничения"],
      },
      {
        title: "Планирование",
        description:
          "Определяю пользовательский сценарий, набор функций и техническую архитектуру — модель данных, авторизацию, интеграции.",
        tags: ["Модель данных", "Авторизация"],
      },
      {
        title: "Разработка",
        description:
          "Разрабатываю фронтенд, бэкенд, базу данных и интеграции как единую рабочую систему, а не разрозненные части.",
        tags: ["TypeScript", "Zod-валидация"],
      },
      {
        title: "Запуск",
        description: "Тестирую, дорабатываю и разворачиваю финальный продукт — а затем поддерживаю его работу.",
        tags: ["Vitest", "Деплой на Vercel"],
      },
    ],
  },
  work: {
    eyebrow: "07 — Избранные проекты",
    heading: "Реальные продукты, которые я спроектировал и создал.",
    liveDemo: "Открыть демо",
    openInTelegram: "Открыть в Telegram",
    source: "Код",
    viewCaseStudy: "Смотреть кейс",
    caseStudy: "Кейс",
    statusLive: "Онлайн",
    statusTelegram: "Работает в Telegram",
    screenshotComingSoon: "Скриншот скоро появится",
  },
  projectDetail: {
    backToWork: "Назад к проектам",
    sections: {
      overview: "Обзор",
      problem: "Проблема",
      solution: "Решение",
      features: "Функции",
      architecture: "Техническая архитектура",
      techStack: "Технологии",
      challenges: "Сложности",
      outcome: "Результат",
    },
  },
  aboutMe: {
    eyebrow: "08 — Обо мне",
    paragraph:
      "Мне нравится брать бизнес-проблему и превращать её в чистое, работающее приложение — от интерфейса и базы данных до API, которые связывают всё это с остальным миром.",
    basedIn: (location) => `Живу в стране: ${location}.`,
    location: "Узбекистан",
  },
  contact: {
    eyebrow: "09 — Контакты",
    heading: "Давайте создадим что-то полезное.",
    subtitle: "Есть идея продукта, автоматизации или бизнес-системы?",
    startProject: "Начать проект",
    form: {
      nameLabel: "Имя",
      namePlaceholder: "Ваше имя",
      emailLabel: "Электронная почта",
      emailPlaceholder: "you@example.com",
      subjectLabel: "Тема",
      subjectPlaceholder: "О чём хотите поговорить?",
      messageLabel: "Сообщение",
      messagePlaceholder: "Расскажите о проекте, идее — или просто поздоровайтесь…",
      send: "Отправить сообщение",
      sending: "Отправка…",
      successTitle: "Сообщение отправлено.",
      successBody: "Спасибо — отвечу в течение одного-двух дней.",
      sendAnother: "Отправить ещё одно сообщение",
      errorBody: "Что-то пошло не так. Попробуйте ещё раз или напишите мне напрямую.",
      validation: {
        nameRequired: "Пожалуйста, укажите имя.",
        emailInvalid: "Пожалуйста, укажите корректный email.",
        messageRequired: "Пожалуйста, напишите короткое сообщение.",
      },
    },
  },
  footer: {
    tagline: "Разработчик ПО — SaaS, автоматизация и бизнес-системы",
    rights: (year, name) => `© ${year} ${name}. Все права защищены.`,
  },
  siteDescription:
    "Я создаю практичные программные продукты для бизнеса — включая SaaS-платформы, CRM-системы, дашборды и инструменты автоматизации. Я работаю над фронтендом, бэкендом, базой данных и интеграциями, превращая реальные бизнес-требования в работающие продукты.",
};

const uz: Dictionary = {
  nav: {
    work: "Loyihalar",
    whatIBuild: "Nima qilaman",
    process: "Jarayon",
    about: "Men haqimda",
    contact: "Aloqa",
    letsTalk: "Suhbatlashamiz",
    openMenu: "Menyuni ochish",
    closeMenu: "Menyuni yopish",
    skipToContent: "Kontentga oʻtish",
  },
  hero: {
    roleLine: "Dasturiy taʼminot dasturchisi — SaaS, avtomatlashtirish va biznes tizimlari",
    availableBadge: "Frilans loyihalarga ochiqman",
    productsShipped: (count) => `${count} ta loyiha`,
    description:
      "Men haqiqiy biznes muammolarini hal qiluvchi dasturiy taʼminot yarataman — full-stack ilovalar, CRM tizimlari, boshqaruv panellari va avtomatlashtirish, maʼlumotlar bazasidan interfeysgacha.",
    ctaWork: "Loyihalarni koʻrish",
    ctaContact: "Birga ishlaylik",
    scroll: "Pastga",
  },
  about: {
    eyebrow: "02 — Men haqimda",
    heading: "Real muammolar uchun amaliy dasturiy taʼminot yarataman.",
    intro:
      "Men butun stek boʻylab ishlayman — frontend, backend, maʼlumotlar bazasi va mahsulotni tashqi dunyo bilan bogʻlaydigan integratsiyalar. Maqsad doim bitta: biznes haqiqatan ham ishlata oladigan tizim.",
    cards: {
      frontend: {
        label: "Frontend",
        text: "Odamlar har kuni haqiqatan foydalanadigan interfeyslar — boshqaruv panellari, formalar va tez hamda tushunarli boʻlib qoladigan maʼlumotga boy ekranlar.",
      },
      backend: {
        label: "Backend",
        text: "Kiritilgan maʼlumotlarni tekshiradigan, kirish qoidalariga rioya qiladigan va klientga ishonmaydigan server mantiqi va API'lar.",
      },
      database: {
        label: "Maʼlumotlar bazasi",
        text: "Faqat maʼlumot kerak boʻlgan birinchi ekran uchun emas, balki biznesdagi haqiqiy bogʻliqliklar asosida loyihalashtirilgan sxemalar.",
      },
      automation: {
        label: "Avtomatlashtirish",
        text: "Ilova bilan bir xil backend'dan oʻqiydigan va yozadigan botlar va fon vazifalari — nusxa emas, yagona haqiqat manbai.",
      },
    },
  },
  techStack: {
    eyebrow: "03 — Stek",
    heading: "Men production'da haqiqatan foydalanadigan texnologiyalar.",
    groupLabels: { frontend: "Frontend", backend: "Backend", database: "Maʼlumotlar bazasi", tools: "Vositalar" },
  },
  capabilities: {
    eyebrow: "04 — Nima yarataman",
    heading: "Biznes qanday ishlashini aks ettiruvchi dasturiy taʼminot.",
    items: [
      {
        title: "SaaS va veb-ilovalar",
        description:
          "Autentifikatsiya, haqiqiy maʼlumotlar bazasi va production uchun tayyor interfeysga ega full-stack veb-ilovalar — marketing saytidan xususiy ilovagacha.",
      },
      {
        title: "CRM va biznes tizimlari",
        description:
          "Mijozlar bazasi, lidlar voronkasi, buyurtmalar va biznes kundalik hayotda qanday ishlashini aks ettiruvchi ichki jarayonlar.",
      },
      {
        title: "Boshqaruv panellari",
        description:
          "Xom maʼlumotlarni harakat qilish mumkin boʻlgan raqamlarga aylantiruvchi analitik ekranlar, grafiklar va hisobot interfeyslari.",
      },
      {
        title: "Avtomatlashtirish",
        description:
          "Veb-ilova bilan bir xil backend'dan oʻqiydigan va yozadigan Telegram botlar va fon vazifalari, shuning uchun maʼlumotlar hech qachon farqlanib qolmaydi.",
      },
      {
        title: "Backend va API'lar",
        description:
          "Server mantiqi, sxema loyihalash va integratsiyalar — tekshirilgan maʼlumotlar, cheklangan kirish va haqiqiy yuklama ostida izchil qoladigan maʼlumotlar.",
      },
    ],
  },
  architecture: {
    eyebrow: "05 — Muhandislik",
    heading: "Interfeysdan backend'gacha.",
    intro:
      "Hech qanday mikroservislar yoki men haqiqatan ishlatmaydigan infratuzilma yoʻq — quyidagi ikkita loyihada bugun haqiqatan joylashtirilganidek, faqat haqiqiy soʻrov yoʻli.",
    oneBackendTwoClients: "Bitta backend, ikkita klient",
  },
  process: {
    eyebrow: "06 — Qanday ishlayman",
    heading: "Ataylab qisqa qilingan oddiy jarayon.",
    steps: [
      {
        title: "Tushunish",
        description: "Har qanday kod yozishdan oldin biznes muammosini va uning ortidagi talablarni tushunib olaman.",
        tags: ["Talablar", "Cheklovlar"],
      },
      {
        title: "Rejalashtirish",
        description:
          "Foydalanuvchi oqimini, funksiyalar toʻplamini va texnik arxitekturani — maʼlumotlar modeli, avtorizatsiya, integratsiyalarni belgilayman.",
        tags: ["Maʼlumotlar modeli", "Avtorizatsiya"],
      },
      {
        title: "Yaratish",
        description:
          "Frontend, backend, maʼlumotlar bazasi va integratsiyalarni alohida qismlar sifatida emas, balki yagona ishlaydigan tizim sifatida ishlab chiqaman.",
        tags: ["TypeScript", "Zod tekshiruvi"],
      },
      {
        title: "Ishga tushirish",
        description: "Yakuniy mahsulotni sinovdan oʻtkazaman, jilolayman va joylashtiraman — soʻngra uni ishlab turishini taʼminlayman.",
        tags: ["Vitest", "Vercel'ga joylash"],
      },
    ],
  },
  work: {
    eyebrow: "07 — Tanlangan loyihalar",
    heading: "Men loyihalashtirgan va yaratgan haqiqiy mahsulotlar.",
    liveDemo: "Demoʻni ochish",
    openInTelegram: "Telegram'da ochish",
    source: "Kod",
    viewCaseStudy: "Keysni koʻrish",
    caseStudy: "Keys",
    statusLive: "Onlayn",
    statusTelegram: "Telegram'da ishlaydi",
    screenshotComingSoon: "Skrinshot tez orada qoʻshiladi",
  },
  projectDetail: {
    backToWork: "Loyihalarga qaytish",
    sections: {
      overview: "Umumiy koʻrinish",
      problem: "Muammo",
      solution: "Yechim",
      features: "Xususiyatlar",
      architecture: "Texnik arxitektura",
      techStack: "Texnologiyalar",
      challenges: "Qiyinchiliklar",
      outcome: "Natija",
    },
  },
  aboutMe: {
    eyebrow: "08 — Men haqimda",
    paragraph:
      "Menga biznes muammosini olib, uni toza va ishlaydigan ilovaga aylantirish yoqadi — interfeys va maʼlumotlar bazasidan tortib, uni boshqa hamma narsa bilan bogʻlaydigan API'largacha.",
    basedIn: (location) => `${location}da yashayman.`,
    location: "Oʻzbekiston",
  },
  contact: {
    eyebrow: "09 — Aloqa",
    heading: "Keling, foydali narsa yarataylik.",
    subtitle: "Mahsulot, avtomatlashtirish yoki biznes tizimi haqida gʻoyangiz bormi?",
    startProject: "Loyihani boshlash",
    form: {
      nameLabel: "Toʻliq ism",
      namePlaceholder: "Ismingiz",
      emailLabel: "Elektron pochta",
      emailPlaceholder: "you@example.com",
      subjectLabel: "Mavzu",
      subjectPlaceholder: "Nima haqida gaplashmoqchisiz?",
      messageLabel: "Xabar",
      messagePlaceholder: "Loyiha yoki gʻoyangiz haqida yozing — yoki shunchaki salom bering…",
      send: "Xabarni yuborish",
      sending: "Yuborilmoqda…",
      successTitle: "Xabar yuborildi.",
      successBody: "Rahmat — bir-ikki kun ichida javob beraman.",
      sendAnother: "Yana xabar yuborish",
      errorBody: "Nimadir xato ketdi. Qaytadan urinib koʻring yoki menga toʻgʻridan-toʻgʻri yozing.",
      validation: {
        nameRequired: "Iltimos, ismingizni kiriting.",
        emailInvalid: "Iltimos, toʻgʻri email manzil kiriting.",
        messageRequired: "Iltimos, qisqacha xabar yozing.",
      },
    },
  },
  footer: {
    tagline: "Dasturiy taʼminot dasturchisi — SaaS, avtomatlashtirish va biznes tizimlari",
    rights: (year, name) => `© ${year} ${name}. Barcha huquqlar himoyalangan.`,
  },
  siteDescription:
    "Men biznes uchun amaliy dasturiy mahsulotlar yarataman — jumladan SaaS platformalari, CRM tizimlari, boshqaruv panellari va avtomatlashtirish vositalari. Men haqiqiy biznes talablarini ishlaydigan mahsulotlarga aylantirish uchun frontend, backend, maʼlumotlar bazasi va integratsiyalar ustida ishlayman.",
};

export const dictionaries: Record<Locale, Dictionary> = { en, ru, uz };
