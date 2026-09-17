import Link from "next/link";
import { NavMenu } from "./NavMenu";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/", label: "Overview" },
  { href: "/camps", label: "Camps" },
  { href: "/after", label: "After" },
  { href: "/setup", label: "Setup" },
];

export function Nav({ here }: { here: string }) {
  return (
    <nav className="nav">
      {/* The same four pages twice: a row on desktop, a dropdown on mobile.
          CSS shows one and removes the other, so only one reaches the
          accessibility tree. */}
      <div className="nav-row">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} aria-current={l.href === here ? "page" : undefined}>
            {l.label}
          </Link>
        ))}
      </div>
      <NavMenu links={LINKS} here={here} />
      <a href="https://github.com/ko-di/forest-kit" className="nav-out">GitHub</a>
      <ThemeToggle />
    </nav>
  );
}
