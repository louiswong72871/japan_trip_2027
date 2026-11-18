type Tone = "pending" | "confirmed" | "info";

const toneClass: Record<Tone, string> = {
  pending: "bg-warning-bg text-warning-fg",
  confirmed: "bg-success-bg text-success-fg",
  info: "bg-muted text-muted-fg",
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
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}
