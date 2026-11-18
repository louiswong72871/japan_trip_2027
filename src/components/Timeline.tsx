import type { ReactNode } from "react";
import { TextLink } from "./TextLink";

export type TimelineEntry = {
  title: string;
  description: string;
  detail?: ReactNode;
  link?: { href: string; label: string };
};

export function Timeline({ items }: { items: TimelineEntry[] }) {
  return (
    <ol className="max-w-xl">
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <li
            key={`${item.title}-${item.description}`}
            className="flex items-stretch gap-4"
          >
            <div className="relative flex w-6 shrink-0 flex-col items-center">
              {last ? null : (
                <span
                  className="absolute top-6 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-secondary"
                  aria-hidden="true"
                />
              )}
              <span
                className="relative z-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted"
                aria-hidden="true"
              >
                <span className="size-2 rounded-full bg-primary" />
              </span>
            </div>
            <div className={`min-w-0 ${last ? "pb-0" : "pb-6"}`}>
              <h3 className="text-base font-medium text-fg">{item.title}</h3>
              <p className="mt-0.5 text-sm text-muted-fg">{item.description}</p>
              {item.detail ? (
                <div className="mt-2 text-sm text-pretty text-fg">{item.detail}</div>
              ) : null}
              {item.link ? (
                <p className="mt-2">
                  <TextLink href={item.link.href}>{item.link.label}</TextLink>
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
