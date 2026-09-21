import { Nav } from "@/components/Nav";
import { Footer, Next, Ticks } from "@/components/sections";
import { KIT_VERSION } from "@/lib/content";
import { readReleases } from "@/lib/whats-new";

export const metadata = {
  title: "What's new · forest",
  description:
    "What changed in the current version of forest, and what a project already on the trail needs to do.",
};

/**
 * Rendered from public/forest-whats-new.md at build time. That file is the
 * one the kit's release script publishes and the one /resupply reads aloud,
 * so this page and the terminal always say the same thing about a release.
 *
 * Only the current release is shown. The file keeps the older entries on
 * purpose: /resupply reads every entry between a project's version and the
 * latest, so someone 2 versions behind still sees each Breaking flag.
 */
export default function Versions() {
  const current = readReleases().find((r) => r.version === KIT_VERSION);
  if (!current) {
    // Same gate as release.sh: a version with no notes does not ship.
    throw new Error(`public/forest-whats-new.md has no '## ${KIT_VERSION}' entry.`);
  }

  return (
    <>
      <Nav here="/versions" />

      <main>

      <header>
        <h1>What&rsquo;s new</h1>
        <p className="lede">
          What changed in the current version of forest, and what a project
          already on the trail needs to do. <code>/resupply</code> reads the
          same notes to you inside Claude Code.
        </p>
        <p className="meta">
          Breaking says whether something you rely on works differently.
          Project update says whether a project you already started needs
          anything from you.
        </p>
      </header>

      <section id={current.anchor}>
        <p className="label">{current.version} · current</p>
        {current.breaking !== null && current.projectUpdate !== null && (
          <p className="meta">
            Breaking: {current.breaking ? "yes" : "no"} · Project update:{" "}
            {current.projectUpdate ? "yes" : "no"}
          </p>
        )}
        {current.blocks.map((b, i) =>
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
