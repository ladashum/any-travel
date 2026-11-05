import { TOUR_SEARCH_URL } from "@/components/site/content";

export function SearchModule() {
  return (
    <div className="overflow-hidden bg-[#f7f7f9] sm:rounded-3xl sm:border sm:border-line sm:shadow-[var(--shadow-panel)]">
      <iframe
        title="Поиск туров Any Travel"
        src={TOUR_SEARCH_URL}
        className="block h-[492px] w-full border-0 bg-[#f7f7f9] lg:h-[440px]"
      />
    </div>
  );
}
