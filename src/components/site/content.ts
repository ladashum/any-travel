export const PHONE_DISPLAY = "+7 (995) 882-52-10";
export const PHONE_TEL = "tel:+79958825210";
export const TG_CHANNEL = "https://t.me/ANY3avel";
export const TG_CHAT = "tg://resolve?phone=79958825210";
export const MAX_WEB = "https://web.max.ru/";
export const ADDRESS = "Ленинградское шоссе, дом 228к1, Москва";
export const MAP_HREF = `https://yandex.ru/maps/?text=${encodeURIComponent(
  "Ленинградское шоссе 228к1, Москва",
)}`;

export const TOUR_SEARCH_URL = "https://231074.tourpage.ru/";

export const benefits = [
  {
    title: "Подбор офлайн и онлайн",
    text: "Можно приехать в офис на Ленинградском шоссе или собрать поездку дистанционно.",
    icon: "compass" as const,
  },
  {
    title: "Виза и поддержка 24/7",
    text: "Документы, перелёты и вопросы в поездке — на связи в любое время.",
    icon: "headset" as const,
  },
  {
    title: "Проверенные отели",
    text: "Смотрим не только цену: расположение, питание, отзывы и реальные условия.",
    icon: "hotel" as const,
  },
  {
    title: "Внимание к каждой детали",
    text: "Даты, состав, трансфер, страховка — собираем так, чтобы поездка сложилась.",
    icon: "list" as const,
  },
];

export const places = [
  { name: "Турция", note: "море и отели у воды", image: "/media/turkey.jpg" },
  { name: "Мальдивы", note: "тихие лагуны", image: "/media/maldives.jpg" },
  { name: "Египет", note: "риф и тёплое море", image: "/media/egypt.jpg" },
  { name: "ОАЭ", note: "город и пляж", image: "/media/gulf.jpg" },
  { name: "Таиланд", note: "острова и длинный сезон", image: "/media/islands.jpg" },
];
