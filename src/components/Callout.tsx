import type { ReactNode } from "react";

export function Callout({
  lead,
  children,
}: {
  lead: string;
  children: ReactNode;
}) {
  return (
    <aside className="callout px-4 py-3 text-base" role="note">
      <p className="font-medium">{lead}</p>
      <div className="mt-1.5 text-pretty">{children}</div>
    </aside>
  );
}
