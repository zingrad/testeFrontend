import { useTranslation } from "react-i18next";
import { Button } from "../Button/Button";
import styles from "./Toolbar.module.css";

type ToolbarProps = {
  selectedCount: number;
  onArchive: () => void;
};

export function Toolbar({ selectedCount, onArchive }: ToolbarProps) {
  const { t } = useTranslation();
  const hasSelection = selectedCount > 0;

  const selectionLabel =
    selectedCount === 1 ? `1 ${t("selected")}` : `${selectedCount} ${t("selectedPlural")}`;

  return (
    <div className={styles.toolbar}>
      <span
        className={`${styles.selectionText} ${
          hasSelection ? styles.hasSelection : ""
        }`}
      >
        {selectionLabel}
      </span>
      <div className={styles.actions}>
        <Button variant="secondary" disabled>
          {t("assign")}
        </Button>
        <Button
          variant="secondary"
          onClick={onArchive}
          disabled={!hasSelection}
        >
          {t("archive")}
        </Button>
        <Button variant="secondary" disabled>
          {t("schedule")}
        </Button>
      </div>
    </div>
  );
}
