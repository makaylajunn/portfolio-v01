/* ==========================================================================
   CASE STUDY CONTENT SCHEMA
   One object = one case study page. Every section is optional except the hero,
   so a lighter project can skip chapters without breaking the layout.

   Writing rules baked into the shape (from the storytelling lessons):
   - Headings come in pairs: a general `eyebrow` + an insightful `heading`.
   - Descriptions are short chunks (`string[]`), never one wall of text.
   - Every design change answers "why", not just "what".
   ========================================================================== */

export type Ratio = "21/9" | "16/9" | "16/10" | "4/3" | "1/1" | "3/4";

/** A slot for an asset. Leave `src` empty to show the placeholder. */
export type ImageSpec = {
  /** Drop the file in /public/work/<slug>/ and set e.g. "/work/carepotal/hero.png". */
  src?: string;
  alt: string;
  /** What to drop here. Shown on the placeholder, e.g. "Before: checkout · 1600 × 1200". */
  label: string;
  ratio?: Ratio;
};

export type Stat = { value: string; label: string };

/* ---------- Hero ---------- */

export type Hero = {
  /** Insightful title: action verb + user + metric + specifics. Not "Mobile App". */
  title: string;
  /** One sentence. The whole story in a breath. */
  summary: string;
  period: string;
  image: ImageSpec;
  /** Up to 4 quick facts: Role, Team, Scope, Tools. */
  snapshot: { label: string; value: string }[];
  /** 2 to 3 headline outcomes. The ending comes first. */
  outcomes: Stat[];
  links?: { label: string; href: string }[];
};

/* ---------- Context ---------- */

export type Context = {
  eyebrow?: string;
  heading: string;
  /** Writing rhythm: opener, a few details, a closer. Short sentences. */
  body: string[];
};

/* ---------- Problem / opportunity ---------- */

export type Problem = {
  eyebrow?: string;
  heading: string;
  /** The problem statement in one or two sentences. Shown large. */
  statement: string;
  /**
   * Framework cards. For a problem: User job, Why it mattered, Impact, Goals.
   * For an opportunity: Status quo, If nothing changed, Desired outcome.
   */
  framework: { label: string; body: string }[];
  /** Visualise it: a flow, a zoomed-in screen, or a contextual photo. */
  visual?: ImageSpec;
  /** Numbered pins that explain the visual. Keep to 3 or fewer. */
  annotations?: string[];
};

/* ---------- Design changes ---------- */

export type ChangeMedia =
  | { type: "single"; image: ImageSpec }
  | { type: "beforeAfter"; before: ImageSpec; after: ImageSpec }
  | {
      type: "variants";
      options: {
        label: string;
        image: ImageSpec;
        note: string;
        chosen?: boolean;
      }[];
    }
  | {
      type: "flow";
      /** The big picture. */
      flow: ImageSpec;
      /** Close-ups of the craft. 2 to 3 works best. */
      details: ImageSpec[];
    };

export type DesignChange = {
  /** General label, e.g. "Change 01 · User flow". */
  eyebrow: string;
  /** Insightful heading that states a decision or a learning. */
  heading: string;
  /** Writing rhythm: 1 sentence, a few sentences, 1 sentence. */
  body: string[];
  /** The "why" in one line. Shown as a pull-out. */
  because?: string;
  /** Optional trade-off you accepted. */
  tradeoff?: string;
  media: ChangeMedia;
};

export type DesignChanges = {
  eyebrow?: string;
  heading: string;
  intro?: string;
  /** 2 to 5 changes. More than that and the story gets lost. */
  changes: DesignChange[];
};

/* ---------- Retrospective ---------- */

export type ImpactLens = {
  lens: "Users" | "Business" | "Process" | "You";
  title: string;
  body: string;
  stats?: Stat[];
  /** Mark true when the numbers are estimates. Shows a "hypothetical" tag. */
  hypothetical?: boolean;
};

export type Retrospective = {
  eyebrow?: string;
  heading: string;
  intro?: string;
  impact: ImpactLens[];
  learnings: { title: string; body: string }[];
  /** "If I had more time..." */
  whatIf?: string[];
  /** Where the product could go next. */
  nextSteps?: string[];
  /** Something from the heart. One or two sentences. */
  reflection?: string;
};

/* ---------- Whole page ---------- */

export type CaseStudyContent = {
  slug: string;
  hero: Hero;
  context?: Context;
  problem?: Problem;
  design?: DesignChanges;
  retrospective?: Retrospective;
  /** Slug of the case study to suggest next. */
  next?: string;
};
