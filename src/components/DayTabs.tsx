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
  const hoverArmedRef = useRef(true);
  const [hoverId, setHoverId] = useState<DayId | null>(null);
  const highlightId = hoverId ?? value;

  useLayoutEffect(() => {
    const list = listRef.current;
    const selected = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    const scroller = list?.parentElement;
    if (!list || !selected || !scroller) {
      return;
    }
    const scrollerRect = scroller.getBoundingClientRect();
    const selectedRect = selected.getBoundingClientRect();
    const fullyVisible =
      selectedRect.top >= scrollerRect.top && selectedRect.bottom <= scrollerRect.bottom;
    if (fullyVisible) {
      return;
    }
    const top =
      scroller.scrollTop +
      (selectedRect.top - scrollerRect.top) -
      (scrollerRect.height - selectedRect.height) / 2;
    scroller.scrollTo({
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
    selectDay(days[next].id);
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[next]?.focus();
  };

  const moveHighlightTo = (id: DayId, item: HTMLElement) => {
    setHoverId(id);
    const slider = sliderRef.current;
    if (slider) {
      moveSliderTo(slider, item);
      slider.dataset.ready = "true";
    }
  };

  const onPointerEnterItem = (id: DayId) => (event: PointerEvent<HTMLButtonElement>) => {
    if (!hoverArmedRef.current) {
      return;
    }
    moveHighlightTo(id, event.currentTarget);
  };

  const onPointerMoveItem = (id: DayId) => (event: PointerEvent<HTMLButtonElement>) => {
    if (!hoverArmedRef.current) {
      hoverArmedRef.current = true;
    }
    moveHighlightTo(id, event.currentTarget);
  };

  const onPointerLeaveMenu = () => {
    hoverArmedRef.current = true;
    setHoverId(null);
  };

  const selectDay = (id: DayId) => {
    hoverArmedRef.current = false;
    setHoverId(null);
    onChange(id);
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
            onClick={() => selectDay(day.id)}
            onPointerEnter={onPointerEnterItem(day.id)}
            onPointerMove={onPointerMoveItem(day.id)}
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
