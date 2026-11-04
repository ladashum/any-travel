import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { LeadButton } from "@/components/site/lead-dialog";
import { PHONE_DISPLAY, PHONE_TEL } from "@/components/site/content";
import { Logo } from "@/components/site/logo";

const links = [
  { href: "#search", label: "Поиск" },
  { href: "#approach", label: "Подход" },
  { href: "#places", label: "Направления" },
  { href: "#contacts", label: "Контакты" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="shrink-0" aria-label="Any Travel, наверх">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Разделы">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-ink hover:text-coral">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LeadButton className="inline-flex h-11 items-center rounded-full border border-line bg-card px-4 text-sm font-semibold hover:border-coral">
            Заявка
          </LeadButton>
          <a
            href={PHONE_TEL}
            className="btn-coral inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold"
          >
            <Phone className="size-4" aria-hidden />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            <span className="sm:hidden">Позвонить</span>
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line bg-card text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-line bg-card px-4 py-3 md:hidden" aria-label="Разделы">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="flex h-12 items-center text-base font-medium"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <LeadButton
                className="flex h-12 w-full items-center text-base font-medium"
                onOpen={() => setOpen(false)}
              >
                Оставить заявку
              </LeadButton>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
