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
      >
        {open ? "收起備選" : label}
      </Button>
      {open ? (
        <div id={panelId} className="mt-3 space-y-4">
          {children}
        </div>
      ) : null}
    </div>
  );
}
