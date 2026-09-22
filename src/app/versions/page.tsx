import { Nav } from "@/components/Nav";
import { Footer, Next, Ticks } from "@/components/sections";
import { KIT_VERSION } from "@/lib/content";
import { readReleases } from "@/lib/whats-new";

export const metadata = {
  title: "What's new · forest",
  description:
    "What changed in the last 3 versions of forest, and what a project already on the trail needs to do.",
};

/**
 * Rendered from public/forest-whats-new.md at build time. That file is the
 * one the kit's release script publishes and the one /resupply reads aloud,
 * so this page and the terminal always say the same thing about a release.
 *
 * The current release and the 2 before it. The file keeps older entries still:
 * /resupply reads every entry between a project's version and the latest, so
 * someone further behind than that still sees each Breaking flag in the
 * terminal, whatever this page shows.
 */
export default function Versions() {
  const all = readReleases();
  const at = all.findIndex((r) => r.version === KIT_VERSION);
  if (at === -1) {
    // Same gate as release.sh: a version with no notes does not ship.
    throw new Error(`public/forest-whats-new.md has no '## ${KIT_VERSION}' entry.`);
  }
  // Slice rather than take the first 3, so the page follows KIT_VERSION even
  // if the file ever carries an entry newer than the release the site describes.
  const shown = all.slice(at, at + 3);

  return (
    <>
      <Nav here="/versions" />

      <main>

      <header>
        <h1>What&rsquo;s new</h1>
        <p className="lede">
          What changed in the last {shown.length} versions of forest, and what
          a project already on the trail needs to do. <code>/resupply</code>{" "}
          reads the same notes to you inside Claude Code, starting from
          whichever version you are on.
        </p>
        <p className="meta">
          Breaking says whether something you rely on works differently.
          Project update says whether a project you already started needs
          anything from you.
        </p>
      </header>

      {shown.map((r, n) => (
        <section key={r.version} id={r.anchor}>
          <p className="label">
            {r.version}
            {n === 0 ? " · current" : ""}
          </p>
          {r.breaking !== null && r.projectUpdate !== null && (
            <p className="meta">
              Breaking: {r.breaking ? "yes" : "no"} · Project update:{" "}
              {r.projectUpdate ? "yes" : "no"}
            </p>
          )}
          {r.blocks.map((b, i) =>
            b.kind === "p" ? (
              <p key={i}><Ticks>{b.text}</Ticks></p>
            ) : (
              <ul key={i} className="dashed spaced">
                {b.items.map((item) => (
                  <li key={item}><Ticks>{item}</Ticks></li>
                ))}
              </ul>
            ),
          )}
        </section>
      ))}

      <section>
        <p className="meta">
          The download is always this version. A project on an older one is
          offered the update at the start of a session, and nothing changes
          until you say yes.
        </p>
        <Next href="/setup" label="Setup and updates" />
      </section>

      </main>

      <Footer />
    </>
  );
}
