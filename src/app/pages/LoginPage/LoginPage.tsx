import { useState, type SubmitEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "../../providers/AuthContext";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  const [username, setUsername] = useState("Admin");
  const [password, setPassword] = useState("Admin");
  const [error, setError] = useState("");

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const success = login(username.trim(), password.trim());

    if (!success) {
      setError(t("invalidCredentials"));
      return;
    }

    navigate("/", { replace: true });
  };

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <div className={styles.brand}>
          <div className={styles.logo} aria-hidden="true">
            eC
          </div>

          <div>
            <h1 id="login-title">enContact</h1>
            <p>{t("welcomeText")}</p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="username">{t("username")}</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError("");
              }}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">{t("password")}</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
            />
          </div>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <button className={styles.submitButton} type="submit">
            {t("login")}
          </button>
        </form>

        <p className={styles.helper}>{t("testCredentials")}</p>
      </section>
    </main>
  );
}
