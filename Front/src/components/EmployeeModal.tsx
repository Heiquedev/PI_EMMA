import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './EmployeeModal.module.css';
import type { Position, Employee } from '../types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EmployeeModalProps {
  visible: boolean;
  onClose: () => void;
}

const initialState: Employee = {
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  cpf: '',
  rg: '',
  phone: '',
  hire_date: '',
  absence: 0,
  date_of_birth: '',
  description: '',
  city: '',
  position_id: 0,
  employment_status: 'active',
};

const EmployeeModal: React.FC<EmployeeModalProps> = ({ visible, onClose }) => {
  const [employee, setEmployee] = useState<Employee>(initialState);
  const [positions, setPositions] = useState<Position[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (visible) setEmployee(initialState);
  }, [visible]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/positions')
      .then(response => setPositions(response.data.data))
      .catch(() => toast.error('Erro ao carregar cargos'));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:8000/api/employees', employee);
      toast.success('Funcionário cadastrado com sucesso!');
      onClose();
    } catch (error: any) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        if (errors) {
          Object.values(errors).forEach((msg: any) => toast.error(msg as string));
        } else {
          toast.error('Dados inválidos. Verifique os campos e tente novamente.');
        }
      } else if (error.response?.status === 500) {
        toast.error('Erro interno no servidor. Tente novamente mais tarde.');
      } else {
        toast.error('Erro ao criar funcionário. Verifique sua conexão.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!visible) return null;

  return (
    <>
      <ToastContainer />
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <h2>Novo Funcionário</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.grid}>
              <div className={styles.formGroup}>
                <label>Nome</label>
                <input type="text" name="first_name" value={employee.first_name} onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label>Sobrenome</label>
                <input type="text" name="last_name" value={employee.last_name} onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input type="email" name="email" value={employee.email} onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label>CPF</label>
                <input type="text" name="cpf" value={employee.cpf} onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label>RG</label>
                <input type="text" name="rg" value={employee.rg} onChange={handleChange} />
              </div>

              <div className={styles.formGroup}>
                <label>Telefone</label>
                <input type="text" name="phone" value={employee.phone} onChange={handleChange} />
              </div>

              <div className={styles.formGroup}>
                <label>Data de Admissão</label>
                <input type="date" name="hire_date" value={employee.hire_date} onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label>Data de Nascimento</label>
                <input type="date" name="date_of_birth" value={employee.date_of_birth} onChange={handleChange} />
              </div>

              <div className={styles.formGroup}>
                <label>Cidade</label>
                <input type="text" name="city" value={employee.city} onChange={handleChange} />
              </div>

              <div className={styles.formGroup}>
                <label>Cargo</label>
                <select name="position_id" value={employee.position_id} onChange={handleChange} required>
                  <option value="">Selecione um cargo</option>
                  {positions.map(pos => (
                    <option key={pos.id} value={pos.id}>{pos.title}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Status</label>
                <select name="employment_status" value={employee.employment_status} onChange={handleChange} required>
                  <option value="active">Ativo</option>
                  <option value="inactive">Licença</option>
                  <option value="suspended">Demitido</option>
                </select>
              </div>

              <div className={styles.formGroupFull}>
                <label>Descrição</label>
                <textarea name="description" value={employee.description} onChange={handleChange} rows={3} />
              </div>
            </div>

            <div className={styles.actions}>
              <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
              <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                {isSubmitting ? 'Salvando...' : 'Cadastrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeeModal;
