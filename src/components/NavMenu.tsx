"use client";

import Link from "next/link";
import { useRef } from "react";

type LinkItem = { href: string; label: string };

/**
 * The nav on small screens. A native <details>, so open/closed lives in the
 * DOM rather than in React, same reasoning as ThemeToggle: nothing to
 * hydrate. The ref exists only to shut the panel after a tap, which the
 * element does not do on its own.
 */
export function NavMenu({ links, here }: { links: LinkItem[]; here: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const close = () => ref.current?.removeAttribute("open");
  const current = links.find((l) => l.href === here)?.label ?? "Pages";

  return (
    <details
      ref={ref}
      className="nav-menu"
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
      }}
    >
      <summary>
        {current}
        <svg className="chev" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M4 6.5 8 10.5 12 6.5" />
        </svg>
      </summary>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={l.href === here ? "page" : undefined}
              onClick={close}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
