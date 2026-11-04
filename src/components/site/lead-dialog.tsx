import { createContext, useContext, useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { X } from "lucide-react";
import { sendLead } from "@/lib/leads";

const LeadContext = createContext<(() => void) | null>(null);

export function useOpenLead() {
  const open = useContext(LeadContext);
  if (!open) throw new Error("Форма заявки не подключена");
  return open;
}

export function LeadButton({
  className,
  children,
  onOpen,
}: {
  className?: string;
  children: ReactNode;
  onOpen?: () => void;
}) {
  const open = useOpenLead();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onOpen?.();
        open();
      }}
    >
      {children}
    </button>
  );
}

const fieldClass = "mt-1 h-12 w-full rounded-xl border border-line bg-paper px-3 text-base outline-none";

export function LeadRoot({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <LeadContext.Provider value={() => setOpen(true)}>
      {children}
      {open ? <LeadDialog onClose={() => setOpen(false)} /> : null}
    </LeadContext.Provider>
  );
}

function LeadDialog({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    setPending(true);
    setError("");
    try {
      const result = await sendLead({
        data: {
          phone: String(form.get("phone") ?? ""),
          email: String(form.get("email") ?? ""),
          people: String(form.get("people") ?? ""),
          departure: String(form.get("departure") ?? ""),
          days: String(form.get("days") ?? ""),
          destination: String(form.get("destination") ?? ""),
          company: String(form.get("company") ?? ""),
        },
      });
      if (result.ok) setSent(true);
      else setError(result.error);
    } catch {
      setError("Не получилось отправить. Позвоните нам, заявка не потеряется.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="panel max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl p-5 sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-coral uppercase">Заявка</p>
            <h2 id={titleId} className="font-display mt-2 text-2xl font-medium">
              Подберём поездку
            </h2>
          </div>
          <button
            type="button"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line"
            aria-label="Закрыть"
            onClick={onClose}
          >
            <X className="size-5" />
          </button>
        </div>

        {sent ? (
          <p className="mt-6 text-base">Заявка отправлена. Мы напишем на почту и перезвоним.</p>
        ) : (
          <form className="mt-6 grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
            <label className="text-sm font-medium">
              Телефон
              <input className={fieldClass} name="phone" type="tel" autoComplete="tel" required placeholder="+7 995 000-00-00" />
            </label>
            <label className="text-sm font-medium">
              Почта
              <input className={fieldClass} name="email" type="email" autoComplete="email" required placeholder="name@email.ru" />
            </label>
            <label className="text-sm font-medium">
              Сколько человек
              <input className={fieldClass} name="people" type="number" min={1} max={30} inputMode="numeric" />
            </label>
            <label className="text-sm font-medium">
              Сколько дней
              <input className={fieldClass} name="days" type="number" min={1} max={60} inputMode="numeric" />
            </label>
            <label className="text-sm font-medium">
              Дата вылета
              <input className={fieldClass} name="departure" type="date" />
            </label>
            <label className="text-sm font-medium">
              Направление
              <input className={fieldClass} name="destination" type="text" maxLength={80} placeholder="Турция, Мальдивы" />
            </label>
            <input className="hidden" tabIndex={-1} autoComplete="off" name="company" aria-hidden="true" />
            {error ? <p className="text-sm text-coral sm:col-span-2">{error}</p> : null}
            <button
              type="submit"
              disabled={pending}
              className="btn-coral h-12 rounded-full text-sm font-semibold disabled:opacity-60 sm:col-span-2"
            >
              {pending ? "Отправляем…" : "Отправить заявку"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
