"use strict";

const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const THEME_KEY = "protifolito-theme";

function getSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch (error) {
    // Storage may be disabled; use the default theme.
  }
  return "dark";
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  root.dataset.theme = isDark ? "dark" : "light";

  themeIcon.textContent = isDark ? "☼" : "☾";
  themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );

  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", isDark ? "#111111" : "#f5f1e8");
  }

  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    // Theme still works until the page is closed.
  }
}

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

applyTheme(getSavedTheme());

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
