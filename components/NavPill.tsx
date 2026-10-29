"use client";

import Link from "next/link";
import type { MouseEvent, PointerEvent, ReactNode } from "react";

export type NavPillScene = "work" | "fun" | "about" | "contact";

const pillShared =
  "nav-pill-scene group/pill inline-flex items-center justify-center rounded-full font-secondary text-[clamp(0.75rem,3.4cqi,0.875rem)] font-medium leading-none whitespace-nowrap transition-[border-color,box-shadow,gap] duration-300 @min-[36rem]:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-deep focus-visible:gap-1.5";

/** Circles until the bar itself is wide enough for labels (`@container` on the nav). */
const pillDefault = `${pillShared} size-[clamp(1.75rem,9.21cqi,2.75rem)] max-w-full shrink p-0 @min-[36rem]:h-auto @min-[36rem]:w-auto @min-[36rem]:shrink-0 @min-[36rem]:px-3.5 @min-[36rem]:py-2 border border-ink/15 bg-white/50 text-ink hover:border-white/50 hover:shadow-pill @min-[36rem]:hover:gap-1.5`;

const pillActive = `${pillShared} nav-pill-scene--active h-[clamp(1.75rem,9.21cqi,2.75rem)] w-auto px-2.5 py-0 @min-[36rem]:h-auto @min-[36rem]:w-auto @min-[36rem]:px-3.5 @min-[36rem]:py-2 border border-white/40 text-ink shadow-pill`;

type NavPillProps = {
  href: string;
  scene: NavPillScene;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  active?: boolean;
  /** Use a plain `<a>` so the browser does a full document load (e.g. home → about). */
  reload?: boolean;
  onSelect?: (event: MouseEvent<HTMLElement>) => void;
  "aria-current"?: "page" | "true";
};

function setPillPointer(el: HTMLElement, clientX: number, clientY: number) {
  const r = el.getBoundingClientRect();
  const x = ((clientX - r.left) / r.width) * 100;
  const y = ((clientY - r.top) / r.height) * 100;
  el.style.setProperty("--pill-x", String(x));
  el.style.setProperty("--pill-y", String(y));
}

function pillPointerHandlers() {
  return {
    onPointerEnter: (e: PointerEvent<HTMLElement>) => {
      setPillPointer(e.currentTarget, e.clientX, e.clientY);
    },
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType === "touch") return;
      setPillPointer(e.currentTarget, e.clientX, e.clientY);
    },
    onPointerLeave: (e: PointerEvent<HTMLElement>) => {
      e.currentTarget.style.setProperty("--pill-x", "50");
      e.currentTarget.style.setProperty("--pill-y", "50");
    },
  };
}

export function NavPill({
  href,
  scene,
  icon,
  children,
  className = "",
  active = false,
  reload = false,
  onSelect,
  ...rest
}: NavPillProps) {
  const classNames = `${active ? pillActive : pillDefault} nav-pill-scene--${scene} ${className}`;
  const pointer = pillPointerHandlers();
  const select = onSelect
    ? { onClick: (event: MouseEvent<HTMLElement>) => onSelect(event) }
    : {};
  const accessibleLabel =
    typeof children === "string" ? children : undefined;

  const content = (
    <span className="nav-pill-scene__inner inline-flex items-center justify-center gap-0 text-ink leading-none @min-[36rem]:group-hover/pill:gap-1.5 @min-[36rem]:group-focus-visible/pill:gap-1.5 [.nav-pill-scene--active_&]:gap-1.5">
      {icon ? (
        <span
          aria-hidden
          className="nav-pill-scene__icon inline-flex size-[clamp(1rem,4.47cqi,1.25rem)] shrink-0 items-center justify-center overflow-hidden transition-[width,opacity] duration-300 ease-out [&_svg]:size-full [&_svg]:shrink-0 @min-[36rem]:w-0 @min-[36rem]:opacity-0 @min-[36rem]:group-hover/pill:w-icon-md @min-[36rem]:group-hover/pill:opacity-100 @min-[36rem]:group-focus-visible/pill:w-icon-md @min-[36rem]:group-focus-visible/pill:opacity-100 [.nav-pill-scene--active_&]:w-[clamp(1rem,4.47cqi,1.25rem)] [.nav-pill-scene--active_&]:opacity-100"
        >
          {icon}
        </span>
      ) : null}
      <span
        className={
          active
            ? "nav-pill-scene__label inline-flex items-center leading-none"
            : "nav-pill-scene__label hidden items-center leading-none @min-[36rem]:inline-flex"
        }
      >
        {children}
      </span>
    </span>
  );

  const a11y = accessibleLabel ? { "aria-label": accessibleLabel } : {};

  if (href.startsWith("/") && !reload) {
    return (
      <Link
        href={href}
        className={classNames}
        {...a11y}
        {...pointer}
        {...select}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  if (href.startsWith("/")) {
    return (
      <a
        href={href}
        className={classNames}
        {...a11y}
        {...pointer}
        {...select}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={classNames}
      {...a11y}
      {...pointer}
      {...select}
      {...rest}
    >
      {content}
    </a>
  );
}
