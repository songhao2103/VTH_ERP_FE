import { STORAGE_KEY } from "../constants/storageKey";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../storage/localStorage";

export type ThemeMode = "light" | "dark";

export function getStoredTheme(): ThemeMode | null {
  const value = getLocalStorageData<string>(STORAGE_KEY.THEME);
  return value === "light" || value === "dark" ? value : null;
}

export function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");

  // Cho native controls như input date/select đồng bộ theo theme
  root.classList.remove("scheme-light", "scheme-dark");
  root.classList.add(theme === "dark" ? "scheme-dark" : "scheme-light");

  setLocalStorageData(STORAGE_KEY.THEME, theme);
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
