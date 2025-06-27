import React from "react";
import styles from './styles/EmployeeTable.module.css'


const EmployeeTable: React.FC = () => (
  <table id="employees-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Departamento</th>
        <th>Cargo</th>
        <th>Data de Admissão</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {/* Preenchido dinamicamente */}
    </tbody>
  </table>
);

export default EmployeeTable;