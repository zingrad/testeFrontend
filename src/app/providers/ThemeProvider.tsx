import { useMemo, useState, type ReactNode } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

const THEME_KEY = "encontact-theme";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    const initial = saved === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", initial);
    return initial;
  });

  function setTheme(newTheme: Theme) {
    setThemeState(newTheme);
    applyTheme(newTheme);
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
