import { TOUR_SEARCH_URL } from "@/components/site/content";

export function SearchModule() {
  return (
    <div className="panel relative overflow-hidden rounded-none sm:rounded-3xl sm:p-5">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2 px-4 pt-4 sm:px-1 sm:pt-0">
        <div>
          <p className="text-xs font-semibold tracking-widest text-coral uppercase">Поиск туров</p>
          <p className="font-display text-lg font-medium">Подбор тура в Any Travel</p>
        </div>
        <p className="max-w-sm text-sm text-muted">
          Город вылета, даты и состав — предложения туроператоров в одном окне.
        </p>
      </div>
      <iframe
        title="Поиск туров Any Travel"
        src={TOUR_SEARCH_URL}
        className="block h-[82dvh] min-h-[560px] w-full max-w-full border-0 bg-paper sm:h-[680px] sm:rounded-2xl lg:h-[760px]"
      />
    </div>
  );
}
