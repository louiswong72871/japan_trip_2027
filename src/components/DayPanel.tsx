import { useRef, type ReactNode } from "react";
import { days, type DayPage } from "../data/pages";
import { gsap, useGSAP } from "../motion/gsap";
import { DayTodos } from "./DayTodos";

function chapterMeta(day: DayPage) {
  const index = days.findIndex((entry) => entry.id === day.id);
  const number = String(Math.max(index, 0) + 1).padStart(2, "0");
  const space = day.label.indexOf(" ");
  const datePart = space === -1 ? day.label : day.label.slice(0, space);
  const name = space === -1 ? day.heading : day.label.slice(space + 1);
  return {
    number,
    latinDate: datePart.replaceAll("/", "."),
    name,
  };
}

export function DayPanel({
  day,
  children,
}: {
  day: DayPage;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLElement>(null);
  const meta = chapterMeta(day);

  useGSAP(
    () => {
      const root = panelRef.current;
      if (!root) {
        return;
      }

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          allowMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduceMotion) {
            return;
          }

          const heading = root.querySelector("[data-day-heading]");
          const nodes = gsap.utils.toArray<HTMLElement>(
            "[data-timeline-node]",
            root,
          );
          const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

          if (heading) {
            timeline.fromTo(
              heading,
              { autoAlpha: 0, y: 8 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.3,
                clearProps: "opacity,visibility,transform",
              },
              0,
            );
          }

          if (nodes.length > 0) {
            timeline.fromTo(
              nodes,
              { autoAlpha: 0, y: 8 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.05,
                clearProps: "opacity,visibility,transform",
              },
              0.08,
            );
          }
        },
      );

      return () => {
        mm.revert();
      };
    },
    { scope: panelRef },
  );

  return (
    <article
      ref={panelRef}
      role="tabpanel"
      id={`panel-${day.id}`}
      aria-labelledby={`tab-${day.id}`}
    >
      <h2 data-day-heading className="text-fg">
        <span className="sr-only">{day.heading}</span>
        <span aria-hidden="true" className="block">
          <span className="block font-sans text-xs font-medium tracking-[0.2em] text-muted-fg">
            DAY {meta.number}
          </span>
          <span className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-2">
            <span className="font-serif text-5xl leading-none font-semibold tracking-[0.06em] sm:text-7xl">
              {meta.latinDate}
            </span>
            <span className="mb-1 inline-flex min-h-8 items-center rounded-full border border-fg px-3 text-xs font-medium tracking-[0.14em]">
              {meta.name}
            </span>
          </span>
        </span>
      </h2>
      <div className="mt-8 space-y-6">
        <DayTodos dayId={day.id} />
        {children}
      </div>
    </article>
  );
}
