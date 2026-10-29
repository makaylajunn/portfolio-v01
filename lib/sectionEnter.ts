const STORAGE_KEY = "portfolio:section-enter";

export type SectionEnterTarget = "home" | "work" | "play" | "contact";

export function markSectionEnter(target: SectionEnterTarget) {
  try {
    sessionStorage.setItem(STORAGE_KEY, target);
  } catch {
    /* private mode / blocked storage */
  }
}

export function peekSectionEnter(target: SectionEnterTarget): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === target;
  } catch {
    return false;
  }
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

/** Home load after leaving another route (logo, work, fun — not contact; footer owns that). */
export function peekCrossPageHomeEnter(): boolean {
  return (
    peekSectionEnter("home") ||
    peekSectionEnter("work") ||
    peekSectionEnter("play")
  );
}

export function consumeCrossPageHomeEnter(): boolean {
  return (
    consumeSectionEnter("home") ||
    consumeSectionEnter("work") ||
    consumeSectionEnter("play")
  );
}
