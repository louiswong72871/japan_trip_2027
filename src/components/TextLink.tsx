import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export function TextLink({ href, children, className = "", ...props }: Props) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={`cursor-pointer text-accent-text underline decoration-accent-text/30 underline-offset-4 ${className}`}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...props}
    >
      {children}
      {external ? <span className="sr-only">（另開新分頁）</span> : null}
    </a>
  );
}
