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
          Two commands to install, one to start. State lives in the folder, so
          you can stop and pick up days later.
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
        <h2>Three steps.</h2>
        <ol className="steps">
          <li>
            <span className="n">01</span>
            <div>
              <h3>
                <a href="https://github.com/ko-di/forest-kit/archive/refs/heads/main.zip">Download the kit as a ZIP</a>
              </h3>
              <p className="dim" style={{ margin: 0 }}>No account needed.</p>
            </div>
          </li>
          <li>
            <span className="n">02</span>
            <div>
              <h3>Unzip it, rename the folder to your project</h3>
              <p className="dim" style={{ margin: 0 }}>The folder name becomes the project name.</p>
            </div>
          </li>
          <li>
            <span className="n">03</span>
            <div>
              <h3>Open Terminal and run setup</h3>
              <p className="dim" style={{ margin: 0 }}>
                It makes the folders the kit writes into, says what each one is
                for, and checks you have what you need.
              </p>
            </div>
          </li>
        </ol>
        <p className="meta">In Terminal, on macOS or Linux:</p>
        <pre className="term" tabIndex={0}>{`cd path/to/your-folder
./scripts/setup.sh`}</pre>
        <p className="meta">
          Windows is not tested yet. There is a PowerShell version in the repo
          and WSL or Git Bash should run the script above, but neither has been
          tried on an actual Windows machine.
        </p>
        <p>
          Then open the folder and type <code>/pack</code>. Setup can be run
          again at any time without losing work.
        </p>
      </section>

      <section>
        <p className="label">When you need GitHub</p>
        <h2>Not until the last stage.</h2>
        <p>
          <code>/ship</code> is the first thing that commits and pushes, and it
          offers to set git up for you when you get there. Everything before it
          is files in a folder on your machine.
        </p>
        <p className="meta">
          If you already use GitHub and would rather start from a repo of your
          own, <code>gh repo create my-idea --template ko-di/forest-kit --clone</code>{" "}
          does that. It needs the GitHub CLI installed and signed in.
        </p>
      </section>

      <section>
        <p className="label">If something goes wrong</p>
        <table className="uses">
          <tbody>
            <tr>
              <td><code>permission denied</code></td>
              <td>macOS or Linux. Run <code>chmod +x scripts/setup.sh</code> once, then try again.</td>
            </tr>
            <tr>
              <td><code>running scripts is disabled</code></td>
              <td>Windows blocking local scripts. Run <code>Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass</code>, then try again.</td>
            </tr>
            <tr>
              <td><code>bad interpreter: ...bash^M</code></td>
              <td>A Windows line-ending problem from an older copy. Re-download the ZIP, or run <code>setup.ps1</code> instead.</td>
            </tr>
            <tr>
              <td><code>no such file or directory</code></td>
              <td>Wrong folder. <code>cd</code> into the unzipped folder first, the one with <code>scripts</code> inside it.</td>
            </tr>
            <tr>
              <td>Claude Code not on your PATH</td>
              <td>Install it from <a href="https://claude.com/claude-code">claude.com/claude-code</a>, or open the folder in Cursor with the extension.</td>
            </tr>
            <tr>
              <td><code>No git repository here yet</code></td>
              <td>Not an error. Nothing before <code>/ship</code> uses git.</td>
            </tr>
            <tr>
              <td><code>gh auth login</code> message</td>
              <td>Only from the <code>gh</code> route. Either sign in, or use the ZIP instead.</td>
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
          <code>/pack</code> asks your role and how much detail you want with
          each question, then starts intake. Expect twenty to forty minutes, and
          a closing summary of which answers are still thin.
        </p>
        <p>
          Fourteen skills ship with the kit. You have to remember two:{" "}
          <code>/pack</code>, then <code>/trail</code>. The rest are run for you
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
├─ SUMMIT.md             what went live, once /summit runs
├─ retro.md              what to keep for next time
└─ .claude/skills/       the fourteen skills that drive it`}</pre>
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
