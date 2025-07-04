import React, { useState } from "react";
import styles from './EmployeeModal.module.css'
import { useEffect } from "react";
import axios from 'axios';

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
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState<Department[]>([]);
  const [position, setPosition] = useState<Position[]>([]);
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
            <label>Nome Completo</label>
            <input type="text" />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="text" />
          </div>
          <div className={styles.formGroup}>
            <label>Departamento</label>
            <select id="employee-department" required>
              <option value="">Selecione...</option>
              {loading ? (
                <p>Carregando...</p>
              ) : err ? (
                <p>Falha ao conectar-se ao trono. Verifique o servidor.</p>
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
              <option value="">Selecione...</option>
              {loading ? (
                <p>Carregando...</p>
              ) : err ? (
                <p>Falha ao conectar-se ao trono. Verifique o servidor.</p>
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
            <label>Salário</label>
            <input type="number" />
          </div>
          <div className={styles.formGroup}>
            <label>Data de Admissão</label>
            <input type="date" />
          </div>
          {/* Outras entradas aqui... */}
          <button type="submit" className={styles.btnPrimary} onSubmit={}>Salvar</button>
        </form>
      </div>
    </div>
  );
}

const [nome, setNome] = useState('');
const [email, setEmail] = useState('');

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault(); // impede o recarregamento da página

  const dados = {
    nome,
    email,
  };

  // Envia para a API (altere a URL para o seu endpoint real)
  axios.post('http://localhost:8000/api/usuarios', dados)
    .then(response => {
      console.log('Dados enviados com sucesso:', response.data);
      // Limpa o formulário, se quiser
      setNome('');
      setEmail('');
    })
    .catch(error => {
      console.error('Erro ao enviar dados:', error);
    });
};

return (
  <form onSubmit={handleSubmit}>
    <label>
      Nome:
      <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
    </label>
    <br />
    <label>
      Email:
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
    </label>
    <br />
    <button type="submit">Enviar</button>
  </form>
);
};











export default EmployeeModal;