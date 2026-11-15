
(function () {
  // ===== CURRENT YEAR =====
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // ===== DARK / LIGHT THEME =====
  const toggle = document.getElementById("theme-toggle");
  const storedTheme = window.localStorage.getItem("profile-theme");

  function applyTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("theme-dark", isDark);

    if (toggle) {
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.textContent = isDark
        ? "Switch to light theme"
        : "Switch to dark theme";
    }
  }

  applyTheme(storedTheme === "dark" ? "dark" : "light");

  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = document.body.classList.contains("theme-dark")
        ? "light"
        : "dark";

      window.localStorage.setItem("profile-theme", next);
      applyTheme(next);
    });
  }
})();

console.log("JavaScript connected");



// ===== LIVE WEATHER CHECKER =====

const cityInput = document.getElementById("cityInput");
const weatherButton = document.getElementById("weatherButton");
const weatherResult = document.getElementById("weatherResult");

if (cityInput && weatherButton && weatherResult) {

  async function getWeather() {
    const city = cityInput.value.trim();

    if (!city) {
      weatherResult.textContent = "Please enter a city name.";
      return;
    }

    weatherResult.textContent = "Loading weather...";
    weatherButton.disabled = true;

    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to get weather.");
      }

      weatherResult.textContent =
        `${data.name}: ${data.temperature}°C, ${data.description}. Humidity: ${data.humidity}%.`;

    } catch (error) {
      weatherResult.textContent = error.message;
      console.error("Weather error:", error);

    } finally {
      weatherButton.disabled = false;
    }
  }

  // Button click
  weatherButton.addEventListener("click", getWeather);

  // Enter key
  cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      getWeather();
    }
  });
}
