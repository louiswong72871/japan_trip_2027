import type { ReactNode } from "react";

export function TimeList({
  intro,
  times,
  note,
}: {
  intro?: ReactNode;
  times: ReactNode[];
  note?: ReactNode;
}) {
  return (
    <div className="text-base">
      {intro ? <div className="text-pretty text-fg">{intro}</div> : null}
      <ul className={`m-0 list-none space-y-1 p-0 ${intro ? "mt-1.5" : ""}`}>
        {times.map((item, index) => (
          <li
            key={index}
            className="relative ps-3.5 text-pretty text-fg before:absolute before:top-[0.7em] before:left-0 before:size-1.5 before:rounded-full before:bg-fg"
          >
            <span className="font-medium tabular-nums tracking-tight">{item}</span>
          </li>
        ))}
      </ul>
      {note ? <p className="mt-1.5 text-pretty text-muted-fg">{note}</p> : null}
    </div>
  );
}
