import { useCallback, useEffect, useState } from "react";
import { PREP_STORAGE_KEY, prepItemIds } from "../data/prep";

function readChecked(): Record<string, boolean> {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(PREP_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    const next: Record<string, boolean> = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (prepItemIds.includes(key) && typeof value === "boolean") {
        next[key] = value;
      }
    }
    return next;
  } catch {
    return {};
  }
}

export function usePrep() {
  const [checked, setChecked] = useState<Record<string, boolean>>(readChecked);

  useEffect(() => {
    try {
      window.localStorage.setItem(PREP_STORAGE_KEY, JSON.stringify(checked));
    } catch {
      /* ignore quota / private mode */
    }
  }, [checked]);

  const toggle = useCallback((id: string) => {
    setChecked((current) => ({ ...current, [id]: !current[id] }));
  }, []);

  const isChecked = useCallback(
    (id: string) => Boolean(checked[id]),
    [checked],
  );

  return { isChecked, toggle };
}
