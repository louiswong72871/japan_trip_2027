import { useId, useState, type ReactNode } from "react";
import { Button } from "./Button";

export function Alternatives({
  label = "當日備選",
  children,
}: {
  label?: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-6">
      <Button
        variant="secondary"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="aria-expanded:border-fg aria-expanded:bg-muted"
      >
        {open ? "收起備選" : label}
      </Button>
      {open ? (
        <div
          id={panelId}
          className="mt-4 rounded-[var(--radius)] border border-border bg-card p-4 sm:p-6"
        >
          <div className="space-y-4">{children}</div>
        </div>
      ) : null}
    </div>
  );
}
