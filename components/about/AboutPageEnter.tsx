"use client";

import type { ReactNode } from "react";
import { usePageEnterReplay } from "@/lib/pageEnterReplay";
import { useTouchContentReveal } from "@/lib/touchLandingSequence";

type AboutPageEnterProps = {
  hero: ReactNode;
  narrative: ReactNode;
  footer: ReactNode;
};

/** Touch fade + page-enter replay — same landing rhythm as home (without touch hero intro). */
export function AboutPageEnter({ hero, narrative, footer }: AboutPageEnterProps) {
  const mainRef = usePageEnterReplay<HTMLElement>();
  const contentFade = useTouchContentReveal();

  return (
    <>
      <main
        ref={mainRef}
        id="top"
        className="about-landing page-enter"
      >
        {hero}
        <div className={contentFade}>{narrative}</div>
      </main>
      <div className={contentFade}>{footer}</div>
    </>
  );
}
