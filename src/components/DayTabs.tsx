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
    const top =
      list.scrollTop +
      (selectedRect.top - listRect.top) -
      (listRect.height - selectedRect.height) / 2;
    list.scrollTo({
      top: Math.max(0, top),
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
      aria-orientation="vertical"
      onKeyDown={onKeyDown}
      className="flex flex-col gap-1 bg-bg py-2"
    >
      {days.map((day) => {
        const selected = value === day.id;
        const Icon = dayIcons[day.id];
        const datePart = day.label.split(" ")[0] ?? day.label;
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
            className={`flex min-h-11 w-full cursor-pointer items-center gap-2 border-l-2 bg-transparent px-2 text-left text-sm md:px-3 ${
              selected
                ? "border-accent font-medium text-fg"
                : "border-transparent font-normal text-muted-fg"
            }`}
          >
            <Icon />
            <span className="md:hidden">{datePart}</span>
            <span className="hidden md:inline">{day.label}</span>
          </button>
        );
      })}
    </div>
  );
}
