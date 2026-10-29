"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NavPillScene } from "@/components/NavPill";
import { NAV_SCROLL_LOCK_MS } from "@/lib/smoothScroll";

function sceneFromHash(hash: string): NavPillScene | null {
  switch (hash.replace(/^#/, "")) {
    case "work":
      return "work";
    case "play":
      return "fun";
    case "contact":
      return "contact";
    default:
      return null;
  }
}

/** Selected pill styling after a click on home, or always on /about. Cleared when the user scrolls. */
export function useActiveNavSection(onHome: boolean, onAbout: boolean) {
  const [clickedScene, setClickedScene] = useState<NavPillScene | null>(null);
  const navClickLock = useRef(0);

  const selectScene = useCallback((next: NavPillScene) => {
    navClickLock.current = Date.now();
    setClickedScene(next);
  }, []);

  const scene: NavPillScene | null = onAbout
    ? (clickedScene ?? "about")
    : onHome
      ? clickedScene
      : null;

  useEffect(() => {
    if (!onHome) return;

    const syncFromHash = () => {
      const fromHash = sceneFromHash(window.location.hash);
      if (fromHash) {
        setClickedScene(fromHash);
        navClickLock.current = Date.now();
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [onHome]);

  useEffect(() => {
    const trackScroll = onHome || (onAbout && clickedScene !== null);
    if (!trackScroll) return;

    const onScroll = () => {
      if (Date.now() - navClickLock.current < NAV_SCROLL_LOCK_MS) return;
      setClickedScene(null);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome, onAbout, clickedScene]);

  return { scene, selectScene };
}
