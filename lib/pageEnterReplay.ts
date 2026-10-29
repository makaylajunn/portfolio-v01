"use client";

import { useEffect, useRef } from "react";

/** Match `.rise` duration in globals.css */
export const PAGE_RISE_MS = 900;

function replayEnterAnimations(root: HTMLElement) {
  root.classList.remove("page-enter");
  void root.offsetHeight;
  root.classList.add("page-enter");

  root.querySelectorAll<HTMLElement>(".rise").forEach((node) => {
    const delay = node.style.getPropertyValue("--d");
    node.classList.remove("rise");
    void node.offsetHeight;
    node.classList.add("rise");
    if (delay) node.style.setProperty("--d", delay);
  });
}

/** Re-run page-enter / rise when the document is restored from bfcache. */
export function usePageEnterReplay<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted || !ref.current) return;
      replayEnterAnimations(ref.current);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return ref;
}
