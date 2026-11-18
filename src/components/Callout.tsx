import type { ReactNode } from "react";

export function Callout({
  lead,
  children,
}: {
  lead: string;
  children: ReactNode;
}) {
  return (
    <aside
      className="rounded-[var(--radius)] bg-warning-bg px-5 py-4 text-sm text-warning-fg"
      role="note"
    >
      <p className="font-medium">{lead}</p>
      <div className="mt-1 text-pretty">{children}</div>
    </aside>
  );
}
