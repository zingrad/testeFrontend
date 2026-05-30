import { useTranslation } from "react-i18next";
import type { Menu, SubMenu } from "../../types/menu";
import { UserMenu } from "../UserMenu/UserMenu";
import styles from "./Sidebar.module.css";

type SidebarProps = {
  menus: Menu[];
  selectedSubMenuId: number | null;
  expandedMenuIds: number[];
  isLoading?: boolean;
  onToggleMenu: (menuId: number) => void;
  onSelectSubMenu: (subMenu: SubMenu) => void;
};

export function Sidebar({
  menus,
  selectedSubMenuId,
  expandedMenuIds,
  isLoading = false,
  onToggleMenu,
  onSelectSubMenu,
}: SidebarProps) {
  const { t } = useTranslation();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.userMenuWrapper}>
        <UserMenu />
      </div>

      <nav className={styles.nav} aria-label={t("menu")}>
        {isLoading ? (
          <div className={styles.skeletonContainer}>
            <div className={styles.skeletonGroup}>
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonItem} />
              <div className={styles.skeletonItem} />
            </div>
            <div className={styles.skeletonGroup}>
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonItem} />
            </div>
          </div>
        ) : menus.length === 0 ? (
          <p className={styles.emptyState}>{t("noMenus")}</p>
        ) : (
          menus.map((menu) => {
            const isExpanded = expandedMenuIds.includes(menu.id);

            return (
              <div key={menu.id} className={styles.menuGroup}>
                <button
                  className={styles.menuHeader}
                  onClick={() => onToggleMenu(menu.id)}
                  aria-expanded={isExpanded}
                  type="button"
                >
                  <span className={styles.menuTitle}>{menu.name}</span>
                  <svg
                    className={`${styles.chevron} ${
                      isExpanded ? styles.chevronOpen : ""
                    }`}
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

                {isExpanded && (
                  <ul className={styles.subMenuList}>
                    {menu.subMenus.map((subMenu) => {
                      const isActive = selectedSubMenuId === subMenu.id;

                      return (
                        <li key={subMenu.id}>
                          <button
                            className={`${styles.subNavItem} ${
                              isActive ? styles.active : ""
                            }`}
                            type="button"
                            onClick={() => onSelectSubMenu(subMenu)}
                            aria-current={isActive ? "page" : undefined}
                          >
                            {subMenu.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })
        )}
      </nav>
    </aside>
  );
}
