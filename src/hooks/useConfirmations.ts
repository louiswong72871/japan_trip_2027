import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CONFIRM_STORAGE_KEY,
  confirmationById,
  pendingBadge,
  readConfirmations,
  type ConfirmationItem,
  type ConfirmStatus,
  type StoredConfirmation,
} from "../data/confirmations";

export type ResolvedConfirmation = {
  item: ConfirmationItem;
  status: ConfirmStatus;
  note: string;
  isOverride: boolean;
  badge: string;
};

function persist(map: Record<string, StoredConfirmation>) {
  try {
    window.localStorage.setItem(CONFIRM_STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

function resolve(
  item: ConfirmationItem,
  stored: Record<string, StoredConfirmation>,
): ResolvedConfirmation {
  const override = stored[item.id];
  const status = override?.status ?? item.defaultStatus;
  const note = override?.note ?? "";
  const isDefaultConfirmed = item.defaultStatus === "confirmed" && !override;
  let badge: string;
  if (status === "confirmed") {
    badge = isDefaultConfirmed ? "已核實" : "已確認";
  } else {
    badge = pendingBadge(item.pendingKind);
  }
  return {
    item,
    status,
    note,
    isOverride: Boolean(override),
    badge,
  };
}

type ConfirmationsContextValue = {
  get: (id: string) => ResolvedConfirmation;
  setStatus: (id: string, status: ConfirmStatus) => void;
  setNote: (id: string, note: string) => void;
  confirm: (id: string, note?: string) => void;
  revert: (id: string) => void;
};

const ConfirmationsContext = createContext<ConfirmationsContextValue | null>(
  null,
);

export function ConfirmationsProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<Record<string, StoredConfirmation>>(
    readConfirmations,
  );

  const update = useCallback(
    (id: string, next: StoredConfirmation | null) => {
      setStored((current) => {
        const copy = { ...current };
        if (next === null) {
          delete copy[id];
        } else {
          copy[id] = next;
        }
        persist(copy);
        return copy;
      });
    },
    [],
  );

  const value = useMemo<ConfirmationsContextValue>(() => {
    return {
      get: (id: string) => {
        const item = confirmationById[id];
        if (!item) {
          throw new Error(`Unknown confirmation id: ${id}`);
        }
        return resolve(item, stored);
      },
      setStatus: (id: string, status: ConfirmStatus) => {
        const item = confirmationById[id];
        const current = stored[id];
        const note = current?.note ?? "";
        if (status === item.defaultStatus && note === "") {
          update(id, null);
          return;
        }
        update(id, { status, note });
      },
      setNote: (id: string, note: string) => {
        const item = confirmationById[id];
        const current = resolve(item, stored);
        const trimmed = note.trim();
        if (current.status === item.defaultStatus && trimmed === "") {
          update(id, null);
          return;
        }
        update(id, { status: current.status, note: trimmed });
      },
      confirm: (id: string, note?: string) => {
        const current = stored[id];
        const nextNote = (note ?? current?.note ?? "").trim();
        update(id, { status: "confirmed", note: nextNote });
      },
      revert: (id: string) => {
        const item = confirmationById[id];
        const current = stored[id];
        const note = current?.note ?? "";
        if (item.defaultStatus === "pending" && note === "") {
          update(id, null);
          return;
        }
        update(id, { status: "pending", note });
      },
    };
  }, [stored, update]);

  return createElement(ConfirmationsContext.Provider, { value }, children);
}

export function useConfirmations() {
  const value = useContext(ConfirmationsContext);
  if (!value) {
    throw new Error("useConfirmations must be used within ConfirmationsProvider");
  }
  return value;
}

export function useConfirmation(id: string) {
  const api = useConfirmations();
  return { ...api.get(id), ...api };
}
