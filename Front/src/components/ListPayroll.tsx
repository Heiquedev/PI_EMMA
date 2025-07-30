import React from "react"
import { useState, useEffect } from "react"
import styles from "./ListPayroll.module.css"
import api from '../services/api';
import { Link } from "react-router-dom"
import type { Employee, PayRoll } from "../types";


const ListPayroll: React.FC<{ payrolls: PayRoll[] }> = ({ payrolls }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('http://localhost:8000/api/departments')
      .then(response => {
        setEmployees(response.data.data); // Pegando o array dentro de data
      })
      .catch(error => {
        console.error('Erro ao carregar folha de pagamentos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando Lista de Pagamentos...</p>;
  return (
    <div>
      {employees.map(emp => {
        // Vai buscar o departamento pelo caminho position -> department, seu lerdo
        const employeeId = emp.id?.toLocaleString() || '—';
        const employeeName = `${emp.first_name} ${emp.last_name}` || '—';
        const employeePosition = emp.position?.title || '—';
        // const employeeDays = `${30 - emp.leaves}`
        

        return (
          <tr key={emp.id}>
            <td>{employeeId}</td>
            <td>{employeeName}</td>
            <td>{employeePosition}</td>
            <td></td>
          </tr>
        );
      })}
    </div>

  )

};

export default ListPayroll;