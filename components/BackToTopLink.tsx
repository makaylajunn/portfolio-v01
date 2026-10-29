"use client";

import { scrollToPageTop } from "@/lib/smoothScroll";
import type { MouseEvent, ReactNode } from "react";

export function BackToTopLink({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href="#top"
      onClick={(e: MouseEvent<HTMLAnchorElement>) => scrollToPageTop(e)}
      className={className}
    >
      {children}
    </a>
  );
}
