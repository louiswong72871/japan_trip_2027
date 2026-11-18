import { days, type DayId } from "../data/pages";
import { Button } from "./Button";

export function DayPager({
  page,
  onChange,
}: {
  page: DayId;
  onChange: (id: DayId) => void;
}) {
  const index = days.findIndex((entry) => entry.id === page);
  const prev = index > 0 ? days[index - 1] : null;
  const next = index >= 0 && index < days.length - 1 ? days[index + 1] : null;

  return (
    <div className="mt-6 flex flex-wrap justify-between gap-2">
      {prev ? (
        <Button variant="secondary" onClick={() => onChange(prev.id)}>
          上一頁　{prev.label}
        </Button>
      ) : (
        <span />
      )}
      {next ? (
        <Button variant="secondary" onClick={() => onChange(next.id)}>
          下一頁　{next.label}
        </Button>
      ) : (
        <span />
      )}
    </div>
  );
}
