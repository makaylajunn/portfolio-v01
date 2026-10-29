/* ==========================================================================
   About page content. Edit copy here.
   ========================================================================== */

import type { ReactNode } from "react";
import { createElement } from "react";
import type { ImageSpec } from "@/lib/case-studies/types";

export const ABOUT_HERO = {
  eyebrow: "About me",
  titleStart: "I've been visualizing stories since I was 8,",
  titleEm: "first in PowerPoint.",
  summary:
    "I believe all products tell a story through the experience they create. The more people connect with a product's story, the more they love using that product. When I was 8, I'd use Microsoft PowerPoint to create stories using slide animations to move clipart characters across the screen.",
  photo: {
    src: undefined as string | undefined,
    alt: "Portrait of Makayla Jun",
    label: "Pro portrait · 1200 × 1500",
  },
  photoSecondary: {
    src: undefined as string | undefined,
    alt: "Makayla Jun at work",
    label: "Candid · 1:1",
  },
};

export type AboutNarrativeBeat = {
  body: ReactNode;
  /** Lead and closer use serif; middle beat uses secondary body style. */
  tone: "lead" | "body" | "closer";
  image: ImageSpec;
  imageSide: "left" | "right";
  /** Placeholder gradient when `image.src` is empty. */
  imageTone: string;
};

export const ABOUT_NARRATIVE_BEATS: AboutNarrativeBeat[] = [
  {
    tone: "lead",
    body: "My journey into Product Design had unexpected moments. I discovered my love for coding and design when I learned HTML, CSS, and got exposed to the Adobe Suite products in high school Web Design classes. I got to mentor underclassmen to build websites and won 2nd place in a national FBLA competition for web design in 2015.",
    imageSide: "left",
    imageTone: "from-[#f8dccb] to-[#f1bfa4]",
    image: {
      src: undefined,
      alt: "Early visual storytelling — decks, comics, or competition work",
      label: "Early story work · 4:3 · e.g. deck still or FBLA screenshot",
      ratio: "4/3",
    },
  },
  {
    tone: "lead",
    body: [
      "After high school, I pivoted to the sciences to, ",
      createElement("em", { key: "yes" }, "yes"),
      ", become a doctor. I studied biochemistry, did undergraduate research on parasites, and worked as a Lead Microbiologist after graduating college in 2019. However, my love for design always stuck with me.",
    ],
    imageSide: "right",
    imageTone: "from-[#dfe8f4] to-[#c5d4e8]",
    image: {
      src: undefined,
      alt: "Biochemistry research and microbiology lab work",
      label: "Science path · 4:3 · lab or research photo",
      ratio: "4/3",
    },
  },
  {
    tone: "closer",
    body: "I eventually decided to take a leap and fully embrace my calling as a designer. I started my journey through freelance work. I designed video conferencing platforms and AR/AI enabled products. I completed my Google UX Design Certification and got a M.A. in Psychology in 2022.",
    imageSide: "left",
    imageTone: "from-[#dfe8d6] to-[#c5d6b8]",
    image: {
      src: undefined,
      alt: "Freelance product design — conferencing and AR/AI work",
      label: "Freelance era · 4:3 · product UI or work setup",
      ratio: "4/3",
    },
  },
  {
    tone: "closer",
    body: "Then, I got the most amazing opportunity to work for CarePortal in 2022. I was one of the founding designers and became a Product Design Manager. The designs and systems I created continue to fuel their mission of meeting needs of kids and families in crisis.",
    imageSide: "right",
    imageTone: "from-[#dfe8f4] to-[#c5d4e8]",
    image: {
      src: undefined,
      alt: "CarePortal product and team leadership",
      label: "CarePortal era · 4:3 · product UI or team photo",
      ratio: "4/3",
    },
  },
  {
    tone: "closer",
    body: "After successfully completing the projects I started at CarePortal, I was ready to take care of my family and develop myself further. I built systems for toddlerhood, reconnected with 2D art and singing, mentored aspiring designers, completed certifications, and went back full circle to my love of design and code through vibe coding.",
    imageSide: "left",
    imageTone: "from-[#dfe8d6] to-[#c5d6b8]",
    image: {
      src: undefined,
      alt: "Family, art, mentoring, and building in the present",
      label: "Now · 4:3 · art, family, or candid",
      ratio: "4/3",
    },
  },
  {
    tone: "closer",
    body: "My story is still being written, but I want my next chapter to continue being about building complex care systems. I'm passionate about designing solutions that emotionally resonate, people actually enjoy using, and leave an impact bigger than I can imagine.",
    imageSide: "right",
    imageTone: "from-[#f8dccb] to-[#dfe8f4]",
    image: {
      src: undefined,
      alt: "What's next — care systems and human-centered product work",
      label: "Next chapter · 4:3 · mood or work-in-progress",
      ratio: "4/3",
    },
  },
];
