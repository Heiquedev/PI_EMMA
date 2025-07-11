import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './DepartmentsTable.module.css'
import type { Department } from '../types';
import { Link } from 'react-router';

const DepartmentTable: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/departments')
      .then(response => {
        setDepartments(response.data.data); // Pegando o array dentro de data
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
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(dep => {
            // Vai buscar o departamento pelo caminho position -> department, seu lerdo
            const departmentId = dep.id?.toLocaleString() || '—';
            const departmentName = dep.department || '—';
            const departmentDesc = dep.description

            return (
              <tr key={dep.id}>
                <td>{departmentId}</td>
                <td>{departmentName}</td>
                <td>{departmentDesc}</td>
                <Link to={`/departments/${dep.description}`} className={styles.viewButton}>Ver / Editar</Link>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;