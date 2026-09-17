/** Shared page furniture. */
import Link from "next/link";
import { KIT_VERSION } from "@/lib/content";

export function Footer() {
  return (
    <footer>
      <a href="https://github.com/ko-di/forest-kit">GitHub</a>
      <a href="https://kodi.design">k-d studio</a>
      <a
        href="https://revolut.me/kdimakos/pocket/CUxQ83rl98"
        target="_blank"
        rel="noopener noreferrer"
      >
        Tip the work
      </a>
      <a href="https://github.com/ko-di/forest-kit/blob/main/CHANGELOG.md">
        {`v${KIT_VERSION}`}
      </a>
      <span className="dim">MIT</span>
    </footer>
  );
}

/**
 * Copy in content.ts marks commands and paths with backticks, the way the
 * kit's own markdown does. This renders them as <code>. Splitting on the
 * backtick makes every odd segment a marked one. No HTML is built from the
 * string, so there is nothing to inject.
 */
export function Ticks({ children }: { children: string }) {
  return (
    <>
      {children.split("`").map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))}
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
