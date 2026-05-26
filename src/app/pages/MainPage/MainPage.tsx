import { useNavigate } from "react-router-dom";

import { useAuth } from "../../providers/AuthContext";
import styles from "./MainPage.module.css";

export function MainPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.userBox}>
          <div className={styles.avatar} aria-hidden="true">
            AD
          </div>

          <div className={styles.userInfo}>
            <strong>Admin</strong>
            <span>admin@encontact.com</span>
          </div>

          <button
            className={styles.logoutButton}
            type="button"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>

        <nav className={styles.nav} aria-label="Menu principal">
          <p className={styles.navTitle}>Menu</p>

          <button className={styles.navItem} type="button">
            Caixa de entrada
          </button>

          <button className={styles.navItem} type="button">
            Caixa de saída
          </button>
        </nav>
      </aside>

      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Central de atendimento</h1>
            <p>Selecione uma caixa para visualizar os atendimentos.</p>
          </div>
        </header>

        <div className={styles.placeholder}>
          <h2>Base inicial pronta</h2>
          <p>
            No próximo passo vamos separar a sidebar, toolbar e cards em
            componentes reutilizáveis.
          </p>
        </div>
      </section>
    </main>
  );
}
