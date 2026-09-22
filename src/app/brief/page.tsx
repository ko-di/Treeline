import { Nav } from "@/components/Nav";
import { Footer, Next } from "@/components/sections";

export const metadata = {
  title: "A sample brief · forest",
  description:
    "The file Camp 5 compiles before any code: scope, phases, feel, the decisions already made, and what is still missing.",
};

/**
 * The sample is a file listing, so it sits in a <pre> and keeps its markdown
 * markers. That is what a reader downloads and opens, and paraphrasing it into
 * page prose would show something the kit never writes.
 */
const BRIEF = `# Brief — Payday

Chase an unpaid invoice without writing the email.
For freelance designers billing 3 to 10 clients a month. Web.

## What this is for
The chase is awkward to write, so it goes out late or not at all. The work is
done, the money is late, and the relationship makes the reminder hard to send.

Today they set a calendar reminder, open the last chase they sent someone else,
and rewrite it from scratch. Most leave it a week longer than they meant to.
2 of the 7 had an invoice more than 90 days old and had stopped chasing it.

What changes: the message is already written when the date arrives. The
designer reads it, edits a line, and sends. The hard part is the blank page,
and there is no blank page.

## Scope
**In:** an invoice list with due dates, a chase sequence of 3 messages, a paid
toggle, one client record per invoice
**Out:** taking payment, accounting exports, VAT, multi-currency, a mobile app,
anything that emails a client before the designer has read it
**Later:** a second sender address, per-client message templates

Success is 20 invoices chased through the sequence in the first month. One
metric, not a dashboard.

## Constraints
Solo build, evenings, 6 weeks · No budget beyond hosting

Stack, each choice with its reason:
- Next.js — one person writes the front and the back
- Postgres — an invoice outlives a session, and the chase log is the record
- Resend — sending reputation is not worth building for 20 emails a month
- Auth — still open, see below

## How it should feel
Plain and unhurried · Paper and ink, not dashboard · Writes the way the
designer writes
Never: urgency banners, red overdue counts, countdown timers, anything that
shames the client

Tokens, components and states are in project/design/design.md. Use them as
written — they were derived from references the user chose, not invented here.
The ones this build leans on most:
- colour.surface, colour.ink, colour.ink-quiet. There is no red in the palette,
  which is the anti-pattern above turned into a token
- type.body 16/1.55, type.meta 14. Two sizes, no third
- space.gutter 24, space.row 14. The invoice list is rows, not cards

## Phases
Each phase is a vertical slice that could ship on its own.

1. **See what is owed**
   Serves: R1, every unpaid invoice in one place.
   Screens: Invoice list, empty state.
   Done when: an invoice can be added by hand, and the list orders by how late
   each one is, oldest first. Shipping here alone already replaces the
   spreadsheet.

2. **Write the chase**
   Serves: R2, the first message is drafted rather than written.
   Screens: Chase editor.
   Done when: opening an overdue invoice returns a draft with the client name,
   the amount and the days late filled in, and every word of it can be edited
   before anything sends.

3. **Send it, and mark it paid**
   Serves: R3, the chase is logged. R4, paid closes it.
   Screens: Invoice list, invoice detail.
   Done when: a sent chase is stamped against the invoice with its date, and
   marking one paid takes it off the list without deleting the record.

4. **The second and third messages**
   Serves: R5, the sequence carries on without being restarted.
   Screens: Invoice list, chase editor.
   Done when: 7 days after an unpaid chase, the next message in the sequence is
   waiting. It waits. Nothing sends by itself.

## Decisions already made
Do not reopen these without saying so. Each links its full reasoning.
- 2026-04-02 — Nothing sends without the designer reading it first. *Every
  conversation named the same fear: a reminder going out in their name that
  they had not seen.* → project/decisions/2026-04-02-no-silent-send.md
- 2026-04-09 — No payment taking. *It doubles the compliance surface, and
  nobody asked for it. The money already arrives by bank transfer.*
  → project/decisions/2026-04-09-no-payments.md
- 2026-04-15 — One client record per invoice, not a client table. *Phase 1 does
  not need clients to exist as a thing of their own. Normalising now would buy
  a schema nobody has tested.* → project/decisions/2026-04-15-no-client-table.md

## What the evidence actually supports
Press on, on 7 conversations: 5 watched, 2 heard.

Watched. Freelance designers delay the chase rather than forget it. 6 of the 7
described the delay without being asked, and 4 opened a drafts folder with the
unsent chase still in it. This is the claim everything else rests on.

Reasoned. They would pay for this. Nobody was asked for money and nobody
offered. Treat pricing as an open question, not a finding.

Assumed. A sequence of 3 is the right length. It came from the maker, not from
a conversation. Phase 4 is where it gets tested.

## Deferred
- Recurring retainers. Half the group bills a retainer, and none of them chase
  it, so it is not the same problem. Bring it back if retainer clients turn out
  to be the late payers.
- A client table. See the decision above. Bring it back the first time an
  invoice needs to inherit something from the last one.
- Reading the bank feed to mark invoices paid. Wanted by 3 of the 7, and worth
  more than all of phase 4, but it needs an account connection this build has
  no way to hold safely.

## Still open
- techStack.auth is empty. Phase 1 cannot store an invoice until it knows who
  the invoice belongs to, so this is the next answer needed, not a later one.
- business.constraints has no budget line. Hosting and Resend are both free at
  this volume, so nothing is blocked today.
- The chase interval is written as 7 days in 3 places and was never decided.
  It is a guess wearing a number.

---
*Made with forest by k-d studio.*`;

export default function Brief() {
  return (
    <>
      <Nav here="/brief" />

      <main>

      <header>
        <h1>A sample brief</h1>
        <p className="lede">
          Camp 5 opens by putting everything upstream into one file. This is
          that file, from a small project that used forest.
        </p>
        <p>
          It quotes rather than paraphrases: the out list and the decisions
          carry over word for word, because a paraphrase is where scope creep
          enters. It names what is missing rather than writing around it. Hand
          it to Claude, to v0 or Figma Make, or to a developer, and it stands on
          its own.
        </p>
      </header>

      <section>
        <p className="label">project/BRIEF.md</p>
        <pre className="term doc">{BRIEF}</pre>
      </section>

      <section>
        <p className="label">What to notice</p>
        <ul className="dashed spaced">
          <li>
            <strong>The out list is the half that holds.</strong> It comes from
            the requirements word for word, so the build has something to point
            at when a cut idea comes back.
          </li>
          <li>
            <strong>Every decision links its own reasoning.</strong> Nobody
            reopens one from memory, and a stranger can read why.
          </li>
          <li>
            <strong>Each phase says what done looks like.</strong> Not a task
            list: a thing you could watch someone do, so the phase can be
            finished rather than abandoned.
          </li>
          <li>
            <strong>The evidence is graded, not summarised.</strong> Watched,
            reasoned and assumed sit in separate paragraphs, and the assumed one
            names the phase that will test it. A brief that hides its own
            reading is the failure the gate exists to catch.
          </li>
          <li>
            <strong>Still open names what blocks the next step.</strong> Not
            every empty field, but which one stops phase 1, and which one costs
            nothing today. A brief that reads complete when the thinking is not
            is worse than no brief.
          </li>
        </ul>
        <Next href="/after" label="What happens after the documents" />
      </section>

      </main>

      <Footer />
    </>
  );
}
