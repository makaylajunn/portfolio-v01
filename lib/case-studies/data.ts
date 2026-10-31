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
     03 · Impact Map (no context chapter: opportunity, four design changes, retro)
     ------------------------------------------------------------------------ */
  {
    slug: "impact-map",
    next: "carepotal-core-experience",

    hero: {
      title: "Grew platform views from 28k to 1.5M with a live Impact Map",
      summary:
        "I designed CarePortal’s Impact Map from zero: a live map that turns real-time activity and cumulative impact into a story anyone can explore, on desktop and mobile.",
      period: "Sep ’22 – Nov ’22 · Launched Jan ’23",
      image: {
        src: "/work/impact-map/desktop-impact-map.jpg",
        alt: "The CarePortal Impact Map on desktop, showing the Network Data sidebar with total children served, economic impact, and response teams beside a map of the United States",
        label: "Impact Map UI · 1600 × 1000",
        ratio: "16/10",
      },
      snapshot: [
        { label: "Role", value: "Product Designer, 0→1 (UX/UI)" },
        { label: "Team", value: "2 designers, with CarePortal stakeholders and engineers" },
        { label: "Scope", value: "Live and Impact views, desktop and mobile" },
        { label: "Tools", value: "Figma, FigJam, Mouseflow, Google Analytics" },
      ],
      outcomes: [
        { value: "28k → 1.5M", label: "platform views" },
        { value: "+5,289%", label: "YoY lift in platform views" },
        { value: "100%", label: "WCAG compliant" },
      ],
      links: [
        {
          label: "View live impact map",
          href: "https://system.careportal.org/map",
        },
      ],
    },

    problem: {
      eyebrow: "Opportunity",
      heading: "Everything was on the map, so nothing stood out",
      statement:
        "CarePortal’s one multi-purpose map mixed live requests with global impact. Outreach leaders like Kyle felt overwhelmed, so they built their own infographics instead.",
      framework: [
        {
          label: "Status quo",
          body: "One map showed new requests and network-wide impact at once. It was hard to find, slow to load, and overwhelming to walk new people through.",
        },
        {
          label: "If nothing changed",
          body: "Prospective churches and partners would keep bouncing. Leaders like Kyle, an outreach lead in Kansas City, would keep rebuilding impact slides by hand.",
        },
        {
          label: "Desired outcome",
          body: "A self-explanatory map that pairs real-time activity with cumulative impact, and turns passive visitors into active responders.",
        },
      ],
      visual: {
        src: "/work/impact-map/legacy-map-children-served.jpg",
        alt: "The original CarePortal map zoomed into Atlanta, covered in hundreds of orange children-served icons",
        label: "Problem in context · original map · 1600 × 1000",
        ratio: "16/10",
      },
      annotations: [
        "Every child served was its own icon, so dense areas became a wall of orange.",
        "Filters, toggles, and county outlines all competed for attention at once.",
        "Regional managers called it slow and overwhelming to show to new people.",
      ],
    },

    design: {
      eyebrow: "Design change",
      heading: "Four decisions that turned a data dump into a story",
      intro:
        "Seven prototypes and 18 usability studies in a 36-day sprint. These are the calls testing changed most.",
      changes: [
        {
          eyebrow: "Change 01 · Structure",
          heading:
            "I split one crowded map into Live and Impact modes, because showing everything at once was the problem",
          body: [
            "Testing showed the map was crowded before it was complicated.",
            "Testers missed new requests when search hid behind a click, the header was vague, and the map opened full of pins. So Live stayed urgent and local, with a visible search bar, a “See Activity Near Me” button, and a “Now Viewing Live Activity” status. I showed state names permanently, colored active states white and unenrolled states gray, and started with fewer pins. (The shipped product labels the two modes Activity and Network.)",
            "Less on screen meant the newest request was the first thing people saw.",
          ],
          because:
            "Trying to show everything at once was the root of the overwhelm, so I gave each job its own mode instead of adding more controls.",
          tradeoff:
            "I cut “Export Data” and activity timestamps. Testers screenshotted the map for their slides anyway, and every extra control slowed the first read.",
          media: {
            type: "beforeAfter",
            before: {
              src: "/work/impact-map/legacy-map.jpg",
              alt: "The original CarePortal map, with request clusters, county outlines, and a dense filter bar",
              label: "Before · original map · 1600 × 1000",
              ratio: "16/10",
            },
            after: {
              src: "/work/impact-map/desktop-impact-map.jpg",
              alt: "The Impact Map in Network view, with gray unenrolled states, white active states, and permanent state names",
              label: "After · Impact Map · 1600 × 1000",
              ratio: "16/10",
            },
          },
        },
        {
          eyebrow: "Change 02 · Impact view",
          heading:
            "I swapped mystery orbs for color-coded icons that match the numbers beside them",
          body: [
            "Impact had to prove long-term return, not just look good.",
            "In mid-fidelity, yellow orbs sat next to sidebar trend graphs. Testers didn’t know the orbs were clickable, didn’t understand the graph titles, and couldn’t see the white buttons on mobile. So I gave each metric its own icon, added an info button to every graph, and kept state names visible so no one hovered over regions CarePortal hadn’t reached.",
            "The live map now shows 554K+ children served, $210M+ in economic impact, and 9,000+ response teams.",
          ],
          because:
            "A color or shape should mean one thing. When the icon matches the metric beside it, people can scan the map without a manual.",
          media: {
            type: "single",
            image: {
              src: "/work/impact-map/mobile-impact-map.png",
              alt: "The mobile Network view, with color-coded pins, Map Legend and Find Me buttons, and the Network Data panel showing total children served",
              label: "Impact view · mobile · 1600 × 1000",
              ratio: "16/10",
              fit: "contain",
            },
          },
        },
        {
          eyebrow: "Change 03 · Conversion",
          heading:
            "I made every pin and every gray state a next step, not a dead end",
          body: [
            "A marketing map only works if curiosity turns into care.",
            "Clicking a live request opens a story drawer that explains the family’s need first, then offers one clear action: “Yes, I Can Help!”, which routes into sign-in and church onboarding. Clicking a gray, unenrolled state opens an “Activate a State” modal, with “Learn More” and “Join CarePortal” paths for referring a local church.",
            "Kyle’s path is three steps: find a request near him, read the story, and say yes.",
          ],
          because:
            "Visitors who feel something need somewhere to put it. A dead end after the click would waste the exact moment the map exists for.",
          media: {
            type: "single",
            image: {
              alt: "A live request story drawer with the Yes, I Can Help button, and the Activate a State modal",
              label: "Request drawer + Activate a State modal · 1600 × 1000",
              ratio: "16/10",
            },
          },
        },
        {
          eyebrow: "Change 04 · Accessibility",
          heading:
            "I reworked the map’s color, type, and controls when CarePortal became accessibility-certified",
          body: [
            "A map leans on color and a mouse, which is exactly where accessibility breaks.",
            "When CarePortal became accessibility-certified, I led the update. I revised the color scheme to meet WCAG contrast standards, updated text styles and spacing for readability, and made sure interactive elements worked with a keyboard and a screen reader.",
            "I wrote those changes into the style guides I handed to engineering, then ran design QA so the build stayed true to them.",
          ],
          because:
            "Once CarePortal was certified, the map had to meet the same bar as the rest of the product, and the updated specs had to actually reach the code.",
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
      heading: "When data becomes a story, people come to see it",
      intro: "The numbers, then what a 36-day sprint taught me.",
      impact: [
        {
          lens: "Users",
          title: "A map people actually looked at",
          body: "Platform views grew from 28k to 1.5M. Visitors can see requests met in their state and the real-time difference they’re making.",
          stats: [
            { value: "+5,289%", label: "YoY platform views" },
            { value: "100%", label: "WCAG compliant" },
          ],
        },
        {
          lens: "Business",
          title: "A storytelling tool for growth and outreach",
          body: "The map became a centerpiece of CarePortal’s rebrand. It shows partners, donors, and new churches the reach of the network, and it lifted engagement, site traffic, and brand trust.",
        },
        {
          lens: "Process",
          title: "Fast, tested, and built to spec",
          body: "I delivered style guides for color, type, and UI elements, ran design QA on the build, and kept answering engineering’s questions after handoff while I moved on to the authenticated Technical Map.",
          stats: [
            { value: "36", label: "days, start to handoff" },
            { value: "7", label: "prototypes" },
            { value: "18", label: "usability studies, 5 rounds of iteration" },
          ],
        },
        {
          lens: "You",
          title: "Getting feedback on something that didn’t exist yet",
          body: "People can’t react to a product they’ve never seen. I tested with concept sketches and Figma prototypes, borrowed best practices from competitors, and iterated on stakeholder feedback.",
        },
      ],
      learnings: [
        {
          title: "Ask why before designing a workaround",
          body: "What’s presented as a problem often isn’t a hard constraint. Questioning it early saved me from designing around things that didn’t need it.",
        },
        {
          title: "Unify patterns across modes",
          body: "Splitting Live and Impact filters in mid-fidelity raised cognitive load. One filter set with a “Clear All” button kept people grounded in both views.",
        },
        {
          title: "Design for what people actually do",
          body: "Testers skipped “Export Data” and took screenshots. I cut the feature, and the interface got lighter.",
        },
      ],
      whatIf: [
        "How many “Yes, I Can Help!” clicks turn into onboarded churches",
        "Testimonial pins alongside open requests, from the discovery wish list",
        "County-level impact, so leaders like Kyle can see their own county",
      ],
      nextSteps: [
        "Extend the same patterns into CarePortal’s authenticated Technical Map",
      ],
      reflection:
        "This map is more than data or a marketing tool. It’s a visual story of real change, happening in real time.",
    },
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDY_CONTENT.find((c) => c.slug === slug);
}
