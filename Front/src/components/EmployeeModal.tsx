import React from "react";
import styles from './EmployeeModal.module.css'

interface EmployeeModalProps {
  visible: boolean;
  onClose: () => void;
}
const EmployeeModal: React.FC<EmployeeModalProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <span className={styles.closeModal} onClick={onClose}>
          &times;
        </span>
        <h2>Adicionar Novo Funcionário</h2>
        <form>
          <div className={styles.formGroup}>
            <label>Nome Completo</label>
            <input type="text" />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="text" />
          </div>
          <div className={styles.formGroup}>
            <label>Departamento</label>
            <select id="employee-department" required>
              <option value="">Selecione...</option>
              <option value="TI">TI</option>
              <option value="RH">RH</option>
              <option value="Financeiro">Financeiro</option>
              <option value="Vendas">Vendas</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Cargo</label>
            <select name="" id="employee-position" required>
              <option value="">Selecione...</option>
              <option value="Analista">Analista</option>
              <option value="Gerente">Gerente</option>
              <option value="Diretor">Diretor</option>
              <option value="Assistente">Assistente</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Salário</label>
            <input type="text" />
          </div>
          <div className={styles.formGroup}>
            <label>Data de Admissão</label>
            <input type="text" />
          </div>
          {/* Outras entradas aqui... */}
          <button type="submit" className={styles.btnPrimary}>Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeModal;