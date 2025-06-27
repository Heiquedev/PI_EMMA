import React from "react";
import styles from './styles/EmployeeModal.module.css'


const EmployeeModal: React.FC = () => (
  <div className="modal" id="employee-modal">
    <div className="modal-content">
      <span className="close-modal">&times;</span>
      <h2>Adicionar Novo Funcionário</h2>
      <form>
        <div className="form-group">
          <label>Nome Completo</label>
          <input type="text" required />
        </div>
        {/* Os outros campos seguem a mesma estrutura */}
        <button type="submit" className="btn-primary">Salvar</button>
      </form>
    </div>
  </div>
);

export default EmployeeModal;