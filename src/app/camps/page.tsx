import { Nav } from "@/components/Nav";
import { Flow } from "@/components/Flow";
import { Footer, Next, Ticks } from "@/components/sections";
import { CAMPS, CHECKS } from "@/lib/content";

export const metadata = {
  title: "Camps · forest",
  description:
    "What each of the six camps does, when it runs, and what it leaves behind.",
};

export default function Camps() {
  return (
    <>
      <Nav here="/camps" />

      <main>

      <header>
        <h1>Camps</h1>
        <p className="lede">
          Six camps. You can walk them in order with <code>/trail</code>, or go
          straight to one with <code>/camp</code>. Shape in particular runs
          whenever you have references, not only when you reach it.
        </p>
        <Flow />
      </header>

      {CAMPS.map((s) => (
        <section key={s.slug} id={s.slug}>
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
            <span className="dim">Output</span> <code>{s.output}</code>
          </p>
        </section>
      ))}

      <section>
        <p className="label">Where it asks for more</p>
        <h2>Four points it pushes back.</h2>
        <p>
          Each is a question rather than a block, and each accepts &ldquo;not
          yet&rdquo; as an answer.
        </p>
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
