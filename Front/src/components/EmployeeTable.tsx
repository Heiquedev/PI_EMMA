import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './EmployeeTable.module.css'
import type { Employee } from '../types';

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/employees')
      .then(response => {
        setEmployees(response.data.data); // Pegando o array dentro de data
      })
      .catch(error => {
        console.error('Erro ao carregar funcionários:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando funcionários...</p>;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Departamento</th>
            <th>Cargo</th>
            <th>Admissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => {
            // Vai buscar o departamento pelo caminho position -> department, seu lerdo
            const departmentName = emp.position?.department?.department || '—';
            const positionTitle = emp.position?.title || '—';

            return (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.first_name} {emp.last_name}</td>
                <td>{departmentName}</td>
                <td>{positionTitle}</td>
                <td>{emp.hire_date ? emp.hire_date.split('T')[0].split('-').reverse().join('/') : '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;