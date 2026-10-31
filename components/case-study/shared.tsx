import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageSpec, Ratio } from "@/lib/case-studies/types";

/* Same tokens as the home page, so the two feel like one site. */
export const CONTAINER = "mx-auto w-full max-w-[1200px] px-6 md:px-10";
export const MONO_LABEL =
  "font-mono text-label uppercase text-ink-muted";

/* ---------- Icons ---------- */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function Sparkle({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M11 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z" />
      <path d="M19 15v4M17 17h4" />
    </svg>
  );
}

export function ArrowUpRight({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowLeft({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ImageIcon({ className = "" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="3" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="M4 17l5-4.5 4 3.5 3-2.5 4 3.5" />
    </svg>
  );
}

/* ---------- Image slots ---------- */

/** Tailwind needs literal class names, so ratios are mapped, not interpolated. */
const RATIO: Record<Ratio, string> = {
  "21/9": "aspect-[4/3] md:aspect-[21/9]",
  "16/9": "aspect-video",
  "16/10": "aspect-[4/3] md:aspect-[16/10]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
};

export function ratioClass(ratio: Ratio = "16/10") {
  return RATIO[ratio];
}

/**
 * Fills its (relative) parent. With no `src` it shows a labelled placeholder
 * that says what to drop in and at what size.
 */
export function ImageSlot({
  image,
  tone = "from-[#e6e3de] to-[#d6d2cb]",
  sizes = "(min-width: 1200px) 1120px, 100vw",
  priority = false,
  side,
}: {
  image: ImageSpec;
  tone?: string;
  sizes?: string;
  priority?: boolean;
  /** Keeps the placeholder label in one half, for before/after comparisons. */
  side?: "left" | "right";
}) {
  if (image.src) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={image.fit === "contain" ? "object-contain" : "object-cover"}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${image.alt}`}
      className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br ${tone} p-4 text-center ${
        side === "left" ? "pr-[52%]" : side === "right" ? "pl-[52%]" : ""
      }`}
    >
      <div aria-hidden className="dots absolute inset-0" />
      <ImageIcon className="relative size-8 text-ink-muted-soft" />
      <span className="relative font-mono text-label uppercase text-ink-muted-soft">
        {image.label}
      </span>
    </div>
  );
}

/**
 * An image in its aspect-ratio box. `framed` wraps it in the white card used
 * for the big moments, matching the home page case study cards.
 */
export function Media({
  image,
  framed = false,
  tone,
  sizes,
  priority,
  className = "",
}: {
  image: ImageSpec;
  framed?: boolean;
  tone?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const box = (
    <div
      className={`relative overflow-hidden rounded-image bg-[#e6e3de] ${ratioClass(image.ratio)} ${framed ? "" : className}`}
    >
      <ImageSlot image={image} tone={tone} sizes={sizes} priority={priority} />
    </div>
  );
  if (!framed) return box;
  return (
    <div className={`rounded-card bg-white p-3 shadow-card ${className}`}>
      {box}
    </div>
  );
}

/* ---------- Chapter scaffolding ---------- */

/** "01 · Context" style label shown above every chapter heading. */
export function ChapterLabel({
  number,
  children,
}: {
  number: number;
  children: ReactNode;
}) {
  return (
    <p className={`${MONO_LABEL} flex items-center gap-3`}>
      <span className="text-ink">{String(number).padStart(2, "0")}</span>
      <span aria-hidden className="h-px w-8 bg-ink/25" />
      {children}
    </p>
  );
}

export function ChapterHeading({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <h2
      id={id}
      className="mt-6 font-primary text-h2 text-balance"
    >
      {children}
    </h2>
  );
}

/**
 * Writing rhythm: a short opener, the detail, a short closer (1-3-1).
 * First and last lines are set larger so a skimmer still gets the point.
 */
export function Rhythm({ lines }: { lines: string[] }) {
  const hasCloser = lines.length >= 3;
  return (
    <div className="space-y-6">
      {lines.map((line, i) => {
        const punch = i === 0 || (hasCloser && i === lines.length - 1);
        return (
          <p
            key={i}
            className={
              punch
                ? "font-primary text-xl leading-8 text-balance md:text-2xl md:leading-9"
                : "max-w-[52ch] font-secondary text-base leading-7 text-ink-muted text-pretty"
            }
          >
            {line}
          </p>
        );
      })}
    </div>
  );
}
