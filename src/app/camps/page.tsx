import { Nav } from "@/components/Nav";
import { Back, Footer, Next, Ticks } from "@/components/sections";
import { CAMPS, CHECKS } from "@/lib/content";

export const metadata = {
  title: "Camps · forest",
  description:
    "What each of the 6 camps does, when it runs, and what it leaves behind.",
};

export default function Camps() {
  return (
    <>
      <Nav here="/camps" />

      <main>

      <header>
        <h1>Camps</h1>
        <p className="lede">
          What each of the 6 camps does, when it runs, and what it leaves
          behind.
        </p>
        <Back href="/" label="Back to overview" />
      </header>

      <section>
        <p className="label">Walk the camps</p>
        <ul className="dashed">
          <li>Walk them in order with <code>/trail</code>.</li>
          <li>Jump straight to one with <code>/camp</code>.</li>
          <li>
            Shape runs whenever you have references: a Figma file,
            screenshots, a live site. You do not have to reach Camp 4 first.
          </li>
        </ul>
      </section>

      <section>
        <h2>The 6 camps</h2>
        {CAMPS.map((s) => (
          <div key={s.slug} id={s.slug} className="camp">
            <p className="label">
              {s.n} · {s.name}
            </p>
            <p className="meta"><Ticks>{s.use}</Ticks></p>
            <ul className="dashed">
              {s.does.map((d) => (
                <li key={d}><Ticks>{d}</Ticks></li>
              ))}
            </ul>
            <p className="meta out">
              <span className="dim">Writes:</span> <code>{s.output}</code>
            </p>
          </div>
        ))}
      </section>

      <section>
        <p className="label">Where it pushes back</p>
        <ul className="dashed spaced">
          {CHECKS.map((c) => (
            <li key={c.when}>
              <strong>{c.when}.</strong> <Ticks>{c.what}</Ticks>
            </li>
          ))}
        </ul>
        <Next href="/setup" label="Setup and project structure" />
      </section>

      </main>

      <Footer />
    </>
  );
}
