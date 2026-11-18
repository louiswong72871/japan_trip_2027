type Tone = "pending" | "confirmed" | "info";

const toneClass: Record<Tone, string> = {
  pending: "border-warning-border bg-warning-bg text-warning-fg",
  confirmed: "border-success-border bg-success-bg text-success-fg",
  info: "border-border bg-card text-muted-fg",
};

export function StatusBadge({
  tone,
  children,
}: {
  tone: Tone;
  children: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-[4px] border px-2 py-0.5 text-xs font-medium ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}
