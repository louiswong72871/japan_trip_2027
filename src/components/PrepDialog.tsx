import { prepGroups } from "../data/prep";
import { usePrep } from "../hooks/usePrep";
import { ModalDialog } from "./ModalDialog";

export function PrepDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { isChecked, toggle } = usePrep();

  return (
    <ModalDialog
      open={open}
      title="出發準備"
      onClose={onClose}
      widthClass="w-[min(32rem,92vw)]"
    >
      <div className="flex flex-col gap-4">
        {prepGroups.map((group) => (
          <section key={group.id} aria-labelledby={`prep-${group.id}`}>
            <h3 id={`prep-${group.id}`} className="text-sm font-medium text-fg">
              {group.title}
            </h3>
            <ul className="mt-1 divide-y divide-border border-y border-border">
              {group.items.map((item) => {
                const done = isChecked(item.id);
                return (
                  <li key={item.id}>
                    <label className="flex min-h-11 cursor-pointer items-center gap-3 py-1.5">
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() => toggle(item.id)}
                        className="size-4 shrink-0 cursor-pointer accent-fg"
                      />
                      <span
                        className={`min-w-0 text-sm ${
                          done ? "text-muted-fg line-through" : "text-fg"
                        }`}
                      >
                        {item.label}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </ModalDialog>
  );
}
