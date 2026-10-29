"use client";

import Image from "next/image";
import Link from "next/link";
import { ContactFooter } from "@/components/ContactFooter";
import { PETALTIMER } from "@/lib/fun/petaltimer";
import { consumeSectionEnter } from "@/lib/sectionEnter";
import { HeroHeadline, usePrefersNoHover } from "@/components/home/HeroHeadline";
import { usePageEnterReplay } from "@/lib/pageEnterReplay";
import { useTouchLandingSequence } from "@/lib/touchLandingSequence";
import { CursorIcon, FrogIcon } from "@/components/icons/UiIcons";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";

function setPillPointerOnTile(
  el: HTMLElement,
  clientX: number,
  clientY: number,
) {
  const r = el.getBoundingClientRect();
  const x = ((clientX - r.left) / r.width) * 100;
  const y = ((clientY - r.top) / r.height) * 100;
  el.style.setProperty("--pill-x", String(x));
  el.style.setProperty("--pill-y", String(y));
}

function mascotTilePointerHandlers() {
  return {
    onPointerEnter: (e: PointerEvent<HTMLElement>) => {
      setPillPointerOnTile(e.currentTarget, e.clientX, e.clientY);
    },
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType === "touch") return;
      setPillPointerOnTile(e.currentTarget, e.clientX, e.clientY);
    },
    onPointerLeave: (e: PointerEvent<HTMLElement>) => {
      e.currentTarget.style.setProperty("--pill-x", "50");
      e.currentTarget.style.setProperty("--pill-y", "50");
    },
  };
}

function FunMascotCover({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  return (
    <>
      <div aria-hidden className="fun-mascot-bg absolute inset-0" />
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="relative z-1 pointer-events-none object-contain p-8 md:p-10"
        />
      </div>
    </>
  );
}

/* ==========================================================================
   GRID
   12 columns · 24px gutters · 1200px max · 8px baseline.
   Every spacing value below is a multiple of 8. Press "G" to see the grid.
   ========================================================================== */

const CONTAINER = "mx-auto w-full max-w-[1200px] px-6 md:px-10";
const MONO_LABEL =
  "font-mono text-label uppercase text-ink-muted";

/* ==========================================================================
   CONTENT  (placeholders are marked TODO)
   ========================================================================== */

/**
 * A home-page "project snapshot" (classic format):
 * visual ? company logo ? outcome-first title ? role + timeline ?
 * 1–2 sentences about YOUR role ? metric callouts ? CTA.
 * Conclusion first (BLUF); the full story lives on the case study page.
 */
type CaseStudy = {
  slug: string;
  company: string;
  /** Drop a logo in /public and set this, e.g. "/logos/carepotal.svg". Shows a placeholder until then. */
  logo?: string;
  /** Insightful, outcome-first title. Carry one metric here. */
  title: string;
  /** Your exact role. TODO: confirm titles. */
  role: string;
  timeline: string;
  /** 1–2 sentences, first person, active voice, about what YOU did. */
  description: string;
  /** The one callout shown at rest. Should differ from the metric in the title. */
  headline: { value: string; label: string };
  /** All callouts, shown on hover/focus. */
  metrics: { value: string; label: string }[];
  links?: { label: string; href: string }[];
  /** Desktop bento placement (12-col). */
  place: string;
  /** Drop a file in /public and set this to use a real image, e.g. "/work/carepotal-core.png" */
  image?: string;
  imageLabel: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "carepotal-core-experience",
    company: "CarePortal",
    title: "Rebuilt CarePortal’s core experience and lifted responder conversion 10%",
    role: "Lead Product Designer",
    timeline: "Jun ’22 – Mar ’25",
    description:
      "I led the largest UX overhaul in CarePortal’s history: 22 features, including 0→1 initiatives. I replaced the legacy UI and rebuilt responder flows so leaders get more capacity and responders more confidence.",
    headline: { value: "16%", label: "growth in funded responses" },
    metrics: [
      { value: "10% uplift", label: "in responder conversion rate" },
      { value: "16% growth", label: "in funded responses" },
      { value: "85% CSAT", label: "on the new response process" },
    ],
    links: [
      { label: "Mar ’25 GA launch", href: "#" },
      { label: "Dec ’24 beta launch", href: "#" },
    ],
    place: "md:col-span-7 md:row-span-2",
    imageLabel: "Hero UI · 2400 × 1030",
  },
  {
    slug: "design-culture",
    company: "CarePortal",
    title: "Built the design system and accessibility practice a whole company runs on",
    role: "Design Systems & Accessibility Lead",
    timeline: "Jun ’22 – Now",
    description:
      "I set up CarePortal’s design foundation: the design system, accessibility standards, user research, and mentoring. It has kept 3+ years of delivery consistent across dozens of launches.",
    headline: { value: "100%", label: "design system adoption" },
    metrics: [
      { value: "100% adoption", label: "across design, dev, and marketing" },
      { value: "100% trained", label: "in accessibility best practices" },
    ],
    place: "md:col-start-8 md:col-span-5 md:row-start-1",
    imageLabel: "Design system UI · 1600 × 1200",
  },
  {
    slug: "impact-map",
    company: "CarePortal",
    title: "Grew platform views from 28k to 1.5M with a live Impact Map",
    role: "Product Designer, 0→1",
    timeline: "Sep ’22 – Nov ’22 · Launched Jan ’23",
    description:
      "I designed and launched CarePortal’s first data-driven Impact Map. It turns abstract metrics into a story anyone can explore, and it’s fully accessible.",
    headline: { value: "+5,289%", label: "YoY lift in platform views" },
    metrics: [
      { value: "+5,289% YoY", label: "lift in platform views" },
      { value: "100% WCAG", label: "compliant redesigned map" },
    ],
    links: [{ label: "View live impact map", href: "#" }],
    place: "md:col-start-8 md:col-span-5 md:row-start-2",
    imageLabel: "Impact Map UI · 1600 × 1200",
  },
];

type FunKind = "deep-dive" | "link" | "look";

type FunProject = {
  id: string;
  title: string;
  blurb: string;
  kind: FunKind;
  year: string;
  /** Medium for art, or stack for code. */
  medium: string;
  glyph: string;
  tone: string;
  /** Explicit 12-col grid placement (desktop). 88px rows + 24px gaps. */
  place: string;
  href?: string;
  image?: string;
  imageAlt?: string;
  imageCover?: "mascot";
  tools?: string[];
  steps?: { title: string; body: string }[];
};

// TODO: replace these placeholder projects with the real ones.
const FUN_PROJECTS: FunProject[] = [
  {
    id: PETALTIMER.id,
    title: PETALTIMER.title,
    blurb: PETALTIMER.blurb,
    kind: "link",
    year: PETALTIMER.year,
    medium: PETALTIMER.medium,
    glyph: "??",
    tone: "from-[#f6d9df] to-[#eebccb]",
    place: "md:col-start-1 md:col-span-4 md:row-start-1 md:row-span-4",
    href: PETALTIMER.href,
    image: PETALTIMER.image,
    imageAlt: PETALTIMER.imageAlt,
    imageCover: PETALTIMER.imageCover,
  },
  {
    id: "mood-forecast",
    title: "Mood Forecast",
    blurb: "Your feelings, reported like the weather. Built in a weekend.",
    kind: "deep-dive",
    year: "2026",
    medium: "Vibe coded",
    glyph: "???",
    tone: "from-[#d9e8f1] to-[#b9d4e5]",
    place: "md:col-start-5 md:col-span-4 md:row-start-1 md:row-span-4",
    tools: ["Next.js", "Cursor", "Tailwind"],
    steps: [
      {
        title: "The spark",
        body: "Naming a feeling is hard. Reading a forecast is easy. What if the second helped with the first?",
      },
      {
        title: "The build",
        body: "Prompted the skeleton, then hand-tuned every transition until it felt like breathing.",
      },
      {
        title: "The takeaway",
        body: "Vibe coding is fastest when the taste is human and the typing is not.",
      },
    ],
  },
  {
    id: "blue-hour",
    title: "Blue Hour",
    blurb: "Gouache on paper. The ten minutes before the streetlights come on.",
    kind: "look",
    year: "2025",
    medium: "Gouache on paper",
    glyph: "??",
    tone: "from-[#e4def3] to-[#cdc3e8]",
    place: "md:col-start-9 md:col-span-4 md:row-start-1 md:row-span-4",
  },
];

const KIND_META: Record<
  FunKind,
  { tag: string; tagIconOnly?: boolean }
> = {
  "deep-dive": { tag: "Read more" },
  link: { tag: "Play with it" },
  look: { tag: "Expand", tagIconOnly: true },
};

/* ==========================================================================
   SMALL PIECES
   ========================================================================== */

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

/** Diagonal expand — opens a fuller in-page view. */
function ExpandIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function ImageIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="3.5" y="4.5" width="17" height="15" rx="3" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="M4 17l5-4.5 4 3.5 3-2.5 4 3.5" />
    </svg>
  );
}

/**
 * The placeholder slot. Fills its (relative) parent. Pass `src` to swap in a
 * real image with no other changes.
 */
function ImageSlot({
  src,
  alt,
  label,
  glyph,
  tone = "from-[#e6e3de] to-[#d6d2cb]",
  sizes = "(min-width: 768px) 50vw, 100vw",
  cover = "fill",
}: {
  src?: string;
  alt: string;
  label: string;
  glyph?: string;
  tone?: string;
  sizes?: string;
  cover?: "fill" | "mascot";
}) {
  if (src && cover === "mascot") {
    return <FunMascotCover src={src} alt={alt} sizes={sizes} />;
  }
  if (src) {
    return (
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    );
  }
  return (
    <div
      aria-hidden
      className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br ${tone}`}
    >
      <div className="dots absolute inset-0" />
      {glyph ? (
        <span className="relative text-6xl transition-transform duration-500 group-hover:animate-[wiggle_0.8s_ease-in-out] md:text-7xl">
          {glyph}
        </span>
      ) : (
        <ImageIcon className="relative size-8 text-ink-muted-soft" />
      )}
      <span className="relative font-mono text-label uppercase text-ink-muted-soft">
        {label}
      </span>
    </div>
  );
}

function SectionLabel({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <p className={`${MONO_LABEL} flex items-center gap-2`}>
      {icon}
      {children}
    </p>
  );
}

/* ==========================================================================
   GRID OVERLAY  (press G)
   ========================================================================== */

function GridOverlay() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key.toLowerCase() === "g") setOn((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!on) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-100">
      <div
        className={`${CONTAINER} grid h-full grid-cols-4 gap-4 md:grid-cols-12 md:gap-6`}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={`border-x border-rose-400/30 bg-rose-400/10 ${i >= 4 ? "hidden md:block" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   HERO
   ========================================================================== */

function HeroSubtext({ touchClass }: { touchClass: string }) {
  const noHover = usePrefersNoHover();

  const shared =
    "mx-auto mt-6 max-w-[50ch] text-pretty font-secondary text-ink-muted md:mt-8";

  let className = shared;
  let style: CSSProperties | undefined;

  if (noHover === null || noHover) {
    className += ` hero-subtext-touch ${touchClass}`;
  } else {
    className += " hero-subtext-hover rise";
    style = { "--d": "150ms" } as CSSProperties;
  }

  return (
    <p className={className} style={style}>
      Systems and player-coach designer with an M.A. in Psychology. 4+ years
      specializing in 0→1 SaaS solutions, design systems, and accessibility.
    </p>
  );
}

function Hero({ subtextTouchClass }: { subtextTouchClass: string }) {
  return (
    <section className={`${CONTAINER} @container pt-40 pb-24 text-center md:pt-52 md:pb-32`}>
      <HeroHeadline />
      <HeroSubtext touchClass={subtextTouchClass} />
    </section>
  );
}

/* ==========================================================================
   SELECTED WORKS
   Bento grid on desktop (hero left, two snapshots right). Hover stays
   visual-only: lift, soft ring, image scale, “Read case study” chip.
   ========================================================================== */

/** A metric in a callout box, so the numbers are easy to spot. */
function MetricBox({
  value,
  label,
  className = "",
  style,
}: {
  value: string;
  label: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`min-w-0 rounded-xl bg-ink/[0.045] px-4 py-3 ${className}`}
      style={style}
    >
      <dd className="font-primary text-lg leading-6 font-semibold whitespace-nowrap">
        {value}
      </dd>
      <dt className="mt-1 font-secondary text-xs leading-4 text-ink-muted">
        {label}
      </dt>
    </div>
  );
}

function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const isHero = study.place.includes("row-span-2");

  return (
    <article
      className={`work-card reveal group relative flex h-full flex-col rounded-card bg-white p-3 shadow-card transition-[box-shadow,translate] duration-300 ease-out hover:-translate-y-1 hover:shadow-card-hover hover:ring-2 hover:ring-slate-deep/10 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-slate-deep/25 ${study.place}`}
      style={{ "--card-i": index } as CSSProperties}
    >
      <div
        className={`relative min-h-[240px] flex-1 overflow-hidden rounded-image bg-[#e6e3de] ${
          isHero ? "md:min-h-[420px]" : "aspect-[4/3] md:aspect-auto md:min-h-[200px]"
        }`}
      >
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
          <ImageSlot
            src={study.image}
            alt={study.title}
            label={study.imageLabel}
            sizes={
              isHero
                ? "(min-width: 768px) 58vw, 100vw"
                : "(min-width: 768px) 42vw, 100vw"
            }
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-slate-deep/0 transition-colors duration-300 group-hover:bg-slate-deep/[0.04] group-has-[a:focus-visible]:bg-slate-deep/[0.04]" />

        <span
          aria-hidden
          className="pointer-events-none absolute right-4 bottom-4 z-10 inline-flex translate-y-1 items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 font-secondary text-xs font-medium text-ink opacity-0 shadow-md backdrop-blur-sm transition-[opacity,translate] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-has-[a:focus-visible]:translate-y-0 group-has-[a:focus-visible]:opacity-100"
        >
          Read case study <ArrowUpRight className="size-3.5" />
        </span>
      </div>

      <div className="flex flex-col gap-4 px-4 pt-5 pb-4 md:px-5 md:pt-6">
        <div className="min-w-0">
          <h3 className="font-primary text-xl leading-7 text-balance transition-colors duration-300 group-hover:text-slate-deep md:text-2xl md:leading-8">
            <Link
              href={`/work/${study.slug}`}
              className="outline-none after:absolute after:inset-0 after:rounded-card"
            >
              {study.title}
            </Link>
          </h3>
          <p className={`${MONO_LABEL} mt-3`}>
            {study.role} <span aria-hidden>·</span> {study.timeline}
          </p>
        </div>
        <dl>
          <MetricBox
            value={study.headline.value}
            label={study.headline.label}
            className="inline-block"
          />
        </dl>
      </div>
    </article>
  );
}

function SelectedWorks() {
  const [enterMode, setEnterMode] = useState<"check" | "enter" | "none">(
    "check",
  );

  useLayoutEffect(() => {
    setEnterMode(consumeSectionEnter("work") ? "enter" : "none");
  }, []);

  const enterClass =
    enterMode === "enter"
      ? " work-cards-enter"
      : enterMode === "check"
        ? " work-cards-pending"
        : "";

  return (
    <section id="work" className={`${CONTAINER} pb-48${enterClass}`}>
      <div className="mb-10">
        <SectionLabel icon={<CursorIcon className="size-[1.2lh]" />}>Work</SectionLabel>
      </div>
      <div className="grid grid-cols-1 gap-6 md:auto-rows-[minmax(280px,auto)] md:grid-cols-12">
        {CASE_STUDIES.map((s, index) => (
          <CaseStudyCard key={s.slug} study={s} index={index} />
        ))}
      </div>
    </section>
  );
}

/* ==========================================================================
   SIDE QUESTS  (fun projects)
   A collage grid. Each tile behaves differently:
     deep dive  ? opens the story in a dialog
     link       ? opens the project in a new tab
     closer look? opens a big view in a dialog
   ========================================================================== */

function FunTile({
  project,
  onOpen,
}: {
  project: FunProject;
  onOpen: (p: FunProject) => void;
}) {
  const meta = KIND_META[project.kind];
  const isMascot = project.imageCover === "mascot";
  const classes = `reveal group relative block h-80 w-full overflow-hidden rounded-card text-left shadow-card transition-[box-shadow,translate] duration-500 ease-out hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-deep md:h-auto ${isMascot ? "fun-mascot-tile" : ""} ${project.place}`;
  const mascotPointer = isMascot ? mascotTilePointerHandlers() : {};

  const imageSlot = (
    <ImageSlot
      src={project.image}
      alt={project.imageAlt ?? project.title}
      label={`${project.title} · image`}
      glyph={project.glyph}
      tone={project.tone}
      cover={project.imageCover}
      sizes="(min-width: 768px) 66vw, 100vw"
    />
  );

  const inner = (
    <>
      {isMascot ? (
        imageSlot
      ) : (
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          {imageSlot}
        </div>
      )}

      <span
        className={`absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/55 font-secondary text-xs font-medium backdrop-blur-md ${
          meta.tagIconOnly ? "p-2" : "px-3 py-1.5"
        }`}
        {...(meta.tagIconOnly
          ? { "aria-label": meta.tag }
          : {})}
      >
        {meta.tagIconOnly ? (
          <ExpandIcon className="size-3.5" />
        ) : (
          <>
            {meta.tag}
            {project.kind === "link" ? (
              <ArrowUpRight className="size-3.5" />
            ) : null}
          </>
        )}
      </span>

      <div className="absolute inset-x-4 bottom-4 z-10 translate-y-4 opacity-0 transition-[opacity,translate] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 touch:translate-y-0 touch:opacity-100">
        <div className="rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-xl backdrop-saturate-150">
          <p className="font-primary text-lg leading-6 font-semibold">
            {project.title}
          </p>
          <p className="mt-1 font-secondary text-xs leading-5 text-ink-muted">
            {project.blurb}
          </p>
        </div>
      </div>
    </>
  );

  if (project.kind === "link") {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className={classes}
        aria-label={`${project.title}: ${project.blurb} (opens in a new tab)`}
        {...mascotPointer}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className={classes}
      aria-haspopup="dialog"
      aria-label={`${project.title}: ${project.blurb}`}
      {...mascotPointer}
    >
      {inner}
    </button>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: FunProject | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        // Clicks on the backdrop target the dialog element itself.
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="project-dialog-title"
      className="m-auto w-[min(1040px,calc(100vw-32px))] overflow-hidden rounded-card bg-oatmeal p-0 text-ink shadow-dialog backdrop:bg-ink/30 backdrop:backdrop-blur-md"
    >
      {project ? (
        <>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 z-20 grid size-10 place-items-center rounded-full border border-white/70 bg-white/60 backdrop-blur-md transition-colors hover:bg-white"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div className="max-h-[calc(100dvh-32px)] overflow-y-auto p-3">
            <div
              className={`relative overflow-hidden rounded-image ${
                project.kind === "look" ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[16/9]"
              }`}
            >
              <ImageSlot
                src={project.image}
                alt={project.title}
                label={`${project.title} · image`}
                glyph={project.glyph}
                tone={project.tone}
                sizes="1040px"
              />
            </div>

            <div className="grid gap-10 p-6 md:grid-cols-12 md:gap-6 md:p-10">
              <div className={project.kind === "look" ? "md:col-span-8" : "md:col-span-5"}>
                <p className={MONO_LABEL}>
                  {KIND_META[project.kind].tag} · {project.year}
                </p>
                <h2
                  id="project-dialog-title"
                  className="mt-3 font-primary text-3xl leading-10 text-balance md:text-4xl md:leading-[48px]"
                >
                  {project.title}
                </h2>
                <p className="mt-4 max-w-[48ch] font-secondary text-base leading-7 text-ink-muted text-pretty">
                  {project.blurb}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[project.medium, ...(project.tools ?? [])].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-ink/15 px-3 py-1 font-secondary text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.steps ? (
                <ol className="md:col-span-7 md:col-start-6">
                  {project.steps.map((s, i) => (
                    <li
                      key={s.title}
                      className="grid grid-cols-[48px_1fr] gap-4 border-t border-ink/10 py-6 first:border-t-0 first:pt-0"
                    >
                      <span className={`${MONO_LABEL} pt-1.5`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-primary text-xl leading-7 font-semibold">
                          {s.title}
                        </h3>
                        <p className="mt-2 font-secondary text-sm leading-6 text-ink-muted text-pretty">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </dialog>
  );
}

function SideQuests() {
  const [open, setOpen] = useState<FunProject | null>(null);

  return (
    <section id="play" className={`${CONTAINER} pb-48`}>
      <SectionLabel icon={<FrogIcon className="size-[1.2lh]" />}>Fun</SectionLabel>

      <h2 className="reveal mt-10 mb-16 max-w-[720px] font-primary text-h2 text-balance">
        Things I made that <em>spark joy</em>
      </h2>

      <div className="grid grid-cols-1 gap-6 md:auto-rows-[88px] md:grid-cols-12">
        {FUN_PROJECTS.map((p) => (
          <FunTile key={p.id} project={p} onOpen={setOpen} />
        ))}
      </div>

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </section>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */

export default function Home() {
  const touchBlock = useTouchLandingSequence();
  const mainRef = usePageEnterReplay<HTMLElement>();

  return (
    <>
      <GridOverlay />
      <main ref={mainRef} id="top" className="home-landing page-enter">
        <Hero subtextTouchClass={touchBlock(1)} />
        <div className={touchBlock(2)}>
          <SelectedWorks />
        </div>
        <div className={touchBlock(2)}>
          <SideQuests />
        </div>
      </main>
      <div className={touchBlock(2)}>
        <ContactFooter />
      </div>
    </>
  );
}
