import { useEffect, useRef, useState } from "react";
import { MODULE_ID, MODULE_SRC, PHONE_TEL } from "@/components/site/content";

type Status = "loading" | "ready" | "failed";

function elementClass(node: EventTarget | null): string {
  return node instanceof Element && typeof node.className === "string" ? node.className : "";
}

function walkRoots(start: ParentNode, visit: (root: ParentNode) => void) {
  visit(start);
  if (start instanceof Element && start.shadowRoot) walkRoots(start.shadowRoot, visit);
  for (const node of start.querySelectorAll<Element>("*")) {
    if (node.shadowRoot) walkRoots(node.shadowRoot, visit);
  }
}

function findInModule(host: HTMLElement, selector: string): Element | null {
  let found: Element | null = null;
  walkRoots(host, (root) => {
    if (!found) found = root.querySelector(selector);
  });
  return found;
}

function closeResultsPopup(host: HTMLElement) {
  const shell = findInModule(host, '[class*="popUpMode"]');
  shell?.querySelector<HTMLButtonElement>('button[class*="closeButton"]')?.click();
}

function openedOwners(host: HTMLElement): Element[] {
  const owners: Element[] = [];
  walkRoots(host, (root) => {
    for (const node of root.querySelectorAll<Element>('[class*="__opened"]')) {
      if (elementClass(node).includes("__isOpened")) continue;
      const owner = node.closest<Element>('[class*="__container"]') ?? node;
      if (!owners.includes(owner)) owners.push(owner);
    }
  });
  return owners;
}

function isPopupBackdrop(node: Element): boolean {
  const name = elementClass(node);
  if (/SLT-Popup-[\w-]+__(container|wrapper|popup)$/.test(name)) return true;
  const parent = node.parentElement;
  return name === "" && parent !== null && /SLT-Popup-[\w-]+__popup$/.test(elementClass(parent));
}

function dismissSearchOverlay(event: PointerEvent, host: HTMLElement) {
  if (!event.isTrusted || event.button !== 0) return;
  const path = event.composedPath();
  const names = path.map((node) => elementClass(node));
  const has = (part: string) => names.some((name) => name.includes(part));

  if (has("popUpMode") && !has("searchFormWrap") && !has("resultsWrapper") && !has("closeButton")) {
    event.preventDefault();
    event.stopPropagation();
    closeResultsPopup(host);
    return;
  }

  const shell = findInModule(host, '[class*="popUpMode"]');
  if (shell && !has("searchFormWrap") && !has("resultsWrapper") && !has("closeButton")) {
    event.preventDefault();
    event.stopPropagation();
    closeResultsPopup(host);
    return;
  }

  const actual = path.find((node): node is Element => node instanceof Element);
  if (actual && isPopupBackdrop(actual)) {
    event.preventDefault();
    event.stopPropagation();
    document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window }));
    return;
  }

  const owners = openedOwners(host);
  if (owners.length === 0) return;
  const inside = path.some(
    (node) => node instanceof Node && owners.some((owner) => owner === node || owner.contains(node)),
  );
  if (!inside) {
    document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window }));
  }
}

function scrollTopFrom(x?: number | ScrollToOptions, y?: number): number {
  if (typeof x === "number") return y ?? 0;
  return x?.top ?? 0;
}

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

    let allowScroll = window.location.hash.length > 1;
    const originalScrollTo = window.scrollTo.bind(window);
    const originalFocus = HTMLElement.prototype.focus;
    const originalIntoView = Element.prototype.scrollIntoView;

    window.scrollTo = ((x?: number | ScrollToOptions, y?: number) => {
      if (!allowScroll && scrollTopFrom(x, y) > 2) return;
      if (typeof x === "number") originalScrollTo(x, y ?? 0);
      else if (x) originalScrollTo(x);
      else originalScrollTo(0, 0);
    }) as typeof window.scrollTo;

    HTMLElement.prototype.focus = function focusWithoutScroll(options?: FocusOptions) {
      const root = this.getRootNode();
      const insideModule = host.contains(this) || (root instanceof ShadowRoot && host.contains(root.host));
      if (!allowScroll && insideModule) {
        originalFocus.call(this, { ...options, preventScroll: true });
        return;
      }
      originalFocus.call(this, options);
    };

    Element.prototype.scrollIntoView = function scrollIntoViewGuarded(arg?: boolean | ScrollIntoViewOptions) {
      if (!allowScroll) return;
      originalIntoView.call(this, arg);
    };

    const snapToTop = () => {
      if (!allowScroll && window.scrollY > 1) originalScrollTo(0, 0);
    };

    const releaseScroll = () => {
      allowScroll = true;
    };

    const releaseFromUser = (event: Event) => {
      if (event.isTrusted) releaseScroll();
    };

    const onPointerDown = (event: PointerEvent) => {
      dismissSearchOverlay(event, host);
      if (event.isTrusted) releaseScroll();
    };

    window.addEventListener("scroll", snapToTop, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("wheel", releaseFromUser, { passive: true });
    window.addEventListener("touchmove", releaseFromUser, { passive: true });
    window.addEventListener("keydown", releaseFromUser);

    const releaseTimer = window.setTimeout(releaseScroll, 5000);

    return () => {
      observer.disconnect();
      window.clearTimeout(slow);
      window.clearTimeout(releaseTimer);
      window.scrollTo = originalScrollTo;
      HTMLElement.prototype.focus = originalFocus;
      Element.prototype.scrollIntoView = originalIntoView;
      window.removeEventListener("scroll", snapToTop);
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("wheel", releaseFromUser);
      window.removeEventListener("touchmove", releaseFromUser);
      window.removeEventListener("keydown", releaseFromUser);
    };
  }, []);

  return (
    <div className="panel relative overflow-visible rounded-3xl p-3 sm:p-5">
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