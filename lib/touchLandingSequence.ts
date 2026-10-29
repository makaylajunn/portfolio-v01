"use client";

import {
  subscribeHeroTouchIntroComplete,
  usePrefersNoHover,
} from "@/components/home/HeroHeadline";
import { PAGE_RISE_MS } from "@/lib/pageEnterReplay";
import { useEffect, useState } from "react";

/** Keep in sync with `.home-touch-fade--in` transition in globals.css */
export const TOUCH_BLOCK_FADE_MS = 1150;

/** 0 = tagline only; 1 = subtext; 2 = the rest of the page */
export type TouchLandingStep = 0 | 1 | 2;

function touchBlockClass(
  minStep: TouchLandingStep,
  noHover: boolean | null,
  step: number,
): string {
  if (noHover === false) return "";
  if (noHover === null) return "home-touch-fade--wait";
  return step >= minStep ? "home-touch-fade--in" : "home-touch-fade--wait";
}

function skipTouchLandingSequence() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return window.location.hash.replace(/^#/, "") !== "";
}

/** Touch landing: tagline intro → subtext fade → the rest of the page. */
export function useTouchLandingSequence() {
  const noHover = usePrefersNoHover();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (noHover === false) setStep(2);
  }, [noHover]);

  useEffect(() => {
    if (noHover !== true) return;

    if (skipTouchLandingSequence()) {
      setStep(2);
      return;
    }

    setStep(0);

    const timers: ReturnType<typeof setTimeout>[] = [];

    const unsub = subscribeHeroTouchIntroComplete(() => {
      requestAnimationFrame(() => {
        setStep(1);
        timers.push(
          setTimeout(() => setStep(2), TOUCH_BLOCK_FADE_MS),
        );
      });
    });

    return () => {
      unsub();
      timers.forEach(clearTimeout);
    };
  }, [noHover]);

  return (minStep: TouchLandingStep) =>
    touchBlockClass(minStep, noHover, step);
}

/**
 * About (and similar pages): after hero `.rise` finishes, fade in the rest like home step 2.
 * Hover / reduced-motion: show everything immediately.
 */
export function useTouchContentReveal(afterHeroMs = PAGE_RISE_MS) {
  const noHover = usePrefersNoHover();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (noHover === false) {
      setStep(2);
      return;
    }
    if (noHover === null) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(2);
      return;
    }

    setStep(0);
    const t = setTimeout(() => setStep(2), afterHeroMs);
    return () => clearTimeout(t);
  }, [noHover, afterHeroMs]);

  return touchBlockClass(2, noHover, step);
}
