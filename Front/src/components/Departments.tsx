import React from 'react';
import SearchBar from './SearchBar';
import DepartmentTable from './DepartmentTable';
import styles from './Departments.module.css';

interface DepartmentsProps {
  onAdd: () => void;
}

const Departments: React.FC<DepartmentsProps> = ({ onAdd }) => (
  <section id="departamentos" className={styles.tabContent}>
    <div className={styles.sectionHeader}>
      <h2>Departamentos</h2>
      <button className={styles.btnPrimary} onClick={onAdd}>
        <i className="fas fa-plus"></i> Adicionar Departamento
      </button>
    </div>
    <SearchBar />
    <DepartmentTable />
  </section>
);

export default Departments;