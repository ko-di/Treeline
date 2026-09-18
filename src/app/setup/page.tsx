import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer, Next, Ticks } from "@/components/sections";
import { COMMANDS } from "@/lib/content";

export const metadata = {
  title: "Setup · forest-kit",
  description:
    "Install forest-kit, what the first session looks like, and what ends up in the project folder.",
};

export default function Setup() {
  return (
    <>
      <Nav here="/setup" />

      <main>

      <header>
        <h1>Setup</h1>
        <p className="lede">
          Two lines to install, one verb to start. State lives in the folder,
          so you can stop and pick up days later.
        </p>
      </header>

      <section>
        <p className="label">What you need</p>
        <ul className="dashed">
          <li>
            <a href="https://claude.com/claude-code">Claude Code</a>, or Cursor
            with the Claude Code extension
          </li>
          <li>Node 20+, only if the thing you build ends up needing it</li>
        </ul>
        <p className="meta">
          That is the whole list. No GitHub account, no git, nothing to sign
          in to.
        </p>
      </section>

      <section>
        <p className="label">Install</p>
        <h2>Two lines, inside Claude Code.</h2>
        <pre className="term" tabIndex={0}>{`/plugin marketplace add ko-di/forest-kit
/plugin install forest@forest-kit`}</pre>
        <p>
          Type them in any folder. Claude Code keeps the plugin installed, so
          the verbs are there in every session from then on, wherever you are.
        </p>
        <p className="meta">
          Nothing is downloaded to a folder of its own, and there is no setup
          step. To check it took, type <code>/</code> and start typing{" "}
          <code>forest</code>: Claude Code lists what it has.
        </p>
      </section>

      <section>
        <p className="label">Starting a project</p>
        <h2>Type one verb. It makes the folder.</h2>
        <p>
          Type <code>/forest:pack</code>. It asks what to call the project and
          where to keep it, makes the folder, and sets it up: the camp
          folders, <code>map.md</code> and <code>compass.json</code>. Then it
          tells you the path.
        </p>
        <p>
          If you already opened a folder meant for this project, it uses that
          one instead and says so. Either way, you never have to make a folder
          first.
        </p>
        <p className="meta">
          Coming back later: open that folder and type{" "}
          <code>/forest:trail</code>. In Terminal that is{" "}
          <code>cd [path]</code> then <code>claude</code>. In the Claude Code
          app, open the folder the way you would in any app.
        </p>
      </section>

      <section>
        <p className="label">When you need GitHub</p>
        <h2>Not until the last camp.</h2>
        <p>
          <code>/forest:ship</code> is the first thing that commits and pushes,
          and it offers to set git up for you when you get there. Everything
          before it is files in a folder on your machine.
        </p>
      </section>

      <section>
        <p className="label">Updates</p>
        <h2>A new version every couple of weeks. Claude Code brings it.</h2>
        <p>
          Plugins update through Claude Code, so there is nothing to run and
          nothing to download. To take one the moment it lands, type{" "}
          <code>/plugin update forest</code>.
        </p>
        <p className="meta">
          Your projects are plain files and an update never touches them. You
          stay at the camp you were at.
        </p>
      </section>

      <section>
        <p className="label">If something goes wrong</p>
        <table className="uses">
          <tbody>
            <tr>
              <td><code>/forest:pack</code> isn&rsquo;t offered</td>
              <td>The plugin isn&rsquo;t installed in this session. Run the two install lines above, then try again.</td>
            </tr>
            <tr>
              <td>You can&rsquo;t remember the verb</td>
              <td>Type <code>/</code> and start typing <code>forest</code>. Claude Code lists what it has.</td>
            </tr>
            <tr>
              <td>Claude asks permission to create files</td>
              <td>Normal on the first run in a new folder. <code>/forest:pack</code> writes the map, the compass and the camp folders there.</td>
            </tr>
            <tr>
              <td>Claude Code not on your PATH</td>
              <td>Install it from <a href="https://claude.com/claude-code">claude.com/claude-code</a>, or open the folder in Cursor with the extension.</td>
            </tr>
            <tr>
              <td><code>No git repository here yet</code></td>
              <td>Not an error. Nothing before <code>/forest:ship</code> uses git.</td>
            </tr>
            <tr>
              <td>You have a project from 1.x</td>
              <td>It keeps working as it is, with its own copy of the skills. To move it over: install the plugin, delete <code>.claude/skills/</code> from the project, then <code>/forest:trail</code>.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <p className="label">What to expect after setup</p>
        <h2>The first session.</h2>
        <p>
          Setup creates the folders, a blank <code>map.md</code> and an empty <code>compass.json</code>.
          Nothing runs until you type a command.
        </p>
        <p>
          <code>/forest:pack</code> asks your role and how much detail you want with
          each question, then starts intake. Expect twenty to forty minutes, and
          a closing summary of which answers are still thin.
        </p>
        <p>
          Fourteen skills ship with the plugin. You have to remember two:{" "}
          <code>/forest:pack</code>, then <code>/forest:trail</code>. The rest are run for you
          at the point they apply, or offered once the deploy is live.
        </p>
        {COMMANDS.map((g) => (
          <div key={g.group} className="cmd-group">
            <h3>{g.group}</h3>
            <p className="meta"><Ticks>{g.note}</Ticks></p>
            <table className="cmds">
              <tbody>
                {g.items.map((c) => (
                  <tr key={c.cmd}>
                    <td><code>{c.cmd}</code></td>
                    <td><Ticks>{c.does}</Ticks></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <p className="meta">
          What happens after the summit is covered on{" "}
          <Link href="/after">the next page</Link>.
        </p>
      </section>

      <section>
        <p className="label">Project structure</p>
        <pre className="term" tabIndex={0}>{`my-idea/
├─ BRIEF.md              scope, phases, feel, decisions. Hand this to a build tool
├─ EVIDENCE.md           what you know and how you know it
├─ compass.json          direction. Every camp reads it
├─ map.md                the six camps, progress, phases, decisions
├─ camps/
│  ├─ 1-intake/          idea.md
│  ├─ 2-discover/        interview-guide.md, synthesis.md, weather.md
│  ├─ 3-define/          prd.md
│  ├─ 4-design/          design.md
│  ├─ 5-build/           build notes
│  └─ 6-ship/
├─ research/raw/         notes, one file per session
├─ design/decisions/     why each call was made
├─ memory/session.md     local to your machine, not committed
├─ SUMMIT.md             what went live, once /forest:summit runs
├─ retro.md              what to keep for next time
└─ .forest/role.md       who you are, and how much explanation you want`}</pre>
        <p>
          Plain files throughout, readable at any point. Two do most of the
          work once the thinking is done. <code>BRIEF.md</code> goes to a build
          tool. <code>EVIDENCE.md</code> goes to anyone asking why the thing is
          worth doing.
        </p>
        <p className="meta">
          What to do with each file, and the prompts for handing the brief to
          Claude Code, Claude, v0, Figma Make or a developer, are in the kit&rsquo;s{" "}
          <a href="https://github.com/ko-di/forest-kit/blob/main/BUILDING.md">BUILDING.md</a>.
        </p>
        <Next href="/camps" label="What each camp does" />
      </section>

      </main>

      <Footer />
    </>
  );
}
