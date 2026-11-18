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
      className="rounded-[var(--radius)] border border-border bg-card px-4 py-6 sm:px-6"
    >
      <h2 className="font-serif text-xl font-semibold text-balance text-fg sm:text-2xl">
        {day.heading}
      </h2>
      <div className="mt-4 space-y-6">{children}</div>
    </article>
  );
}
