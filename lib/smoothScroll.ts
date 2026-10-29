/** In-page nav scroll — ~15% slower and softer than a typical ~1s smooth scroll. */
export const NAV_SCROLL_DURATION_MS = 1150;

/** Keep the clicked pill “active” until the scroll animation finishes. */
export const NAV_SCROLL_LOCK_MS = NAV_SCROLL_DURATION_MS + 280;

function easeOutQuart(t: number) {
  return 1 - (1 - t) ** 4;
}

export function smoothScrollTo(
  top: number,
  durationMs = NAV_SCROLL_DURATION_MS,
  onComplete?: () => void,
) {
  const target = Math.max(0, top);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, target);
    onComplete?.();
    return;
  }

  const startY = window.scrollY;
  const delta = target - startY;
  if (delta === 0) {
    onComplete?.();
    return;
  }

  const start = performance.now();

  function frame(now: number) {
    const t = Math.min(1, (now - start) / durationMs);
    window.scrollTo(0, startY + delta * easeOutQuart(t));
    if (t < 1) requestAnimationFrame(frame);
    else onComplete?.();
  }

  requestAnimationFrame(frame);
}

export function scrollToSectionId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const pad =
    Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
    96;
  const top = el.getBoundingClientRect().top + window.scrollY - pad;
  smoothScrollTo(top);
}

/** Fired when a programmatic scroll to #contact begins (headline read-in runs in sync). */
export const CONTACT_SECTION_ENTER = "portfolio:contact-enter";

/** While set, footer IO should not re-trigger read-in during the contact scroll. */
export const CONTACT_SCROLL_LOCK_CLASS = "contact-scroll-lock";

/** Center #contact in the viewport (panel is sized to fit below the fixed nav). */
export function scrollContactIntoView(onComplete?: () => void) {
  const el = document.getElementById("contact");
  if (!el) return;

  const elTop = el.getBoundingClientRect().top + window.scrollY;
  const elHeight = el.offsetHeight;
  const viewport = window.innerHeight;
  let target = elTop - (viewport - elHeight) / 2;
  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - viewport,
  );
  target = Math.max(0, Math.min(target, maxScroll));

  document.documentElement.classList.add(CONTACT_SCROLL_LOCK_CLASS);
  window.dispatchEvent(new Event(CONTACT_SECTION_ENTER));

  const done = () => {
    document.documentElement.classList.remove(CONTACT_SCROLL_LOCK_CLASS);
    onComplete?.();
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, target);
    done();
    return;
  }

  smoothScrollTo(target, NAV_SCROLL_DURATION_MS, done);
}

export function scrollToPageTop(event?: { preventDefault: () => void }) {
  event?.preventDefault();
  smoothScrollTo(0);
}
