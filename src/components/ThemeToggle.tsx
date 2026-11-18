import { useTheme } from "../hooks/useTheme";
import { IconMoon, IconSun } from "./icons";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "淺色" : "深色";
  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex size-11 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] bg-muted text-fg transition-colors duration-200 hover:bg-secondary"
      aria-label={`切換至${next}模式`}
    >
      {theme === "dark" ? <IconSun /> : <IconMoon />}
    </button>
  );
}
