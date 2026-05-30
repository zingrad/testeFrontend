import i18n from "../../i18n/index";
import styles from "./LanguageToggle.module.css";

const LANGS = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
] as const;

export function LanguageToggle() {
  const currentLang = i18n.language?.slice(0, 2) || "pt";

  function handleChange(code: string) {
    i18n.changeLanguage(code);
  }

  return (
    <div className={styles.container} role="group" aria-label="Selecionar idioma">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={`${styles.btn} ${currentLang === code ? styles.active : ""}`}
          onClick={() => handleChange(code)}
          aria-pressed={currentLang === code}
          aria-label={`Idioma: ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
