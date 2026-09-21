import { Nav } from "@/components/Nav";
import { Footer, Next, Ticks } from "@/components/sections";
import { KIT_VERSION } from "@/lib/content";
import { readReleases } from "@/lib/whats-new";

export const metadata = {
  title: "Versions · forest",
  description:
    "Every version of forest, what changed, and what a project already on the trail needs to do.",
};

/**
 * Rendered from public/forest-whats-new.md at build time. That file is the
 * one the kit's release script publishes and the one /resupply reads aloud,
 * so this page and the terminal always say the same thing about a release.
 */
export default function Versions() {
  const releases = readReleases();

  return (
    <>
      <Nav here="/versions" />

      <main>

      <header>
        <h1>Versions</h1>
        <p className="lede">
          What changed in each version of forest, and what a project already
          on the trail needs to do. <code>/resupply</code> reads the same
          notes to you inside Claude Code.
        </p>
        <p className="meta">
          Each entry says 2 things first. Breaking: whether something you rely
          on works differently. Project update: whether a project you already
          started needs anything from you.
        </p>
      </header>

      {releases.map((r) => (
        <section key={r.version} id={r.anchor}>
          <p className="label">
            {r.version === KIT_VERSION ? `${r.version} · current` : r.version}
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
          The download is always the newest version. A project on an older one
          is offered the update at the start of a session, and nothing changes
          until you say yes.
        </p>
        <Next href="/setup" label="Setup and updates" />
      </section>

      </main>

      <Footer />
    </>
  );
}
