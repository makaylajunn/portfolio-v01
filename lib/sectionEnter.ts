const STORAGE_KEY = "portfolio:section-enter";
const SKIP_HERO_KEY = "portfolio:home-skip-hero";

export type SectionEnterTarget = "work" | "play" | "contact" | "top";

export function markSectionEnter(target: SectionEnterTarget) {
  try {
    sessionStorage.setItem(STORAGE_KEY, target);
  } catch {
    /* private mode / blocked storage */
  }
}

/** Full navigation to `/` from another route: skip touch hero intro; reveal like About. */
export function markHomeLandingFromOffPage(target: SectionEnterTarget) {
  markSectionEnter(target);
  try {
    sessionStorage.setItem(SKIP_HERO_KEY, "1");
  } catch {
    /* private mode / blocked storage */
  }
}

export function peekHomeSkipHeroIntro(): boolean {
  try {
    return sessionStorage.getItem(SKIP_HERO_KEY) === "1";
  } catch {
    return false;
  }
}

export function consumeHomeSkipHeroIntro(): boolean {
  try {
    if (sessionStorage.getItem(SKIP_HERO_KEY) === "1") {
      sessionStorage.removeItem(SKIP_HERO_KEY);
      return true;
    }
  } catch {
    /* ignore */
  }
  return false;
}

export function shouldHomeDirectLanding(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  if (window.location.hash.replace(/^#/, "") !== "") return true;
  return peekHomeSkipHeroIntro();
}

export function consumeSectionEnter(target: SectionEnterTarget): boolean {
  try {
    if (sessionStorage.getItem(STORAGE_KEY) === target) {
      sessionStorage.removeItem(STORAGE_KEY);
      return true;
    }
  } catch {
    /* ignore */
  }
  return false;
}
