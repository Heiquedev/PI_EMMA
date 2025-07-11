import React from "react";

const ListPayroll: React.FC = () => (
  <table id="payroll-list">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Departamento</th>
        <th>Cargo</th>
        <th>Data de Pagamento</th>
      </tr>
    </thead>
    <tbody>
      {/* Preenchido dinamicamente */}
    </tbody>
  </table>
);

export default ListPayroll;