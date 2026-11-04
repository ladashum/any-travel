export function Logo({ tone = "ink" }: { tone?: "ink" | "card" }) {
  const color = tone === "card" ? "text-card" : "text-ink";
  return (
    <span className={`inline-flex items-center gap-3 ${color}`}>
      <span className="grid size-9 place-items-center rounded-xl bg-coral text-on-coral" aria-hidden>
        <svg viewBox="0 0 24 24" className="size-5" fill="none">
          <path
            d="M4 13.5 20 4l-6.2 16-2.6-6.2L4 13.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display text-sm font-medium leading-tight tracking-wide">
        ANY
        <span className={`mt-1 block text-xs font-medium tracking-widest ${tone === "card" ? "text-card/70" : "text-muted"}`}>TRAVEL</span>
      </span>
    </span>
  );
}
