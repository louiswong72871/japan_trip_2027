import { useState, type KeyboardEvent } from "react";
import type { DayId } from "../data/pages";
import { useTodos } from "../hooks/useTodos";
import { Button } from "./Button";
import { StatusBadge } from "./StatusBadge";

export function DayTodos({ dayId }: { dayId: DayId }) {
  const { todosForDay, addTodo, toggleTodo } = useTodos();
  const items = todosForDay(dayId);
  const [draft, setDraft] = useState("");

  const submit = () => {
    addTodo(dayId, draft);
    setDraft("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    }
  };

  return (
    <section aria-labelledby={`todos-${dayId}`}>
      <h3 id={`todos-${dayId}`} className="text-base font-medium text-fg">
        待辦
      </h3>
      {items.length > 0 ? (
        <ul className="mt-2 divide-y divide-border border-y border-border">
          {items.map((item) => (
            <li key={item.id} className="py-2">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleTodo(item.id)}
                  className="mt-1 size-4 shrink-0 cursor-pointer accent-fg"
                />
                <span className="min-w-0">
                  <StatusBadge tone={item.done ? "confirmed" : "pending"}>
                    {item.done ? "已完成" : "待確認"}
                  </StatusBadge>
                  <span
                    className={`mt-1 block text-base ${
                      item.done ? "text-muted-fg line-through" : "text-fg"
                    }`}
                  >
                    {item.text}
                  </span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-base text-muted-fg">這天還沒有待辦。</p>
      )}
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="新增這天的待辦"
          aria-label="新增這天的待辦"
          className="min-h-11 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-border bg-card px-3 text-base text-fg"
        />
        <Button variant="primary" onClick={submit}>
          新增
        </Button>
      </div>
    </section>
  );
}
