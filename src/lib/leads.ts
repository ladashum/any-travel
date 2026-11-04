import { createServerFn } from "@tanstack/react-start";

const INBOX = "TA.Any.travel@yandex.ru";

type LeadInput = {
  phone: string;
  email: string;
  people: string;
  departure: string;
  days: string;
  destination: string;
  company: string;
};

export type LeadResult = { ok: true } | { ok: false; error: string };

function text(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

function readLead(input: unknown): LeadInput | LeadResult {
  if (!input || typeof input !== "object") return { ok: false, error: "Проверьте поля и отправьте ещё раз." };
  const raw = input as Record<string, unknown>;
  const phone = text(raw.phone, 30);
  const email = text(raw.email, 120);
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return { ok: false, error: "Укажите телефон." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Укажите почту." };
  return {
    phone,
    email,
    people: text(raw.people, 4),
    departure: text(raw.departure, 12),
    days: text(raw.days, 4),
    destination: text(raw.destination, 80),
    company: text(raw.company, 80),
  };
}

function shownDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return match ? `${match[3]}.${match[2]}.${match[1]}` : value || "не указана";
}

export const sendLead = createServerFn({ method: "POST" })
  .validator((input: LeadInput) => input)
  .handler(async ({ data }): Promise<LeadResult> => {
    const lead = readLead(data);
    if ("ok" in lead) return lead;
    if (lead.company) return { ok: true };

    const password = process.env.YANDEX_SMTP_PASSWORD?.trim();
    if (!password) {
      return { ok: false, error: "Отправка на почту ещё не включена. Позвоните нам." };
    }

    const { createTransport } = await import("nodemailer");
    const transport = createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: { user: INBOX, pass: password },
    });

    const lines = [
      `Телефон: ${lead.phone}`,
      `Почта: ${lead.email}`,
      `Сколько человек: ${lead.people || "не указано"}`,
      `Дата вылета: ${shownDate(lead.departure)}`,
      `Сколько дней: ${lead.days || "не указано"}`,
      `Направление: ${lead.destination || "не указано"}`,
    ];

    try {
      await transport.sendMail({
        from: `Any Travel <${INBOX}>`,
        to: INBOX,
        replyTo: lead.email,
        subject: "Заявка с сайта Any Travel",
        text: lines.join("\n"),
      });
    } catch {
      return { ok: false, error: "Не получилось отправить. Позвоните нам, заявка не потеряется." };
    }

    return { ok: true };
  });
