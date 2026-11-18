import { useCallback, useEffect, useState } from "react";
import { BackToTop } from "./components/BackToTop";
import { Button } from "./components/Button";
import { DayPager } from "./components/DayPager";
import { DayTabs } from "./components/DayTabs";
import { GearDialog } from "./components/GearDialog";
import { Hero } from "./components/Hero";
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

function AppShell() {
  const [page, setPage] = useState<DayId>(readHash);
  const [todoOpen, setTodoOpen] = useState(false);
  const [gearOpen, setGearOpen] = useState(false);
  const { todos, draft, setDraft, addTodo, toggleTodo } = useTodos();
  const DayView = dayViews[page];

  const openPage = useCallback((id: DayId) => {
    setPage(id);
    const hash = `#${id}`;
    if (window.location.hash !== hash) {
      window.history.pushState({ day: id }, "", hash);
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tabs = document.getElementById("daily-tabs");
    if (tabs) {
      tabs.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    }
  }, []);

  useEffect(() => {
    const onHash = () => setPage(readHash());
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onHash);
    };
  }, []);

  const current = days.find((day) => day.id === page) ?? days[0];

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <a
        href="#daily-tabs"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-card focus:px-3 focus:py-2"
      >
        跳至每日行程
      </a>
      <Hero />
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-2 px-6 pt-6 sm:px-8">
        <Button variant="primary" onClick={() => setTodoOpen(true)}>
          待辦
        </Button>
        <Button variant="secondary" onClick={() => setGearOpen(true)}>
          衣著與備案
        </Button>
        <span className="ms-auto">
          <ThemeToggle />
        </span>
      </div>
      <div className="sticky top-0 z-20 mt-4 bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <DayTabs value={page} onChange={openPage} />
        </div>
      </div>
      <main className="mx-auto max-w-3xl px-6 py-8 sm:px-8">
        <p className="sr-only">{current.label}</p>
        <DayView />
        <DayPager page={page} onChange={openPage} />
        <p className="mt-10 text-xs text-muted-fg">
          此為行程計劃的視覺預覽，尚未公開部署。尚未下訂或待確認的項目會標示狀態，可在本機註記，不會代為購票或改訂。規劃原稿仍以畫布頁為準。
        </p>
      </main>
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
  );
}

export default function App() {
  return (
    <ConfirmationsProvider>
      <AppShell />
    </ConfirmationsProvider>
  );
}
