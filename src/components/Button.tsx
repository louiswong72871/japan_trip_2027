import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "accent";

const styles: Record<Variant, string> = {
  primary:
    "border border-accent bg-accent text-on-accent active:border-fg aria-pressed:border-fg",
  secondary:
    "border border-border bg-card text-fg active:border-fg active:bg-muted aria-pressed:border-fg aria-pressed:bg-muted",
  ghost:
    "border border-transparent bg-transparent text-fg active:border-border active:bg-muted aria-pressed:border-border aria-pressed:bg-muted",
  accent:
    "border border-accent bg-accent text-on-accent active:border-fg aria-pressed:border-fg",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({
  variant = "secondary",
  className = "",
  children,
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
