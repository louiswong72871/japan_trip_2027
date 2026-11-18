import type { ReactNode } from "react";

export type PropertyItem = {
  label: string;
  value: ReactNode;
};

export function Properties({ items }: { items: PropertyItem[] }) {
  return (
    <dl className="overflow-hidden rounded-[var(--radius)] border border-border bg-card">
      {items.map((item) => (
        <div
          key={item.label}
          className="grid gap-1 border-b border-border px-4 py-4 last:border-b-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4 sm:px-6"
        >
          <dt className="text-sm font-medium text-muted-fg">{item.label}</dt>
          <dd className="min-w-0 text-sm text-pretty text-card-fg">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
