// Applied before paint, so a stored choice never flashes the other theme.
try {
  var t = localStorage.getItem("theme");
  if (t === "light" || t === "dark") {
    document.documentElement.setAttribute("data-theme", t);
  }
} catch {}
