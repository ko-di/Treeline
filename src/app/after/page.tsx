import { Nav } from "@/components/Nav";
import { Footer, Next, Ticks } from "@/components/sections";
import { AFTER } from "@/lib/content";

export const metadata = {
  title: "After the documents · forest-kit",
  description:
    "What happens once the early camps are filled in: building from the brief, shipping, verifying, and closing out.",
};

export default function After() {
  return (
    <>
      <Nav here="/after" />

      <main>

      <header>
        <h1>After the documents</h1>
        <p className="lede">
          The written camps are the halfway point, not the end. From here the
          kit builds, ships and checks what went live.
        </p>
      </header>

      <section>
        <p className="label">The second half</p>
        <h2>From documents to something live.</h2>
        <ol className="steps">
          {AFTER.map((a, i) => (
            <li key={a.step}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{a.step}</h3>
                <p className="dim" style={{ margin: 0 }}>
                  <Ticks>{a.what}</Ticks>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <p className="label">Ninety days on</p>
        <h2>The part most workflows skip.</h2>
        <p>
          <code>SUMMIT.md</code> is written with a section you cannot answer yet.
          It carries the date, ninety days from the day you shipped, and three
          questions to answer cold.
        </p>
        <p>
          Whose life is measurably different because this exists, and was it the
          person you named at intake? What did you ship that you would cut now?
          What did you cut that you would put back?
        </p>
        <p>
          The first is the one that matters. Intake asked you to name a
          beneficiary. Ninety days on, the file asks whether that is who
          actually turned up. If it was someone else, that is worth knowing
          while the project is young enough to follow them instead.
        </p>
      </section>

      <section>
        <p className="label">Building it</p>
        <h2>Handing the brief to a tool.</h2>
        <p>
          <code>BRIEF.md</code> is the file you hand over. It stands on its own:
          scope with the out list kept word for word, phases you could ship
          separately, how it should feel, the decisions already made, and what is
          still missing.
        </p>
        <table className="uses">
          <tbody>
            <tr>
              <td><strong>Claude Code</strong></td>
              <td>In the same folder, so there is nothing to attach. Ask it to read <code>BRIEF.md</code> and <code>design.md</code> and build phase 1.</td>
            </tr>
            <tr>
              <td><strong>Claude, or Claude Design</strong></td>
              <td>Attach both files and ask for phase 1 as an artifact, using the tokens exactly and nothing outside the scope list.</td>
            </tr>
            <tr>
              <td><strong>v0, Lovable, Bolt, Figma Make</strong></td>
              <td>These want a prompt rather than a document. Paste the brief&rsquo;s first three sections and the phase you want.</td>
            </tr>
            <tr>
              <td><strong>A developer or an agency</strong></td>
              <td>Send the brief, the design and the PRD. For a client handover, <code>/forest:handoff</code> packages it and verifies the access transfers.</td>
            </tr>
          </tbody>
        </table>
        <p>
          When a phase comes back, <code>/forest:camp build</code> compares it with the
          design and lists every divergence, so drift gets named while it is one
          component rather than twenty.
        </p>
        <p className="meta">
          Full prompts for each tool, which files to send, and what to do when
          what comes back is wrong, are in{" "}
          <a href="https://github.com/ko-di/forest-kit/blob/main/BUILDING.md">BUILDING.md</a>.
        </p>
        <Next href="/setup" label="Setup and project structure" />
      </section>

      </main>

      <Footer />
    </>
  );
}
