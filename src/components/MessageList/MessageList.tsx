import { useTranslation } from "react-i18next";
import type { MessageItem } from "../../types/item";
import { MessageCard } from "../MessageCard/MessageCard";
import styles from "./MessageList.module.css";

type MessageListProps = {
  items: MessageItem[];
  isLoading?: boolean;
  error?: string;
  selectedSubMenuName?: string;
  search?: string;
  selectedItemIds: string[];
  onToggleItemSelection: (itemId: string) => void;
};

export function MessageList({
  items,
  isLoading = false,
  error = "",
  selectedSubMenuName,
  search = "",
  selectedItemIds,
  onToggleItemSelection,
}: MessageListProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={styles.list}>
        {[1, 2, 3].map((n) => (
          <div key={n} className={styles.skeletonCard}>
            <div className={styles.skeletonAvatar} />
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonHeader} />
              <div className={styles.skeletonBody} />
              <div className={styles.skeletonTag} />
            </div>
            <div className={styles.skeletonRight} />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer} role="alert">
        <svg
          className={styles.errorIcon}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
            clipRule="evenodd"
          />
        </svg>
        <p className={styles.errorText}>{error}</p>
      </div>
    );
  }

  if (!selectedSubMenuName) {
    return (
      <div className={styles.emptyContainer}>
        <p className={styles.emptyText}>{t("selectFolder")}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p className={styles.emptyText}>{t("noItems")}</p>
      </div>
    );
  }

  const normalizedSearch = search.trim().toLowerCase();
  const filteredItems = items.filter((item) => {
    const nameStr = (item.name || "").toLowerCase();
    const subjectStr = (item.subject || "").toLowerCase();
    return (
      nameStr.includes(normalizedSearch) ||
      subjectStr.includes(normalizedSearch)
    );
  });

  if (filteredItems.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p className={styles.emptyText}>{t("noResults")}</p>
      </div>
    );
  }

  const hasSelection = selectedItemIds.length > 0;

  return (
    <div className={styles.list}>
      {filteredItems.map((item) => (
        <MessageCard
          key={item.id}
          id={item.id}
          name={item.name}
          subject={item.subject}
          owner={item.owner}
          users={item.users}
          isSelected={selectedItemIds.includes(item.id)}
          hasSelection={hasSelection}
          onToggleSelection={() => onToggleItemSelection(item.id)}
        />
      ))}
    </div>
  );
}
