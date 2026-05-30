import type { MouseEvent } from "react";
import { Avatar } from "../Avatar/Avatar";
import styles from "./MessageCard.module.css";

type MessageCardProps = {
  id: string;
  name: string;
  subject: string;
  owner: string;
  users: string[];
  isSelected: boolean;
  hasSelection: boolean;
  onToggleSelection: () => void;
};

export function MessageCard({
  name,
  subject,
  owner,
  users = [],
  isSelected,
  hasSelection,
  onToggleSelection,
}: MessageCardProps) {
  const safeName = (name || "").trim() || "Sem nome";
  const safeSubject = (subject || "").trim() || "Sem assunto";
  const safeOwner = (owner || "").trim() || "??";
  const safeUsers = Array.isArray(users) ? users : [];

  function handleCardClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest(`.${styles.ownerCheckbox}`)
    ) {
      return;
    }

    if (hasSelection) {
      onToggleSelection();
    }
  }

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.cardSelected : ""}`}
      onClick={handleCardClick}
      role={hasSelection ? "button" : undefined}
      tabIndex={hasSelection ? 0 : undefined}
      onKeyDown={
        hasSelection
          ? (e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                onToggleSelection();
              }
            }
          : undefined
      }
    >
      <div
        className={`${styles.ownerArea} ${
          hasSelection ? styles.hasSelection : ""
        }`}
      >
        <div className={styles.ownerAvatar}>
          <Avatar initials={safeOwner} size="lg" />
        </div>
        <div className={styles.ownerCheckbox}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelection}
            onClick={(e) => e.stopPropagation()}
            className={styles.checkboxControl}
            aria-label={`Selecionar atendimento de ${safeName}`}
          />
        </div>
      </div>

      <div className={styles.middleSection}>
        <div className={styles.metaRow}>
          <span className={styles.senderName}>{safeName}</span>
          <span className={styles.timeTag}>Agora</span>
        </div>
        <p className={styles.subjectText}>{safeSubject}</p>
        <div className={styles.tagRow}>
          <span className={styles.inboxTag}>Caixa de entrada</span>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.collaborators} aria-label="Usuários envolvidos">
          {safeUsers.slice(0, 3).map((userInitials, index) => (
            <div
              key={`${userInitials}-${index}`}
              className={styles.avatarWrapper}
              style={{ zIndex: 3 - index }}
            >
              <Avatar initials={userInitials || "?"} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
