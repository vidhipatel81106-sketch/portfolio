(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const toggle = document.getElementById("theme-toggle");
  const storedTheme = window.localStorage.getItem("profile-theme");

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("theme-dark", isDark);
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.textContent = isDark ? "Switch to light theme" : "Switch to dark theme";
    }
  }

  applyTheme(storedTheme === "dark" ? "dark" : "light");

  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = document.body.classList.contains("theme-dark") ? "light" : "dark";
      window.localStorage.setItem("profile-theme", next);
      applyTheme(next);
    });
  }
})();
