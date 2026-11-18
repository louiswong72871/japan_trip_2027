import type { ReactNode } from "react";
import type { DayPage } from "../data/pages";

export function DayPanel({
  day,
  children,
}: {
  day: DayPage;
  children: ReactNode;
}) {
  return (
    <article
      role="tabpanel"
      id={`panel-${day.id}`}
      aria-labelledby={`tab-${day.id}`}
      className="outline-none rounded-[var(--radius)] bg-muted/50 px-5 py-6 sm:px-6 sm:py-7"
    >
      <h2 className="font-serif text-xl font-semibold text-balance text-fg sm:text-2xl">
        {day.heading}
      </h2>
      <div className="mt-4 space-y-6">{children}</div>
    </article>
  );
}
