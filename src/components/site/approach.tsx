import { Compass, Headphones, Hotel, ListChecks } from "lucide-react";
import { benefits } from "@/components/site/content";

const icons = {
  compass: Compass,
  headset: Headphones,
  hotel: Hotel,
  list: ListChecks,
};

export function Approach() {
  return (
    <section id="approach" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold tracking-widest text-coral uppercase">Как мы работаем</p>
        <h2 className="font-display mt-3 text-3xl leading-tight font-medium sm:text-4xl">
          Мы не продаём туры, а помогаем выбрать путешествие мечты
        </h2>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {benefits.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.title} className="panel rounded-3xl p-6">
              <span className="grid size-11 place-items-center rounded-2xl bg-paper text-coral">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="font-display mt-5 text-xl font-medium">{item.title}</h3>
              <p className="mt-2 text-sm text-muted sm:text-base">{item.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
