import { useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { days, type DayId } from "../data/pages";
import { dayIcons } from "./dayIcons";

function moveSliderTo(slider: HTMLElement, item: HTMLElement) {
  slider.style.transform = `translate(${item.offsetLeft}px, ${item.offsetTop}px)`;
  slider.style.width = `${item.offsetWidth}px`;
  slider.style.height = `${item.offsetHeight}px`;
}

export function DayTabs({
  value,
  onChange,
}: {
  value: DayId;
  onChange: (id: DayId) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLSpanElement>(null);
  const [hoverId, setHoverId] = useState<DayId | null>(null);
  const highlightId = hoverId ?? value;

  useLayoutEffect(() => {
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

  useLayoutEffect(() => {
    const list = listRef.current;
    const slider = sliderRef.current;
    if (!list || !slider) {
      return;
    }

    const sync = () => {
      const item = list.querySelector<HTMLElement>(`[data-day-tab="${highlightId}"]`);
      if (item) {
        moveSliderTo(slider, item);
        slider.dataset.ready = "true";
      }
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(list);
    for (const item of list.querySelectorAll("[data-day-tab]")) {
      observer.observe(item);
    }
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [highlightId]);

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

  const onPointerEnterItem = (id: DayId) => (event: PointerEvent<HTMLButtonElement>) => {
    setHoverId(id);
    const slider = sliderRef.current;
    if (slider) {
      moveSliderTo(slider, event.currentTarget);
      slider.dataset.ready = "true";
    }
  };

  const onPointerLeaveMenu = () => {
    setHoverId(null);
  };

  return (
    <div
      ref={listRef}
      id="daily-tabs"
      role="tablist"
      aria-label="每日行程"
      aria-orientation="vertical"
      onKeyDown={onKeyDown}
      onPointerLeave={onPointerLeaveMenu}
      className="day-tab-list relative flex flex-col gap-1 p-1"
    >
      <span ref={sliderRef} className="day-tab-slider" aria-hidden="true" />
      {days.map((day) => {
        const selected = value === day.id;
        const highlighted = highlightId === day.id;
        const Icon = dayIcons[day.id];
        const datePart = day.label.split(" ")[0] ?? day.label;
        return (
          <button
            key={day.id}
            type="button"
            role="tab"
            data-day-tab={day.id}
            aria-selected={selected}
            aria-controls={`panel-${day.id}`}
            id={`tab-${day.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(day.id)}
            onPointerEnter={onPointerEnterItem(day.id)}
            className={`relative z-1 flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-full bg-transparent px-2 text-left text-sm md:px-3 ${
              highlighted ? "font-medium text-on-accent" : "font-normal text-muted-fg"
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
