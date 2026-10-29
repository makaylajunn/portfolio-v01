import type { CSSProperties } from "react";
import { ABOUT_HERO } from "@/lib/about";
import { AboutNarrative } from "@/components/about/AboutNarrative";
import { AboutPageEnter } from "@/components/about/AboutPageEnter";
import { ContactFooter } from "@/components/ContactFooter";
import { CONTAINER, ImageSlot } from "@/components/case-study/shared";
import { SectionLabel } from "@/components/SectionLabel";
import { SmileyIcon } from "@/components/icons/UiIcons";

/* ==========================================================================
   AboutPage — hero + short narrative
   ========================================================================== */

export function AboutPage() {
  return (
    <AboutPageEnter
      hero={<Hero />}
      narrative={<AboutNarrative />}
      footer={<ContactFooter variant="about" />}
    />
  );
}

function Hero() {
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
  return (
    <section className={`${CONTAINER} pt-40 pb-20 md:pt-52 md:pb-28`}>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,min(100%,280px))] md:items-end md:gap-x-5 md:gap-y-8 lg:grid-cols-12 lg:gap-6">
        <div className="min-w-0 lg:col-span-7">
          <SectionLabel className="rise" icon={<SmileyIcon />}>
            {ABOUT_HERO.eyebrow}
          </SectionLabel>
          <h1
            className="rise mt-6 max-w-[18ch] font-primary text-h1 text-balance md:max-w-[20ch] lg:max-w-[22ch]"
            style={d(100)}
          >
            {ABOUT_HERO.titleStart} <em>{ABOUT_HERO.titleEm}</em>
          </h1>
          <p
            className="rise mt-8 max-w-[52ch] font-secondary text-base leading-7 text-ink-muted text-pretty md:text-body-lg md:leading-8"
            style={d(200)}
          >
            {ABOUT_HERO.summary}
          </p>
        </div>

        <div
          className="rise relative mx-auto w-full min-w-0 max-w-[min(100%,420px)] pb-10 md:mx-0 md:max-w-none md:pb-0 lg:col-span-4 lg:col-start-9"
          style={d(200)}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-[#e6e3de] shadow-card">
            <ImageSlot
              image={ABOUT_HERO.photo}
              tone="from-[#f8dccb] to-[#f1bfa4]"
              sizes="(min-width: 768px) 33vw, min(100vw, 420px)"
              priority
            />
          </div>
          <div className="absolute -bottom-8 left-6 w-32 -rotate-3 rounded-image bg-white p-2 shadow-card-hover md:left-3 md:w-36 lg:-left-6 lg:left-auto lg:w-36 xl:-left-12 xl:w-44">
            <div className="relative aspect-square overflow-hidden rounded-control bg-[#e6e3de]">
              <ImageSlot
                image={ABOUT_HERO.photoSecondary}
                tone="from-[#dfe8d6] to-[#c5d6b8]"
                sizes="176px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
