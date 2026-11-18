import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function TabIcon({ children, title, ...props }: IconProps & { children?: ReactNode }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function IconArrive(props: IconProps) {
  return (
    <TabIcon {...props}>
      <rect x="4" y="8" width="16" height="9" rx="1" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M8 19v2M16 19v2M8 12h2M14 12h2" />
    </TabIcon>
  );
}

export function IconGinzan(props: IconProps) {
  return (
    <TabIcon {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V10l7-7 7 7v11" />
      <path d="M9 21v-6h6v6" />
    </TabIcon>
  );
}

export function IconFox(props: IconProps) {
  return (
    <TabIcon {...props}>
      <circle cx="8" cy="9" r="1.5" />
      <circle cx="16" cy="9" r="1.5" />
      <circle cx="7" cy="15" r="1.5" />
      <circle cx="17" cy="15" r="1.5" />
      <circle cx="12" cy="16.5" r="2.5" />
    </TabIcon>
  );
}

export function IconJuhyo(props: IconProps) {
  return (
    <TabIcon {...props}>
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />
    </TabIcon>
  );
}

export function IconOyster(props: IconProps) {
  return (
    <TabIcon {...props}>
      <path d="M12 3c-3 4-7 6-7 11a7 7 0 0 0 14 0c0-5-4-7-7-11z" />
      <path d="M9 14c.5 2 1.5 3 3 3s2.5-1 3-3" />
    </TabIcon>
  );
}

export function IconTokyo(props: IconProps) {
  return (
    <TabIcon {...props}>
      <path d="M3 10h18" />
      <path d="M5 10V6h14v4" />
      <path d="M7 10v7M17 10v7" />
      <path d="M3 17h18" />
      <path d="M8 21h8" />
    </TabIcon>
  );
}

export function IconHarry(props: IconProps) {
  return (
    <TabIcon {...props}>
      <path d="M13 2L4 14h7l-1 8 10-14h-7z" />
    </TabIcon>
  );
}

export function IconKawagoe(props: IconProps) {
  return (
    <TabIcon {...props}>
      <path d="M3 20h18" />
      <path d="M5 20V11l7-5 7 5v9" />
      <path d="M10 20v-5h4v5" />
      <path d="M12 6V4" />
    </TabIcon>
  );
}

export function IconDepart(props: IconProps) {
  return (
    <TabIcon {...props}>
      <path d="M2 16l20-6-20-6v4l14 2-14 2v4z" />
    </TabIcon>
  );
}

export function IconSun(props: IconProps) {
  return (
    <TabIcon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </TabIcon>
  );
}

export function IconMoon(props: IconProps) {
  return (
    <TabIcon {...props}>
      <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
    </TabIcon>
  );
}

export function IconClose(props: IconProps) {
  return (
    <TabIcon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </TabIcon>
  );
}

export function IconArrowUp(props: IconProps) {
  return (
    <TabIcon {...props}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </TabIcon>
  );
}
