import { notFound } from "next/navigation";
import { readNumbers, storeConfigured, today } from "@/lib/store";

/**
 * The numbers, on one page, for the owner.
 *
 * Reached by /usage?key=… , matched against USAGE_KEY. Vercel's password
 * protection is a paid feature, so a key in the query string is what a Hobby
 * deployment has. Anything else is a 404 rather than a refusal, so the page
 * does not announce itself to anyone who guesses the path.
 */
export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

function Row({ label, value }: { label: string; value: number }) {
  return (
    <tr>
      <td>{label}</td>
      <td><code>{value}</code></td>
    </tr>
  );
}

export default async function Usage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const key = process.env.USAGE_KEY;
  const { key: given } = await searchParams;
  if (!key || given !== key) notFound();

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    return d.toISOString().slice(0, 10);
  });

  const [dlTotal, projects] = await readNumbers(["dl:total", "projects:total"]);
  const dlDaily = await readNumbers(days.map((d) => `dl:${d}`));
  const reached = await readNumbers([1, 2, 3, 4, 5, 6].map((n) => `reached:${n}`));
  const teams = await readNumbers(["team:solo", "team:small", "team:larger"]);
  const times = await readNumbers(
    ["none", "minutes", "afternoon", "days", "weeks"].map((t) => `time:${t}`),
  );

  const CAMPS = ["Frame", "Learn", "Decide", "Shape", "Build", "Ship"];

  return (
    <main>
      <header>
        <h1>Usage</h1>
        <p className="lede">
          Downloads, and how far projects get. Counts only. Nothing here
          identifies anyone, and nothing from inside a project is collected.
        </p>
        {!storeConfigured && (
          <p className="meta">
            No store is configured, so every number below reads 0. Add an
            Upstash Redis integration in Vercel and redeploy.
          </p>
        )}
      </header>

      <section>
        <p className="label">Downloads</p>
        <table className="uses">
          <tbody>
            <Row label="All time" value={dlTotal} />
            <Row label={`Today, ${today()}`} value={dlDaily[0]} />
            <Row label="Last 14 days" value={dlDaily.reduce((a, b) => a + b, 0)} />
          </tbody>
        </table>
      </section>

      <section>
        <p className="label">How far projects get</p>
        <p className="meta">
          Each row counts the projects that reached at least that camp, so the
          numbers only fall. The biggest drop is where people stall.
        </p>
        <table className="uses">
          <tbody>
            <Row label="Projects packed" value={projects} />
            {CAMPS.map((name, i) => (
              <Row key={name} label={`Reached ${i + 1}, ${name}`} value={reached[i]} />
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <p className="label">Who is using it</p>
        <table className="uses">
          <tbody>
            <Row label="On their own" value={teams[0]} />
            <Row label="2 to 5 people" value={teams[1]} />
            <Row label="More than 5" value={teams[2]} />
          </tbody>
        </table>
      </section>

      <section>
        <p className="label">Time set aside for research</p>
        <table className="uses">
          <tbody>
            <Row label="Not now" value={times[0]} />
            <Row label="Under an hour" value={times[1]} />
            <Row label="An afternoon" value={times[2]} />
            <Row label="A few days" value={times[3]} />
            <Row label="2 weeks or more" value={times[4]} />
          </tbody>
        </table>
        <p className="meta">
          Only projects whose owner said yes are counted, so these are a sample
          rather than a total. Treat them as a direction of travel.
        </p>
      </section>
    </main>
  );
}
