import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections";

export const metadata = {
  title: "Privacy · forest",
  description:
    "What this site counts, what forest sends when you let it, and what is never collected.",
};

export default function Privacy() {
  return (
    <>
      <Nav here="/privacy" />

      <main>

      <header>
        <h1>Privacy</h1>
        <p className="lede">
          What gets counted, by whom, and for how long. Short, because there is
          not much of it.
        </p>
      </header>

      <section>
        <p className="label">This site</p>
        <h2>Page views, with no cookies.</h2>
        <p>
          Vercel Web Analytics counts which pages are read, roughly where from,
          and on what kind of device. It sets no cookies and builds no profile,
          so there is nothing to consent to and no banner to dismiss.
        </p>
        <p>
          Downloads are counted on the server when you select the download link.
          The count is a number going up. Your address is not stored with it.
        </p>
      </section>

      <section>
        <p className="label">forest, on your machine</p>
        <h2>One check you cannot turn off, and one report you can.</h2>
        <p>
          <strong>The version check.</strong> Once a day at most, forest asks
          this site which version is current, so it can tell you when a newer
          one exists. That request reaches the server the way any web request
          does, carrying your address. Nothing is stored about it here.
        </p>
        <p>
          <strong>The usage report.</strong> Off unless you say yes.{" "}
          <code>/pack</code> asks once when you start a project, and the answer
          is kept on your own machine. Say no, or never answer, and forest sends
          nothing at all.
        </p>
        <p>
          Why it is asked at all: the counts show how far projects get and
          which camp they stop at. That decides what gets built next, instead
          of a guess.
        </p>
        <p>If you said yes, a report holds 5 things:</p>
        <ul className="dashed">
          <li>A random number forest made up on your machine, so 2 reports can be told apart. Nothing about you, your computer or your project goes into it</li>
          <li>Which version of forest you are running</li>
          <li>Which camp you have reached, as a number from 1 to 6</li>
          <li>Whether you are working alone or with others</li>
          <li>How much time you set aside for research</li>
        </ul>
        <p>
          That is the whole report. Never sent: your project or product name,
          the person it is for, or anything you typed. Nothing at all from{" "}
          <code>project/</code> or <code>app/</code>, including your files and
          your folder names.
        </p>
        <p>
          To stop it, run{" "}
          <code>bash .claude/forest/resupply.sh --usage off</code>, or delete{" "}
          <code>.forest/usage</code>. Both work and neither needs the internet.
        </p>
      </section>

      <section>
        <p className="label">How long</p>
        <table className="uses">
          <tbody>
            <tr>
              <td>Counts, such as downloads and camps reached</td>
              <td>Kept. They are numbers with nobody attached</td>
            </tr>
            <tr>
              <td>The random project number</td>
              <td>Deleted automatically 400 days after its last report</td>
            </tr>
            <tr>
              <td>Your address</td>
              <td>Never stored. Vercel keeps ordinary server logs for a short period, as any host does</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <p className="label">Asking</p>
        <p>
          The data controller is k-d studio. There is no account to delete,
          because there is no account. If you want the random number from your
          copy removed before it expires, send it to{" "}
          <a href="mailto:studio@kodi.design">studio@kodi.design</a> and it will
          be deleted.
        </p>
      </section>

      </main>

      <Footer />
    </>
  );
}
