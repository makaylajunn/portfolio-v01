import type { CSSProperties } from "react";
import { ABOUT_NARRATIVE_BEATS, type AboutNarrativeBeat } from "@/lib/about";
import { CONTAINER, ImageSlot, ratioClass } from "@/components/case-study/shared";

const TEXT_CLASS =
  "about-reveal-text w-full min-w-0 max-w-[42ch] text-center text-pretty font-secondary text-base leading-7 text-ink md:max-w-[min(46ch,100%)] md:flex-1 md:shrink md:text-body-lg md:leading-8 lg:max-w-[46ch] lg:shrink-0 lg:flex-none";

function NarrativeImage({ beat, index }: { beat: AboutNarrativeBeat; index: number }) {
  const ratio = beat.image.ratio ?? "4/3";
  const tilt =
    beat.imageSide === "left"
      ? index % 2 === 0
        ? "lg:-rotate-[2.5deg]"
        : "lg:-rotate-[1.5deg]"
      : index % 2 === 0
        ? "lg:rotate-[2.5deg]"
        : "lg:rotate-[1.5deg]";

  return (
    <div
      className={`about-reveal-image w-[min(100%,240px)] shrink-0 transition-transform duration-500 md:w-[clamp(140px,30vw,200px)] lg:w-[220px] ${tilt}`}
    >
      <div
        className={`relative overflow-hidden rounded-card bg-[#e6e3de] shadow-card ${ratioClass(ratio)}`}
      >
        <ImageSlot
          image={beat.image}
          tone={beat.imageTone}
          sizes="(min-width: 1024px) 220px, (min-width: 768px) 30vw, 88vw"
        />
      </div>
    </div>
  );
}

function NarrativeBeat({ beat, index }: { beat: AboutNarrativeBeat; index: number }) {
  const imageFirst = beat.imageSide === "left";

  return (
    <article
      className="about-beat py-10 md:py-14"
      style={{ "--beat-i": index } as CSSProperties}
    >
      <div
        className={`mx-auto flex w-full min-w-0 max-w-[920px] flex-col-reverse items-center justify-center gap-5 md:flex-row md:gap-4 md:px-0 lg:gap-8 ${
          imageFirst ? "" : "md:flex-row-reverse"
        }`}
      >
        <NarrativeImage beat={beat} index={index} />
        <p className={TEXT_CLASS}>{beat.body}</p>
      </div>
    </article>
  );
}

export function AboutNarrative() {
  return (
    <section className={`${CONTAINER} pb-24 md:pb-32`} aria-label="Story">
      {ABOUT_NARRATIVE_BEATS.map((beat, index) => (
        <NarrativeBeat key={beat.image.label} beat={beat} index={index} />
      ))}
    </section>
  );
}
