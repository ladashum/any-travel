import { useEffect, useRef, useState } from "react";
import { MODULE_ID, MODULE_SRC, PHONE_TEL } from "@/components/site/content";

type Status = "loading" | "ready" | "failed";

export function SearchModule() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const markReady = () => {
      if (host.childElementCount > 0) setStatus("ready");
    };

    const observer = new MutationObserver(markReady);
    observer.observe(host, { childList: true, subtree: true });

    const existing = document.querySelector<HTMLScriptElement>(`script[data-sletat-module="1"]`);
    if (!existing) {
      const script = document.createElement("script");
      script.src = MODULE_SRC;
      script.defer = true;
      script.async = false;
      script.charset = "utf-8";
      script.dataset.sletatModule = "1";
      script.addEventListener("error", () => setStatus("failed"));
      document.body.appendChild(script);
    } else {
      markReady();
    }

    const slow = window.setTimeout(() => {
      setStatus((current) => (current === "loading" ? "failed" : current));
    }, 12000);

    return () => {
      observer.disconnect();
      window.clearTimeout(slow);
    };
  }, []);

  return (
    <div className="panel relative overflow-hidden rounded-3xl p-3 sm:p-5">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2 px-1">
        <div>
          <p className="text-xs font-semibold tracking-widest text-coral uppercase">Поиск туров</p>
          <p className="font-display text-lg font-medium">Слетать.ру внутри Any Travel</p>
        </div>
        <p className="max-w-sm text-sm text-muted">
          Город вылета, даты и состав — предложения туроператоров в одном окне.
        </p>
      </div>

      <div className={`relative rounded-2xl bg-paper ${status === "ready" ? "" : "min-h-96"}`}>
        {status !== "ready" ? (
          <div className="absolute inset-0 z-0 flex flex-col justify-center gap-3 p-4">
            {status === "loading" ? (
              <>
                <p className="text-sm text-muted">Загружаем поиск туров…</p>
                <div className="h-12 animate-pulse rounded-xl bg-line" />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="h-12 animate-pulse rounded-xl bg-line" />
                  <div className="h-12 animate-pulse rounded-xl bg-line" />
                  <div className="h-12 animate-pulse rounded-xl bg-line" />
                  <div className="h-12 animate-pulse rounded-xl bg-coral/40" />
                </div>
              </>
            ) : (
              <div className="max-w-md">
                <p className="font-display text-lg font-medium">Поиск не открылся</p>
                <p className="mt-2 text-sm text-muted">
                  Обновите страницу. Если модуль так и не появится — подберём поездку вручную.
                </p>
                <a href={PHONE_TEL} className="btn-coral mt-4 inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold">
                  Позвонить
                </a>
              </div>
            )}
          </div>
        ) : null}
        <div
          ref={hostRef}
          data-sletat-module-id={MODULE_ID}
          className={`relative z-10 ${status === "ready" ? "" : "pointer-events-none min-h-96"}`}
        />
      </div>
    </div>
  );
}
