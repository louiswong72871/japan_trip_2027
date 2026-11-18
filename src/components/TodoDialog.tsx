import type { KeyboardEvent } from "react";
import type { TodoItem } from "../data/todos";
import { Button } from "./Button";
import { ModalDialog } from "./ModalDialog";

export function TodoDialog({
  open,
  items,
  draft,
  onClose,
  onToggle,
  onDraftChange,
  onAdd,
}: {
  open: boolean;
  items: TodoItem[];
  draft: string;
  onClose: () => void;
  onToggle: (id: string) => void;
  onDraftChange: (value: string) => void;
  onAdd: () => void;
}) {
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onAdd();
    }
  };

  return (
    <ModalDialog open={open} title="待辦" onClose={onClose} widthClass="w-[min(30rem,92vw)]">
      <ul className="flex max-h-[50vh] flex-col gap-1 overflow-auto">
        {items.map((item) => (
          <li key={item.id}>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 hover:bg-muted">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => onToggle(item.id)}
                className="mt-1 size-4 shrink-0 cursor-pointer accent-primary"
              />
              <span className={`text-sm ${item.done ? "text-muted-fg line-through" : "text-fg"}`}>
                {item.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="新增待辦"
          aria-label="新增待辦"
          className="min-h-11 min-w-0 flex-1 rounded-[var(--radius-sm)] border-0 bg-muted px-3 text-sm text-fg"
        />
        <Button variant="primary" onClick={onAdd}>
          新增
        </Button>
      </div>
    </ModalDialog>
  );
}
