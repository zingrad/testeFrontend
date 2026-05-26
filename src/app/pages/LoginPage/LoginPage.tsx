import { useState, type SubmitEventHandler } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../providers/AuthContext";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("Admin"); // deixei assim para facilitar
  const [password, setPassword] = useState("Admin");
  const [error, setError] = useState("");

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const success = login(username.trim(), password.trim());

    if (!success) {
      setError("Usuário ou senha inválidos.");
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
            <p>Entre para acessar sua central de atendimento.</p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="username">Usuário</label>
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
            <label htmlFor="password">Senha</label>
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
            Entrar
          </button>
        </form>

        <p className={styles.helper}>Credenciais de teste: Admin / Admin</p>
      </section>
    </main>
  );
}
