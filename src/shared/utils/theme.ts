export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "theme";

export function getStoredTheme(): ThemeMode | null {
  const value = localStorage.getItem(STORAGE_KEY);
  return value === "light" || value === "dark" ? value : null;
}

export function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");

  // Cho native controls như input date/select đồng bộ theo theme
  root.classList.remove("scheme-light", "scheme-dark");
  root.classList.add(theme === "dark" ? "scheme-dark" : "scheme-light");

  localStorage.setItem(STORAGE_KEY, theme);
}

export function initTheme() {
  const stored = getStoredTheme();
  if (stored) {
    applyTheme(stored);
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}
