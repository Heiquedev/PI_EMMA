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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployee(employee => ({ ...employee, [name]: value }));
  }


  const handleSubmit = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.preventDefault()


    try{
      const response = await axios.post('https://127.0.0.1:8000/api/employees/save', employee)
      console.log('Reposta da API:', response.data);
      
    }catch(error){
      console.error('Erro ao enviar o formulário', error);
      
    }

    const validationErrors: Partial<EmployeeM> = {};

    if (!employee.firstName.trim()) validationErrors.firstName = 'Nome é obrigatório.';
    if (!employee.lastName.trim()) validationErrors.lastName = 'Sobrenome é obrigatório.';
    if (!employee.cpf.trim()) validationErrors.cpf = 'CPF é obrigatório.';
    if (!employee.rg.trim()) validationErrors.rg = 'RG é obrigatório.';
    if (!employee.email.includes('@')) validationErrors.email = 'E-mail inválido.';
    if (!employee.phone.trim()) validationErrors.phone = 'Número de telefone inválido';
    if (!employee.department) validationErrors.department = 'Departamento é obrigatório.';
    if (!employee.position) validationErrors.position = 'Cargo é obrigatório.';
    if (!employee.hireDate) validationErrors.hireDate = 'Data de contratação é obrigatória.';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;

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
        <form onSubmit={handleChange}>
          <div className={styles.formGroup}>
            <label>Nome</label>
            <input type="text" name="firstName" value={employee.firstName} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label>Sobrenome</label>
            <input type="text" name="lastName" value={employee.lastName} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label>Data de nascimento</label>
            <input type="date" name="birthdate" value={employee.birthdate} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label>CPF</label>
            <input type="text" name="cpf" value={employee.cpf} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label>RG</label>
            <input type="text" name="rg" value={employee.rg} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="text" name="phone" value={employee.phone} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label>Telefone</label>
            <input type="text" name="email" value={employee.email} onChange={handleChange} />
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
                    <option value={dep.id}>{dep.department}</option>
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
                    <option value={pos.id}>{pos.title}</option>
                  )
                })}
              </>
              }
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Data de Admissão</label>
            <input type="date" name="hireDate" value={employee.hireDate} />
          </div>
          {/* Outras entradas aqui... */}
          <button type="submit" className={styles.btnPrimary}>Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeModal;