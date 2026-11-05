import { PHONE_DISPLAY, PHONE_TEL, TG_CHANNEL } from "@/components/site/content";
import { Logo } from "@/components/site/logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo tone="card" />
          <p className="mt-4 max-w-md text-sm text-card/75">
            Поиск и сравнение туров, подбор, виза и сопровождение — Any Travel.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a href={PHONE_TEL} className="font-medium">
            {PHONE_DISPLAY}
          </a>
          <a href={TG_CHANNEL} className="text-card/75 hover:text-card" target="_blank" rel="noreferrer">
            t.me/ANY3avel
          </a>
        </div>
      </div>
    </footer>
  );
}
