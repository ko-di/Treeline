/**
 * All copy that repeats across pages. Edit here, not in the page files.
 *
 * Prose here may mark commands and paths with `backticks`, as the kit's own
 * markdown does. Pages render that prose through <Ticks>, which turns them
 * into <code>. Plain interpolation would print the backticks.
 */

export type Camp = {
  n: string;
  slug: string;
  name: string;
  summary: string;
  use: string;
  does: string[];
  output: string;
};

export const CAMPS: Camp[] = [
  {
    n: "01",
    slug: "intake",
    name: "Intake",
    summary: "Your role, who this helps, and the first shape of the idea.",
    use: "Start here. `/pack` scaffolds the folder and asks the questions the rest builds on.",
    does: [
      "Sets your role, and how much explanation you want alongside the work",
      "Asks who it helps, and for someone you have actually met rather than a category. Recording that you do not know yet is a normal answer",
      "If you do not have a concrete idea, runs an idea hunt instead of pressing on with a blank one",
      "Drafts the project map, which every later camp reads and updates",
    ],
    output: "camps/1-intake/idea.md, compass.json",
  },
  {
    n: "02",
    slug: "discover",
    name: "Discover",
    summary: "Conversations, what they add up to, then an honest reading.",
    use: "The camp most often skipped, and the one the gate at the end of it measures.",
    does: [
      "`/scout` drafts an interview guide and waits while you go and have the conversations",
      "Notes land in `research/raw/`, one file per session, each recording the method it came from",
      "`/gather` looks for patterns across notes rather than within one, and wants three before it calls anything a pattern",
      "`/weather` weighs the evidence by how you came by it: watched, heard, reasoned or assumed",
    ],
    output: "research/raw/, camps/2-discover/synthesis.md",
  },
  {
    n: "03",
    slug: "define",
    name: "Define",
    summary: "Requirements, each written so someone can tell when it is done.",
    use: "Runs once the weather reading says press on.",
    does: [
      "Turns what you learned into numbered requirements",
      "Each one names who it serves, and the condition that would show it is finished",
      "Scope splits three ways, in, out and later, and the out list is the half that holds",
    ],
    output: "camps/3-define/prd.md",
  },
  {
    n: "04",
    slug: "design",
    name: "Design",
    summary: "A direction derived from your references, not described in the abstract.",
    use: "Not gated to this point. It runs whenever imagery turns up.",
    does: [
      "Takes a Figma file, screenshots or a live site, and gives each reference a job — this one for colour, that one for density — rather than picking a favourite",
      "Where two references disagree it says so and asks, instead of averaging them into a fourth thing nobody chose",
      "Derives colour, type, spacing, shape and component states, and checks every contrast pair before writing the file",
      "Records which reference each decision came from, so in six months the file can answer why, not just what",
      "Writes `design.md` in Google's open format: tokens a build tool can read, prose for the reasoning",
      "Without references it does not guess. It walks you through assembling a mood board first",
      "It declines to draw a logo or wordmark, and says which parts of brand it can help with instead",
    ],
    output: "camps/4-design/design.md, design/decisions/",
  },
  {
    n: "05",
    slug: "build",
    name: "Build",
    summary: "Everything upstream becomes one brief, then the build works phase by phase.",
    use: "`/trail` walks it in order; `/camp build` goes straight there.",
    does: [
      "Compiles `BRIEF.md` first: scope, phases, feel and the decisions already made, in one file that stands alone",
      "Splits the work into phases you could ship on their own, written into the map so they tick as they land",
      "Works the phases in order: reads the requirement, builds it, reads the code back for bugs, commits, ticks it off, moves on",
      "Checks each finished phase against the design tokens and names every divergence rather than letting it pass",
      "Decisions keep getting captured as they come up, rather than reconstructed later",
    ],
    output: "BRIEF.md, camps/5-build/, map.md",
  },
  {
    n: "06",
    slug: "ship",
    name: "Ship",
    summary: "Checks, deploy, verification, and what you would do differently.",
    use: "`/ship`, then `/summit`, then `/retro`.",
    does: [
      "Before any of it, `/ship` asks what you expect to regret in three weeks and records the answer",
      "Then typecheck, tests and lint, a clean commit message, and a push",
      "`/summit` checks what actually went live: analytics, metadata, performance, accessibility",
      "`SUMMIT.md` carries a reflection to answer three months out; `/retro` names what to keep for next time",
    ],
    output: "SUMMIT.md, retro.md",
  },
];

export const CHECKS: { when: string; what: string }[] = [
  {
    when: "You name an audience like “small businesses” or “creators”",
    what: "Asks for someone you have actually met, and offers to record that you do not know yet, a normal answer at intake.",
  },
  {
    when: "You have fewer than three research notes",
    what: "Writes up what struck you as open questions rather than themes. Three is where a pattern becomes distinguishable from a one-off.",
  },
  {
    when: "You ask it to make a logo",
    what: "Declines, and points at the parts of brand it can help with: voice, positioning, colour, type.",
  },
  {
    when: "You are about to ship",
    what: "Asks what you expect to regret in three weeks, and records whether you fixed it or accepted it.",
  },
];

/**
 * The kit release this site describes. Must match forest-kit's `.kit-version`.
 * Nothing syncs these automatically, so scripts/check-kit-version.mjs compares
 * them and fails if they drift. A site describing a version nobody can download is worse
 * than a site with no version on it at all.
 */
export const KIT_VERSION = "1.3.1";

/**
 * Thirteen verbs exist; two have to be remembered. The kit runs most of them
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
    note: "Two of these are the whole workflow. The rest are there when you want them.",
    items: [
      { cmd: "/pack", does: "Set up the project and run intake. The only way in" },
      { cmd: "/trail", does: "Move through the camps in order, running the right verb at each" },
      { cmd: "/compass", does: "Suggest the next step from current state" },
      { cmd: "/map", does: "Show what is filled in and what is not" },
      { cmd: "/camp <name>", does: "Jump to one camp and work there, out of order" },
      { cmd: "/rationale", does: "Record why you made a call, the moment you make it" },
    ],
  },
  {
    group: "The ones the trail runs for you",
    note: "You can type these. You do not need to know they exist.",
    items: [
      { cmd: "/scout", does: "Camp 2. Interviews, audience, the problem" },
      { cmd: "/gather", does: "Offered once three notes are filed. Synthesis" },
      { cmd: "/sketch", does: "Camp 4. Brand and visual direction from your references" },
      { cmd: "/weather", does: "The gate. Fires when Camp 2 closes, and can say turn back" },
      { cmd: "/ship", does: "Camp 6. Checks, commit, push. The first of four verbs there" },
    ],
  },
  {
    group: "The ones offered at the summit",
    note: "Shipping is not the last thing that happens. None of these chains automatically, so you pick the moment.",
    items: [
      { cmd: "/summit", does: "Verify what actually went live, and write SUMMIT.md" },
      { cmd: "/retro", does: "What worked, what did not, what to keep" },
      { cmd: "/handoff", does: "Package the folder for a client. Client projects only" },
    ],
  },
  {
    group: "Housekeeping",
    note: "Looks after the kit, not the project. The kit tells you when it is worth running.",
    items: [
      { cmd: "/resupply", does: "Bring in a newer version of the kit. Your work is not touched" },
    ],
  },
];

export const USES: { who: string; what: string }[] = [
  {
    who: "You have an idea and no documents",
    what: "Intake through to requirements in a sitting, then a brief to build from.",
  },
  {
    who: "You need to know the problem is real",
    what: "The gate reads your evidence by where it came from, not how it reads, and can tell you to turn back. `EVIDENCE.md` writes the answer out for anyone who asks, including an investor.",
  },
  {
    who: "You have been building a while and never wrote it down",
    what: "Run intake against what exists. The gaps it reports are usually the parts nobody agrees on.",
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
    what: "Camp 5 opens by putting everything upstream into one file, `BRIEF.md`. Scope with the out list kept word for word, phases you could ship on their own, how it should feel, the decisions already made, and what is still missing.",
  },
  {
    step: "Build from it",
    what: "`/camp build` works the phases itself: the first one not ticked, read the requirement, build, review, commit, tick, next. One at a time or straight through. Or hand the brief to Claude in the browser, to v0 or Figma Make, or to a developer, and the phases still tick in `map.md`.",
  },
  {
    step: "Check it against the design",
    what: "When a phase is done, the build is compared with `camps/4-design/design.md` and every divergence is listed. Fix the build, or update the design if the build found something better. Leaving one unnamed is how a design system ends up unused.",
  },
  {
    step: "Ship",
    what: "`/ship` runs quality checks, commits and pushes. Before it does, it asks what you expect to regret in three weeks and records your answer. It does not deploy unless the project is already set up to deploy on push.",
  },
  {
    step: "Verify what went live",
    what: "`/summit` checks the deployment: analytics, metadata, performance, accessibility. It writes `SUMMIT.md` and leaves three questions dated ninety days out.",
  },
  {
    step: "Close it out",
    what: "`/retro` covers what worked, what did not, and three things to keep. `/handoff` packages the folder for a client and verifies the access transfers. Neither runs on its own, so you pick the moment.",
  },
  {
    step: "Ninety days on, then a second version",
    what: "Answer the `SUMMIT.md` questions cold. When you come back, `/pack` opens cycle 2 on the same project: it archives the old map and retro, carries the research, decisions and design across, and resets only the camp progress.",
  },
];