import Link from "next/link";
import type { CSSProperties } from "react";
import { BackToTopLink } from "@/components/BackToTopLink";
import { LinkedInIcon, SubstackIcon } from "@/components/icons/BrandIcons";
import { PROFILE } from "@/lib/profile";
import type {
  CaseStudyContent,
  ChangeMedia,
  Context,
  DesignChange,
  DesignChanges,
  Hero,
  ImpactLens,
  Problem,
  Retrospective,
} from "@/lib/case-studies/types";
import { BeforeAfter } from "./BeforeAfter";
import { ChapterNav, type Chapter } from "./ChapterNav";
import {
  ArrowLeft,
  ArrowUpRight,
  ChapterHeading,
  ChapterLabel,
  CONTAINER,
  Media,
  MONO_LABEL,
  Rhythm,
  Sparkle,
} from "./shared";

/* ==========================================================================
   CaseStudy
   A reusable story page. Feed it a CaseStudyContent object and it lays out:
   outcome first -> context -> problem -> design change -> retrospective.
   Sections you leave out are skipped, and chapter numbers adjust.
   ========================================================================== */

export function CaseStudy({
  content,
  next,
}: {
  content: CaseStudyContent;
  /** The case study to suggest at the end. */
  next?: CaseStudyContent;
}) {
  // Build the chapter list from whatever the content includes.
  const chapters: (Chapter & { key: "context" | "problem" | "design" | "retro" })[] =
    [];
  if (content.context) chapters.push({ key: "context", id: "context", label: "Context" });
  if (content.problem) chapters.push({ key: "problem", id: "problem", label: "Problem" });
  if (content.design) chapters.push({ key: "design", id: "design", label: "Design change" });
  if (content.retrospective)
    chapters.push({ key: "retro", id: "retrospective", label: "Impact" });
  const n = (key: string) => chapters.findIndex((c) => c.key === key) + 1;

  return (
    <>
      <div aria-hidden className="read-progress" />
      <main id="top">
        <HeroSection hero={content.hero} />
        {content.context ? (
          <ContextSection data={content.context} number={n("context")} />
        ) : null}
        {content.problem ? (
          <ProblemSection data={content.problem} number={n("problem")} />
        ) : null}
        {content.design ? (
          <DesignSection data={content.design} number={n("design")} />
        ) : null}
        {content.retrospective ? (
          <RetroSection data={content.retrospective} number={n("retro")} />
        ) : null}
        {next ? <NextUp next={next} /> : null}
      </main>
      <CaseFooter />
      {chapters.length > 1 ? <ChapterNav chapters={chapters} /> : null}
    </>
  );
}

/* ==========================================================================
   HERO
   The ending comes first: title, one sentence, the UI, then the proof.
   ========================================================================== */

function HeroSection({ hero }: { hero: Hero }) {
  return (
    <section className={`${CONTAINER} pt-40 pb-24 md:pt-52 md:pb-32`}>
      <p className={`${MONO_LABEL} rise`}>Case study · {hero.period}</p>
      <h1
        className="rise mt-6 max-w-[960px] font-primary text-[clamp(1.875rem,4.4vw,3.5rem)] leading-[1.15] tracking-[-0.01em] text-balance"
        style={{ "--d": "100ms" } as CSSProperties}
      >
        {hero.title}
      </h1>
      <p
        className="rise mt-8 max-w-[560px] font-secondary text-base leading-7 text-ink-muted text-pretty md:text-body-lg md:leading-8"
        style={{ "--d": "200ms" } as CSSProperties}
      >
        {hero.summary}
      </p>

      <div
        className="rise mt-16"
        style={{ "--d": "300ms" } as CSSProperties}
      >
        <Media image={hero.image} framed priority sizes="(min-width: 1200px) 1120px, 100vw" />
      </div>

      <div className="mt-16 grid gap-16 md:grid-cols-12 md:gap-6">
        {/* The proof */}
        <dl
          className="reveal grid gap-x-6 gap-y-10 sm:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))] md:col-span-7"
          style={{ "--cols": hero.outcomes.length } as CSSProperties}
        >
          {hero.outcomes.map((o) => (
            <div key={o.label} className="min-w-0">
              <dd className="font-primary text-[clamp(2rem,4vw,3rem)] leading-[1.1] font-semibold tracking-[-0.01em]">
                {o.value}
              </dd>
              <dt className="mt-2 font-secondary text-xs leading-5 text-ink-muted">
                {o.label}
              </dt>
            </div>
          ))}
        </dl>

        {/* Quick facts */}
        <dl className="reveal grid grid-cols-2 gap-x-6 gap-y-6 md:col-span-4 md:col-start-9">
          {hero.snapshot.map((s) => (
            <div key={s.label} className="min-w-0">
              <dt className={MONO_LABEL}>{s.label}</dt>
              <dd className="mt-2 font-secondary text-sm leading-6 text-pretty">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {hero.links?.length ? (
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          {hero.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-label uppercase underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
            >
              {l.label} →
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}

/* ==========================================================================
   CONTEXT
   Heading on the left, a short 1-3-1 story on the right.
   ========================================================================== */

function ContextSection({ data, number }: { data: Context; number: number }) {
  return (
    <section
      id="context"
      aria-labelledby="context-title"
      className={`${CONTAINER} pb-24 md:pb-40`}
    >
      <div className="grid gap-12 border-t border-ink/10 pt-16 md:grid-cols-12 md:gap-6 md:pt-24">
        <div className="reveal md:col-span-5">
          <div className="md:sticky md:top-32">
            <ChapterLabel number={number}>{data.eyebrow ?? "Context"}</ChapterLabel>
            <ChapterHeading id="context-title">{data.heading}</ChapterHeading>
          </div>
        </div>
        <div className="reveal md:col-span-6 md:col-start-7">
          <Rhythm lines={data.body} />
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   PROBLEM
   One statement, a few facts, and a picture of where it hurts.
   ========================================================================== */

function ProblemSection({ data, number }: { data: Problem; number: number }) {
  return (
    <section
      id="problem"
      aria-labelledby="problem-title"
      className={`${CONTAINER} pb-24 md:pb-40`}
    >
      <div className="border-t border-ink/10 pt-16 md:pt-24">
        <div className="reveal max-w-[820px]">
          <ChapterLabel number={number}>{data.eyebrow ?? "Problem"}</ChapterLabel>
          <ChapterHeading id="problem-title">{data.heading}</ChapterHeading>
        </div>

        <blockquote className="reveal mt-12 rounded-card bg-sand p-8 md:mt-16 md:p-16">
          <Sparkle className="size-6 text-ink-muted-soft" />
          <p className="mt-6 max-w-[860px] font-primary text-quote text-balance">
            {data.statement}
          </p>
        </blockquote>

        <dl
          className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
          style={{ "--cols": data.framework.length } as CSSProperties}
        >
          {data.framework.map((f) => (
            <div key={f.label} className="reveal min-w-0 border-t border-ink/15 pt-5">
              <dt className={MONO_LABEL}>{f.label}</dt>
              <dd className="mt-3 font-secondary text-sm leading-6 text-ink-muted text-pretty">
                {f.body}
              </dd>
            </div>
          ))}
        </dl>

        {data.visual ? (
          <figure className="reveal mt-16">
            <Media image={data.visual} framed />
            {data.annotations?.length ? (
              <figcaption>
                <ol className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
                  {data.annotations.map((a, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-slate-deep font-mono text-xs text-white">
                        {i + 1}
                      </span>
                      <span className="font-secondary text-sm leading-6 text-ink-muted text-pretty">
                        {a}
                      </span>
                    </li>
                  ))}
                </ol>
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </div>
    </section>
  );
}

/* ==========================================================================
   DESIGN CHANGE
   2 to 5 changes. Each one: a decision, the why, and the visual proof.
   ========================================================================== */

function DesignSection({ data, number }: { data: DesignChanges; number: number }) {
  return (
    <section
      id="design"
      aria-labelledby="design-title"
      className={`${CONTAINER} pb-24 md:pb-40`}
    >
      <div className="border-t border-ink/10 pt-16 md:pt-24">
        <div className="reveal grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <ChapterLabel number={number}>{data.eyebrow ?? "Design change"}</ChapterLabel>
            <ChapterHeading id="design-title">{data.heading}</ChapterHeading>
          </div>
          {data.intro ? (
            <p className="max-w-[44ch] font-secondary text-base leading-7 text-ink-muted text-pretty md:col-span-4 md:col-start-9 md:self-end">
              {data.intro}
            </p>
          ) : null}
        </div>

        <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-32">
          {data.changes.map((c, i) => (
            <Change key={c.heading} change={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Change({ change, index }: { change: DesignChange; index: number }) {
  return (
    <article aria-labelledby={`change-${index}`} className="reveal">
      <div className="grid gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <p className={MONO_LABEL}>{change.eyebrow}</p>
          <h3
            id={`change-${index}`}
            className="mt-4 font-primary text-2xl leading-8 text-balance md:text-[32px] md:leading-10"
          >
            {change.heading}
          </h3>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Rhythm lines={change.body} />
        </div>
      </div>

      <div className="mt-12">
        <ChangeMediaView media={change.media} />
      </div>

      {change.because || change.tradeoff ? (
        <dl className="mt-10 grid gap-6 rounded-card bg-sand p-8 md:grid-cols-12 md:gap-6 md:p-10">
          {change.because ? (
            <div className={change.tradeoff ? "md:col-span-7" : "md:col-span-12"}>
              <dt className={MONO_LABEL}>Why</dt>
              <dd className="mt-3 font-primary text-lg leading-7 italic text-pretty md:text-xl md:leading-8">
                {change.because}
              </dd>
            </div>
          ) : null}
          {change.tradeoff ? (
            <div className="md:col-span-4 md:col-start-9">
              <dt className={MONO_LABEL}>Trade-off</dt>
              <dd className="mt-3 font-secondary text-sm leading-6 text-ink-muted text-pretty">
                {change.tradeoff}
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}
    </article>
  );
}

function ChangeMediaView({ media }: { media: ChangeMedia }) {
  switch (media.type) {
    case "single":
      return <Media image={media.image} framed />;

    case "beforeAfter":
      return (
        <div className="rounded-card bg-white p-3 shadow-card">
          <BeforeAfter before={media.before} after={media.after} />
        </div>
      );

    case "variants":
      return (
        <ul
          className="grid grid-cols-1 gap-6 sm:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
          style={{ "--cols": media.options.length } as CSSProperties}
        >
          {media.options.map((o) => (
            <li key={o.label} className="min-w-0">
              <div
                className={`relative rounded-card p-3 transition-shadow ${
                  o.chosen
                    ? "bg-white shadow-card-hover ring-2 ring-slate-deep"
                    : "bg-white/70 shadow-card"
                }`}
              >
                <Media image={o.image} sizes="(min-width: 768px) 360px, 100vw" />
                <span
                  className={`absolute top-6 left-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-secondary text-xs font-medium ${
                    o.chosen
                      ? "bg-slate-deep text-white"
                      : "border border-white/70 bg-white/60 backdrop-blur-md"
                  }`}
                >
                  Concept {o.label}
                  {o.chosen ? " · chosen" : ""}
                </span>
              </div>
              <p className="mt-4 px-2 font-secondary text-sm leading-6 text-ink-muted text-pretty">
                {o.note}
              </p>
            </li>
          ))}
        </ul>
      );

    case "flow":
      return (
        <div className="flex flex-col gap-6">
          <Media image={media.flow} framed />
          {media.details.length ? (
            <ul
              className="grid grid-cols-1 gap-6 sm:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
              style={{ "--cols": media.details.length } as CSSProperties}
            >
              {media.details.map((d) => (
                <li key={d.label} className="min-w-0">
                  <Media image={d} framed sizes="(min-width: 768px) 360px, 100vw" />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      );
  }
}

/* ==========================================================================
   RETROSPECTIVE
   Impact on users, business, process, and you. Then what stuck.
   ========================================================================== */

function RetroSection({ data, number }: { data: Retrospective; number: number }) {
  return (
    <section
      id="retrospective"
      aria-labelledby="retro-title"
      className={`${CONTAINER} pb-24 md:pb-40`}
    >
      <div className="border-t border-ink/10 pt-16 md:pt-24">
        <div className="reveal grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <ChapterLabel number={number}>{data.eyebrow ?? "Retrospective"}</ChapterLabel>
            <ChapterHeading id="retro-title">{data.heading}</ChapterHeading>
          </div>
          {data.intro ? (
            <p className="max-w-[44ch] font-secondary text-base leading-7 text-ink-muted text-pretty md:col-span-4 md:col-start-9 md:self-end">
              {data.intro}
            </p>
          ) : null}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.impact.map((lens, i) => {
            // Cards with 3+ stats get a full row. If the rest pair up unevenly,
            // the last one takes a full row too, so the grid never has a hole.
            const isWide = (l: ImpactLens) => (l.stats?.length ?? 0) >= 3;
            const narrow = data.impact.filter((l) => !isWide(l));
            const lastNarrow = narrow[narrow.length - 1];
            const full =
              isWide(lens) || (narrow.length % 2 === 1 && lens === lastNarrow);
            return <ImpactCard key={`${lens.lens}-${i}`} lens={lens} full={full} />;
          })}
        </div>

        {data.learnings.length ? (
          <div className="reveal mt-24 grid gap-8 md:grid-cols-12 md:gap-6">
            <p className={`${MONO_LABEL} md:col-span-4`}>What I learned</p>
            <ol className="md:col-span-8">
              {data.learnings.map((l, i) => (
                <li
                  key={l.title}
                  className="grid grid-cols-[48px_1fr] gap-4 border-t border-ink/10 py-8 first:border-t-0 first:pt-0"
                >
                  <span className={`${MONO_LABEL} pt-1.5`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-primary text-xl leading-7 font-semibold text-balance">
                      {l.title}
                    </h3>
                    <p className="mt-2 max-w-[56ch] font-secondary text-sm leading-6 text-ink-muted text-pretty">
                      {l.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {data.whatIf?.length || data.nextSteps?.length ? (
          <div className="reveal mt-16 grid gap-10 border-t border-ink/10 pt-10 md:grid-cols-12 md:gap-6">
            {data.whatIf?.length ? (
              <BulletBlock
                label="If I had more time"
                items={data.whatIf}
                className="md:col-span-4 md:col-start-5"
              />
            ) : null}
            {data.nextSteps?.length ? (
              <BulletBlock
                label="What’s next"
                items={data.nextSteps}
                className="md:col-span-4 md:col-start-9"
              />
            ) : null}
          </div>
        ) : null}

        {data.reflection ? (
          <figure className="reveal mt-24 rounded-card bg-sand px-8 py-16 text-center md:px-16 md:py-24">
            <Sparkle className="mx-auto size-6 text-ink-muted-soft" />
            <blockquote className="mx-auto mt-6 max-w-[720px] font-primary text-quote italic text-balance">
              {data.reflection}
            </blockquote>
          </figure>
        ) : null}
      </div>
    </section>
  );
}

function BulletBlock({
  label,
  items,
  className = "",
}: {
  label: string;
  items: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className={MONO_LABEL}>{label}</p>
      <ul className="mt-4 space-y-3">
        {items.map((t) => (
          <li
            key={t}
            className="flex gap-3 font-secondary text-sm leading-6 text-ink-muted text-pretty"
          >
            <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-ink/40" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ImpactCard({ lens, full }: { lens: ImpactLens; full: boolean }) {
  return (
    <article
      className={`reveal flex flex-col rounded-card bg-white p-8 shadow-card md:p-10 ${
        full ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="rounded-full border border-ink/15 px-3 py-1 font-secondary text-xs font-medium">
          {lens.lens}
        </span>
        {lens.hypothetical ? (
          <span className={MONO_LABEL}>Estimate</span>
        ) : null}
      </div>
      <h3 className="mt-6 max-w-[28ch] font-primary text-2xl leading-8 text-balance">
        {lens.title}
      </h3>
      <p className="mt-3 max-w-[56ch] font-secondary text-sm leading-6 text-ink-muted text-pretty">
        {lens.body}
      </p>
      {lens.stats?.length ? (
        <dl
          className="mt-8 grid grid-cols-1 gap-6 border-t border-ink/10 pt-8 sm:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
          style={{ "--cols": lens.stats.length } as CSSProperties}
        >
          {lens.stats.map((s) => (
            <div key={s.label} className="min-w-0">
              <dd className="font-primary text-4xl leading-[1.1] font-semibold tracking-[-0.01em]">
                {s.value}
              </dd>
              <dt className="mt-2 font-secondary text-xs leading-5 text-ink-muted">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  );
}

/* ==========================================================================
   NEXT UP + FOOTER
   ========================================================================== */

function NextUp({ next }: { next: CaseStudyContent }) {
  return (
    <section
      aria-label="Next case study"
      className={`${CONTAINER} pb-24 md:pb-40`}
    >
      <p className={`${MONO_LABEL} mb-6`}>Next case study</p>
      <Link
        href={`/work/${next.slug}`}
        className="group relative block rounded-card bg-white p-3 shadow-card transition-[box-shadow,translate] duration-500 ease-out hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-deep"
      >
        <Media
          image={{ ...next.hero.image, ratio: "21/9" }}
          sizes="(min-width: 1200px) 1120px, 100vw"
        />
        <div className="flex flex-col gap-4 px-4 pt-6 pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8 md:px-5">
          <div className="min-w-0">
            <p className={MONO_LABEL}>{next.hero.period}</p>
            <h2 className="mt-2 max-w-[44ch] font-primary text-2xl leading-8 text-balance md:text-[28px] md:leading-9">
              {next.hero.title}
            </h2>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg bg-slate-deep px-4 py-2.5 font-secondary text-xs font-medium text-white sm:self-auto">
            view work
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </section>
  );
}

function CaseFooter() {
  return (
    <footer id="contact" className="p-4 pb-24 md:p-6 md:pb-24">
      <div className="rounded-panel bg-sand pt-20 pb-8 md:pt-28">
        <div className={CONTAINER}>
          <p className={MONO_LABEL}>Contact</p>
          <h2 className="mt-6 max-w-[14ch] font-primary text-h1 text-balance">
            Let’s make something that <em>feels</em> right.
          </h2>
          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-deep px-5 py-3 font-secondary text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {PROFILE.email}
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-ink/20 px-5 py-3 font-secondary text-sm font-medium transition-colors hover:border-slate-deep hover:bg-slate-deep hover:text-white"
            >
              <LinkedInIcon className="text-base" />
              LinkedIn
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={PROFILE.substack}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-ink/20 px-5 py-3 font-secondary text-sm font-medium transition-colors hover:border-slate-deep hover:bg-slate-deep hover:text-white"
            >
              <SubstackIcon className="size-4" />
              Substack
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          <div className="mt-20 flex flex-col gap-4 border-t border-ink/10 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="font-secondary text-xs text-ink-muted">
              © {PROFILE.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/#work"
                className={`${MONO_LABEL} transition-colors hover:text-ink`}
              >
                ← All work
              </Link>
              <BackToTopLink
                className={`${MONO_LABEL} transition-colors hover:text-ink`}
              >
                Back to top ↑
              </BackToTopLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
