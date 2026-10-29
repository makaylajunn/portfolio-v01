import type { CaseStudyContent } from "./types";

/* ==========================================================================
   CASE STUDY CONTENT

   HOW TO ADD ONE
   1. Copy a block below and change the `slug` (it becomes /work/<slug>).
   2. Fill in the copy. Anything in [square brackets] is a prompt for you.
   3. Drop images into /public/work/<slug>/ and set each `src`. Until then,
      the labelled placeholders show exactly what belongs where and what size.
   4. Delete any section you don't need. The layout adapts.

   THE STORY ORDER
   Outcome first (hero) -> Context -> Problem -> Design change -> Retrospective.
   Keep each text block to 1 to 4 short sentences. Explain the WHY.
   ========================================================================== */

export const CASE_STUDY_CONTENT: CaseStudyContent[] = [
  /* ------------------------------------------------------------------------
     01 · CarePortal core experience (the full template)
     ------------------------------------------------------------------------ */
  {
    slug: "carepotal-core-experience",
    next: "design-culture",

    hero: {
      title: "Rebuilt CarePortal’s core experience and lifted responder conversion 10%",
      summary:
        "I led the largest UX overhaul in CarePortal’s history: 22 features, including 0→1 initiatives. I replaced the legacy UI and rebuilt responder flows so leaders get more capacity and responders more confidence.",
      period: "Jun ’22 – Mar ’25",
      image: {
        alt: "The redesigned CarePortal experience",
        label: "Hero UI · 2400 × 1030",
        ratio: "21/9",
      },
      snapshot: [
        { label: "Role", value: "Lead Product Designer" },
        { label: "Timeline", value: "Jun ’22 – Mar ’25" },
        { label: "Team", value: "[e.g. 1 PM, 5 engineers, 1 designer]" },
        { label: "Scope", value: "22 features, beta + GA" },
      ],
      outcomes: [
        { value: "+10%", label: "responder conversion rate" },
        { value: "+16%", label: "growth in funded responses" },
        { value: "85%", label: "CSAT on the new response process" },
      ],
      links: [
        { label: "Dec ’24 beta launch", href: "#" },
        { label: "Mar ’25 GA launch", href: "#" },
      ],
    },

    context: {
      eyebrow: "Context",
      heading: "Twenty-two features, and one story to hold them together",
      body: [
        "[One sentence: what CarePortal is and who it serves.]",
        "I joined in June 2022 as CarePortal’s lead product designer. [What the product looked like on day one.] [Who I worked with, and what they needed from design.] [Why the overhaul became a priority.]",
        "So I stopped treating it as 22 separate features and started treating it as one experience.",
      ],
    },

    problem: {
      eyebrow: "Problem",
      heading: "Responders wanted to help, but [the step where they stalled] got in the way",
      statement:
        "[Responders] struggled to [finish the task they came to do], which meant [needs went unmet] and [the business lost X].",
      framework: [
        {
          label: "User job",
          body: "[What were responders trying to get done? Be specific about the moment.]",
        },
        {
          label: "Why it mattered",
          body: "[Why was this important to them? What was at stake?]",
        },
        {
          label: "The cost",
          body: "[What did it cost users and the business? Add a number if you have one.]",
        },
        {
          label: "Goal",
          body: "Raise responder conversion and funded responses, and make the response process feel effortless.",
        },
      ],
      visual: {
        alt: "Where responders dropped off in the original flow",
        label: "Problem in context · annotated flow · 1600 × 1000",
        ratio: "16/10",
      },
      annotations: [
        "[Pin 1: where the friction started]",
        "[Pin 2: what users did instead]",
        "[Pin 3: what that cost]",
      ],
    },

    design: {
      eyebrow: "Design change",
      heading: "Three decisions that moved the numbers",
      intro:
        "Twenty-two features is too many to walk through. These are the three that taught me the most.",
      changes: [
        {
          eyebrow: "Change 01 · User flow",
          heading: "I cut the response flow from [X steps] to [Y] because [reason]",
          body: [
            "[One sentence: what the old flow asked of users.]",
            "[What I noticed. What I tested. What I decided.] [A detail that shows your judgement, not just the outcome.]",
            "The new flow shipped in the Dec ’24 beta.",
          ],
          because: "[The real reason, in plain words. Not a UX textbook reason.]",
          tradeoff: "[What you gave up, and why it was worth it.]",
          media: {
            type: "beforeAfter",
            before: {
              alt: "The response flow before",
              label: "Before · response flow · 1600 × 1000",
              ratio: "16/10",
            },
            after: {
              alt: "The response flow after",
              label: "After · response flow · 1600 × 1000",
              ratio: "16/10",
            },
          },
        },
        {
          eyebrow: "Change 02 · Exploration",
          heading: "I explored three directions and chose B, because [reason]",
          body: [
            "[One sentence: the question these concepts tried to answer.]",
            "A felt like the safe choice. C was the boldest. B balanced [need 1] with [need 2], and it was the one users understood fastest.",
            "[What testing changed about my first instinct.]",
          ],
          because: "[Why B won. What the others taught you.]",
          media: {
            type: "variants",
            options: [
              {
                label: "A",
                note: "[Why it was tempting]",
                image: {
                  alt: "Concept A",
                  label: "Concept A · 1200 × 900",
                  ratio: "4/3",
                },
              },
              {
                label: "B",
                note: "[Why it won]",
                chosen: true,
                image: {
                  alt: "Concept B, the chosen direction",
                  label: "Concept B · 1200 × 900",
                  ratio: "4/3",
                },
              },
              {
                label: "C",
                note: "[Why it didn’t ship]",
                image: {
                  alt: "Concept C",
                  label: "Concept C · 1200 × 900",
                  ratio: "4/3",
                },
              },
            ],
          },
        },
        {
          eyebrow: "Change 03 · Craft",
          heading: "I sweated the small details because they decided whether people trusted it",
          body: [
            "[One sentence: the detail that mattered most.]",
            "[Why you placed it there. Why you designed it that way. What it prevented.]",
            "Small decisions, repeated 22 times, became the experience.",
          ],
          because: "[The reasoning behind the detail.]",
          media: {
            type: "flow",
            flow: {
              alt: "The full flow, zoomed out",
              label: "Full flow · zoomed out · 2000 × 1000",
              ratio: "16/9",
            },
            details: [
              {
                alt: "Detail one",
                label: "Detail 01 · 1000 × 1000",
                ratio: "1/1",
              },
              {
                alt: "Detail two",
                label: "Detail 02 · 1000 × 1000",
                ratio: "1/1",
              },
              {
                alt: "Detail three",
                label: "Detail 03 · 1000 × 1000",
                ratio: "1/1",
              },
            ],
          },
        },
      ],
    },

    retrospective: {
      eyebrow: "Retrospective",
      heading: "What it moved, and what it taught me",
      intro: "The numbers, then the part I think about most.",
      impact: [
        {
          lens: "Users",
          title: "Responders finished more of what they started",
          body: "More responders converted, more needs were funded, and the new process earned strong satisfaction.",
          stats: [
            { value: "+10%", label: "responder conversion" },
            { value: "+16%", label: "funded responses" },
            { value: "85%", label: "CSAT" },
          ],
        },
        {
          lens: "Business",
          title: "[The business outcome, in one line]",
          body: "[Connect the design to revenue, cost, or reputation. Say it’s an estimate if it is.]",
          hypothetical: true,
        },
        {
          lens: "Process",
          title: "[A process you improved]",
          body: "[Challenge → what you did → what changed. E.g. “Devs struggled with my Figma files, so I ran Figma sessions. Handoffs got faster.”]",
        },
        {
          lens: "You",
          title: "[Who you became on this project]",
          body: "[Your growth as a designer or leader. Be specific.]",
        },
      ],
      learnings: [
        {
          title: "[A specific learning about users]",
          body: "[What surprised you. How it changed the work.]",
        },
        {
          title: "[A specific learning about how you work]",
          body: "[What you’d do differently next time, and why.]",
        },
      ],
      whatIf: [
        "[Metric I would love to measure]",
        "[If I had more time, I would have…]",
      ],
      nextSteps: ["[Where the product could go next]"],
      reflection:
        "[One honest sentence from the heart. E.g. “I loved how much of this we built together.”]",
    },
  },

  /* ------------------------------------------------------------------------
     02 · Design culture (a lighter version: no exploration, no flow)
     ------------------------------------------------------------------------ */
  {
    slug: "design-culture",
    next: "impact-map",

    hero: {
      title: "Built the design system and accessibility practice a whole company runs on",
      summary:
        "I set up CarePortal’s design foundation: the design system, accessibility standards, user research, and mentoring. It has kept 3+ years of delivery consistent across dozens of launches.",
      period: "Jun ’22 – Now",
      image: {
        alt: "The design system in use",
        label: "Design system UI · 1600 × 1200",
        ratio: "21/9",
      },
      snapshot: [
        { label: "Role", value: "Design Systems & Accessibility Lead" },
        { label: "Timeline", value: "Jun ’22 – Now" },
        { label: "Team", value: "Design, dev, marketing" },
        { label: "Scope", value: "System, standards, research, mentoring" },
      ],
      outcomes: [
        { value: "100%", label: "design system adoption" },
        { value: "100%", label: "trained in accessibility best practices" },
      ],
    },

    context: {
      eyebrow: "Context",
      heading: "Everyone was designing. No one was designing together",
      body: [
        "[One sentence: what the team’s design looked like before.]",
        "[What it cost: inconsistency, slower handoffs, rework.] [Why a system, and why then.]",
      ],
    },

    problem: {
      eyebrow: "Opportunity",
      heading: "Getting buy-in was the hard part, not building the system",
      statement:
        "[Today, every team makes its own design decisions. Without a shared system, we ship slower and look less trustworthy.]",
      framework: [
        { label: "Status quo", body: "[Where things stood.]" },
        { label: "If nothing changed", body: "[What would have gotten worse.]" },
        { label: "Desired outcome", body: "[What good looks like.]" },
      ],
      visual: {
        alt: "Inconsistencies in the product before the system",
        label: "Before the system · audit collage · 1600 × 1000",
        ratio: "16/10",
      },
    },

    design: {
      eyebrow: "Design change",
      heading: "How I earned adoption",
      changes: [
        {
          eyebrow: "Change 01 · The system",
          heading: "I started small, so the system proved itself before it asked for trust",
          body: [
            "[One sentence: the first component you shipped.]",
            "[Why that one. How people reacted. What you did next.]",
          ],
          because: "[Why you sequenced it that way.]",
          media: {
            type: "single",
            image: {
              alt: "Design system components",
              label: "Components · 1600 × 1000",
              ratio: "16/10",
            },
          },
        },
        {
          eyebrow: "Change 02 · Accessibility",
          heading: "I made accessibility a habit, not a checklist",
          body: [
            "[One sentence: how you introduced it.]",
            "[The training, the defaults baked into the system, how you made it easy.]",
          ],
          because: "[Why you built it into the system rather than a review step.]",
          media: {
            type: "single",
            image: {
              alt: "Accessibility guidance inside the system",
              label: "Accessibility docs · 1600 × 1000",
              ratio: "16/10",
            },
          },
        },
      ],
    },

    retrospective: {
      eyebrow: "Retrospective",
      heading: "A system is only real when people use it",
      impact: [
        {
          lens: "Process",
          title: "One shared language across three teams",
          body: "Design, dev, and marketing all build from the same system.",
          stats: [
            { value: "100%", label: "design system adoption" },
            { value: "100%", label: "accessibility training" },
          ],
        },
        {
          lens: "You",
          title: "[What mentoring taught you]",
          body: "[Specific, honest, personal.]",
        },
      ],
      learnings: [
        {
          title: "[A learning about getting buy-in]",
          body: "[What worked, what didn’t.]",
        },
      ],
      reflection: "[One honest sentence from the heart.]",
    },
  },

  /* ------------------------------------------------------------------------
     03 · Impact Map (a lighter version: one big change, one big number)
     ------------------------------------------------------------------------ */
  {
    slug: "impact-map",
    next: "carepotal-core-experience",

    hero: {
      title: "Grew platform views from 28k to 1.5M with a live Impact Map",
      summary:
        "I designed and launched CarePortal’s first data-driven Impact Map. It turns abstract metrics into a story anyone can explore, and it’s fully accessible.",
      period: "Sep ’22 – Nov ’22 · Launched Jan ’23",
      image: {
        alt: "The CarePortal Impact Map",
        label: "Impact Map UI · 1600 × 1200",
        ratio: "21/9",
      },
      snapshot: [
        { label: "Role", value: "Product Designer, 0→1" },
        { label: "Timeline", value: "Sep ’22 – Nov ’22" },
        { label: "Team", value: "[Who you worked with]" },
        { label: "Scope", value: "Interactive data map" },
      ],
      outcomes: [
        { value: "28k → 1.5M", label: "platform views" },
        { value: "+5,289%", label: "YoY lift in platform views" },
        { value: "100%", label: "WCAG compliant" },
      ],
      links: [{ label: "View live impact map", href: "#" }],
    },

    problem: {
      eyebrow: "Opportunity",
      heading: "Impressive numbers, but no one could see them",
      statement:
        "[CarePortal’s impact lived in spreadsheets. Without a way to see it, supporters couldn’t feel the scale of what they were part of.]",
      framework: [
        { label: "Status quo", body: "[How impact was shared before.]" },
        { label: "If nothing changed", body: "[What would stay invisible.]" },
        { label: "Desired outcome", body: "[A live, accessible view of reach.]" },
      ],
    },

    design: {
      eyebrow: "Design change",
      heading: "Making data feel human",
      changes: [
        {
          eyebrow: "Change 01 · Storytelling",
          heading: "I led with one place and one person before the whole map",
          body: [
            "[One sentence: how the map opens.]",
            "[Why you started small and zoomed out. What users did with it.]",
          ],
          because: "[Why a big number alone doesn’t land.]",
          media: {
            type: "beforeAfter",
            before: {
              alt: "The data before the map",
              label: "Before · spreadsheet or static chart · 1600 × 1000",
              ratio: "16/10",
            },
            after: {
              alt: "The Impact Map",
              label: "After · Impact Map · 1600 × 1000",
              ratio: "16/10",
            },
          },
        },
        {
          eyebrow: "Change 02 · Accessibility",
          heading: "I made the map work without a mouse, a screen, or color",
          body: [
            "[One sentence: the accessibility challenge a map creates.]",
            "[What you did: keyboard paths, text alternatives, contrast.] [Why that mattered here.]",
          ],
          because: "[Why accessibility was part of the story, not an add-on.]",
          media: {
            type: "single",
            image: {
              alt: "Accessible states of the map",
              label: "Accessibility states · 1600 × 1000",
              ratio: "16/10",
            },
          },
        },
      ],
    },

    retrospective: {
      eyebrow: "Retrospective",
      heading: "When data becomes a story, people share it",
      impact: [
        {
          lens: "Users",
          title: "A map people actually looked at",
          body: "Platform views grew from 28k to 1.5M, and the redesigned map is fully WCAG compliant.",
          stats: [
            { value: "+5,289%", label: "YoY platform views" },
            { value: "100%", label: "WCAG compliant" },
          ],
        },
        {
          lens: "You",
          title: "[What this taught you about data and design]",
          body: "[Specific, honest, personal.]",
        },
      ],
      learnings: [
        {
          title: "[A learning about telling stories with data]",
          body: "[What surprised you.]",
        },
      ],
      reflection: "[One honest sentence from the heart.]",
    },
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDY_CONTENT.find((c) => c.slug === slug);
}
