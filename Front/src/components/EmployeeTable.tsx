import React, { useEffect, useMemo, useState } from 'react';
import styles from './EmployeeTable.module.css';
import type { Employee, Position, Department } from '../types';
import { Link } from 'react-router-dom';
import api from '../services/api';

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);

  const [searchName, setSearchName] = useState('');
  const [searchPosition, setSearchPosition] = useState('');
  const [searchDepartment, setSearchDepartment] = useState('');
  const [searchTag, setSearchTag] = useState('');

  useEffect(() => {
    api.get('/api/employees').then(res => setEmployees(res.data.data));
    api.get('/api/departments').then(res => setDepartments(res.data.data));
    api.get('/api/positions').then(res => setPositions(res.data.data));
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp =>
      `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchPosition === '' || emp.position?.id === parseInt(searchPosition)) &&
      (searchDepartment === '' || emp.position?.department?.id === parseInt(searchDepartment)) &&
      (searchTag === '' || emp.tags?.some(tag => tag.content.toLowerCase().includes(searchTag.toLowerCase())))
    );
  }, [employees, searchName, searchPosition, searchDepartment, searchTag]);

  return (
    <div className={styles.container}>
      <fieldset className={styles.filters}>
        <input
          type="text"
          placeholder="Buscar por nome"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          aria-label="Buscar por nome"
        />
        <select value={searchPosition} onChange={e => setSearchPosition(e.target.value)} aria-label="Filtrar por cargo">
          <option value="">Todos os Cargos</option>
          {positions.map(pos => (
            <option key={pos.id} value={pos.id}>{pos.title}</option>
          ))}
        </select>
        <select value={searchDepartment} onChange={e => setSearchDepartment(e.target.value)} aria-label="Filtrar por departamento">
          <option value="">Todos os Departamentos</option>
          {departments.map(dep => (
            <option key={dep.id} value={dep.id}>{dep.department}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Buscar por tag"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          aria-label="Buscar por tag"
        />
      </fieldset>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Departamento</th>
              <th>Email</th>
              <th>Admissão</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp.id}>
                <td data-label="Nome:">{emp.first_name} {emp.last_name}</td>
                <td data-label="Cargo:">{emp.position?.title || '-'}</td>
                <td data-label="Departamento:">{emp.position?.department?.department || '-'}</td>
                <td data-label="Email:">{emp.email}</td>
                <td data-label="Admissão:">
                  {emp.hire_date?.split('T')[0].split('-').reverse().join('/') || '—'}
                </td>
                <td data-label="Ações">
                  <Link to={`/employees/${emp.id}`} className={styles.viewButton}>Ver</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
