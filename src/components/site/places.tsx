import { places } from "@/components/site/content";

export function Places() {
  return (
    <section id="places" className="scroll-mt-20 border-y border-line bg-card py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-widest text-coral uppercase">Направления</p>
            <h2 className="font-display mt-3 text-3xl leading-tight font-medium sm:text-4xl">
              Куда чаще собирают поездку
            </h2>
          </div>
          <a href="#search" className="text-sm font-semibold text-ink underline decoration-coral underline-offset-4">
            Открыть поиск
          </a>
        </div>

        <ul className="mt-8 flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {places.map((place) => (
            <li key={place.name} className="w-56 shrink-0 snap-start lg:w-auto">
              <a href="#search" className="group block">
                <span className="relative block overflow-hidden rounded-3xl">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="h-72 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="ink-scrim absolute inset-0" />
                  <span className="absolute inset-x-0 bottom-0 p-4 text-card">
                    <span className="font-display block text-lg font-medium">{place.name}</span>
                    <span className="mt-1 block text-sm text-card/80">{place.note}</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
