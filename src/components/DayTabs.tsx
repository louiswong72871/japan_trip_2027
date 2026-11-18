import { useEffect, useRef, type KeyboardEvent } from "react";
import { days, type DayId } from "../data/pages";
import { dayIcons } from "./dayIcons";

export function DayTabs({
  value,
  onChange,
}: {
  value: DayId;
  onChange: (id: DayId) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const selected = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!list || !selected) {
      return;
    }
    const listRect = list.getBoundingClientRect();
    const selectedRect = selected.getBoundingClientRect();
    const left =
      list.scrollLeft +
      (selectedRect.left - listRect.left) -
      (listRect.width - selectedRect.width) / 2;
    list.scrollTo({
      left: Math.max(0, left),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, [value]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = days.findIndex((day) => day.id === value);
    if (index < 0) {
      return;
    }
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % days.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + days.length) % days.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = days.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    onChange(days[next].id);
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[next]?.focus();
  };

  return (
    <div
      ref={listRef}
      id="daily-tabs"
      role="tablist"
      aria-label="每日行程"
      onKeyDown={onKeyDown}
      className="tab-scroller flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden bg-bg py-2"
    >
      {days.map((day) => {
        const selected = value === day.id;
        const Icon = dayIcons[day.id];
        return (
          <button
            key={day.id}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`panel-${day.id}`}
            id={`tab-${day.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(day.id)}
            className={`inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 border-b-2 bg-transparent px-4 text-sm whitespace-nowrap ${
              selected
                ? "border-accent font-medium text-fg"
                : "border-transparent font-normal text-muted-fg"
            }`}
          >
            <Icon />
            {day.label}
          </button>
        );
      })}
    </div>
  );
}
