import SvgIcon from "@/icons/SvgIcon";
import { Switch } from "@/shared/components/switch";
import {
  applyTheme,
  getStoredTheme,
  type ThemeMode,
} from "@/shared/utils/theme";
import { useEffect, useState } from "react";

const ToggleTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = getStoredTheme();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(stored);
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  function toggleTheme() {
    const next: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <div>
      <Switch
        aria-label="Theme switch"
        size="sm"
        checked={theme == "dark"}
        startIcon={<SvgIcon icon="sunMedium" />}
        endIcon={
          <>
            <SvgIcon icon="moon" />
          </>
        }
        onChange={() => {
          toggleTheme();
        }}
      />
    </div>
  );
};

export default ToggleTheme;
