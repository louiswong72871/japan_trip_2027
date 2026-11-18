import type { RefLink } from "../data/refs";
import { TextLink } from "./TextLink";

export function SourceList({ links }: { links: RefLink[] }) {
  return (
    <section className="mt-6" aria-labelledby="sources-heading">
      <h3 id="sources-heading" className="font-serif text-lg font-semibold text-fg">
        參考來源
      </h3>
      <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-base">
        {links.map((link) => (
          <li key={link.href + link.title} className="ps-1">
            <TextLink href={link.href}>{link.title}</TextLink>
            <span className="text-muted-fg">
              {" "}
              · {link.site} · {link.date}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
