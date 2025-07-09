import React, { useState } from "react";
import styles from './EmployeeModal.module.css'
import { useEffect } from "react";
import axios from "axios";
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
    firstName: ``,
    lastName: ``,
    birthdate: ``,
    cpf: ``,
    rg: ``,
    email: ``,
    phone: ``,
    department: ``,
    position: ``,
    hireDate: ``
  });
  const [err, setError] = useState(false);
  const [errors, setErrors] = useState<Partial<EmployeeM>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEmployee(employee => ({ ...employee, [e.target.name]: e.target.value }));
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors: Partial<EmployeeM> = {};

    if (!employee.firstName.trim()) validationErrors.firstName = 'Nome é obrigatório.';
    if (!employee.lastName.trim()) validationErrors.lastName = 'Sobrenome é obrigatório.';
    if (!employee.cpf.trim()) validationErrors.cpf = 'CPF é obrigatório.';
    if (!employee.rg.trim()) validationErrors.rg = 'RG é obrigatório.';
    if (!employee.email.includes('@')) validationErrors.email = 'E-mail inválido.';
    if (!employee.phone.trim()) validationErrors.phone = 'Número de telefone inválido';
    if (!employee.department.trim()) validationErrors.department = 'Departamento é obrigatório.';
    if (!employee.position.trim()) validationErrors.position = 'Cargo é obrigatório.';
    if (!employee.hireDate.trim()) validationErrors.hireDate = 'Data de contratação é obrigatória.';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }

    try {
      await axios.post('https://127.0.0.1:8000/api/employees', employee)
      setEmployee({
        firstName: ``,
        lastName: ``,
        birthdate: ``,
        cpf: ``,
        rg: ``,
        email: ``,
        phone: ``,
        department: ``,
        position: ``,
        hireDate: ``
      })

    } catch (error) {
      console.error('Erro ao enviar o formulário', error);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nome</label>
            <input type="text" name="firstName" value={employee.firstName} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Sobrenome</label>
            <input type="text" name="lastName" value={employee.lastName} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Data de nascimento</label>
            <input type="date" name="birthdate" value={employee.birthdate} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>CPF</label>
            <input type="text" name="cpf" value={employee.cpf} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>RG</label>
            <input type="text" name="rg" value={employee.rg} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="text" name="email" value={employee.email} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Telefone</label>
            <input type="text" name="phone" value={employee.phone} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Departamento</label>
            <select name="department" id="employee-department" value={employee.department} onChange={handleChange} required>
              <option >Selecione...</option>
              {loading ? (
                <p>Carregando...</p>
              ) : err ? (
                <p>Falha ao conectar-se à API. Verifique o servidor.</p>
              ) : <>
                {department.map(dep => {
                  return (
                    <option key={dep.id} value={dep.id}>{dep.department}</option>
                  )
                })}
              </>
              }
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Cargo</label>
            <select name="position" id="employee-position" value={employee.position} onChange={handleChange} required>
              <option >Selecione...</option>
              {loading ? (
                <p>Carregando...</p>
              ) : err ? (
                <p>Falha ao conectar-se à API. Verifique o servidor.</p>
              ) : <>
                {position.map(pos => {
                  return (
                    <option key={pos.id} value={pos.id}>{pos.title}</option>
                  )
                })}
              </>
              }
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Data de Admissão</label>
            <input type="date" name="hireDate" value={employee.hireDate} onChange={handleChange} required />
          </div>
          {/* Outras entradas aqui... */}
          <button type="submit" className={styles.btnPrimary}>Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeModal;