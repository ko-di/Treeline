/**
 * All copy that repeats across pages. Edit here, not in the page files.
 *
 * Prose here may mark commands and paths with `backticks`, as the kit's own
 * markdown does. Pages render that prose through <Ticks>, which turns them
 * into <code>. Plain interpolation would print the backticks.
 */

type Camp = {
  n: string;
  slug: string;
  name: string;
  summary: string;
  /** One line for the loop diagram, where there is room for about 12 words. */
  short: string;
  /**
   * Set on the 4 camps a project can finish at, per the kit's outcome field.
   * `want` is what the person came for, `leave` is what they hold when they
   * stop here. Frame and Build have none: nobody sets out to stop at either.
   */
  exit?: { want: string; leave: string };
  use: string;
  does: string[];
  output: string;
};

export const CAMPS: Camp[] = [
  {
    n: "01",
    slug: "frame",
    name: "Frame",
    summary: "Your role, who this helps, and the first shape of the idea.",
    short: "Start here. Sets your role, who it's for, drafts the project map.",
    use: "Start here. `/pack` scaffolds the folder and asks the questions the rest builds on.",
    does: [
      "Sets your role, and how much explanation you want alongside the work",
      "Asks who it helps — someone you've actually met, not a category. Recording that you do not know yet is a normal answer",
      "If you do not have a concrete idea, runs an idea hunt instead of pressing on with a blank one",
      "Drafts the project map, which every later camp reads and updates",
    ],
    output: "project/compass.json, project/map.md",
  },
  {
    n: "02",
    slug: "learn",
    name: "Learn",
    summary: "Conversations, what they add up to, then an honest reading.",
    short: "Interviews, notes and patterns. The camp most often skipped.",
    exit: {
      want: "Proof the problem is real",
      leave: "`project/EVIDENCE.md` and a weather reading",
    },
    use: "The camp most often skipped, and the one the gate at the end of it measures.",
    does: [
      "`/scout` drafts an interview guide and waits while you go and have the conversations",
      "Notes land in `project/research/`, one file per session, each recording the method it came from",
      "`/gather` looks for patterns across notes rather than within one, and wants 3 before it calls anything a pattern",
      "`/weather` weighs the evidence by how you came by it: watched, heard, reasoned or assumed",
    ],
    output: "project/research/, project/2-learn/synthesis.md",
  },
  {
    n: "03",
    slug: "decide",
    name: "Decide",
    summary: "Requirements, each written so someone can tell when it is done.",
    short: "Turns what you learned into numbered requirements.",
    exit: {
      want: "Documents somebody else builds from",
      leave: "A PRD and `project/BRIEF.md`",
    },
    use: "Runs once the weather reading says press on.",
    does: [
      "Turns what you learned into numbered requirements",
      "Each one names who it serves, and the condition that would show it's finished",
      "Scope splits 3 ways: in, out and later. The out list is the half that holds",
    ],
    output: "project/3-decide/prd.md",
  },
  {
    n: "04",
    slug: "shape",
    name: "Shape",
    summary: "A direction derived from your references, not described in the abstract.",
    short: "References become tokens: colour, type, spacing, states.",
    exit: {
      want: "Something working, fast, to show people",
      leave: "A design direction and the brief, built elsewhere",
    },
    use: "Not gated to this point. It runs whenever imagery turns up.",
    does: [
      "Takes a Figma file, screenshots or a live site. Gives each reference a job, this one for colour, that one for density, rather than picking a favourite",
      "Where 2 references disagree it says so and asks, instead of averaging them into a fourth thing nobody chose",
      "Derives colour, type, spacing, shape and component states, and checks every contrast pair before writing the file",
      "Records which reference each decision came from, so in 6 months the file can answer why as well as what",
      "Writes `design.md` in Google's open format: tokens a build tool can read, prose for the reasoning",
      "Without references it does not guess. It walks you through assembling a mood board first",
      "It declines to draw a logo or wordmark, and says which parts of brand it can help with instead",
    ],
    output: "project/design/design.md, project/decisions/",
  },
  {
    n: "05",
    slug: "build",
    name: "Build",
    summary: "Everything upstream becomes one brief, then the build works phase by phase.",
    short: "Works the plan phase by phase, checked against the tokens.",
    use: "`/trail` walks it in order; `/camp build` goes straight there.",
    does: [
      "Compiles `BRIEF.md` first: scope, phases, feel and the decisions already made, in one file that stands alone",
      "Splits the work into phases you could ship on their own, written into the map so they tick as they land",
      "Works the phases in order: reads the requirement, builds it, reads the code back for bugs, commits, ticks it off, moves on",
      "Checks each finished phase against the design tokens and names every divergence rather than letting it pass",
      "Decisions keep getting captured as they come up, rather than reconstructed later",
    ],
    output: "project/BRIEF.md, project/5-build/, project/map.md",
  },
  {
    n: "06",
    slug: "ship",
    name: "Ship",
    summary: "Checks, deploy, verification, and what you would do differently.",
    short: "Ships it, then asks what you will regret in 3 weeks.",
    exit: {
      want: "A finished thing, live",
      leave: "The whole trail, built and shipped here",
    },
    use: "`/ship`, then `/summit`, `/retro`, `/reach`, and `/handoff` for client work.",
    does: [
      "Before any of it, `/ship` asks what you expect to regret in 3 weeks and records the answer",
      "Then typecheck, tests and lint, a clean commit message, and a push",
      "`/summit` checks what actually went live: analytics, metadata, performance, accessibility",
      "`SUMMIT.md` carries a reflection to answer 3 months out; `/retro` names what to keep for next time",
    ],
    output: "project/SUMMIT.md, project/retro.md",
  },
];

export const CHECKS: { when: string; what: string }[] = [
  {
    when: "You name an audience like “small businesses” or “creators”",
    what: "Asks for someone you've actually met. Recording that you do not know yet is a normal answer.",
  },
  {
    when: "You have fewer than 3 research notes",
    what: "Writes up what struck you as open questions rather than themes. 3 is where a pattern becomes distinguishable from a one-off.",
  },
  {
    when: "You ask it to make a logo",
    what: "Declines, and points at the parts of brand it can help with instead: voice, positioning, colour, type.",
  },
  {
    when: "You're about to ship",
    what: "Asks what you expect to regret in 3 weeks, and records whether you fixed it or accepted it.",
  },
];

/**
 * The forest release this site describes. Must match forest-studio's VERSION file,
 * and the copy in public/forest-version.txt. scripts/check-kit-version.mjs
 * compares them before every build and fails it if they differ, so bump this
 * after every release. A site describing a version nobody can download is worse
 * than no version at all.
 */
export const KIT_VERSION = "1.3.1";

/**
 * 20-5 commands exist; 2 have to be remembered. The list below also has
 * the /weather gate, which is not a command. The kit runs most of them
 * for you at the point they apply, so listing them flat made the workflow read
 * heavier than it is. Grouped by who invokes them, not alphabetically.
 */
export const COMMANDS: {
  group: string;
  note: string;
  items: { cmd: string; does: string }[];
}[] = [
  {
    group: "The ones you type",
    note: "2 of these are the whole workflow. The rest are there when you want them.",
    items: [
      { cmd: "/pack", does: "Set up the project and run intake. The only way in" },
      { cmd: "/trail", does: "Move through the camps in order, running the right command at each" },
      { cmd: "/compass", does: "Suggest the next step from current state" },
      { cmd: "/map", does: "Show what is filled in and what is not" },
      { cmd: "/camp <name>", does: "Jump to one camp and work there, out of order" },
      { cmd: "/rationale", does: "Record why you made a call, the moment you make it" },
      { cmd: "/publish", does: "Folder to live address, once per project. Git, a host, a domain" },
    ],
  },
  {
    group: "The ones the trail runs for you",
    note: "You can type these. You do not need to know they exist.",
    items: [
      { cmd: "/scout", does: "Camp 2. Interviews, audience, the problem" },
      { cmd: "/gather", does: "Offered once 3 notes are filed. Synthesis" },
      { cmd: "/sketch", does: "Camp 4. Brand and visual direction from your references" },
      { cmd: "/weather", does: "The gate. Fires when Camp 2 closes, and can say turn back" },
      { cmd: "/review", does: "Each phase of Camp 5. The 5-check quality pass, findings first" },
      { cmd: "/test", does: "Each phase of Camp 5. Writes and runs the tests for that phase" },
      { cmd: "/benchmark", does: "Offered in Camp 2. Who else solves this, doing nothing included" },
      { cmd: "/ship", does: "Camp 6. Checks, commit, push. The first of 6 commands there" },
      { cmd: "/a11y-audit", does: "Run by /summit. Accessibility to a standard, with a report" },
    ],
  },
  {
    group: "The ones you reach for when you need them",
    note: "Each does one job on what's been built and changes nothing until you say yes.",
    items: [
      { cmd: "/refine", does: "Strengthen one thing: harden, optimise, adapt, clarify or onboard" },
      { cmd: "/tune", does: "Push the design one way: bolder, quieter, colourise or normalise" },
      { cmd: "/motion", does: "Add motion that has a job, with a reduced-motion fallback" },
      { cmd: "/animate", does: "Review the motion that's there, and what's missing" },
      { cmd: "/overdrive", does: "One ambitious moment, proposed first" },
      { cmd: "/system", does: "Document the design system as built, and where it drifted" },
      { cmd: "/debug", does: "What broke and why. Says what the error means, then finds the cause" },
      { cmd: "/resupply", does: "Bring in the newest version of forest. Claude names it when one is out" },
    ],
  },
  {
    group: "The ones offered at the summit",
    note: "Shipping is not the last thing that happens. None of these chains automatically, so you pick the moment.",
    items: [
      { cmd: "/summit", does: "Verify what actually went live, and write SUMMIT.md" },
      { cmd: "/retro", does: "What worked, what did not, what to keep" },
      { cmd: "/handoff", does: "Package the folder for a client. Client projects only" },
      { cmd: "/reach", does: "How it reaches people: position, wedge, who first, money, the first 30 days" },
    ],
  },
];

export const USES: { who: string; what: string }[] = [
  {
    who: "You have an idea and no documents",
    what: "Frame through to requirements in a sitting, then a brief to build from.",
  },
  {
    who: "You are early-stage and need to raise",
    what: "`EVIDENCE.md` writes out why the problem is real, for anyone who asks, including an investor.",
  },
  {
    who: "You have an existing product and a new idea to add to it",
    what: "Run intake against what exists. The gaps it reports are usually the parts nobody agrees on.",
  },
  {
    who: "You need to know the problem is real",
    what: "The gate reads your evidence by where it came from, not how it reads, and can tell you to turn back.",
  },
  {
    who: "You are handing the work to someone else",
    what: "The folder is the handover: what it is, who for, and why each call was made.",
  },
  {
    who: "You are working for a client",
    what: "Client mode adds a handoff package and names what was deliberately left out.",
  },
];
export const AFTER: { step: string; what: string }[] = [
  {
    step: "Compile the brief",
    what: "Camp 5 opens by putting everything upstream into one file, `BRIEF.md`. It holds scope with the out list kept word for word, and phases you could ship on their own. It says how it should feel, the decisions already made, and what is still missing.",
  },
  {
    step: "Build from it",
    what: "`/camp build` works the phases itself: the first one not ticked, read the requirement, build, review, commit, tick, next. One at a time or straight through. Or hand the brief to Claude in the browser, to v0 or Figma Make, or to a developer, and the phases still tick in `map.md`.",
  },
  {
    step: "Check it against the design",
    what: "When a phase is done, the build is compared with `project/design/design.md` and every divergence is listed. Fix the build, or update the design if the build found something better. Leaving one unnamed is how a design system ends up unused.",
  },
  {
    step: "Ship",
    what: "`/ship` runs quality checks, commits and pushes. Before it does, it asks what you expect to regret in 3 weeks and records your answer. It does not deploy unless the project is already set up to deploy on push.",
  },
  {
    step: "Verify what went live",
    what: "`/summit` checks the deployment: analytics, metadata, performance, accessibility. It writes `SUMMIT.md` and leaves 3 questions dated 90 days out.",
  },
  {
    step: "Close it out",
    what: "`/retro` covers what worked, what did not, and 3 things to keep. `/handoff` packages the folder for a client and verifies the access transfers. Neither runs on its own, so you pick the moment.",
  },
  {
    step: "After 90 days, a second version",
    what: "Answer the `SUMMIT.md` questions cold. When you come back, `/pack` opens cycle 2 on the same project. It archives the old map and retro. It carries the research, decisions and design across, and resets only the camp progress.",
  },
];