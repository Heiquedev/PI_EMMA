import React from 'react';
import styles from './EmployeeModal.module.css';

interface EmployeeModalProps {
  visible: boolean;
  onClose: () => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Adicionar Novo Funcionário</h2>
        <form>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome Completo</label>
            <input type="text" className={styles.input} />
          </div>
          {/* Outras entradas aqui... */}
          <button type="submit" className={styles.btnPrimary}>Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
