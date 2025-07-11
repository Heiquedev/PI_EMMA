import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './EmployeeDetails.module.css';
import type { Document, Employee } from '../types';

const EmployeeDetails: React.FC = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/employees/${id}`)
            .then(res => {
                setEmployee(res.data.data);
                setDocuments(res.data.data.documents || []);
            })
            .catch(err => console.error("Erro ao buscar funcionário:", err));
    }, [id]);
    
    const deleteTag = (tagId:number) => {
        axios.delete(`http://localhost:8000/api/tags/${tagId}/`)
            .then(() => window.location.reload())
            .catch(err => console.error("Erro ao deletar tag:", err));
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type !== 'application/pdf') {
                alert('Apenas arquivos PDF são permitidos.');
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleUpload = () => {
        if (!selectedFile) {
          alert('Selecione um arquivo antes de enviar.');
          return;
        }
    
        const formData = new FormData();
        formData.append('document', selectedFile);
        formData.append('name', selectedFile.name);
    
        setUploading(true);
    
        axios.post(`http://localhost:8000/api/employees/${id}/documents`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(res => {
            setDocuments(prev => [...prev, res.data.data]);
            setSelectedFile(null);
            setUploading(false);
          })
          .catch(err => {
            console.error("Erro ao enviar documento:", err);
            alert('Erro ao enviar o documento.');
            setUploading(false);
          });
      };

    useEffect(() => {
        axios.get(`http://localhost:8000/api/employees/${id}`)
            .then(res => {
                const employee = res.data.data;
                setEmployee(employee);
            })
            .catch(err => console.error("Erro ao buscar funcionário:", err));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (employee) {
            setEmployee({ ...employee, [e.target.name]: e.target.value });
        }
    };

    const handleSave = () => {
        axios.put(`http://localhost:8000/api/employees/${id}`, employee)
            .then(() => setIsModalOpen(false))
            .catch(err => console.error("Erro ao salvar funcionário:", err));
    };

    if (!employee) return <p>Carregando dados do funcionário...</p>;

    return (
        <div className={styles.detailsContainer}>
            <h2>{employee.first_name} {employee.last_name} - {employee.position?.title}</h2>
            <p><strong>Nome:</strong> {employee.first_name} {employee.last_name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Data de Nascimento:</strong> {employee.date_of_birth}</p>
            <p><strong>Data de Admissão:</strong> {employee.hire_date}</p>
            <p><strong>Ausências:</strong> {employee.absence}</p>
            <p><strong>CPF:</strong> {employee.cpf}</p>
            <p><strong>RG:</strong> {employee.rg || '-'}</p>
            <p><strong>Telefone:</strong> {employee.phone || '-'}</p>
            <p><strong>Cidade:</strong> {employee.city || '-'}</p>
            <p><strong>Status:</strong> {employee.employment_status}</p>
            <p><strong>Cargo:</strong> {employee.position?.title}</p>

            {employee.labor_rights && (
                <div className={styles.section}>
                    <h3>Direitos Trabalhistas</h3>
                    <p><strong>Tipo de contrato:</strong> {employee.labor_rights.contract_type}</p>
                    <p><strong>Carga horária:</strong> {employee.labor_rights.workload}</p>
                    <p><strong>Sindicalizado:</strong> {employee.labor_rights.is_unionized ? 'Sim' : 'Não'}</p>
                    <p><strong>FGTS:</strong> {employee.labor_rights.has_fgts ? 'Sim' : 'Não'}</p>
                    <p><strong>INSS:</strong> {employee.labor_rights.has_inss ? 'Sim' : 'Não'}</p>
                    <p><strong>13º:</strong> {employee.labor_rights.has_13th ? 'Sim' : 'Não'}</p>
                    <p><strong>Férias:</strong> {employee.labor_rights.has_vacation ? 'Sim' : 'Não'}</p>
                    <p><strong>Vale Transporte:</strong> {employee.labor_rights.transport ? 'Sim' : 'Não'}</p>
                    <p><strong>Vale Refeição:</strong> {employee.labor_rights.meal_voucher ? 'Sim' : 'Não'}</p>
                    <p><strong>Vale Alimentação:</strong> {employee.labor_rights.food_voucher ? 'Sim' : 'Não'}</p>
                </div>
            )}

            {employee.documents && employee.documents.length > 0 && (
                <div className={styles.section}>
                <h3>Documentos</h3>
                <ul>
                  {documents.map(doc => (
                    <li key={doc.id}>
                      <strong>{doc.type}:</strong>{' '}
                      <a href={`http://localhost:8000/storage/${doc.path}`} target="_blank" rel="noreferrer">
                        {doc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
      
            <div className={styles.section}>
              <h3>Adicionar Documento (PDF)</h3>
              <input type="file" accept="application/pdf" onChange={handleFileChange} />
              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                style={{ marginLeft: '1rem' }}
              >
                {uploading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>

            {employee.tags && employee.tags.length > 0 && (
                <div className={styles.section}>
                    <h3>Tags</h3>
                    <ul className={styles.tagsList}>
                        {employee.tags.map(tag => (
                            <li key={tag.id} style={{ backgroundColor: tag.color }}>{tag.content} <button style={{ backgroundColor: tag.color, border: 'none', color: 'white'}} onClick={() => deleteTag(tag.id)}>X</button></li>
                        ))}
                    </ul>
                </div>
            )}

            {employee.salaries && employee.salaries.length > 0 && (
                <div className={styles.section}>
                    <h3>Histórico Salarial</h3>
                    <ul>
                        {employee.salaries.map((sal, idx) => (
                            <li key={idx}>R$ {sal.amount} (desde {sal.start_date})</li>
                        ))}
                    </ul>
                </div>
            )}

            {employee.leaves && employee.leaves.length > 0 && (
                <div className={styles.section}>
                    <h3>Licenças</h3>
                    <ul>
                        {employee.leaves.map((leave, idx) => (
                            <li key={idx}>{leave.type} ({leave.status}): {leave.start_date} - {leave.end_date}</li>
                        ))}
                    </ul>
                </div>
            )}

            {employee.reports && employee.reports.length > 0 && (
                <div className={styles.section}>
                    <h3>Relatórios</h3>
                    <ul>
                        {employee.reports.map((rep, idx) => (
                            <li key={idx}><strong>{rep.title}:</strong> {rep.content}</li>
                        ))}
                    </ul>
                </div>
            )}

            {employee.incidents && employee.incidents.length > 0 && (
                <div className={styles.section}>
                    <h3>Incidentes</h3>
                    <ul>
                        {employee.incidents.map((incident, idx) => (
                            <li key={idx}>
                                <strong>{incident.type}</strong> - {incident.date} - Gravidade: {incident.severity} <br />
                                <em>{incident.description}</em>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button onClick={() => setIsModalOpen(true)} className={styles.editButton}>Editar Funcionário</button>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>Editar Funcionário</h3>
                        <input name="first_name" value={employee.first_name} onChange={handleChange} placeholder="Nome" />
                        <input name="last_name" value={employee.last_name} onChange={handleChange} placeholder="Sobrenome" />
                        <input name="email" value={employee.email} onChange={handleChange} placeholder="Email" />
                        <input name="cpf" value={employee.cpf} onChange={handleChange} placeholder="CPF" />
                        <input name="rg" value={employee.rg || ''} onChange={handleChange} placeholder="RG" />
                        <input name="phone" value={employee.phone || ''} onChange={handleChange} placeholder="Telefone" />
                        <input name="city" value={employee.city || ''} onChange={handleChange} placeholder="Cidade" />
                        <textarea name="description" value={employee.description || ''} onChange={handleChange} placeholder="Descrição" />
                        <select name="employment_status" value={employee.employment_status} onChange={handleChange}>
                            <option value="active">Ativo</option>
                            <option value="on_leave">Em Licença</option>
                            <option value="terminated">Desligado</option>
                        </select>
                        <div className={styles.modalActions}>
                            <button onClick={handleSave}>Salvar</button>
                            <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeDetails;
