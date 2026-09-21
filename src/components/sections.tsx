/** Shared page furniture. */
import Link from "next/link";
import { KIT_VERSION } from "@/lib/content";

export function Footer() {
  return (
    <footer>
      <a href="https://kodi.design">k-d studio</a>
      <a
        href="https://revolut.me/kdimakos/pocket/CUxQ83rl98"
        target="_blank"
        rel="noopener noreferrer"
      >
        Tip the work
      </a>
      <Link href="/versions" className="dim">{`v${KIT_VERSION}`}</Link>
      <Link href="/privacy" className="dim">Privacy</Link>
    </footer>
  );
}

/**
 * Copy in content.ts and the release notes mark commands and paths with
 * backticks, the way the kit's own markdown does, and the release notes open
 * each bullet with a **lead-in**. This renders the first as <code> and the
 * second as <strong>. Splitting on the marker makes every odd segment a
 * marked one. No HTML is built from the string, so there is nothing to inject.
 */
function ticks(text: string, key: string) {
  return text
    .split("`")
    .map((part, i) => (i % 2 ? <code key={`${key}-${i}`}>{part}</code> : part));
}

export function Ticks({ children }: { children: string }) {
  return (
    <>
      {children
        .split("**")
        .map((seg, i) =>
          i % 2 ? <strong key={i}>{ticks(seg, `s${i}`)}</strong> : ticks(seg, `t${i}`),
        )}
    </>
  );
}

export function Next({ href, label }: { href: string; label: string }) {
  return (
    <p className="next">
      <Link href={href}>{label} →</Link>
    </p>
  );
}
