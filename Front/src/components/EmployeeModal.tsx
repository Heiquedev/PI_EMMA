import React from 'react';
import styles from './EmployeeModal.module.css';

const EmployeeModal: React.FC = () => (
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      <span className={styles.close}>&times;</span>
      <h2>Adicionar Novo Funcionário</h2>
      <form>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nome Completo</label>
          <input type="text" className={styles.input} />
        </div>
        {/* Adicione os demais campos aqui da mesma forma */}
        <button type="submit" className={styles.btnPrimary}>Salvar</button>
      </form>
    </div>
  </div>
);

export default EmployeeModal;