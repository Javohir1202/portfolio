import type { LocalizedText } from "@/lib/i18n/types";

export type ProjectImage = {
  key: string;
  label: LocalizedText;
  /** Path under /public once the real screenshot is supplied. Leave empty for a placeholder frame. */
  src?: string;
  alt: string;
  /**
   * width/height of the actual screenshot file, clamped to a sane display
   * range (max 2.6) so extremely wide/short UI screens (e.g. a table-only
   * view) don't force other images into a mismatched crop — every project
   * screenshot's UI has a genuinely different shape, so a single fixed
   * frame ratio for all of them either crops the wide ones badly or
   * letterboxes the tall ones. Omit for images with no file yet.
   */
  aspect?: number;
};

export type Project = {
  slug: string;
  name: string;
  category: LocalizedText;
  size: "large" | "medium";
  summary: LocalizedText;
  links: {
    live?: string;
    github?: string;
    telegram?: string;
  };
  tech: string[];
  images: ProjectImage[];
  caseStudy: {
    overview: LocalizedText;
    problem: LocalizedText;
    solution: LocalizedText;
    features: LocalizedText[];
    architecture: {
      description: LocalizedText;
      /** Kept in English across locales — short technical labels, not prose. */
      flow: string[];
    };
    challenges: LocalizedText[];
    outcome: LocalizedText;
  };
};

const crmSaas: LocalizedText = { en: "CRM / SaaS", ru: "CRM / SaaS", uz: "CRM / SaaS" };
const personalFinancePwa: LocalizedText = {
  en: "Personal Finance / PWA",
  ru: "Personal Finance / PWA",
  uz: "Personal Finance / PWA",
};
const telegramFinanceAutomation: LocalizedText = {
  en: "Telegram Finance Automation",
  ru: "Telegram Finance Automation",
  uz: "Telegram Finance Automation",
};

export const projects: Project[] = [
  {
    slug: "serviceflow",
    name: "ServiceFlow",
    category: crmSaas,
    size: "large",
    summary: {
      en: "A lead-to-cash CRM for service businesses — a lead pipeline, customer records, jobs, tasks and appointments in one authenticated app, sitting behind a separate public marketing site.",
      ru: "CRM для сервисных компаний, охватывающая путь от лида до оплаты — воронка лидов, карточки клиентов, заказы, задачи и встречи в одном авторизованном приложении, за отдельным публичным маркетинговым сайтом.",
      uz: "Xizmat koʻrsatuvchi bizneslar uchun liddan toʻlovgacha boʻlgan CRM — bitta avtorizatsiyalangan ilovada lidlar voronkasi, mijozlar kartochkalari, buyurtmalar, vazifalar va uchrashuvlar, alohida ochiq marketing sayti ortida.",
    },
    links: {
      live: "https://serviceflow-smoky.vercel.app/",
      // github: "https://github.com/Javohir1202/focusflow", // currently private (confirmed 404 anonymously) — restore once public again
    },
    tech: [
      "Next.js 14 (App Router)",
      "React",
      "TypeScript",
      "Supabase (Postgres + Auth)",
      "Row Level Security",
      "Zod",
      "Tailwind CSS",
      "Vitest",
    ],
    images: [
      {
        key: "dashboard",
        label: { en: "Dashboard", ru: "Дашборд", uz: "Dashboard" },
        src: "/projects/serviceflow/dashboard.png",
        alt: "ServiceFlow dashboard",
        aspect: 1.855,
      },
      {
        key: "pipeline",
        label: { en: "Lead Pipeline", ru: "Воронка лидов", uz: "Lidlar voronkasi" },
        src: "/projects/serviceflow/pipeline.png",
        alt: "ServiceFlow drag-and-drop lead pipeline board",
        aspect: 2.6,
      },
      {
        key: "customers",
        label: { en: "Customers", ru: "Клиенты", uz: "Mijozlar" },
        src: "/projects/serviceflow/customers.png",
        alt: "ServiceFlow customer records list",
        aspect: 2.6,
      },
      {
        key: "jobs",
        label: { en: "Orders", ru: "Заказы", uz: "Buyurtmalar" },
        src: "/projects/serviceflow/jobs.png",
        alt: "ServiceFlow orders (jobs) view",
        aspect: 2.6,
      },
      {
        key: "tasks",
        label: { en: "Tasks", ru: "Задачи", uz: "Vazifalar" },
        src: "/projects/serviceflow/tasks.png",
        alt: "ServiceFlow tasks view",
        aspect: 2.6,
      },
      {
        key: "appointments",
        label: { en: "Appointments", ru: "Встречи", uz: "Uchrashuvlar" },
        src: "/projects/serviceflow/appointments.png",
        alt: "ServiceFlow appointments view",
        aspect: 2.6,
      },
      {
        key: "analytics",
        label: { en: "Analytics", ru: "Аналитика", uz: "Analitika" },
        src: "/projects/serviceflow/analytics.png",
        alt: "ServiceFlow analytics — conversion, revenue by month, leads by source",
        aspect: 1.884,
      },
    ],
    caseStudy: {
      overview: {
        en: "ServiceFlow is a CRM built for small service businesses — the kind of company that runs on leads, jobs and appointments rather than on a generic task board. It ships as two things in one codebase: a public, SEO-indexed marketing site, and a private authenticated app behind it.",
        ru: "ServiceFlow — это CRM, созданная для небольших сервисных компаний, которые работают через лиды, заказы и встречи, а не через обычную доску задач. Продукт состоит из двух частей в одной кодовой базе: публичного маркетингового сайта, индексируемого поисковиками, и приватного авторизованного приложения за ним.",
        uz: "ServiceFlow — odatiy vazifalar doskasi orqali emas, balki lidlar, buyurtmalar va uchrashuvlar orqali ishlaydigan kichik xizmat koʻrsatuvchi bizneslar uchun yaratilgan CRM. Mahsulot bitta kod bazasida ikkita qismdan iborat: qidiruv tizimlari indekslaydigan ochiq marketing sayti va uning ortidagi xususiy, avtorizatsiyalangan ilova.",
      },
      problem: {
        en: "Service businesses need to track a lead from first contact to a completed, paid job — without the pipeline, the customer record, and the actual work getting out of sync with each other, and without exposing any of that data to search engines or to other users.",
        ru: "Сервисным компаниям нужно вести лида от первого контакта до завершённой оплаченной работы — так, чтобы воронка, карточка клиента и реальная работа не расходились друг с другом, и без того, чтобы эти данные утекали в поисковики или к другим пользователям.",
        uz: "Xizmat koʻrsatuvchi bizneslarga lidni birinchi murojaatdan toʻlangan, yakunlangan ishgacha kuzatish kerak — bunda voronka, mijoz kartochkasi va haqiqiy ish bir-biridan uzilib qolmasligi, va bu maʼlumotlar qidiruv tizimlariga yoki boshqa foydalanuvchilarga ochilib qolmasligi kerak.",
      },
      solution: {
        en: "A single Next.js App Router project with a clean split: public marketing routes that are indexable and fast, and a private route group gated by middleware that never gets indexed. Every entity a service business actually deals with — leads, customers, jobs, tasks, appointments — is a real Postgres table with Row Level Security, so the database itself enforces that a user only ever sees their own data, independent of what the application code does.",
        ru: "Единый проект на Next.js App Router с чётким разделением: публичные маркетинговые маршруты, индексируемые и быстрые, и приватная группа маршрутов, защищённая middleware и никогда не индексируемая. Каждая сущность, с которой реально работает сервисный бизнес — лиды, клиенты, заказы, задачи, встречи — это настоящая таблица Postgres с Row Level Security, поэтому сама база данных гарантирует, что пользователь видит только свои данные, независимо от кода приложения.",
        uz: "Aniq boʻlingan yagona Next.js App Router loyihasi: indekslanadigan va tez ochiq marketing yoʻllari, hamda middleware bilan himoyalangan va hech qachon indekslanmaydigan xususiy yoʻllar guruhi. Xizmat koʻrsatuvchi biznes haqiqatan ishlaydigan har bir obyekt — lidlar, mijozlar, buyurtmalar, vazifalar, uchrashuvlar — Row Level Security bilan himoyalangan haqiqiy Postgres jadvali, shuning uchun ilova kodidan qatʼi nazar, maʼlumotlar bazasining oʻzi foydalanuvchi faqat oʻz maʼlumotlarini koʻrishini taʼminlaydi.",
      },
      features: [
        {
          en: "Six-stage lead pipeline (new → contacted → qualified → quoted → won/lost) on a drag-and-drop board",
          ru: "Шестиэтапная воронка лидов (новый → связались → квалифицирован → смета отправлена → выигран/проигран) на доске с drag-and-drop",
          uz: "Olti bosqichli lidlar voronkasi (yangi → bogʻlanildi → malakali → smeta yuborildi → yutildi/yutqazildi) — drag-and-drop doskada",
        },
        {
          en: "Converting a won lead creates a linked customer record automatically — no re-typing contact details",
          ru: "Конвертация выигранного лида автоматически создаёт связанную карточку клиента — контакты не нужно вводить повторно",
          uz: "Yutilgan lidni konvertatsiya qilish avtomatik ravishda bogʻlangan mijoz kartochkasini yaratadi — kontaktlarni qayta kiritish shart emas",
        },
        {
          en: "Jobs, tasks and appointments attach to customers, and optionally to each other",
          ru: "Заказы, задачи и встречи привязываются к клиентам, а при необходимости — друг к другу",
          uz: "Buyurtmalar, vazifalar va uchrashuvlar mijozlarga, zarur boʻlsa bir-biriga ham bogʻlanadi",
        },
        {
          en: "An analytics view — lead conversion rate, revenue by month, and leads by source — built from the same tables the pipeline writes to, not a separate reporting system",
          ru: "Раздел аналитики — конверсия лидов, выручка по месяцам и лиды по источникам — построен на тех же таблицах, куда пишет воронка, а не на отдельной системе отчётности",
          uz: "Analitika boʻlimi — lidlar konversiyasi, oylik daromad va manba boʻyicha lidlar — alohida hisobot tizimi emas, balki voronka yozadigan xuddi shu jadvallar asosida qurilgan",
        },
        {
          en: "An append-only activity log populated by database triggers, not application code, so the dashboard and each customer's activity feed can't drift out of sync with what actually happened",
          ru: "Журнал активности, доступный только на добавление, заполняется триггерами базы данных, а не кодом приложения — поэтому дашборд и лента активности клиента не могут разойтись с тем, что произошло на самом деле",
          uz: "Faqat qoʻshish uchun mumkin boʻlgan faoliyat jurnali ilova kodi emas, balki maʼlumotlar bazasi trigerlari orqali toʻldiriladi — shuning uchun dashboard va har bir mijozning faoliyat lentasi haqiqatda sodir boʻlgan voqealardan chetlashib qololmaydi",
        },
        {
          en: "Public, SEO-optimized marketing site (home, features, pricing, about) fully separate from the authenticated app",
          ru: "Публичный, SEO-оптимизированный маркетинговый сайт (главная, возможности, тарифы, о нас) полностью отделён от авторизованного приложения",
          uz: "Ochiq, SEO uchun optimallashtirilgan marketing sayti (bosh sahifa, imkoniyatlar, tariflar, biz haqimizda) avtorizatsiyalangan ilovadan toʻliq ajratilgan",
        },
        {
          en: "Server Actions re-verify the authenticated user and validate every input with Zod before it reaches the database — on top of, not instead of, Row Level Security",
          ru: "Server Actions повторно проверяют авторизованного пользователя и валидируют каждый ввод через Zod перед тем, как он попадёт в базу данных — в дополнение к Row Level Security, а не вместо неё",
          uz: "Server Actions avtorizatsiyalangan foydalanuvchini qayta tekshiradi va har bir kiritilgan maʼlumotni bazaga yetib borishidan oldin Zod orqali tekshiradi — bu Row Level Security oʻrniga emas, balki unga qoʻshimcha sifatida",
        },
      ],
      architecture: {
        description: {
          en: "Server components handle reads directly against Supabase; every write goes through a Next.js Server Action that re-checks the session, validates input with Zod, and writes scoped to the current user — with Postgres Row Level Security as the backstop underneath the application code, not a replacement for it.",
          ru: "Серверные компоненты читают данные напрямую из Supabase; каждая запись проходит через Next.js Server Action, которая повторно проверяет сессию, валидирует ввод через Zod и пишет данные в рамках текущего пользователя — а Row Level Security в Postgres служит подстраховкой под кодом приложения, а не заменой ему.",
          uz: "Server komponentlari maʼlumotlarni toʻgʻridan-toʻgʻri Supabase'dan oʻqiydi; har bir yozish sessiyani qayta tekshiradigan, kiritilgan maʼlumotni Zod orqali tekshiradigan va joriy foydalanuvchi doirasida yozadigan Next.js Server Action orqali amalga oshiriladi — Postgres'dagi Row Level Security esa ilova kodi ostidagi zaxira boʻlib, uning oʻrnini bosmaydi.",
        },
        flow: [
          "User",
          "Next.js App Router (Server Components)",
          "Server Actions — Zod-validated",
          "Supabase Postgres (Row Level Security)",
        ],
      },
      challenges: [
        {
          en: "Keeping an activity feed accurate across five different entities without scattering logging calls through the codebase — solved by moving it into database triggers, so a new code path physically can't forget to log an action.",
          ru: "Поддерживать точность ленты активности сразу для пяти разных сущностей, не разбрасывая вызовы логирования по всему коду — решено переносом логики в триггеры базы данных, из-за чего новый код физически не может забыть залогировать действие.",
          uz: "Loglash chaqiruvlarini butun kod boʻylab sochib tashlamasdan, beshta turli obyekt uchun faoliyat lentasining aniqligini saqlash — bu logikani maʼlumotlar bazasi trigerlariga koʻchirish orqali hal qilindi, natijada yangi kod yoʻli amalni loglashni jismonan unutolmaydi.",
        },
        {
          en: "Enforcing ownership across relations, not just on individual tables — e.g. a job must belong to a customer the same user owns. Ownership-check triggers sit alongside RLS rather than relying only on application-level checks.",
          ru: "Контроль владения не только на уровне отдельных таблиц, но и на уровне связей — например, заказ должен принадлежать клиенту того же пользователя. Триггеры проверки владения работают вместе с RLS, а не полагаются только на проверки на уровне приложения.",
          uz: "Faqat alohida jadvallar emas, balki bogʻliqliklar boʻyicha ham egalikni taʼminlash — masalan, buyurtma xuddi shu foydalanuvchiga tegishli mijozga tegishli boʻlishi kerak. Egalikni tekshiruvchi trigerlar faqat ilova darajasidagi tekshiruvlarga tayanmasdan, RLS bilan birga ishlaydi.",
        },
        {
          en: "Keeping a public, indexable marketing site and a private, noindex application in one Next.js project without them leaking into each other — solved with a private route group, per-route metadata, and middleware that gates only what needs gating.",
          ru: "Совместить публичный индексируемый маркетинговый сайт и приватное неиндексируемое приложение в одном проекте Next.js так, чтобы они не пересекались — решено с помощью приватной группы маршрутов, метаданных для каждого маршрута и middleware, ограничивающего только то, что действительно нужно ограничить.",
          uz: "Bitta Next.js loyihasida ochiq, indekslanadigan marketing saytini va xususiy, indekslanmaydigan ilovani bir-biriga aralashtirmasdan birlashtirish — bu xususiy yoʻllar guruhi, har bir yoʻl uchun metadata va faqat kerakli narsani cheklaydigan middleware yordamida hal qilindi.",
        },
      ],
      outcome: {
        en: "A complete lead-to-cash CRM — pipeline, customers, jobs, tasks and appointments — deployed and publicly live, with the marketing site and the private application sharing one codebase and one database.",
        ru: "Полноценная CRM «от лида до оплаты» — воронка, клиенты, заказы, задачи и встречи — развёрнута и публично доступна, при этом маркетинговый сайт и приватное приложение используют один код и одну базу данных.",
        uz: "Toʻliq \"liddan toʻlovgacha\" CRM — voronka, mijozlar, buyurtmalar, vazifalar va uchrashuvlar — joylashtirilgan va ommaga ochiq, marketing sayti va xususiy ilova esa bitta kod bazasi va bitta maʼlumotlar bazasini boʻlishadi.",
      },
    },
  },
  {
    slug: "finance-pwa",
    name: "Finance PWA",
    category: personalFinancePwa,
    size: "medium",
    summary: {
      en: "A personal finance tracker built as an installable PWA — income, expenses, goals and multi-currency reporting, backed by the same Supabase project the Telegram bot uses.",
      ru: "Трекер личных финансов в виде устанавливаемого PWA — доходы, расходы, цели и мультивалютная отчётность, на том же проекте Supabase, что использует Telegram-бот.",
      uz: "Oʻrnatiladigan PWA sifatida qurilgan shaxsiy moliya trekeri — daromadlar, xarajatlar, maqsadlar va koʻp valyutali hisobot, Telegram bot foydalanadigan xuddi shu Supabase loyihasi asosida.",
    },
    links: {
      live: "https://finance-pwa-eosin.vercel.app/",
      // github: "https://github.com/Javohir1202/finance-pwa", // currently private (confirmed 404 anonymously) — restore once public again
    },
    tech: [
      "React 19",
      "TypeScript",
      "Vite",
      "Supabase (Postgres + Auth)",
      "Recharts",
      "Tailwind CSS",
      "PWA (installable, offline-capable)",
    ],
    images: [
      {
        key: "dashboard",
        label: { en: "Dashboard", ru: "Дашборд", uz: "Dashboard" },
        src: "/projects/finance-pwa/dashboard.png",
        alt: "Finance PWA dashboard with income, expenses and net",
        aspect: 1.759,
      },
      {
        key: "income",
        label: { en: "Income", ru: "Доходы", uz: "Daromadlar" },
        src: "/projects/finance-pwa/income.png",
        alt: "Finance PWA income list",
        aspect: 2.119,
      },
      {
        key: "expenses",
        label: { en: "Expenses", ru: "Расходы", uz: "Xarajatlar" },
        src: "/projects/finance-pwa/expenses.png",
        alt: "Finance PWA expenses list",
        aspect: 2.111,
      },
      {
        key: "sources",
        label: { en: "Sources", ru: "Источники", uz: "Manbalar" },
        src: "/projects/finance-pwa/sources.png",
        alt: "Finance PWA income sources with share of total",
        aspect: 2.112,
      },
      {
        key: "goals",
        label: { en: "Goals", ru: "Цели", uz: "Maqsadlar" },
        src: "/projects/finance-pwa/goals.png",
        alt: "Finance PWA financial goals with progress",
        aspect: 2.12,
      },
      {
        key: "analytics",
        label: { en: "Analytics", ru: "Аналитика", uz: "Analitika" },
        src: "/projects/finance-pwa/analytics.png",
        alt: "Finance PWA analytics — income by source, expenses by category",
        aspect: 2.507,
      },
      {
        key: "calendar",
        label: { en: "Calendar", ru: "Календарь", uz: "Kalendar" },
        src: "/projects/finance-pwa/calendar.png",
        alt: "Finance PWA calendar view of daily income and expenses",
        aspect: 1.857,
      },
      {
        key: "settings",
        label: { en: "Settings", ru: "Настройки", uz: "Sozlamalar" },
        src: "/projects/finance-pwa/settings.png",
        alt: "Finance PWA settings — currency, exchange rate, Telegram linking",
        aspect: 1.263,
      },
    ],
    caseStudy: {
      overview: {
        en: "A personal finance app built for one real person, not as a demo — installable to a phone's home screen, working fully offline if needed, and sharing its data with a Telegram bot (see Finance Bot) so entries made in chat and entries made in the app are the same records.",
        ru: "Приложение личных финансов, созданное для одного реального человека, а не как демо — устанавливается на главный экран телефона, полностью работает офлайн при необходимости и делится данными с Telegram-ботом (см. Finance Bot), поэтому записи, сделанные в чате и в приложении — это одни и те же данные.",
        uz: "Demo sifatida emas, balki bitta haqiqiy inson uchun yaratilgan shaxsiy moliya ilovasi — telefon bosh ekraniga oʻrnatiladi, zarur boʻlsa toʻliq oflayn ishlaydi va Telegram bot bilan maʼlumot almashadi (Finance Bot'ga qarang), shuning uchun chatda va ilovada kiritilgan yozuvlar bir xil maʼlumotlar hisoblanadi.",
      },
      problem: {
        en: "Tracking income and expenses across two currencies (USD and UZS) is easy to get wrong if the conversion rate isn't pinned at the time of the transaction — and a finance app is only actually used if adding an entry takes a few seconds, from wherever the person already is, including Telegram.",
        ru: "Учёт доходов и расходов в двух валютах (USD и UZS) легко сделать неправильно, если курс конвертации не зафиксирован в момент транзакции — а финансовым приложением реально пользуются только тогда, когда добавление записи занимает пару секунд, откуда бы человек ни находился, включая Telegram.",
        uz: "Ikki valyutada (USD va UZS) daromad va xarajatlarni kuzatishda, agar konversiya kursi tranzaksiya vaqtida qayd etilmasa, xato qilish oson — moliyaviy ilovadan haqiqatan foydalanish uchun esa yozuv qoʻshish, inson qayerda boʻlishidan qatʼi nazar (Telegram ham kiradi), bir necha soniya vaqt olishi kerak.",
      },
      solution: {
        en: "A Vite + React PWA that works entirely on localStorage with zero configuration, and upgrades itself to a shared Supabase backend (Postgres + magic-link email auth) the moment credentials are provided — so the same account can be reached from a browser and from Telegram. Every transaction stores its original amount and currency alongside its rate to USD and its rate to the user's base currency at the moment it was recorded, so past entries never silently reprice when exchange rates move later.",
        ru: "PWA на Vite + React, которое полностью работает на localStorage без какой-либо настройки и само переключается на общий бэкенд Supabase (Postgres + вход по magic-link) в момент, когда указаны учётные данные — так один и тот же аккаунт доступен из браузера и из Telegram. Каждая транзакция хранит исходную сумму и валюту вместе с курсом к USD и курсом к базовой валюте пользователя на момент записи, поэтому старые записи никогда не пересчитываются незаметно при изменении курса в будущем.",
        uz: "Hech qanday sozlamasiz toʻliq localStorage'da ishlaydigan va login maʼlumotlari kiritilgan zahoti umumiy Supabase backend'iga (Postgres + magic-link orqali kirish) oʻtadigan Vite + React PWA — shu tufayli bir xil akkauntga brauzerdan ham, Telegram'dan ham kirish mumkin. Har bir tranzaksiya yozilgan paytdagi USD kursi va foydalanuvchining asosiy valyutasiga boʻlgan kursi bilan birga asl summa va valyutani saqlaydi, shuning uchun keyinchalik kurs oʻzgarganda eski yozuvlar sezdirmasdan qayta narxlanmaydi.",
      },
      features: [
        {
          en: "Dashboard with today / this week / this month views: income, expenses, net, a chart, and goal progress",
          ru: "Дашборд с разбивкой на сегодня / эту неделю / этот месяц: доходы, расходы, чистая прибыль, график и прогресс по целям",
          uz: "Bugun / bu hafta / bu oy koʻrinishlariga ega dashboard: daromad, xarajat, sof foyda, grafik va maqsad progresi",
        },
        {
          en: "Full CRUD on income and expenses, with categories, statuses and search",
          ru: "Полный CRUD для доходов и расходов — с категориями, статусами и поиском",
          uz: "Daromad va xarajatlar uchun toʻliq CRUD — kategoriyalar, statuslar va qidiruv bilan",
        },
        {
          en: "Income sources with shares and their own statistics",
          ru: "Источники дохода с долями и собственной статистикой",
          uz: "Ulush va oʻz statistikasiga ega daromad manbalari",
        },
        {
          en: "Financial goals with progress tracking",
          ru: "Финансовые цели с отслеживанием прогресса",
          uz: "Progressni kuzatib boruvchi moliyaviy maqsadlar",
        },
        {
          en: "USD / UZS switching with live exchange rates (cached), and the original amount and rate preserved per transaction",
          ru: "Переключение USD / UZS с актуальным курсом (с кэшированием), при этом исходная сумма и курс сохраняются для каждой транзакции",
          uz: "Jonli valyuta kursi bilan (keshlangan) USD / UZS almashtirish, har bir tranzaksiya uchun asl summa va kurs saqlanadi",
        },
        {
          en: "CSV export of transactions",
          ru: "Экспорт транзакций в CSV",
          uz: "Tranzaksiyalarni CSV formatida eksport qilish",
        },
        {
          en: "Installable PWA — manifest, service worker, offline via localStorage when no backend is configured",
          ru: "Устанавливаемое PWA — manifest, service worker, офлайн-режим через localStorage, если бэкенд не настроен",
          uz: "Oʻrnatiladigan PWA — manifest, service worker, backend sozlanmagan boʻlsa localStorage orqali oflayn rejim",
        },
        {
          en: "Magic-link email auth backed by Supabase, so the same data is available on phone, desktop, and through the Telegram bot",
          ru: "Вход по email через magic-link на базе Supabase — одни и те же данные доступны на телефоне, компьютере и через Telegram-бота",
          uz: "Supabase asosidagi magic-link orqali email bilan kirish — bir xil maʼlumotlar telefon, kompyuter va Telegram bot orqali ochiq",
        },
      ],
      architecture: {
        description: {
          en: "The web app and the Telegram bot are two clients of one Supabase project: the browser talks to Postgres through the anon key under Row Level Security, while the bot (a separate serverless function) uses a service-role key that bypasses RLS but is explicitly scoped, in every query, to the single user resolved from the Telegram chat id. A small external service supplies exchange rates; everything else is Supabase and Vercel.",
          ru: "Веб-приложение и Telegram-бот — это два клиента одного проекта Supabase: браузер обращается к Postgres через anon-ключ под защитой Row Level Security, а бот (отдельная serverless-функция) использует service-role ключ, который обходит RLS, но в каждом запросе явно ограничен одним пользователем, определённым по chat id в Telegram. Небольшой внешний сервис поставляет курсы валют; всё остальное — Supabase и Vercel.",
          uz: "Veb-ilova va Telegram bot bitta Supabase loyihasining ikki klienti: brauzer Postgres'ga Row Level Security ostida anon-kalit orqali murojaat qiladi, bot (alohida serverless funksiya) esa RLS'ni chetlab oʻtadigan, ammo har bir soʻrovda Telegram chat id orqali aniqlangan bitta foydalanuvchiga aniq bogʻlangan service-role kalitidan foydalanadi. Kichik tashqi xizmat valyuta kurslarini taʼminlaydi; qolgan hammasi Supabase va Vercel.",
        },
        flow: [
          "User (browser or Telegram)",
          "React PWA — client-side, or Telegram serverless webhook",
          "Supabase Postgres + Auth (RLS on the web client)",
          "External service — live exchange rates",
        ],
      },
      challenges: [
        {
          en: "Multi-currency without silent repricing — every transaction locks in its rate-to-USD and rate-to-base at insert time, computed from the same currency helper the bot and the web app both import.",
          ru: "Мультивалютность без незаметного пересчёта цен — каждая транзакция фиксирует курс к USD и к базовой валюте в момент добавления, вычисленный через общую функцию конвертации, которую импортируют и бот, и веб-приложение.",
          uz: "Sezilmas qayta narxlashsiz koʻp valyutalilik — har bir tranzaksiya qoʻshilgan paytda USD va asosiy valyutaga boʻlgan kursni, bot va veb-ilova ikkalasi ham import qiladigan bitta valyuta funksiyasi orqali hisoblab, mustahkamlaydi.",
        },
        {
          en: "Making the bot and the web app agree on one dataset without giving the bot a browser session — solved with a service-role client whose every query is manually scoped to a resolved user id, since RLS has nothing to check against for a webhook.",
          ru: "Сделать так, чтобы бот и веб-приложение работали с одними и теми же данными, не давая боту браузерную сессию — решено через service-role клиент, у которого каждый запрос вручную ограничен определённым user id, поскольку у RLS просто нечего проверять для вебхука.",
          uz: "Botga brauzer sessiyasini bermasdan, bot va veb-ilovani bitta maʼlumotlar toʻplamiga rozi qilish — bu har bir soʻrovi qoʻlda aniqlangan foydalanuvchi id'siga bogʻlangan service-role klient orqali hal qilindi, chunki webhook uchun RLS tekshiradigan hech narsa yoʻq.",
        },
        {
          en: "Zero-config evaluation — if Supabase isn't set up, the app has to still be fully usable on localStorage, with no broken code paths depending on a backend that isn't there.",
          ru: "Оценка без настройки — если Supabase не подключён, приложение всё равно должно полностью работать на localStorage, без сломанных участков кода, зависящих от несуществующего бэкенда.",
          uz: "Sozlamasiz baholash — agar Supabase ulanmagan boʻlsa ham, ilova localStorage'da toʻliq ishlashi kerak, mavjud boʻlmagan backend'ga bogʻliq buzilgan kod qismlarisiz.",
        },
      ],
      outcome: {
        en: "A working personal finance system built for an actual end user rather than as a portfolio demo — deployed to Vercel as an installable PWA, with the Telegram bot live against the same account (see Finance Bot).",
        ru: "Рабочая система личных финансов, созданная для реального пользователя, а не как демо для портфолио — развёрнута на Vercel как устанавливаемое PWA, а Telegram-бот работает с тем же аккаунтом (см. Finance Bot).",
        uz: "Portfolio uchun demo emas, balki haqiqiy foydalanuvchi uchun yaratilgan ishlaydigan shaxsiy moliya tizimi — Vercel'da oʻrnatiladigan PWA sifatida joylashtirilgan, Telegram bot esa xuddi shu akkaunt bilan ishlaydi (Finance Bot'ga qarang).",
      },
    },
  },
  {
    slug: "finance-bot",
    name: "Finance Bot",
    category: telegramFinanceAutomation,
    size: "medium",
    summary: {
      en: "A Telegram bot that reads and writes the same Supabase backend as Finance PWA — add income or an expense by typing one line, no app required.",
      ru: "Telegram-бот, который читает и пишет в тот же бэкенд Supabase, что и Finance PWA — добавляйте доход или расход одной строкой текста, без открытия приложения.",
      uz: "Finance PWA bilan bir xil Supabase backend'idan oʻqiydigan va yozadigan Telegram bot — ilovani ochmasdan, bitta qator matn bilan daromad yoki xarajat qoʻshing.",
    },
    links: {
      telegram: "https://t.me/financepwa_bot",
      // github: "https://github.com/Javohir1202/finance-pwa", // currently private (confirmed 404 anonymously) — restore once public again
    },
    tech: [
      "Telegram Bot API (webhook)",
      "Vercel Serverless Functions",
      "TypeScript",
      "Supabase (service-role client)",
    ],
    images: [
      {
        key: "start",
        label: { en: "Account Linking", ru: "Привязка аккаунта", uz: "Akkauntni bogʻlash" },
        src: "/projects/finance-bot/start.png",
        alt: "Finance Bot /start welcome message and account linking",
      },
      {
        key: "income",
        label: { en: "Adding Income", ru: "Добавление дохода", uz: "Daromad qoʻshish" },
        src: "/projects/finance-bot/income.png",
        alt: "Finance Bot confirming an added income transaction",
      },
      {
        key: "expense",
        label: { en: "Adding an Expense", ru: "Добавление расхода", uz: "Xarajat qoʻshish" },
        src: "/projects/finance-bot/expense.png",
        alt: "Finance Bot parsing a typed expense and confirming it",
      },
      {
        key: "menu",
        label: { en: "Menu", ru: "Меню", uz: "Menyu" },
        src: "/projects/finance-bot/menu.png",
        alt: "Finance Bot reply-keyboard menu",
      },
      {
        key: "today",
        label: { en: "Today's Summary", ru: "Сводка за сегодня", uz: "Bugungi hisobot" },
        src: "/projects/finance-bot/today.png",
        alt: "Finance Bot replying with today's income and expenses",
      },
    ],
    caseStudy: {
      overview: {
        en: "Finance Bot isn't a separate product — it's a Vercel serverless function (api/telegram.ts) living inside the Finance PWA repository, registered as a Telegram webhook, that reads and writes the exact same Supabase tables the web app uses. Typing a message in Telegram and tapping through the web app are two ways of editing the same data.",
        ru: "Finance Bot — не отдельный продукт, а serverless-функция на Vercel (api/telegram.ts) внутри репозитория Finance PWA, зарегистрированная как Telegram-вебхук, которая читает и пишет ровно в те же таблицы Supabase, что и веб-приложение. Написать сообщение в Telegram и нажимать кнопки в веб-приложении — это два способа редактировать одни и те же данные.",
        uz: "Finance Bot alohida mahsulot emas — bu Finance PWA repozitoriyasi ichida joylashgan, Telegram webhook sifatida roʻyxatdan oʻtgan va veb-ilova foydalanadigan xuddi shu Supabase jadvallaridan oʻqiydigan hamda yozadigan Vercel serverless funksiyasi (api/telegram.ts). Telegram'da xabar yozish va veb-ilovada tugmalarni bosish — bir xil maʼlumotni tahrirlashning ikki usuli, xolos.",
      },
      problem: {
        en: "Opening an app to log a $4 expense is friction most people won't pay every time — but a finance tracker only stays accurate if entries actually get made in the moment. Telegram is already open.",
        ru: "Открывать приложение, чтобы записать расход в $4 — это лишнее трение, на которое большинство людей не готовы идти каждый раз. А финансовый трекер остаётся точным, только если записи делаются сразу же. Telegram и так уже открыт.",
        uz: "$4 lik xarajatni yozish uchun ilovani ochish — koʻpchilik har safar qilishga tayyor boʻlmaydigan ortiqcha harakat. Moliya trekeri esa faqat yozuvlar oʻsha zahoti kiritilgandagina aniq boʻlib qoladi. Telegram esa allaqachon ochiq.",
      },
      solution: {
        en: "A webhook-driven serverless function, verified with Telegram's secret-token header, that resolves the sender's Telegram chat id to a Supabase profile, parses free-text amount lines, and writes straight into the same transactions table the PWA reads from — with a one-time linking code instead of a bot-side login.",
        ru: "Serverless-функция на основе вебхука, проверяемая через secret-token заголовок Telegram, которая определяет Supabase-профиль по chat id отправителя, разбирает свободный текст с суммой и пишет напрямую в ту же таблицу transactions, из которой читает PWA — с одноразовым кодом привязки вместо логина на стороне бота.",
        uz: "Telegram'ning secret-token headeri bilan tekshiriladigan, jo'natuvchining Telegram chat id'sini Supabase profiliga bogʻlaydigan, erkin matndagi summa qatorlarini tahlil qiladigan va PWA oʻqiydigan xuddi shu transactions jadvaliga toʻgʻridan-toʻgʻri yozadigan webhook asosidagi serverless funksiya — bot tomonidagi login oʻrniga bir martalik bogʻlash kodi bilan.",
      },
      features: [
        {
          en: "Account linking by a 6-digit code (/start generates one, entered once in the web app's settings)",
          ru: "Привязка аккаунта по 6-значному коду (/start генерирует его, вводится один раз в настройках веб-приложения)",
          uz: "6 xonali kod orqali akkauntni bogʻlash (/start uni generatsiya qiladi, veb-ilova sozlamalarida bir marta kiritiladi)",
        },
        {
          en: 'Free-text entry: "+500000 работа" or "-120000 еда" resolves amount, direction and description from a single line',
          ru: "Ввод свободным текстом: «+500000 работа» или «-120000 еда» — сумма, направление и описание определяются из одной строки",
          uz: 'Erkin matn bilan kiritish: "+500000 ish" yoki "-120000 ovqat" — summa, yoʻnalish va tavsif bitta qatordan aniqlanadi',
        },
        {
          en: "Keyword-based category matching for expenses, and source matching (with an inline-keyboard fallback) for income",
          ru: "Определение категории расхода по ключевым словам, а для дохода — сопоставление источника (с запасным вариантом через inline-клавиатуру)",
          uz: "Xarajatlar uchun kalit soʻzlar asosida kategoriya aniqlash, daromad uchun esa manba moslashtirish (inline-klaviatura zaxira varianti bilan)",
        },
        {
          en: "Reply-keyboard shortcuts for today / this month stats, goals, and income sources — no commands to remember",
          ru: "Быстрые кнопки reply-клавиатуры для статистики за сегодня / за месяц, целей и источников дохода — команды запоминать не нужно",
          uz: "Bugungi / oylik statistika, maqsadlar va daromad manbalari uchun reply-klaviatura tugmalari — buyruqlarni yodlash shart emas",
        },
        {
          en: "Webhook requests are rejected unless they carry Telegram's configured secret token",
          ru: "Запросы вебхука отклоняются, если в них нет настроенного секретного токена Telegram",
          uz: "Agar soʻrovda Telegram uchun sozlangan maxfiy token boʻlmasa, webhook soʻrovlari rad etiladi",
        },
      ],
      architecture: {
        description: {
          en: "The bot is registered with Telegram as a webhook: Telegram calls the serverless function directly, the function runs for a fraction of a second, and it stays asleep the rest of the time. It shares its currency-conversion and formatting code with the web app by importing the same source files, and uses a Supabase service-role key — scoped manually to one resolved user per request, since a bot has no browser session for Row Level Security to check against.",
          ru: "Бот зарегистрирован в Telegram как вебхук: Telegram напрямую вызывает serverless-функцию, она выполняется доли секунды и всё остальное время «спит». Код конвертации валют и форматирования общий с веб-приложением — через импорт тех же исходных файлов, а для доступа используется service-role ключ Supabase, вручную ограниченный одним определённым пользователем на запрос, поскольку у бота нет браузерной сессии, которую могла бы проверить Row Level Security.",
          uz: "Bot Telegram'da webhook sifatida roʻyxatdan oʻtgan: Telegram serverless funksiyani toʻgʻridan-toʻgʻri chaqiradi, funksiya soniyaning bir ulushida ishlaydi va qolgan vaqtda \"uxlab\" turadi. Valyuta konversiyasi va formatlash kodi xuddi shu manba fayllarini import qilish orqali veb-ilova bilan bir xil, kirish uchun esa har bir soʻrovda qoʻlda bitta aniqlangan foydalanuvchiga bogʻlangan Supabase service-role kaliti ishlatiladi, chunki botda Row Level Security tekshira oladigan brauzer sessiyasi yoʻq.",
        },
        flow: [
          "Telegram message",
          "Vercel serverless webhook (secret-token verified)",
          "Supabase Postgres — service-role client, scoped to one resolved user",
          "Same transactions table Finance PWA reads from",
        ],
      },
      challenges: [
        {
          en: 'Resolving "who is this" safely without a login — solved with a short-lived, one-time linking code stored server-side and matched to a Telegram chat id, rather than trusting the chat id alone.',
          ru: "Безопасно определить «кто это», не используя логин — решено с помощью недолговечного одноразового кода привязки, который хранится на сервере и сопоставляется с Telegram chat id, вместо того чтобы доверять одному лишь chat id.",
          uz: "Login'siz \"bu kim\" ekanligini xavfsiz aniqlash — faqat chat id'ga ishonish oʻrniga, server tomonida saqlanadigan va Telegram chat id'ga moslashtiriladigan qisqa muddatli, bir martalik bogʻlash kodi orqali hal qilindi.",
        },
        {
          en: "Parsing free text reliably enough to be worth using — a message is amount, optional +/- sign, and a free-text remainder; category is guessed from keywords, and anything ambiguous (which income source, income vs. expense) falls back to an inline-keyboard question instead of guessing wrong.",
          ru: "Разбирать свободный текст достаточно надёжно, чтобы это имело смысл — сообщение состоит из суммы, необязательного знака +/- и остатка текста; категория угадывается по ключевым словам, а всё неоднозначное (какой источник дохода, доход это или расход) вместо неверного угадывания превращается в вопрос через inline-клавиатуру.",
          uz: "Foydalanish arziydigan darajada ishonchli erkin matnni tahlil qilish — xabar summa, ixtiyoriy +/- belgisi va qolgan matndan iborat; kategoriya kalit soʻzlar boʻyicha taxmin qilinadi, noaniq narsalar esa (qaysi daromad manbai, daromadmi yoki xarajatmi) notoʻgʻri taxmin qilish oʻrniga inline-klaviatura orqali savolga aylanadi.",
        },
        {
          en: "Not duplicating business logic — currency conversion and formatting are imported directly from the same lib/ used by the PWA, so the bot and the app can't quietly drift into disagreeing with each other.",
          ru: "Не дублировать бизнес-логику — конвертация валют и форматирование импортируются напрямую из того же lib/, что использует PWA, поэтому бот и приложение не могут незаметно разойтись друг с другом.",
          uz: "Biznes logikasini takrorlamaslik — valyuta konversiyasi va formatlash PWA foydalanadigan xuddi shu lib/ dan toʻgʻridan-toʻgʻri import qilinadi, shuning uchun bot va ilova sezdirmasdan bir-biriga zid kelib qololmaydi.",
        },
      ],
      outcome: {
        en: "A real automation layer on top of Finance PWA, not a toy bot — live on Telegram, sharing one backend and one set of financial records with the web app.",
        ru: "Настоящий слой автоматизации поверх Finance PWA, а не игрушечный бот — работает в Telegram, использует один бэкенд и один набор финансовых записей вместе с веб-приложением.",
        uz: "Finance PWA ustidagi oʻyinchoq bot emas, balki haqiqiy avtomatlashtirish qatlami — Telegram'da ishlaydi, veb-ilova bilan bitta backend va bitta moliyaviy yozuvlar toʻplamini boʻlishadi.",
      },
    },
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
