import React from "react";
import SearchBar from "./SearchBar";
import EmployeeTable from "./EmployeeTable";
import styles from './styles/Employees.module.css'


const Employees: React.FC = () => (
  <section id="funcionarios" className="tab-content">
    <div className="section-header">
      <h2>Funcionários</h2>
      <button className="btn-primary"><i className="fas fa-plus"></i> Adicionar Funcionário</button>
    </div>
    <SearchBar />
    <EmployeeTable />
  </section>
);

export default Employees;