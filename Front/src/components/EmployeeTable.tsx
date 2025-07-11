import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './EmployeeTable.module.css';
import type { Employee } from '../types';
import { Link } from 'react-router-dom';

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/employees')
      .then(response => {
        setEmployees(response.data.data);
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
            const departmentName = emp.position?.department?.department || '—';
            const positionTitle = emp.position?.title || '—';

            return (
              <tr key={emp.id}>
                <td data-label="ID:">{emp.id}</td>
                <td data-label="Nome:">{emp.first_name} {emp.last_name}</td>
                <td data-label="Departamento:">{departmentName}</td>
                <td data-label="Cargo:">{positionTitle}</td>
                <td data-label="Admissão:">
                  {emp.hire_date?.split('T')[0].split('-').reverse().join('/') || '—'}
                </td>
                <td data-label="Ações">
                  <Link to={`/employees/${emp.id}`} className={styles.viewButton}>Ver</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
