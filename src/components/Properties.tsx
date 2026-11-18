import type { ReactNode } from "react";

export type PropertyItem = {
  label: string;
  value: ReactNode;
};

export function Properties({ items }: { items: PropertyItem[] }) {
  return (
    <dl className="space-y-3 overflow-hidden rounded-[var(--radius)] bg-card px-5 py-5 sm:px-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="grid gap-1 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4"
        >
          <dt className="text-sm font-medium text-muted-fg">{item.label}</dt>
          <dd className="min-w-0 text-sm text-pretty text-card-fg">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
