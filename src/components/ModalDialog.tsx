import { useEffect, useId, useRef, type ReactNode } from "react";
import { gsap, motionDuration, prefersReducedMotion, useGSAP } from "../motion/gsap";
import { Button } from "./Button";

function setDialogFade(node: HTMLDialogElement, value: number) {
  node.style.setProperty("--dialog-fade", String(value));
}

function readDialogFade(node: HTMLDialogElement): number {
  const raw = node.style.getPropertyValue("--dialog-fade");
  const value = Number(raw);
  return raw !== "" && Number.isFinite(value) ? value : 1;
}

function clearDialogMotion(node: HTMLDialogElement) {
  gsap.set(node, { clearProps: "opacity,transform" });
  setDialogFade(node, 1);
}

export function ModalDialog({
  open,
  title,
  onClose,
  children,
  widthClass = "w-[min(32rem,92vw)]",
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  widthClass?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const titleId = useId();
  const lastFocus = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const node = dialogRef.current;
    if (!node) {
      return;
    }
    timelineRef.current?.kill();
    timelineRef.current = null;

    if (open) {
      if (!node.open) {
        lastFocus.current = document.activeElement as HTMLElement | null;
        node.showModal();
      }
      if (prefersReducedMotion()) {
        clearDialogMotion(node);
        return;
      }
      const fade = { value: 0 };
      setDialogFade(node, 0);
      const timeline = gsap.timeline();
      timeline.fromTo(
        node,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: motionDuration.modalIn,
          ease: "power2.out",
          clearProps: "opacity,transform",
        },
        0,
      );
      timeline.to(
        fade,
        {
          value: 1,
          duration: motionDuration.modalIn,
          ease: "power2.out",
          onUpdate: () => setDialogFade(node, fade.value),
        },
        0,
      );
      timelineRef.current = timeline;
      return;
    }

    if (!node.open) {
      clearDialogMotion(node);
      return;
    }

    if (prefersReducedMotion()) {
      clearDialogMotion(node);
      node.close();
      return;
    }

    const fade = { value: readDialogFade(node) };
    const timeline = gsap.timeline({
      onComplete: () => {
        if (node.open) {
          node.close();
        }
        clearDialogMotion(node);
      },
    });
    timeline.to(
      node,
      {
        opacity: 0,
        y: 6,
        duration: motionDuration.modalOut,
        ease: "power2.in",
      },
      0,
    );
    timeline.to(
      fade,
      {
        value: 0,
        duration: motionDuration.modalOut,
        ease: "power2.in",
        onUpdate: () => setDialogFade(node, fade.value),
      },
      0,
    );
    timelineRef.current = timeline;
  }, { dependencies: [open], scope: dialogRef });

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) {
      return;
    }
    const onCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    const onDialogClose = () => {
      onClose();
      lastFocus.current?.focus();
    };
    node.addEventListener("cancel", onCancel);
    node.addEventListener("close", onDialogClose);
    return () => {
      node.removeEventListener("cancel", onCancel);
      node.removeEventListener("close", onDialogClose);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className={`fixed inset-0 z-50 m-auto h-fit max-h-[85vh] ${widthClass} overflow-hidden rounded-[var(--radius)] border border-border bg-card p-0 text-card-fg shadow-[var(--shadow)]`}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[85vh] flex-col">
        <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-2 sm:px-6">
          <h2 id={titleId} className="font-serif text-lg font-semibold">
            {title}
          </h2>
          <Button variant="ghost" onClick={onClose}>
            關閉
          </Button>
        </div>
        <div className="overflow-auto px-5 pt-2 pb-6 sm:px-6">{children}</div>
      </div>
    </dialog>
  );
}
