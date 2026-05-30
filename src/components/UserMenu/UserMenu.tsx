import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../app/providers/AuthContext";
import { Avatar } from "../Avatar/Avatar";
import styles from "./UserMenu.module.css";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={styles.container} ref={menuRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        type="button"
      >
        <Avatar initials="AD" size="md" />
        <div className={styles.userInfo}>
          <strong className={styles.userName}>Admin</strong>
          <span className={styles.userEmail}>admin@encontact.com</span>
        </div>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="menu">
          <button className={styles.dropdownItem} role="menuitem" type="button">
            {t("myAccount")}
          </button>
          <button className={styles.dropdownItem} role="menuitem" type="button">
            {t("preferences")}
          </button>
          <div className={styles.divider} />
          <button
            className={`${styles.dropdownItem} ${styles.danger}`}
            role="menuitem"
            type="button"
            onClick={handleLogout}
          >
            {t("logout")}
          </button>
        </div>
      )}
    </div>
  );
}
