import React, { useState } from "react";
import styles from './EmployeeModal.module.css'
import { useEffect } from "react";
import axios from 'axios';
import type { EmployeeM } from "../types";

interface EmployeeModalProps {
  visible: boolean;
  onClose: () => void;
}

interface Department {
  id: number,
  department: string,
  description?: string,
}
interface Position {
  id: number,
  title: string,
  description?: string,
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ visible, onClose }) => {

  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState<Department[]>([]);
  const [position, setPosition] = useState<Position[]>([]);
  const [employee, setEmployee] = useState<EmployeeM>({
    firstName: '',
    lastName: '',
    cpf: '',
    rg: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    hireDate: ''
  });
  const [err, setError] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/departments')
      .then(res => {
        setDepartment(res.data.data)
      })
      .catch((err) => {
        console.error("Falha ao buscar dados da API:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8000/api/positions')
      .then(res => {
        setPosition(res.data.data)
      })
      .catch((err) => {
        console.error("Falha ao buscar dados da API:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [])

  if (!visible) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <span className={styles.closeModal} onClick={onClose}>
          &times;
        </span>
        <h2>Adicionar Novo Funcionário</h2>
        <form>
          <div className={styles.formGroup}>
            <label>Nome</label>
            <input type="text" value={employee.firstName} />
          </div>
          <div className={styles.formGroup}>
            <label>Sobrenome</label>
            <input type="text" value={employee.lastName} />
          </div>
          <div className={styles.formGroup}>
            <label>CPF</label>
            <input type="text" value={employee.cpf} />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="text" value={employee.email} />
          </div>
          <div className={styles.formGroup}>
            <label>Departamento</label>
            <select id="employee-department" required>
              <option value={employee.department}>Selecione...</option>
              {loading ? (
                <p>Carregando...</p>
              ) : err ? (
                <p>Falha ao conectar-se à API. Verifique o servidor.</p>
              ) : <>
                {department.map(dep => {
                  return (
                    <option value={dep.id}>{dep.department}</option>
                  )
                })}
              </>
              }
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Cargo</label>
            <select name="" id="employee-position" required>
              <option value={employee.position}>Selecione...</option>
              {loading ? (
                <p>Carregando...</p>
              ) : err ? (
                <p>Falha ao conectar-se à API. Verifique o servidor.</p>
              ) : <>
                {position.map(pos => {
                  return (
                    <option value={pos.id}>{pos.title}</option>
                  )
                })}
              </>
              }
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Data de Admissão</label>
            <input type="date" value={employee.hireDate} />
          </div>
          {/* Outras entradas aqui... */}
          <button type="submit" className={styles.btnPrimary} onChange={}>Salvar</button>
        </form>
      </div>
    </div>
  );
}
  ;

export default EmployeeModal;