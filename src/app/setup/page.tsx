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
        <h2>One command.</h2>
        <p>
          Open Terminal, paste this, and change <code>my-idea</code> to
          whatever you want the folder called.
        </p>
        <pre className="term" tabIndex={0}>{`mkdir my-idea && curl -sL https://github.com/ko-di/forest-kit/archive/refs/heads/main.tar.gz \\
  | tar -xz --strip-components=1 -C my-idea && cd my-idea && ./scripts/setup.sh`}</pre>
        <p>
          It downloads the kit, puts it in a folder, moves into it and runs
          setup. It leaves you where you need to be, so there is no path to
          type. Then type <code>/pack</code>.
        </p>
        <p className="meta">
          If you already use GitHub and would rather start from a repo of your
          own:
        </p>
        <pre className="term" tabIndex={0}>{`gh repo create my-idea --template ko-di/forest-kit --clone
cd my-idea && ./scripts/setup.sh`}</pre>
        <p className="meta">
          Or do it by hand:{" "}
          <a href="https://github.com/ko-di/forest-kit/archive/refs/heads/main.zip">download the ZIP</a>,
          unzip, rename the folder, then type <code>cd</code> and a space, drag
          the folder in from Finder, press enter, and run{" "}
          <code>./scripts/setup.sh</code>.
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
              <td>Terminal is not in your project folder. Run <code>pwd</code> to see where it is, then <code>cd</code> to the right place. Dragging the folder in after typing <code>cd</code> is the reliable way.</td>
            </tr>
            <tr>
              <td>Nothing seems to happen</td>
              <td>You probably typed <code>path/to/your-folder</code> literally. That is a placeholder, not a path.</td>
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
