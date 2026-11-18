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
        const active = index === 0;
        return (
          <li
            key={`${item.title}-${item.description}`}
            data-timeline-node
            className="flex items-stretch gap-4"
          >
            <div className="relative flex w-3 shrink-0 justify-center">
              {items.length > 1 ? (
                <span
                  className={`absolute left-1/2 w-0.5 -translate-x-1/2 bg-accent ${
                    index === 0 ? "top-3 bottom-0" : last ? "top-0 h-3" : "inset-y-0"
                  }`}
                  aria-hidden="true"
                />
              ) : null}
              <span
                className={`relative z-1 mt-1.5 size-3 shrink-0 rounded-full border-2 border-accent ${
                  active ? "bg-accent" : "bg-card"
                }`}
                aria-hidden="true"
              />
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
