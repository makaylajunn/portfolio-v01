"use client";

import { CONTAINER } from "@/components/case-study/shared";
import { LinkedInIcon, SubstackIcon } from "@/components/icons/BrandIcons";
import { PROFILE } from "@/lib/profile";
import { BackToTopLink } from "@/components/BackToTopLink";
import { consumeSectionEnter } from "@/lib/sectionEnter";
import {
  CONTACT_SCROLL_LOCK_CLASS,
  CONTACT_SECTION_ENTER,
} from "@/lib/smoothScroll";
import { useCallback, useEffect, useRef, useState } from "react";

/** Static year avoids prerender/hydration warnings from `new Date()` in the footer. */
const COPYRIGHT_YEAR = 2026;

const footerIconBtn =
  "grid size-11 place-items-center rounded-full border border-ink/15 bg-white/60 text-ink transition-[border-color,background-color,scale] duration-300 hover:scale-105 hover:border-slate-deep hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-deep";

/** 18px glyphs, same ink as the copy button stroke icons. */
const footerIconGlyph = "text-ink";

function CopyIcon({ className = "" }: { className?: string }) {
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
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function DownloadIcon({ className = "" }: { className?: string }) {
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
      <path d="M12 4v10M8 10l4 4 4-4M5 20h14" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function EmailWithCopy() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  }

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <p className="font-primary text-xl tracking-tight md:text-2xl">
        {PROFILE.email}
      </p>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        className={`${footerIconBtn} ${copied ? "border-slate-deep bg-white" : ""}`}
      >
        {copied ? (
          <CheckIcon className={`size-icon-md ${footerIconGlyph}`} />
        ) : (
          <CopyIcon className={`size-icon-md ${footerIconGlyph}`} />
        )}
      </button>
    </div>
  );
}

type ContactFooterProps = {
  /** Home uses the product CTA; About uses story-forward copy. */
  variant?: "home" | "about";
};

const footerHeadlineClass =
  "max-w-[14ch] font-primary text-display text-balance";

type FooterHeadlineWord = {
  key: string;
  text: string;
  emphasis?: boolean;
  period?: boolean;
  lineBreakAfter?: boolean;
};

const HOME_HEADLINE_WORDS: FooterHeadlineWord[] = [
  { key: "lets", text: "Let's" },
  { key: "build", text: "build" },
  { key: "products", text: "products" },
  { key: "people", text: "people" },
  { key: "love", text: "love", emphasis: true, period: true },
];

const ABOUT_HEADLINE_WORDS: FooterHeadlineWord[] = [
  { key: "lets", text: "Let's" },
  { key: "continue", text: "continue", lineBreakAfter: true },
  { key: "the", text: "the" },
  { key: "story", text: "story", lineBreakAfter: true },
  { key: "together", text: "together", emphasis: true, period: true },
];

const FOOTER_HEADLINE_BY_VARIANT = {
  home: HOME_HEADLINE_WORDS,
  about: ABOUT_HEADLINE_WORDS,
} as const;

const READ_IN_STAGGER_MS = 416;
const READ_IN_DURATION = "0.68s";

function ContactFooterHeadline({ variant }: { variant: "home" | "about" }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = FOOTER_HEADLINE_BY_VARIANT[variant];
  /** Hidden until contact scroll starts or the headline enters view — then hero read-in runs. */
  const [visible, setVisible] = useState(false);
  const enteredRef = useRef(false);

  const playFadeIn = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      enteredRef.current = true;
      setVisible(true);
      return;
    }
    enteredRef.current = true;
    setVisible(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  }, []);

  const resetHidden = useCallback(() => {
    enteredRef.current = false;
    setVisible(false);
  }, []);

  useEffect(() => {
    if (consumeSectionEnter("contact")) playFadeIn();
  }, [playFadeIn]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (
          document.documentElement.classList.contains(CONTACT_SCROLL_LOCK_CLASS)
        ) {
          return;
        }
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          if (!enteredRef.current) playFadeIn();
        } else if (!entry.isIntersecting) {
          resetHidden();
        }
      },
      { threshold: [0, 0.01, 0.08, 0.25] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [playFadeIn, resetHidden]);

  useEffect(() => {
    window.addEventListener(CONTACT_SECTION_ENTER, playFadeIn);
    return () =>
      window.removeEventListener(CONTACT_SECTION_ENTER, playFadeIn);
  }, [playFadeIn]);

  return (
    <h2
      ref={ref}
      className={`contact-footer-headline ${footerHeadlineClass}`}
    >
      {words.map((word, i) => (
        <span key={word.key}>
          <span
            className={`hero-read-chunk inline-block align-baseline${visible ? " hero-read-chunk--on" : ""}`}
            style={
              visible
                ? {
                    animationName: "hero-read-in",
                    animationDuration: READ_IN_DURATION,
                    animationTimingFunction: "cubic-bezier(0.25, 0.8, 0.25, 1)",
                    animationFillMode: "both",
                    animationDelay: `${i * READ_IN_STAGGER_MS}ms`,
                  }
                : { opacity: 0 }
            }
          >
            {word.emphasis ? <em>{word.text}</em> : word.text}
            {word.period ? "." : null}
          </span>
          {word.lineBreakAfter ? (
            <br aria-hidden />
          ) : i < words.length - 1 ? (
            " "
          ) : null}
        </span>
      ))}
    </h2>
  );
}

export function ContactFooter({ variant = "home" }: ContactFooterProps) {
  return (
    <footer id="contact" className="scroll-mt-20 p-4 md:scroll-mt-24 md:p-6">
      <div className="contact-footer-panel flex min-h-0 flex-col rounded-panel bg-sand pb-8 pt-14 max-md:h-[calc(100svh-6.5rem)] max-md:max-h-[calc(100svh-6.5rem)] md:min-h-[88svh] md:pb-14 md:pt-28">
        <div className={`${CONTAINER} flex min-h-0 flex-1 flex-col`}>
          <div className="flex min-h-0 flex-1 flex-col justify-center gap-6 py-6 md:gap-8 md:py-20">
            <ContactFooterHeadline variant={variant} />

            <EmailWithCopy />

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-4 font-secondary text-sm font-medium text-ink transition-[border-color,background-color] duration-300 hover:border-slate-deep hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-deep"
              >
                <DownloadIcon className="size-4" />
                Download resume
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className={footerIconBtn}
              >
                <LinkedInIcon className="size-icon-md text-base text-ink" />
              </a>
              <a
                href={PROFILE.substack}
                target="_blank"
                rel="noreferrer"
                aria-label="Substack"
                className={footerIconBtn}
              >
                <SubstackIcon className={footerIconGlyph} />
              </a>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-4 border-t border-ink/10 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="font-secondary text-xs text-ink">
              © {COPYRIGHT_YEAR} {PROFILE.name}. All rights reserved.
            </p>
            <BackToTopLink className="font-mono text-label uppercase text-ink transition-colors hover:text-slate-deep">
              Back to top ↑
            </BackToTopLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
