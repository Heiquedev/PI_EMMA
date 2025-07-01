import React from 'react';
import styles from './EmployeeTable.module.css';

const EmployeeTable: React.FC = () => (
  <table className={styles.table}>
    <thead>
      <tr>
        <th className={styles.th}>ID</th>
        <th className={styles.th}>Nome</th>
        <th className={styles.th}>Departamento</th>
        <th className={styles.th}>Cargo</th>
        <th className={styles.th}>Data de Admissão</th>
        <th className={styles.th}>Ações</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
);

export default EmployeeTable;