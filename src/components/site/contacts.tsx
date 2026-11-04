import { MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { ADDRESS, MAP_HREF, MAX_WEB, PHONE_DISPLAY, PHONE_TEL, TG_CHANNEL, TG_CHAT } from "@/components/site/content";

export function Contacts() {
  return (
    <section id="contacts" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold tracking-widest text-coral uppercase">Контакты</p>
          <h2 className="font-display mt-3 text-3xl leading-tight font-medium sm:text-4xl">
            Офис в Москве и связь в мессенджерах
          </h2>
          <p className="mt-4 text-muted">
            Напишите в Telegram или MAX на {PHONE_DISPLAY}. Канал — отдельно, там новости и подборки.
          </p>
        </div>

        <div className="panel rounded-3xl p-6 sm:p-8 lg:col-span-7">
          <a href={PHONE_TEL} className="font-display inline-flex items-center gap-3 text-2xl font-medium sm:text-3xl">
            <Phone className="size-6 text-coral" aria-hidden />
            {PHONE_DISPLAY}
          </a>

          <a
            href={MAP_HREF}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex items-start gap-3 text-base hover:text-coral"
          >
            <MapPin className="mt-1 size-5 shrink-0 text-coral" aria-hidden />
            <span>{ADDRESS}</span>
          </a>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <a
              href={TG_CHANNEL}
              target="_blank"
              rel="noreferrer"
              className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-line bg-paper text-sm font-semibold hover:border-coral"
            >
              <Send className="size-4" aria-hidden />
              Канал
            </a>
            <a
              href={TG_CHAT}
              className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-line bg-paper text-sm font-semibold hover:border-coral"
            >
              <MessageCircle className="size-4" aria-hidden />
              Telegram
            </a>
            <a
              href={MAX_WEB}
              target="_blank"
              rel="noreferrer"
              className="btn-coral flex h-14 items-center justify-center gap-2 rounded-2xl text-sm font-semibold"
            >
              MAX
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">Telegram и MAX: {PHONE_DISPLAY}</p>
        </div>
      </div>
    </section>
  );
}
