"use client";

import { useState } from "react";
import type { ImageSpec } from "@/lib/case-studies/types";
import { ImageSlot, ratioClass } from "./shared";

/**
 * Drag (or use arrow keys) to reveal the change. The native range input sits
 * invisibly over the image, so touch, mouse and keyboard all work for free.
 */
export function BeforeAfter({
  before,
  after,
}: {
  before: ImageSpec;
  after: ImageSpec;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div
      className={`relative isolate overflow-hidden rounded-image bg-[#e6e3de] select-none ${ratioClass(after.ratio)}`}
    >
      <ImageSlot image={after} tone="from-[#dfe8d6] to-[#c5d6b8]" side="right" />

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <ImageSlot image={before} tone="from-[#e9e5df] to-[#d3cec6]" side="left" />
      </div>

      <span className="pointer-events-none absolute top-4 left-4 z-10 rounded-full border border-white/70 bg-white/60 px-3 py-1.5 font-secondary text-xs font-medium backdrop-blur-md">
        Before
      </span>
      <span className="pointer-events-none absolute top-4 right-4 z-10 rounded-full bg-slate-deep px-3 py-1.5 font-secondary text-xs font-medium text-white">
        After
      </span>

      {/* Divider + handle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white ring-1 ring-ink/10"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/80 shadow-lg backdrop-blur-md">
          <svg
            viewBox="0 0 24 24"
            className="size-4 text-ink"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Drag to compare before and after"
        className="absolute inset-0 z-20 size-full cursor-pointer touch-pan-y appearance-none opacity-0"
      />
    </div>
  );
}
