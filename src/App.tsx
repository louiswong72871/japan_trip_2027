import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BackToTop } from "./components/BackToTop";
import { Button } from "./components/Button";
import { DayPager } from "./components/DayPager";
import { DayTabs } from "./components/DayTabs";
import { GearDialog } from "./components/GearDialog";
import { Hero } from "./components/Hero";
import { IntroWipe } from "./components/IntroWipe";
import { ThemeToggle } from "./components/ThemeToggle";
import { TodoDialog } from "./components/TodoDialog";
import { DEFAULT_DAY, days, isDayId, type DayId } from "./data/pages";
import { dayViews } from "./days";
import { ConfirmationsProvider } from "./hooks/useConfirmations";
import { useTodos } from "./hooks/useTodos";

function readHash(): DayId {
  if (typeof window === "undefined") {
    return DEFAULT_DAY;
  }
  const id = window.location.hash.replace(/^#/, "");
  return isDayId(id) ? id : DEFAULT_DAY;
}

function tabBarDocumentTop(bar: HTMLElement): number {
  const previous = bar.style.position;
  bar.style.position = "static";
  const top = bar.getBoundingClientRect().top + window.scrollY;
  bar.style.position = previous;
  return top;
}

function scrollTabBarToTop() {
  const bar = document.querySelector<HTMLElement>("[data-day-nav]");
  if (!bar) {
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: tabBarDocumentTop(bar),
    behavior: reduce ? "auto" : "smooth",
  });
}

function AppShell() {
  const [page, setPage] = useState<DayId>(readHash);
  const [todoOpen, setTodoOpen] = useState(false);
  const [gearOpen, setGearOpen] = useState(false);
  const { todos, draft, setDraft, addTodo, toggleTodo } = useTodos();
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
    scrollTabBarToTop();
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
      <Hero />
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-2 px-6 pt-6 sm:px-8">
        <Button
          variant="primary"
          aria-pressed={todoOpen}
          onClick={() => setTodoOpen(true)}
        >
          待辦
        </Button>
        <Button
          variant="secondary"
          aria-pressed={gearOpen}
          onClick={() => setGearOpen(true)}
        >
          衣著與備案
        </Button>
        <span className="ms-auto">
          <ThemeToggle />
        </span>
      </div>
      <div data-day-nav className="sticky top-0 z-20 mt-4 border-b border-border bg-bg">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <DayTabs value={page} onChange={openPage} />
        </div>
      </div>
      <section className={chapterAlt ? "bg-muted" : "bg-bg"}>
        <main className="mx-auto max-w-3xl px-6 py-10 sm:px-8 sm:py-12">
          <p className="sr-only">{current.label}</p>
          <DayView />
          <DayPager page={page} onChange={openPage} />
          <p className="mt-10 text-xs text-muted-fg">
            此為行程計劃的視覺預覽，尚未公開部署。尚未下訂或待確認的項目會標示狀態，可在本機註記，不會代為購票或改訂。規劃原稿仍以畫布頁為準。
          </p>
        </main>
      </section>
      <TodoDialog
        open={todoOpen}
        items={todos}
        draft={draft}
        onClose={() => setTodoOpen(false)}
        onToggle={toggleTodo}
        onDraftChange={setDraft}
        onAdd={addTodo}
      />
      <GearDialog open={gearOpen} onClose={() => setGearOpen(false)} />
      <BackToTop />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ConfirmationsProvider>
      <AppShell />
    </ConfirmationsProvider>
  );
}
