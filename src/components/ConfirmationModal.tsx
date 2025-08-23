'use client';

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
      className={`modal-overlay ${isOpen ? 'visible' : 'hidden'}`}
      onClick={onClose}
    >
      <div
        className={`modal-content ${isOpen ? 'open' : 'close'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-icon">🗑️</div>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="modal-btn secondary" onClick={onClose}>
            {cancelText}
          </button>
          <button className="modal-btn primary" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }
        .modal-overlay.visible {
          opacity: 1;
          pointer-events: auto;
        }
        .modal-content {
          background: #fff;
          padding: 1.5rem;
          border-radius: 10px;
          max-width: 400px;
          width: 90%;
          transform: translateY(-20px);
          transition: transform 0.2s ease;
        }
        .modal-content.open {
          transform: translateY(0);
        }
        .modal-content.close {
          transform: translateY(-20px);
        }
      `}</style>
    </div>
  );
};
