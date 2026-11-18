import { useId, useState } from "react";
import { confirmationItems } from "../data/confirmations";
import { useConfirmations } from "../hooks/useConfirmations";
import { Button } from "./Button";
import { StatusBadge } from "./StatusBadge";

export function ConfirmableStatus({
  id,
  compact = false,
}: {
  id: string;
  compact?: boolean;
}) {
  const { get, confirm, revert, setNote } = useConfirmations();
  const resolved = get(id);
  const { item, status, note, badge } = resolved;
  const [draft, setDraft] = useState(note);
  const [editing, setEditing] = useState(false);
  const noteId = useId();
  const confirmed = status === "confirmed";

  const saveNote = () => {
    setNote(id, draft);
    setEditing(false);
  };

  return (
    <div className={compact ? "mt-2" : ""}>
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge tone={confirmed ? "confirmed" : "pending"}>{badge}</StatusBadge>
        {item.optional ? <StatusBadge tone="info">備選</StatusBadge> : null}
        <span className="text-sm font-medium text-fg">{item.label}</span>
      </div>
      {item.canvasNote ? (
        <p className="mt-1 text-sm text-muted-fg">{item.canvasNote}</p>
      ) : null}
      {note ? (
        <p className="mt-1 text-sm text-fg">
          <span className="text-muted-fg">確認備註：</span>
          {note}
        </p>
      ) : null}
      <div className="mt-2 flex flex-wrap gap-2">
        {confirmed ? (
          <Button variant="secondary" onClick={() => revert(id)}>
            改回待確認
          </Button>
        ) : (
          <Button variant="primary" onClick={() => confirm(id, draft || note)}>
            標為已確認
          </Button>
        )}
        <Button
          variant="secondary"
          aria-expanded={editing}
          aria-controls={noteId}
          onClick={() => {
            setDraft(note);
            setEditing((value) => !value);
          }}
        >
          {editing ? "取消備註" : note ? "改備註" : "確認備註"}
        </Button>
      </div>
      {editing ? (
        <div id={noteId} className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                saveNote();
              }
            }}
            placeholder="例如：已在官網下訂，或電郵已對過"
            aria-label={`${item.label}的確認備註`}
            maxLength={200}
            className="min-h-11 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-border bg-card px-3 text-sm text-fg"
          />
          <Button variant="secondary" onClick={saveNote}>
            儲存備註
          </Button>
        </div>
      ) : null}
      <p className="mt-1 text-xs text-muted-fg">
        只記在這部瀏覽器，不會更改真實訂單。
      </p>
    </div>
  );
}

export function DayStatusList({ ids }: { ids: string[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {ids.map((id) => (
        <div key={id} className="py-4">
          <ConfirmableStatus id={id} />
        </div>
      ))}
    </div>
  );
}

export function GapStatusList() {
  const items = confirmationItems.filter((item) => item.inGaps);
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <ConfirmableStatus key={item.id} id={item.id} />
      ))}
    </div>
  );
}
