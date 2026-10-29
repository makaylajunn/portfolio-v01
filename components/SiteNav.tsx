"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoWordmark } from "@/components/LogoWordmark";
import { NavPill } from "@/components/NavPill";
import { LogoSparkle } from "@/components/LogoSparkle";
import {
  CursorIcon,
  EmailIcon,
  FrogIcon,
  SmileyIcon,
} from "@/components/icons/UiIcons";
import { useActiveNavSection } from "@/components/useActiveNavSection";
import {
  scrollContactIntoView,
  scrollToSectionId,
  scrollToPageTop,
} from "@/lib/smoothScroll";
import { markSectionEnter } from "@/lib/sectionEnter";
import { useEffect, useState, type MouseEvent } from "react";

export function SiteNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onAbout = pathname === "/about";
  /** Pages that include ContactFooter with id="contact". */
  const onPageWithContact = onHome || onAbout;
  const { scene: activeScene, selectScene } = useActiveNavSection(
    onHome,
    onAbout,
  );

  const workHref = onHome ? "#work" : "/#work";
  const funHref = onHome ? "#play" : "/#play";
  const contactHref = onPageWithContact ? "#contact" : "/#contact";

  function goToSection(
    event: MouseEvent<HTMLElement>,
    scene: "work" | "fun" | "contact",
    sectionId: string,
  ) {
    selectScene(scene);
    if (onHome) {
      event.preventDefault();
      if (sectionId === "contact") {
        markSectionEnter("contact");
        scrollContactIntoView();
      } else scrollToSectionId(sectionId);
      return;
    }
    if (onAbout && sectionId === "contact") {
      event.preventDefault();
      markSectionEnter("contact");
      scrollContactIntoView();
      return;
    }
    if (
      !onHome &&
      (sectionId === "work" || sectionId === "play")
    ) {
      event.preventDefault();
      markSectionEnter(sectionId === "work" ? "work" : "play");
      window.location.assign(`/#${sectionId}`);
    }
  }

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;

    let attempts = 0;
    let frame = 0;

    function tryScroll() {
      if (document.getElementById(hash)) {
        if (hash === "contact") scrollContactIntoView();
        else scrollToSectionId(hash);
        return;
      }
      if (attempts++ < 24) {
        frame = requestAnimationFrame(tryScroll);
      }
    }

    frame = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  function goToTop(event: MouseEvent<HTMLAnchorElement>) {
    if (!onHome) return;
    scrollToPageTop(event);
  }

  const [logoSparklePlay, setLogoSparklePlay] = useState(0);

  const logoClass =
    "group flex shrink-0 items-center gap-0.5 whitespace-nowrap font-logo text-[clamp(1.25rem,6.71cqi,1.875rem)] leading-none lowercase";

  function playLogoSparkle() {
    setLogoSparklePlay((n) => n + 1);
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full max-w-full overflow-x-clip px-4 pt-4 sm:px-6 md:px-10">
      <nav
        aria-label="Primary"
        className="@container pointer-events-auto mx-auto flex h-14 w-full min-w-0 max-w-[1120px] items-center justify-between gap-2 rounded-full border border-white/70 bg-white/40 pr-5 pl-3 shadow-glass backdrop-blur-xl backdrop-saturate-150 @min-[36rem]:pr-3 @min-[36rem]:pl-5"
      >
        {onHome ? (
          <a
            href="#top"
            className={logoClass}
            aria-label="Makayla Jun, back to top"
            onClick={goToTop}
            onMouseEnter={playLogoSparkle}
            onFocus={playLogoSparkle}
          >
            <LogoWordmark />
            <LogoSparkle
              className="size-[clamp(1rem,5.37cqi,1.5rem)] shrink-0"
              playToken={logoSparklePlay}
            />
          </a>
        ) : (
          <a
            href="/"
            className={logoClass}
            aria-label="Makayla Jun, home"
            onClick={() => markSectionEnter("home")}
            onMouseEnter={playLogoSparkle}
            onFocus={playLogoSparkle}
          >
            <LogoWordmark />
            <LogoSparkle
              className="size-[clamp(1rem,5.37cqi,1.5rem)] shrink-0"
              playToken={logoSparklePlay}
            />
          </a>
        )}

        <div className="flex min-w-0 shrink items-center gap-1 @min-[36rem]:shrink-0 @min-[36rem]:gap-2">
          <NavPill
            href={workHref}
            scene="work"
            reload={workHref.startsWith("/")}
            active={activeScene === "work"}
            onSelect={(event) => goToSection(event, "work", "work")}
            aria-current={activeScene === "work" ? "true" : undefined}
            icon={
              <CursorIcon className="size-[clamp(1rem,4.47cqi,1.25rem)] pl-px" />
            }
          >
            work
          </NavPill>
          <NavPill
            href={funHref}
            scene="fun"
            reload={funHref.startsWith("/")}
            active={activeScene === "fun"}
            onSelect={(event) => goToSection(event, "fun", "play")}
            aria-current={activeScene === "fun" ? "true" : undefined}
            icon={<FrogIcon className="size-[clamp(1rem,4.47cqi,1.25rem)]" />}
          >
            fun
          </NavPill>
          <NavPill
            href="/about"
            scene="about"
            reload={onHome}
            active={activeScene === "about"}
            onSelect={
              onAbout
                ? (event) => {
                    event.preventDefault();
                    window.scrollTo(0, 0);
                  }
                : () => selectScene("about")
            }
            aria-current={activeScene === "about" ? "page" : undefined}
            icon={<SmileyIcon className="size-[clamp(1rem,4.47cqi,1.25rem)]" />}
          >
            about
          </NavPill>
          <NavPill
            href={contactHref}
            scene="contact"
            reload={contactHref.startsWith("/")}
            active={activeScene === "contact"}
            onSelect={(event) => goToSection(event, "contact", "contact")}
            aria-current={activeScene === "contact" ? "true" : undefined}
            icon={<EmailIcon className="size-[clamp(1rem,4.47cqi,1.25rem)]" />}
          >
            contact
          </NavPill>
        </div>
      </nav>
    </header>
  );
}
