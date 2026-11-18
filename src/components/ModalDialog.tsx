import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react";
import { Button } from "./Button";

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
  const titleId = useId();
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) {
      return;
    }
    if (open && !node.open) {
      lastFocus.current = document.activeElement as HTMLElement | null;
      node.showModal();
    }
    if (!open && node.open) {
      node.close();
    }
  }, [open]);

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) {
      return;
    }
    const onDialogClose = () => {
      onClose();
      lastFocus.current?.focus();
    };
    node.addEventListener("close", onDialogClose);
    return () => node.removeEventListener("close", onDialogClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className={`fixed inset-0 m-auto max-h-[85vh] ${widthClass} overflow-hidden rounded-[var(--radius)] border-0 bg-card p-0 text-card-fg shadow-[var(--shadow)]`}
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
