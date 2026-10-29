"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
  type ReactNode,
} from "react";

import happySvg from "./happy.svg";
import nervousSvg from "./nervous.svg";
import sadSvg from "./sad.svg";

type HeroEmotion = "happy" | "nervous" | "sad";

/** Next 16 + Turbopack: SVG imports are `{ src, width, height }`, not plain strings. */
function staticAssetSrc(imported: string | { src: string }): string {
  return typeof imported === "string" ? imported : imported.src;
}

const HERO_EMOTION_SRC: Record<HeroEmotion, string> = {
  happy: staticAssetSrc(happySvg),
  nervous: staticAssetSrc(nervousSvg),
  sad: staticAssetSrc(sadSvg),
};

/** Hero attuned faces. Hover sizes match the cluster above “emotionally attuned”: happy largest, nervous medium, sad smallest. */
const ATTUNED_EMOTION_SIZE_HOVER_HAPPY = "size-[4.14rem] sm:size-[4.554rem]";
const ATTUNED_EMOTION_SIZE_HOVER_NERVOUS = "size-[3.312rem] sm:size-[3.726rem]";
const ATTUNED_EMOTION_SIZE_HOVER_SAD = "size-[2.9rem] sm:size-[3.26rem]";
/** Touch faces, in em so they stay in proportion with the tagline. 15% under the previous touch scale. max-w-none keeps them from collapsing inside the absolute cluster. */
const ATTUNED_EMOTION_SIZE_INTRO_HAPPY = "size-[1.4875em] max-w-none rotate-[8deg]";
const ATTUNED_EMOTION_SIZE_INTRO_SAD = "size-[0.918em] max-w-none -rotate-12";
const ATTUNED_EMOTION_SIZE_INTRO_NERVOUS = "size-[1.343em] max-w-none -rotate-6";

function HeroEmotionIcon({
  emotion,
  className = "",
}: {
  emotion: HeroEmotion;
  className?: string;
}) {
  return (
    <img
      src={HERO_EMOTION_SRC[emotion]}
      alt=""
      aria-hidden
      draggable={false}
      className={`block shrink-0 object-contain drop-shadow-sm ${className}`}
    />
  );
}

export const HERO_READ_STEP_MS = 520;
/** Fired when touch hero tagline sequence finishes (incl. “complex care”). */
export const HERO_TOUCH_INTRO_COMPLETE = "portfolio:hero-touch-intro-complete";
/** Touch-only headline intro pacing (20% faster than baseline). */
const TOUCH_INTRO_SPEED = 0.8;
const touchMs = (ms: number) => Math.round(ms * TOUCH_INTRO_SPEED);
const INTRO_STEP_MS = touchMs(520);
const COMPLEX_RECEDE_MS = touchMs(560);
const READ_FADE_MS = touchMs(850);
/** Matches `.hero-touch-intro .hero-emoji-pop--anim` (0.576s, no stagger). */
const TOUCH_EMOJI_POP_MS = 576;
/** Faces start with “emotionally attuned”; the next phrase waits until the pop finishes. */
const PSYCH_AFTER_ATTUNED_MS = TOUCH_EMOJI_POP_MS + touchMs(80);
const TOUCH_MARKER_DRAW_MS = touchMs(920);
const COMPLEX_INTRO_MS = touchMs(1200);

let heroTouchIntroComplete = false;

export function dispatchHeroTouchIntroComplete() {
  if (heroTouchIntroComplete) return;
  heroTouchIntroComplete = true;
  window.dispatchEvent(new Event(HERO_TOUCH_INTRO_COMPLETE));
}

/** Runs immediately if the touch hero intro already finished (avoids missed events). */
export function subscribeHeroTouchIntroComplete(listener: () => void) {
  if (heroTouchIntroComplete) {
    requestAnimationFrame(listener);
  }
  window.addEventListener(HERO_TOUCH_INTRO_COMPLETE, listener);
  return () =>
    window.removeEventListener(HERO_TOUCH_INTRO_COMPLETE, listener);
}

export function usePrefersNoHover() {
  const [noHover, setNoHover] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const apply = () => setNoHover(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return noHover;
}

/** Matches `md:hidden` phrase breaks in the hover headline (one phrase per line). */
function useHeroPhraseStacked() {
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 47.999rem)");
    const apply = () => setStacked(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return stacked;
}

export function ReadChunk({
  index,
  reading,
  visible,
  children,
  className = "",
}: {
  index?: number;
  reading?: boolean;
  visible?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const on =
    visible !== undefined ? visible : Boolean(reading);
  return (
    <span
      className={`hero-read-chunk ${on ? "hero-read-chunk--on" : ""} ${className}`}
      style={
        index !== undefined
          ? ({ "--read-i": index } as CSSProperties)
          : undefined
      }
    >
      {children}
    </span>
  );
}

function EmojiPop({
  className = "",
  popI,
  pinned,
  children,
}: {
  className?: string;
  popI: number;
  pinned: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!pinned) return;
    const root = ref.current;
    if (!root) return;

    let cancelled = false;
    let frame = 0;
    const arm = () => {
      frame = requestAnimationFrame(() => {
        if (!cancelled) setPlay(true);
      });
    };

    const imgs = [...root.querySelectorAll("img")];
    const pending = imgs.filter((img) => !img.complete || img.naturalWidth === 0);
    if (pending.length === 0) {
      arm();
    } else {
      let left = pending.length;
      const done = () => {
        left -= 1;
        if (left <= 0) arm();
      };
      pending.forEach((img) => {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      });
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [pinned]);

  return (
    <span
      ref={ref}
      className={`hero-emoji-pop relative inline-block drop-shadow-sm ${
        play ? "hero-emoji-pop--shown hero-emoji-pop--anim" : ""
      } ${className}`}
      style={{ "--pop-i": popI } as CSSProperties}
    >
      {children}
    </span>
  );
}

function AttunedPhraseHover({
  index,
  reading,
  stacked = false,
  onStackedFaces,
}: {
  index: number;
  reading: boolean;
  stacked?: boolean;
  onStackedFaces?: (show: boolean) => void;
}) {
  const [burst, setBurst] = useState(0);
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  const exitDone = useRef(0);

  const popWrap = (extra: string) =>
    `hero-emoji-pop relative drop-shadow-sm hero-emoji-pop--shown ${
      phase === "out" ? "hero-emoji-pop--exit" : "hero-emoji-pop--anim"
    } ${extra}`;

  const activate = () => {
    if (stacked) {
      onStackedFaces?.(true);
      return;
    }
    setPhase("in");
    setBurst((b) => b + 1);
    exitDone.current = 0;
  };

  const deactivate = () => {
    if (stacked) {
      onStackedFaces?.(false);
      return;
    }
    if (phase === "in") setPhase("out");
  };

  const onPopAnimEnd = () => {
    if (phase !== "out") return;
    exitDone.current += 1;
    if (exitDone.current >= 3) setPhase("idle");
  };

  return (
    <ReadChunk index={index} reading={reading}>
      <span
        tabIndex={0}
        className="group/attuned relative mx-0.5 inline-block cursor-pointer rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-slate-deep/40"
        onMouseEnter={activate}
        onMouseLeave={deactivate}
        onFocus={activate}
        onBlur={deactivate}
      >
        <em className="italic">emotionally attuned,</em>
        {!stacked && phase !== "idle" ? (
          <span
            key={burst}
            aria-hidden
            className="pointer-events-none absolute bottom-[calc(100%-0.1rem)] left-1/2 z-10 flex -translate-x-1/2 items-end gap-2"
          >
            <span
              className={popWrap("")}
              style={{ "--pop-i": 0 } as CSSProperties}
              onAnimationEnd={onPopAnimEnd}
            >
              <HeroEmotionIcon
                emotion="sad"
                className={`${ATTUNED_EMOTION_SIZE_HOVER_SAD} -rotate-[16deg]`}
              />
            </span>
            <span
              className={popWrap("mb-7 sm:mb-8")}
              style={{ "--pop-i": 1 } as CSSProperties}
              onAnimationEnd={onPopAnimEnd}
            >
              <HeroEmotionIcon emotion="happy" className={ATTUNED_EMOTION_SIZE_HOVER_HAPPY} />
            </span>
            <span
              className={popWrap("mb-1.5")}
              style={{ "--pop-i": 2 } as CSSProperties}
              onAnimationEnd={onPopAnimEnd}
            >
              <HeroEmotionIcon
                emotion="nervous"
                className={`${ATTUNED_EMOTION_SIZE_HOVER_NERVOUS} rotate-6`}
              />
            </span>
          </span>
        ) : null}
      </span>
    </ReadChunk>
  );
}

function AttunedPhraseIntro({ visible }: { visible: boolean }) {
  return (
    <ReadChunk visible={visible}>
      <em className="mx-0.5 italic">emotionally attuned,</em>
    </ReadChunk>
  );
}

/** No-hover faces beside "I design": large happy, smaller sad tucked beside it, nervous on the right. */
function TouchTaglineFaces({ pinned }: { pinned: boolean }) {
  if (!pinned) return null;

  return (
    <span aria-hidden>
      <span className="pointer-events-none absolute right-[calc(100%+0.7em)] bottom-[0.15em] z-10">
        <span className="relative block w-[1.4875em]">
          <EmojiPop popI={0} pinned={pinned}>
            <HeroEmotionIcon emotion="happy" className={ATTUNED_EMOTION_SIZE_INTRO_HAPPY} />
          </EmojiPop>
          <span className="absolute top-[50%] left-[50%]">
            <EmojiPop popI={1} pinned={pinned}>
              <HeroEmotionIcon emotion="sad" className={ATTUNED_EMOTION_SIZE_INTRO_SAD} />
            </EmojiPop>
          </span>
        </span>
      </span>
      {/* Sad hangs 0.174em below the happy box; match that bottom. */}
      <span className="pointer-events-none absolute bottom-[calc(0.15em-0.174em)] left-[calc(100%+0.55em)] z-10">
        <EmojiPop popI={2} pinned={pinned}>
          <HeroEmotionIcon emotion="nervous" className={ATTUNED_EMOTION_SIZE_INTRO_NERVOUS} />
        </EmojiPop>
      </span>
    </span>
  );
}

function PsychologyPhraseHover({ index, reading }: { index: number; reading: boolean }) {
  const [run, setRun] = useState(false);
  const [hold, setHold] = useState(false);
  const [reverse, setReverse] = useState(false);
  const hoveringRef = useRef(false);

  const beginReverse = useCallback(() => {
    setRun(false);
    setHold(false);
    setReverse(true);
  }, []);

  const resetHighlight = useCallback(() => {
    hoveringRef.current = false;
    if (!reverse && (run || hold)) beginReverse();
  }, [beginReverse, hold, reverse, run]);

  const playHighlight = useCallback(() => {
    hoveringRef.current = true;
    setReverse(false);
    setHold(false);
    setRun(false);
    requestAnimationFrame(() => setRun(true));
  }, []);

  const onInkAnimationEnd = (e: AnimationEvent<HTMLSpanElement>) => {
    if (e.animationName.includes("hero-marker-draw")) {
      setRun(false);
      if (hoveringRef.current) setHold(true);
      else beginReverse();
      return;
    }
    if (e.animationName.includes("hero-marker-undraw")) {
      setReverse(false);
    }
  };

  return (
    <ReadChunk index={index} reading={reading}>
      <span
        tabIndex={0}
        className="hero-marker mx-0.5 inline-block cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-slate-deep/35"
        onMouseEnter={playHighlight}
        onMouseLeave={resetHighlight}
        onFocus={playHighlight}
        onBlur={resetHighlight}
      >
        <span
          aria-hidden
          className={`hero-marker__ink ${run ? "hero-marker__ink--run" : ""} ${hold ? "hero-marker__ink--hold" : ""} ${reverse ? "hero-marker__ink--reverse" : ""}`}
          onAnimationEnd={onInkAnimationEnd}
        />
        <em className="relative italic">psychology-driven</em>
      </span>
    </ReadChunk>
  );
}

function PsychologyPhraseIntro({
  visible,
  highlightPinned,
}: {
  visible: boolean;
  highlightPinned: boolean;
}) {
  const [run, setRun] = useState(false);
  const [hold, setHold] = useState(false);
  const played = useRef(false);

  const playHighlight = useCallback(() => {
    setRun(false);
    requestAnimationFrame(() => setRun(true));
  }, []);

  useEffect(() => {
    if (!visible || played.current) return;
    played.current = true;
    playHighlight();
  }, [visible, playHighlight]);

  useEffect(() => {
    if (highlightPinned) setHold(true);
  }, [highlightPinned]);

  const onInkAnimationEnd = (e: AnimationEvent<HTMLSpanElement>) => {
    if (e.animationName.includes("hero-marker-draw")) {
      setRun(false);
      setHold(true);
    }
  };

  return (
    <ReadChunk visible={visible}>
      <span className="hero-marker mx-0.5 inline-block">
        <span
          aria-hidden
          className={`hero-marker__ink ${run ? "hero-marker__ink--run" : ""} ${hold ? "hero-marker__ink--hold" : ""}`}
          onAnimationEnd={onInkAnimationEnd}
        />
        <em className="relative italic">psychology-driven</em>
      </span>
    </ReadChunk>
  );
}

function ComplexCarePhraseHover({ index, reading }: { index: number; reading: boolean }) {
  const text = "complex care systems.";
  const [phase, setPhase] = useState<"idle" | "engaged" | "receding">("idle");
  const recedeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const engage = () => {
    if (recedeTimer.current) clearTimeout(recedeTimer.current);
    setPhase("engaged");
  };

  const recede = () => {
    if (phase === "idle") return;
    setPhase("receding");
    if (recedeTimer.current) clearTimeout(recedeTimer.current);
    recedeTimer.current = setTimeout(() => setPhase("idle"), 560);
  };

  useEffect(
    () => () => {
      if (recedeTimer.current) clearTimeout(recedeTimer.current);
    },
    [],
  );

  return (
    <ReadChunk index={index} reading={reading}>
      <strong
        tabIndex={0}
        className={`hero-complex relative inline-block cursor-pointer font-semibold outline-none focus-visible:ring-2 focus-visible:ring-slate-deep/35 ${phase === "engaged" ? "hero-complex--engaged" : ""} ${phase === "receding" ? "hero-complex--receding" : ""}`}
        onMouseEnter={engage}
        onMouseLeave={recede}
        onFocus={engage}
        onBlur={recede}
      >
        <span
          aria-hidden
          className="hero-complex__shine-wrap pointer-events-none absolute inset-0 -z-10 rounded-sm"
        >
          <span className="hero-shine absolute inset-0 rounded-sm" />
        </span>
        {text.split("").map((char, i) => (
          <span
            key={`${char}-${i}`}
            className="hero-jump-letter inline-block"
            style={{ "--jump-i": i } as CSSProperties}
          >
            {char === " " ? "\u00a0" : char}
          </span>
        ))}
      </strong>
    </ReadChunk>
  );
}

function ComplexCarePhraseIntro({
  visible,
  playOnce,
}: {
  visible: boolean;
  playOnce: boolean;
}) {
  const text = "complex care systems.";
  const [phase, setPhase] = useState<"idle" | "engaged" | "receding">("idle");
  const played = useRef(false);
  const recedeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!playOnce || !visible || played.current) return;
    played.current = true;
    setPhase("engaged");
    recedeTimer.current = setTimeout(() => setPhase("receding"), COMPLEX_INTRO_MS);
    const idleTimer = setTimeout(
      () => setPhase("idle"),
      COMPLEX_INTRO_MS + COMPLEX_RECEDE_MS,
    );
    return () => {
      clearTimeout(recedeTimer.current ?? undefined);
      clearTimeout(idleTimer);
    };
  }, [playOnce, visible]);

  return (
    <ReadChunk visible={visible}>
      <strong
        className={`hero-complex relative inline-block font-semibold ${phase === "engaged" ? "hero-complex--engaged" : ""} ${phase === "receding" ? "hero-complex--receding" : ""}`}
      >
        <span
          aria-hidden
          className="hero-complex__shine-wrap pointer-events-none absolute inset-0 -z-10 rounded-sm"
        >
          <span className="hero-shine absolute inset-0 rounded-sm" />
        </span>
        {text.split("").map((char, i) => (
          <span
            key={`${char}-${i}`}
            className="hero-jump-letter inline-block"
            style={{ "--jump-i": i } as CSSProperties}
          >
            {char === " " ? "\u00a0" : char}
          </span>
        ))}
      </strong>
    </ReadChunk>
  );
}

const h1Class =
  "mx-auto max-w-[920px] font-primary text-h1 leading-[1.32] text-pretty md:text-balance md:leading-[1.38]";

/** One tagline phrase. Below `md` these stack and never break internally. */
function HoverPhrase({
  children,
  trailing = true,
}: {
  children: ReactNode;
  trailing?: boolean;
}) {
  return (
    <>
      <span className="hero-hover-phrase max-md:whitespace-nowrap">{children}</span>
      {trailing ? (
        <>
          <span aria-hidden className="hidden md:inline">
            {" "}
          </span>
          <br className="md:hidden" aria-hidden />
        </>
      ) : null}
    </>
  );
}

/** No-hover hero. The wrapper is the size container; `.hero-touch-intro` scales to it. */
const h1TouchClass = "w-full font-primary";

function TouchPhraseLine({ children }: { children: ReactNode }) {
  return <span className="block whitespace-nowrap">{children}</span>;
}

function HeroHeadlineHover({ pending = false }: { pending?: boolean }) {
  const stacked = useHeroPhraseStacked();
  const [attunedFaces, setAttunedFaces] = useState(false);

  return (
    <h1
      className={`${h1Class} hero-hover-stack rise ${pending ? "hero-touch-pending" : ""}`}
    >
      <HoverPhrase>
        <span className="relative inline-block">
          <ReadChunk index={0} reading={false}>
            I design
          </ReadChunk>
          {stacked ? <TouchTaglineFaces pinned={attunedFaces} /> : null}
        </span>
      </HoverPhrase>
      <HoverPhrase>
        <AttunedPhraseHover
          index={1}
          reading={false}
          stacked={stacked}
          onStackedFaces={setAttunedFaces}
        />
      </HoverPhrase>
      <HoverPhrase>
        <PsychologyPhraseHover index={2} reading={false} />
      </HoverPhrase>
      <HoverPhrase>
        <ReadChunk index={3} reading={false}>
          solutions for
        </ReadChunk>
      </HoverPhrase>
      <HoverPhrase trailing={false}>
        <ComplexCarePhraseHover index={4} reading={false} />
      </HoverPhrase>
    </h1>
  );
}

function HeroHeadlineTouchIntro() {
  const [stage, setStage] = useState(-1);
  const [emojiPinned, setEmojiPinned] = useState(false);
  const [highlightPinned, setHighlightPinned] = useState(false);
  const [playComplex, setPlayComplex] = useState(false);
  const [introStarted, setIntroStarted] = useState(false);

  useEffect(() => {
    heroTouchIntroComplete = false;
    setStage(-1);
    setEmojiPinned(false);
    setHighlightPinned(false);
    setPlayComplex(false);

    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (ms: number, fn: () => void) => {
      timers.push(setTimeout(fn, ms));
    };

    const skipIntro =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.location.hash.replace(/^#/, "") !== "";

    if (skipIntro) {
      schedule(0, () => {
        setIntroStarted(true);
        setStage(6);
        setEmojiPinned(true);
        setHighlightPinned(true);
        setPlayComplex(true);
      });
      schedule(touchMs(80), () => dispatchHeroTouchIntroComplete());
      return () => timers.forEach(clearTimeout);
    }

    Object.values(HERO_EMOTION_SRC).forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    let t = 0;
    schedule(t, () => {
      setIntroStarted(true);
      setStage(0);
    });
    t += INTRO_STEP_MS;
    schedule(t, () => setStage(1));
    t += INTRO_STEP_MS;
    const attunedAt = t;
    schedule(t, () => {
      setStage(2);
      setEmojiPinned(true);
    });
    t = attunedAt + PSYCH_AFTER_ATTUNED_MS;
    schedule(t, () => setStage(3));
    t += TOUCH_MARKER_DRAW_MS;
    schedule(t, () => {
      setHighlightPinned(true);
      setStage(4);
    });
    t += INTRO_STEP_MS;
    schedule(t, () => setStage(5));
    t += INTRO_STEP_MS;
    schedule(t, () => {
      setStage(6);
      setPlayComplex(true);
    });
    t += COMPLEX_INTRO_MS + COMPLEX_RECEDE_MS;
    schedule(t, () => dispatchHeroTouchIntroComplete());

    return () => timers.forEach(clearTimeout);
  }, []);

  const show = (min: number) => stage >= min;

  return (
    <div className="@container mx-auto w-full max-w-[920px]">
      <h1
        className={`${h1TouchClass} hero-touch-intro ${introStarted ? "" : "rise"}`}
      >
        <TouchPhraseLine>
          <span className="relative inline-block">
            <ReadChunk visible={show(0)}>I</ReadChunk>
            <span aria-hidden> </span>
            <ReadChunk visible={show(1)}>design</ReadChunk>
            <TouchTaglineFaces pinned={emojiPinned} />
          </span>
        </TouchPhraseLine>
        <TouchPhraseLine>
          <AttunedPhraseIntro visible={show(2)} />
        </TouchPhraseLine>
        <TouchPhraseLine>
          <PsychologyPhraseIntro
            visible={show(3)}
            highlightPinned={highlightPinned}
          />
        </TouchPhraseLine>
        <TouchPhraseLine>
          <ReadChunk visible={show(4)}>solutions</ReadChunk>
          <span aria-hidden> </span>
          <ReadChunk visible={show(5)}>for</ReadChunk>
        </TouchPhraseLine>
        <TouchPhraseLine>
          <ComplexCarePhraseIntro visible={show(6)} playOnce={playComplex} />
        </TouchPhraseLine>
      </h1>
    </div>
  );
}

export function HeroHeadline() {
  const noHover = usePrefersNoHover();

  if (noHover === null) {
    return <HeroHeadlineHover pending />;
  }

  if (noHover) return <HeroHeadlineTouchIntro />;
  return <HeroHeadlineHover />;
}
