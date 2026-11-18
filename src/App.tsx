import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BackToTop } from "./components/BackToTop";
import { Button } from "./components/Button";
import { DayPager } from "./components/DayPager";
import { DayTabs } from "./components/DayTabs";
import { GearDialog } from "./components/GearDialog";
import { IntroWipe } from "./components/IntroWipe";
import { ThemeToggle } from "./components/ThemeToggle";
import { DEFAULT_DAY, days, isDayId, type DayId } from "./data/pages";
import { dayViews } from "./days";
import { ConfirmationsProvider } from "./hooks/useConfirmations";
import { TodosProvider } from "./hooks/useTodos";

function readHash(): DayId {
  if (typeof window === "undefined") {
    return DEFAULT_DAY;
  }
  const id = window.location.hash.replace(/^#/, "");
  return isDayId(id) ? id : DEFAULT_DAY;
}

function scrollDayLayoutToTop() {
  const layout = document.querySelector<HTMLElement>("[data-day-layout]");
  if (!layout) {
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: layout.getBoundingClientRect().top + window.scrollY,
    behavior: reduce ? "auto" : "smooth",
  });
}

function AppShell() {
  const [page, setPage] = useState<DayId>(readHash);
  const [gearOpen, setGearOpen] = useState(false);
  const DayView = dayViews[page];
  const shouldScroll = useRef(false);
  const shellRef = useRef<HTMLDivElement>(null);

  const openPage = useCallback((id: DayId) => {
    shouldScroll.current = true;
    setPage(id);
    const hash = `#${id}`;
    if (window.location.hash !== hash) {
      window.history.pushState({ day: id }, "", hash);
    }
  }, []);

  useLayoutEffect(() => {
    if (!shouldScroll.current) {
      return;
    }
    shouldScroll.current = false;
    scrollDayLayoutToTop();
  }, [page]);

  useEffect(() => {
    const onHash = () => {
      shouldScroll.current = true;
      setPage(readHash());
    };
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onHash);
    };
  }, []);

  const current = days.find((day) => day.id === page) ?? days[0];
  const dayIndex = days.findIndex((day) => day.id === page);
  const chapterAlt = dayIndex % 2 === 1;

  return (
    <>
      <IntroWipe targetRef={shellRef} />
      <div ref={shellRef} className="min-h-dvh bg-bg text-fg">
        <a
          href="#daily-tabs"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-[var(--radius-sm)] focus:border focus:border-border focus:bg-card focus:px-3 focus:py-2 focus:text-fg"
        >
          跳至每日行程
        </a>
        <div data-day-layout className="flex min-h-dvh">
          <aside
            data-day-nav
            className="sticky top-0 z-20 flex h-dvh w-[4.75rem] shrink-0 flex-col border-r border-border bg-bg md:w-56"
          >
            <div className="hidden border-b border-border px-4 py-4 md:block">
              <p className="text-[0.65rem] font-medium tracking-[0.14em] text-muted-fg">
                仙台 · 藏王 · 東京
              </p>
              <h1 className="mt-1 font-serif text-base font-semibold text-pretty">
                2027仙台冬旅計劃（可修訂）
              </h1>
            </div>
            <h1 className="sr-only md:hidden">2027仙台冬旅計劃（可修訂）</h1>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <DayTabs value={page} onChange={openPage} />
            </div>
            <div className="flex flex-col items-stretch gap-2 border-t border-border p-2">
              <Button
                variant="secondary"
                aria-pressed={gearOpen}
                onClick={() => setGearOpen(true)}
                className="w-full px-2 md:px-4"
              >
                <span className="md:hidden">衣著</span>
                <span className="hidden md:inline">衣著與備案</span>
              </Button>
              <span className="flex justify-center md:justify-start">
                <ThemeToggle />
              </span>
            </div>
          </aside>
          <section className={`min-w-0 flex-1 ${chapterAlt ? "bg-muted" : "bg-bg"}`}>
            <main className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
              <p className="sr-only">{current.label}</p>
              <DayView />
              <DayPager page={page} onChange={openPage} />
              <p className="mt-10 text-xs text-muted-fg">
                此為行程計劃的視覺預覽，尚未公開部署。尚未下訂或待確認的項目會標示狀態，可在本機註記，不會代為購票或改訂。規劃原稿仍以畫布頁為準。
              </p>
            </main>
          </section>
        </div>
        <GearDialog open={gearOpen} onClose={() => setGearOpen(false)} />
        <BackToTop />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ConfirmationsProvider>
      <TodosProvider>
        <AppShell />
      </TodosProvider>
    </ConfirmationsProvider>
  );
}
