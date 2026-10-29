"use client";

import { useEffect, useRef, useState, type AnimationEvent } from "react";
import { SPARKLES_PATHS, SPARKLES_VIEWBOX } from "@/components/icons/UiIcons";

type Props = {
  className?: string;
  /** Increment to play one full sparkle cycle (not tied to pointer hover). */
  playToken?: number;
};

/** Star + two accent pluses, each animated independently. */
const ANIMATED_PARTS = 3;

/** Sparkles mark — half turn, pause, bounce; runs to completion after pointer leaves. */
export function LogoSparkle({ className = "", playToken = 0 }: Props) {
  const [run, setRun] = useState(false);
  const finished = useRef(0);

  useEffect(() => {
    if (playToken === 0) return;
    finished.current = 0;
    setRun(false);
    const id = requestAnimationFrame(() => setRun(true));
    return () => cancelAnimationFrame(id);
  }, [playToken]);

  const onAnimEnd = (e: AnimationEvent<SVGPathElement>) => {
    if (!e.animationName.includes("logo-sparkle")) return;
    finished.current += 1;
    if (finished.current >= ANIMATED_PARTS) setRun(false);
  };

  return (
    <svg
      viewBox={SPARKLES_VIEWBOX}
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path
        className={`logo-sparkle-star${run ? " logo-sparkle-star--run" : ""}`}
        d={SPARKLES_PATHS.star}
        onAnimationEnd={onAnimEnd}
      />
      <path
        className={`logo-sparkle-plus${run ? " logo-sparkle-plus--run" : ""}`}
        d={SPARKLES_PATHS.plusTop}
        onAnimationEnd={onAnimEnd}
      />
      <path
        className={`logo-sparkle-plus${run ? " logo-sparkle-plus--run" : ""}`}
        d={SPARKLES_PATHS.plusBottom}
        onAnimationEnd={onAnimEnd}
      />
    </svg>
  );
}
