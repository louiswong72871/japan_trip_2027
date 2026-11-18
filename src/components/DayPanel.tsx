import { useRef, type ReactNode } from "react";
import { dayPhotos } from "../data/dayPhotos";
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

  const photo = dayPhotos[day.id];

  return (
    <article
      ref={panelRef}
      role="tabpanel"
      id={`panel-${day.id}`}
      aria-labelledby={`tab-${day.id}`}
    >
      <header className="relative">
        <figure className="relative overflow-hidden">
          <picture>
            <source srcSet={photo.srcSet} type="image/webp" />
            <img
              src={photo.src}
              alt={photo.alt}
              width={960}
              height={640}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-[min(22rem,52vw)] w-full object-cover sm:h-[min(26rem,38vw)]"
              style={
                photo.objectPosition
                  ? { objectPosition: photo.objectPosition }
                  : undefined
              }
            />
          </picture>
          <div
            className="pointer-events-none absolute inset-0 bg-black/25"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-3/4 bg-gradient-to-b from-black/80 via-black/45 to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 top-0 z-10">
            <h2
              data-day-heading
              className="mx-auto max-w-5xl px-5 pt-6 text-white sm:px-8 sm:pt-8"
              style={{
                textShadow: "0 1px 2px rgba(0,0,0,0.8), 0 2px 16px rgba(0,0,0,0.45)",
              }}
            >
              <span className="sr-only">{day.heading}</span>
              <span aria-hidden="true" className="block">
                <span className="block font-sans text-sm font-medium tracking-[0.18em] text-white/90">
                  DAY {meta.number}
                </span>
                <span className="mt-1.5 flex flex-wrap items-end gap-x-3 gap-y-2">
                  <span className="font-serif text-5xl leading-none font-semibold tracking-[0.04em] sm:text-6xl">
                    {meta.latinDate}
                  </span>
                  <span className="mb-1 inline-flex min-h-8 items-center rounded-full bg-accent px-3 text-sm font-medium tracking-[0.12em] text-on-accent shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
                    {meta.name}
                  </span>
                </span>
              </span>
            </h2>
          </div>
          <figcaption className="absolute right-5 bottom-3 z-10 max-w-[min(100%-2.5rem,24rem)] text-right text-xs text-white/90 sm:right-8">
            <a
              href={photo.href}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-white/55 underline-offset-2"
            >
              照片：{photo.credit} · {photo.license}
            </a>
          </figcaption>
        </figure>
      </header>
      <div className="mx-auto max-w-5xl space-y-5 px-5 pt-6 sm:px-8 sm:pt-8">
        <DayTodos dayId={day.id} />
        {children}
      </div>
    </article>
  );
}
