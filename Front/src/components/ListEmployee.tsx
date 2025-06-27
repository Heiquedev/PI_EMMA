import React from "react";

const ListEmployee: React.FC = () => (
  <table id="employee-list">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Departamento</th>
        <th>Cargo</th>
        <th>Data de Pagamento</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {/* Preenchido dinamicamente */}
    </tbody>
  </table>
);

export default ListEmployee;