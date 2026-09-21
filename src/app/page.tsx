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
        <h1 className="visually-hidden">forest</h1>
        <p className="lede">
          forest takes an idea through research, requirements, a design
          direction and a build, to something you can push. It runs inside{" "}
          <a href="https://claude.com/claude-code">Claude Code</a> as a set of
          skills. There is no separate app.
        </p>
        <p>
          The 6 camps run from the first questions through research, requirements, a
          design direction, the build itself, and a check once the thing is live.
          Everything is written to plain files in one folder you own.
        </p>
      </header>

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
          It covers product thinking, user research, a design direction and the
          technical planning, across 6 camps.
        </p>
        <p className="meta">
          It does not cover go-to-market. Camp 3 records how you intend to reach
          people and that is all. It does not draw your logo either, which is a
          deliberate refusal rather than a gap.
        </p>
      </section>

      <section>
        <p className="label">The camps</p>
        <table className="camps">
          <thead>
            <tr><th>Camp</th><th>What it does</th><th>Output</th></tr>
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
          Frame feeds everything. Every later camp reads the
          same 2 files, <code>compass.json</code> for direction and{" "}
          <code>map.md</code> for progress, so an answer given once is not asked
          for again.
        </p>
        <p>
          Learn sits before Shape so the direction is drawn
          for someone real rather than someone assumed.
        </p>
        <p>
          One gate sits between them. When Learn closes,{" "}
          <code>/weather</code> reads your notes and returns press on, reroute,
          or turn back. It weighs each claim by whether you watched it, heard it,
          reasoned it, or assumed it. Every reading names at least 2 routes
          onward, and you can overrule any of them. The override is written down
          and quoted back to you at <code>/ship</code>, against what you said you
          would regret.
        </p>
        <p>
          Ship closes the loop. Before anything goes out you are
          asked what you expect to regret in 3 weeks.{" "}
          <code>SUMMIT.md</code> carries a reflection to answer 3 months on,
          and <code>/retro</code> names what to take to the next project.
        </p>
      </section>

      <section>
        <p className="label">Why forest</p>
        <table className="uses">
          <tbody>
            <tr>
              <td><strong>It can tell you to stop</strong></td>
              <td>The gate weighs your evidence by where it came from, not how it reads. It will not press on when the claim everything rests on is a guess.</td>
            </tr>
            <tr>
              <td><strong>It records why</strong></td>
              <td>Every claim tagged by source. Every design token traced to the reference it came from. In 6 months the folder answers why it is this, and not only what it is.</td>
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
        <p className="meta">Slower than working freehand. That is the trade.</p>
      </section>

      <section>
        <p className="label">Start a project</p>
        <ol className="plain">
          <li><a href="/forest.zip">Download forest</a>.</li>
          <li>Unzip it and rename the folder after your idea.</li>
          <li>Open the folder in Claude Code, in the Claude app.</li>
          <li>Type <code>/pack</code>.</li>
        </ol>
        <p className="meta">
          You need the <a href="https://claude.com/download">Claude app</a>. No
          Terminal, no GitHub account, nothing to install.
        </p>
        <Next href="/setup" label="Setup, first session and project structure" />
      </section>

      </main>

      <Footer />
    </>
  );
}
