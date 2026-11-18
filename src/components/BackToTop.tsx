import { useEffect, useState } from "react";
import { IconArrowUp } from "./icons";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      className="fixed right-4 bottom-4 z-40 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] border border-border bg-card px-4 py-2 text-sm font-medium text-fg shadow-[var(--shadow)] active:border-fg"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
    >
      <IconArrowUp />
      回到最上
    </button>
  );
}
