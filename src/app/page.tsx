import Link from "next/link";
import { Banner } from "@/components/Banner";
import { Nav } from "@/components/Nav";
import { Flow } from "@/components/Flow";
import { Footer, Next, Ticks } from "@/components/sections";
import { CAMPS, USES } from "@/lib/content";

export default function Overview() {
  return (
    <>
      <Nav here="/" />
      <Banner />

      <main>

      <header>
        <h1 className="visually-hidden">Forest</h1>
        <p className="lede">
          You have an idea and want to build it, without losing track of why you
          made each call.
        </p>
        <p>
          Forest turns it into something you can build, with the thinking behind
          it written down as you go. It runs inside{" "}
          <a href="https://claude.com/claude-code">Claude Code</a>{" "}
          as a set of commands. There&rsquo;s no separate app.
        </p>
        <p>
          It asks what you want at the end, and stops there. That might be
          proof the problem is real, documents for somebody else to build
          from, or the finished thing, live.
        </p>
        <p className="cta">
          <a href="/api/download">Download forest</a>
          <Link href="/brief" className="quiet">See a sample BRIEF.md</Link>
        </p>
      </header>

      <section>
        <p className="label">What happens without it</p>
        <h2>Nobody should bet a year of work on a guess they never checked.</h2>
        <p>
          You&rsquo;re left checking your own judgement against nothing but your own
          judgement.
        </p>
        <ul className="dashed">
          <li>Decisions nobody remembers making.</li>
          <li>Evidence nobody checked before the build started.</li>
          <li>
            A handover the next person cannot pick up without asking you first.
          </li>
          <li>
            An idea that never gets far enough to put in front of an investor.
          </li>
          <li>
            A new idea added to an existing product, with no record of what is
            already there or why.
          </li>
        </ul>
      </section>

      <section>
        <p className="label">What it looks like when it&rsquo;s done</p>
        <p>
          In 6 months the folder still answers why it&rsquo;s built this way, and not
          only what it is. A stranger opens it and carries on without asking you
          first. <code>EVIDENCE.md</code>{" "}
          answers a board member&rsquo;s question about the evidence, without
          you needing to explain it.
        </p>
      </section>

      {/* lint-writing: allow first person.
          The founder's note is the one place on this site where 'I' is the
          honest pronoun. Everything else stays in the second person, and the
          allowance ends with this section. */}
      <section>
        <p className="label">Why I built it</p>
        <p>
          You&rsquo;ve shipped something, then not been able to say why it&rsquo;s
          built that way.
        </p>
        <p>
          I kept watching ideas reach a build on claims nobody had checked,
          hypotheses treated as findings. Forest&rsquo;s gate weighs each claim
          by how you know it: watched, heard, reasoned, or assumed. That&rsquo;s the
          difference between a guess and evidence, before you spend a year
          building on the guess.
        </p>
      </section>
      {/* lint-writing: end */}

      <section>
        <p className="label">Start a project</p>
        <ol className="plain">
          <li><a href="/api/download">Download forest</a>.</li>
          <li>Unzip it and rename the folder after your idea.</li>
          <li>Open the folder in Claude Code, in the Claude app.</li>
          <li>Type <code>/pack</code>.</li>
        </ol>
        <p className="meta">
          You need the <a href="https://claude.com/download">Claude app</a> to
          start. No Terminal and nothing to install. Putting a site online later
          needs a free GitHub account, and <code>/publish</code> sets that up
          with you.
        </p>
      </section>

      <section>
        <p className="label">Where you stop</p>
        <h2>This ends 4 ways.</h2>
        <p>
          Forest asks what you want at the end before it asks anything about
          the idea. The answer moves the finish line.
        </p>
        <table className="uses">
          <thead>
            <tr><th>You want</th><th>Runs to</th><th>You leave with</th></tr>
          </thead>
          <tbody>
            {CAMPS.filter((c) => c.exit).map((c) => (
              <tr key={c.slug}>
                <td><strong>{c.exit!.want}</strong></td>
                <td className="dim">{c.name}</td>
                <td><Ticks>{c.exit!.leave}</Ticks></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Every camp stays open whichever you pick. The finish line changes
          what gets offered and what counts as done, never what you are
          allowed to do. Change your mind and you carry on from where you are.
        </p>
        <p className="meta">
          Camp 3 records your plan for reaching people, and <code>/reach</code>{" "}
          works it up after you ship. It does not draw your logo. That is a
          refusal rather than a gap.
        </p>
      </section>

      <section>
        <p className="label">Is it for you</p>
        <h2>When people reach for it.</h2>
        <table className="uses">
          <tbody>
            {USES.map((u) => (
              <tr key={u.who}>
                <td><strong>{u.who}</strong></td>
                <td><Ticks>{u.what}</Ticks></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Forest covers product thinking, user research, a design direction and
          the technical planning, across 6 camps.
        </p>
      </section>

      <section>
        <p className="label">The camps</p>
        <table className="camps">
          <thead>
            <tr><th>Camp</th><th>What it does</th><th>Writes</th></tr>
          </thead>
          <tbody>
            {CAMPS.map((s) => (
              <tr key={s.slug}>
                <td><strong>{s.name}</strong></td>
                <td><Ticks>{s.summary}</Ticks></td>
                <td><code>{s.output.split(",")[0]}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Next href="/camps" label="Each camp in detail" />
      </section>

      <section>
        <p className="label">How it works</p>
        <Flow />
        <p>
          Frame feeds everything. Every later camp reads the same 2 files:{" "}
          <code>compass.json</code> for direction and <code>map.md</code> for
          progress. You do not answer the same question twice.
        </p>
        <p>
          Learn sits before Shape, so the direction comes from someone real, not
          someone assumed.
        </p>
        <p>
          One gate sits between them. When Learn closes, <code>/weather</code>{" "}
          reads your notes and returns press on, reroute, or turn back. It
          weighs each claim by whether you watched it, heard it, reasoned it, or
          assumed it. Every reading names at least 2 routes onward, and you can
          overrule any of them. <code>/weather</code> writes your override down,
          and <code>/ship</code> reads it back before anything ships, against
          what you said you would regret.
        </p>
        <p>
          Ship is the last camp. Before anything goes out, <code>/ship</code>{" "}
          asks what you expect to regret in 3 weeks. <code>SUMMIT.md</code>{" "}
          carries a reflection to answer 3 months on, and <code>/retro</code>{" "}
          names what to take to the next project.
        </p>
        <Next href="/brief" label="See a sample BRIEF.md" />
      </section>

      <section>
        <p className="label">Why forest</p>
        <table className="uses">
          <tbody>
            <tr>
              <td><strong>It records why</strong></td>
              <td>Every claim tagged by source. Every design token traced to the reference it came from.</td>
            </tr>
            <tr>
              <td><strong>It builds</strong></td>
              <td>Camp 5 compiles one brief, then works the phases in order: build, review for bugs, check against the design, commit, tick, next.</td>
            </tr>
            <tr>
              <td><strong>It hands over</strong></td>
              <td>A stranger can pick up the folder and carry on.</td>
            </tr>
          </tbody>
        </table>
        <p>It&rsquo;s slower than working freehand.</p>
        <p className="meta">
          Skip it, and the folder stops answering why, the day you need it to.
        </p>
      </section>

      <section>
        <p className="label">Start a project</p>
        <p>
          <a href="/api/download">Download forest</a>, unzip it, rename the
          folder after your idea, open it in Claude Code and type{" "}
          <code>/pack</code>.
        </p>
        <Next href="/setup" label="Setup, first session and project structure" />
      </section>

      </main>

      <Footer />
    </>
  );
}
