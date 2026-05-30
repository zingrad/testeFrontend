import { useEffect, useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import type { Menu, SubMenu } from "../../../types/menu";
import type { MessageItem } from "../../../types/item";
import { getMenus, getItemsBySubMenu } from "../../../services/api";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { SearchInput } from "../../../components/SearchInput/SearchInput";
import { Toolbar } from "../../../components/Toolbar/Toolbar";
import { MessageList } from "../../../components/MessageList/MessageList";
import { ThemeToggle } from "../../../components/ThemeToggle/ThemeToggle";
import { LanguageToggle } from "../../../components/LanguageToggle/LanguageToggle";
import styles from "./MainPage.module.css";

const MIN_WIDTH = 220;
const MAX_WIDTH = 420;

export function MainPage() {
  const { t } = useTranslation();

  const [menus, setMenus] = useState<Menu[]>([]);
  const [items, setItems] = useState<MessageItem[]>([]);
  const [selectedSubMenu, setSelectedSubMenu] = useState<SubMenu | null>(null);
  const [expandedMenuIds, setExpandedMenuIds] = useState<number[]>([]);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [isLoadingMenus, setIsLoadingMenus] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [menusError, setMenusError] = useState("");
  const [itemsError, setItemsError] = useState("");
  const [search, setSearch] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(280);

  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  useEffect(() => {
    async function loadInitialData() {
      setIsLoadingMenus(true);
      setMenusError("");
      try {
        const menusData = await getMenus();
        setMenus(menusData);

        if (menusData.length > 0) {
          const firstMenu = menusData[0];
          setExpandedMenuIds([firstMenu.id]);

          const firstSubMenu = firstMenu.subMenus?.[0];
          if (firstSubMenu) {
            setSelectedSubMenu(firstSubMenu);
            setSelectedItemIds([]);
            setIsLoadingItems(true);
            try {
              const itemsData = await getItemsBySubMenu(firstSubMenu.id);
              setItems(itemsData);
            } catch {
              setItemsError("Não foi possível carregar os itens dessa caixa.");
            } finally {
              setIsLoadingItems(false);
            }
          }
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Não foi possível carregar os menus.";
        setMenusError(errorMessage);
      } finally {
        setIsLoadingMenus(false);
      }
    }

    loadInitialData();
  }, []);

  async function handleSelectSubMenu(subMenu: SubMenu) {
    setSelectedSubMenu(subMenu);
    setSelectedItemIds([]);
    setItemsError("");
    setIsLoadingItems(true);

    try {
      const data = await getItemsBySubMenu(subMenu.id);
      setItems(data);
    } catch {
      setItemsError("Não foi possível carregar os itens dessa caixa.");
      setItems([]);
    } finally {
      setIsLoadingItems(false);
    }
  }

  function handleToggleMenu(menuId: number) {
    setExpandedMenuIds((current) =>
      current.includes(menuId)
        ? current.filter((id) => id !== menuId)
        : [...current, menuId]
    );
  }

  function handleToggleItemSelection(itemId: string) {
    setSelectedItemIds((current) =>
      current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId]
    );
  }

  function handleArchiveSelectedItems() {
    setItems((currentItems) =>
      currentItems.filter((item) => !selectedItemIds.includes(item.id))
    );
    setSelectedItemIds([]);
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    const delta = e.clientX - startX.current;
    const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth.current + delta));
    setSidebarWidth(newWidth);
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  function handleResizerMouseDown(e: React.MouseEvent) {
    isResizing.current = true;
    startX.current = e.clientX;
    startWidth.current = sidebarWidth;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  return (
    <main
      className={styles.page}
      style={{ "--sidebar-width": `${sidebarWidth}px` } as React.CSSProperties}
    >
      <Sidebar
        menus={menus}
        selectedSubMenuId={selectedSubMenu?.id ?? null}
        expandedMenuIds={expandedMenuIds}
        isLoading={isLoadingMenus}
        onToggleMenu={handleToggleMenu}
        onSelectSubMenu={handleSelectSubMenu}
      />

      <div
        className={styles.resizer}
        onMouseDown={handleResizerMouseDown}
        aria-hidden="true"
      />

      <section className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerTitleArea}>
            <h1>{t("tickets")}</h1>
            <p>
              {selectedSubMenu
                ? `${t("viewing")}: ${selectedSubMenu.name}`
                : t("selectFolder")}
            </p>
          </div>
          <div className={styles.headerActions}>
            <SearchInput value={search} onChange={setSearch} />
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </header>

        <div className={styles.body}>
          <Toolbar
            selectedCount={selectedItemIds.length}
            onArchive={handleArchiveSelectedItems}
          />
          <MessageList
            items={items}
            isLoading={isLoadingItems}
            error={itemsError || menusError}
            selectedSubMenuName={selectedSubMenu?.name}
            search={search}
            selectedItemIds={selectedItemIds}
            onToggleItemSelection={handleToggleItemSelection}
          />
        </div>
      </section>
    </main>
  );
}
