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
  label = "建議",
  children,
  open,
  onToggle,
}: {
  label?: string;
  children?: ReactNode;
  open?: boolean;
  onToggle?: () => void;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const toggle = onToggle ?? (() => setInternalOpen((value) => !value));
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
      applyExpanded(panel, isOpen);
      return;
    }
    gsap.to(panel, {
      height: isOpen ? "auto" : 0,
      opacity: isOpen ? 1 : 0,
      duration: isOpen ? motionDuration.expand : motionDuration.collapse,
      ease: isOpen ? "power2.out" : "power2.in",
      overflow: "hidden",
      onComplete: () => {
        if (isOpen) {
          gsap.set(panel, { height: "auto", overflow: "visible" });
        }
      },
    });
  }, { dependencies: [isOpen], scope: panelRef });

  return (
    <div className="mt-5">
      <Button
        variant="secondary"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggle}
        className="aria-expanded:border-fg aria-expanded:bg-muted"
      >
        {isOpen ? "收起建議" : label}
      </Button>
      <div
        id={panelId}
        ref={panelRef}
        inert={!isOpen}
        aria-hidden={!isOpen}
        className="h-0 overflow-hidden opacity-0"
      >
        <div className="mt-3 rounded-[var(--radius)] border border-border bg-card p-4">
          <div className="space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function DaySchedule({
  timeline,
  alternatives,
  alternativesLabel = "建議",
}: {
  timeline: ReactNode;
  alternatives?: ReactNode;
  alternativesLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((value) => !value);

  if (!alternatives) {
    return <>{timeline}</>;
  }

  return (
    <>
      <Alternatives label={alternativesLabel} open={open} onToggle={toggle}>
        {alternatives}
      </Alternatives>
      {timeline}
      <Alternatives label={alternativesLabel} open={open} onToggle={toggle}>
        {alternatives}
      </Alternatives>
    </>
  );
}
