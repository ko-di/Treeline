import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer, Next, Ticks } from "@/components/sections";
import { COMMANDS } from "@/lib/content";

export const metadata = {
  title: "Setup · forest",
  description:
    "Install forest, what the first session looks like, and what ends up in the project folder.",
};

export default function Setup() {
  return (
    <>
      <Nav here="/setup" />

      <main>

      <header>
        <h1>Setup</h1>
        <p className="lede">
          Download a folder, open it in Claude, type one command. State lives
          in the folder, so you can stop and pick up days later.
        </p>
      </header>

      <section>
        <p className="label">What you need</p>
        <ul className="dashed">
          <li>
            The <a href="https://claude.com/download">Claude app</a>, with
            Claude Code in it
          </li>
          <li>Node 20+, only if the thing you build ends up needing it</li>
        </ul>
        <p className="meta">
          That is the whole list. No Terminal, no GitHub account, nothing to
          install.
        </p>
      </section>

      <section>
        <p className="label">Start a project</p>
        <h2>Download a folder, open it in Claude, type one command.</h2>
        <ol className="plain">
          <li><a href="/api/download">Download forest</a>. You get <code>forest.zip</code>.</li>
          <li>Unzip it, and rename the folder to your project&rsquo;s name. Put it wherever you keep your work.</li>
          <li>Open the folder in Claude Code, in the Claude app. Say yes when it asks whether you trust the folder.</li>
          <li>Type <code>/pack</code>.</li>
        </ol>
        <p>
          <code>/pack</code> asks a few questions and sets the project up in
          that folder. From then on, open the same folder and type{" "}
          <code>/trail</code> to carry on.
        </p>
        <p className="meta">
          The folder looks almost empty at first. The kit is in a hidden
          folder, <code>.claude/</code>, and your project&rsquo;s files appear
          beside the README as you work. You never need to open{" "}
          <code>.claude/</code>.
        </p>
        <p className="meta">
          Prefer Terminal? Unzip and rename as above, then{" "}
          <code>cd</code> into the folder, run <code>claude</code>, and type{" "}
          <code>/pack</code>.
        </p>
      </section>

      <section>
        <p className="label">When you need GitHub</p>
        <h2>Not until the last camp.</h2>
        <p>
          <code>/ship</code> is the first thing that commits and pushes,
          and it offers to set git up for you when you get there. Everything
          before it is files in a folder on your machine.
        </p>
      </section>

      <section>
        <p className="label">Updates</p>
        <h2>A new version every couple of weeks. You choose when.</h2>
        <p>
          When one is out, Claude says so in one line at the start of a
          session. Type <code>/resupply</code>: it shows what changed, asks,
          and swaps forest&rsquo;s own folder for the new one. Your project
          files and your app are never touched, and the old version is kept
          in case. Then restart Claude Code so it reads the new one.
        </p>
        <p className="meta">
          Claude Code asks once for permission to change the{" "}
          <code>.claude</code> folder. That prompt is the update.
        </p>
      </section>

      <section>
        <p className="label">If something goes wrong</p>
        <table className="uses">
          <tbody>
            <tr>
              <td>Claude Code asks whether you trust this folder</td>
              <td>Normal the first time you open any folder. Say yes: it lets forest&rsquo;s own settings apply, including the once-a-day check for a newer version.</td>
            </tr>
            <tr>
              <td><code>/pack</code> isn&rsquo;t offered</td>
              <td>Claude Code is open in a different folder. Choose the project folder itself: the one with the README in it.</td>
            </tr>
            <tr>
              <td>Claude asks permission to create files</td>
              <td>Normal on the first run. <code>/pack</code> writes the map, the compass and the camp folders into your project.</td>
            </tr>
            <tr>
              <td>You can&rsquo;t remember the command</td>
              <td>Type <code>/</code> and Claude Code lists what it has. The ones you need are <code>/pack</code> and <code>/trail</code>.</td>
            </tr>
            <tr>
              <td>You can&rsquo;t see a <code>.claude</code> folder</td>
              <td>It is hidden on purpose. You never need to open it.</td>
            </tr>
            <tr>
              <td><code>/resupply</code> asks to change the <code>.claude</code> folder</td>
              <td>That is the update itself: forest lives there. Say yes. Nothing in <code>project/</code> or <code>app/</code> is touched.</td>
            </tr>
            <tr>
              <td><code>No git repository here yet</code></td>
              <td>Not an error. Nothing before <code>/ship</code> uses git.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <p className="label">What to expect</p>
        <h2>The first session.</h2>
        <p>
          Nothing runs until you type a command. <code>/pack</code> creates
          the folders, <code>map.md</code> and <code>compass.json</code> as it
          goes.
        </p>
        <p>
          <code>/pack</code> asks your role and how much detail you want with
          each question, then starts intake. Expect 20 to 40 minutes, and
          a closing summary of which answers are still thin.
        </p>
        <p>
          The download holds 26 skills. You have to remember 2:{" "}
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
├─ README.md               how forest works, and where everything is
├─ project/                everything forest writes for you
│  ├─ map.md                 where you are on the trail
│  ├─ compass.json           the project's direction. Every step reads it
│  ├─ BRIEF.md               hand this to whoever builds it
│  ├─ EVIDENCE.md            what you know, and how you know it
│  ├─ 1-frame/ … 6-ship/     each camp's working files
│  ├─ research/              your notes from talking to people
│  ├─ decisions/             why each call was made
│  ├─ design/                the design system
│  └─ memory/                one line per session. Local to your machine
├─ app/                    the product itself, built in Camp 5
└─ .claude/                forest itself. Hidden; you never need to open it`}</pre>
        <p>
          Plain files throughout, readable at any point. 2 do most of the
          work once the thinking is done. <code>BRIEF.md</code> goes to a build
          tool. <code>EVIDENCE.md</code> goes to anyone asking why the thing is
          worth doing.
        </p>
        <p className="meta">
          <code>BUILDING.md</code> comes in the download. It says what to do with
          each file. It holds the prompts for handing the brief to Claude Code,
          Claude, v0, Figma Make or a developer.
        </p>
        <Next href="/camps" label="What each camp does" />
      </section>

      </main>

      <Footer />
    </>
  );
}
