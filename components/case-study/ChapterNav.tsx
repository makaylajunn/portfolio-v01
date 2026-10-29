"use client";

import { useEffect, useState } from "react";

export type Chapter = { id: string; label: string };

/**
 * A small floating pill that shows where you are in the story and lets you
 * jump between chapters. The current chapter expands to show its name.
 */
export function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);

    // A chapter is "current" while it crosses the middle band of the screen.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));

    // Clear the pill when you scroll back above the first chapter.
    const onScroll = () => {
      const first = els[0];
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.55) {
        setActive(null);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [chapters]);

  return (
    <nav
      aria-label="Chapters"
      className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
    >
      <ol className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/70 bg-white/50 p-1.5 shadow-glass backdrop-blur-xl backdrop-saturate-150">
        {chapters.map((c, i) => {
          const on = active === c.id;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={on ? "location" : undefined}
                className={`flex h-9 items-center gap-2 rounded-full px-3 font-secondary text-xs font-medium whitespace-nowrap transition-[background-color,color,padding] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-deep ${
                  on
                    ? "bg-slate-deep text-white"
                    : "text-ink-muted hover:bg-white/80 hover:text-ink"
                }`}
              >
                <span className="font-mono text-label">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={on ? "inline" : "hidden"}>{c.label}</span>
                {on ? null : <span className="sr-only">{c.label}</span>}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
