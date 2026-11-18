import { useId, useRef, useState, type ReactNode } from "react";
import { gsap, motionDuration, prefersReducedMotion, useGSAP } from "../motion/gsap";
import { Button } from "./Button";

function applyExpanded(panel: HTMLElement, open: boolean) {
  gsap.set(panel, {
    height: open ? "auto" : 0,
    opacity: open ? 1 : 0,
    overflow: open ? "visible" : "hidden",
  });
}

export function Alternatives({
  label = "當日備選",
  children,
}: {
  label?: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);
  const panelId = useId();

  useGSAP(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }
    const instant = !readyRef.current || prefersReducedMotion();
    readyRef.current = true;
    gsap.killTweensOf(panel);
    if (instant) {
      applyExpanded(panel, open);
      return;
    }
    gsap.to(panel, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: open ? motionDuration.expand : motionDuration.collapse,
      ease: open ? "power2.out" : "power2.in",
      overflow: "hidden",
      onComplete: () => {
        if (open) {
          gsap.set(panel, { height: "auto", overflow: "visible" });
        }
      },
    });
  }, { dependencies: [open], scope: panelRef });

  return (
    <div className="mt-5">
      <Button
        variant="secondary"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="aria-expanded:border-fg aria-expanded:bg-muted"
      >
        {open ? "收起備選" : label}
      </Button>
      <div
        id={panelId}
        ref={panelRef}
        inert={!open}
        aria-hidden={!open}
        className="h-0 overflow-hidden opacity-0"
      >
        <div className="mt-3 rounded-[var(--radius)] border border-border bg-card p-4">
          <div className="space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
