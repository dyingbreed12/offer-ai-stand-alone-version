// src/components/Toast.tsx

'use client';

import { useEffect } from 'react';
import styles from './Toast.module.css';

export interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ type, title, message, onClose }) => {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.toastIcon}>{icons[type]}</div>
      <div className={styles.toastContent}>
        <div className={styles.toastTitle}>{title}</div>
        <div className={styles.toastMessage}>{message}</div>
      </div>
      <button className={styles.toastClose} onClick={onClose}>×</button>
    </div>
  );
};