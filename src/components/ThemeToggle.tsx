"use client";

/**
 * Theme toggle. Follows the OS until someone picks, then remembers.
 *
 * Deliberately stateless: which icon shows is decided by CSS from the same
 * tokens that decide the palette, so the server and the client always render
 * identical markup and there is nothing to hydrate. The current theme is read
 * from the DOM at click time rather than tracked in React.
 */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label="Switch between light and dark"
      title="Switch between light and dark"
    >
      {/* Both are rendered; CSS shows the one that offers the other theme. */}
      <svg className="icon-sun" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <circle cx="8" cy="8" r="3.1" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line key={deg} x1="8" y1="1.4" x2="8" y2="3.1" transform={`rotate(${deg} 8 8)`} />
        ))}
      </svg>
      <svg className="icon-moon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M13 9.6A5.6 5.6 0 0 1 6.4 3a5.6 5.6 0 1 0 6.6 6.6Z" />
      </svg>
    </button>
  );
}
