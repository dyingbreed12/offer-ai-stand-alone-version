// src/components/ConfirmationModal.tsx

'use client';

import styles from './ConfirmationModal.module.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete All',
  cancelText = 'Cancel',
}: ConfirmationModalProps) => {
  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.visible : styles.hidden}`}
      onClick={onClose}
    >
      <div
        className={`${styles.modalContent} ${isOpen ? styles.open : styles.close}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalIcon}>🗑️</div>
        <h3 className={styles.modalTitle}>{title}</h3>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.modalActions}>
          <button className={`${styles.modalBtn} ${styles.secondary}`} onClick={onClose}>
            {cancelText}
          </button>
          <button className={`${styles.modalBtn} ${styles.primary}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};