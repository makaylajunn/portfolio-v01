import type { ReactNode } from "react";
import { MONO_LABEL } from "@/components/case-study/shared";

type SectionLabelProps = {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Mono eyebrow with pixel icon (Work, Fun, About). Icon and label share one vertical center. */
export function SectionLabel({
  icon,
  children,
  className = "",
}: SectionLabelProps) {
  return (
    <p
      className={`${MONO_LABEL} inline-flex items-center gap-2 leading-none ${className}`.trim()}
    >
      <span
        aria-hidden
        className="inline-flex size-[1.2em] shrink-0 items-center justify-center leading-none [&_svg]:block [&_svg]:size-full"
      >
        {icon}
      </span>
      <span className="inline-flex items-center">{children}</span>
    </p>
  );
}
