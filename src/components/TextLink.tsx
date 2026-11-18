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
      className={`cursor-pointer text-primary underline decoration-primary/30 underline-offset-4 transition-colors duration-200 hover:decoration-primary ${className}`}
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
