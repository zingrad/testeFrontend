import { useTranslation } from "react-i18next";
import { useTheme } from "../../app/providers/ThemeContext";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`${t("theme")}: ${isDark ? t("dark") : t("light")}`}
      title={`${t("theme")}: ${isDark ? t("dark") : t("light")}`}
    >
      <span className={styles.icon}>{isDark ? "🌙" : "☀️"}</span>
      <span className={styles.label}>{isDark ? t("dark") : t("light")}</span>
    </button>
  );
}
