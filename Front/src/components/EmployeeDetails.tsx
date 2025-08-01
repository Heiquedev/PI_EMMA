import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './EmployeeDetails.module.css';
import type { Document, Employee, Tag } from '../types';
import AddAbsenceModal from './modals/AddAbsenceModal';
import AddAttendanceModal from './modals/AddAttendanceModal';
import AddSalaryModal from './modals/AddSalaryModal';
import AddReportModal from './modals/AddReportModal';
import AddLeaveModal from './modals/AddLeaveModal';
import api from '../services/api';
import { FaCalendarAlt } from 'react-icons/fa';

const EmployeeDetails: React.FC = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [tagForm, setTagForm] = useState<Tag>({ id: 0, content: '', color: '#000000', employee_id: 0 });
    const [documents, setDocuments] = useState<Document[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalTagOpen, setIsModalTagOpen] = useState(false);
    const [isModalTagUpdateOpen, setModalTagUpdateOpen] = useState(false);
    const [showAddLeaveModal, setShowAddLeaveModal] = useState(false);
    const [showAddAbsenceModal, setShowAddAbsenceModal] = useState(false);
    const [showAddAttendanceModal, setShowAddAttendanceModal] = useState(false);
    const [showAddSalaryModal, setShowAddSalaryModal] = useState(false);
    const [showAddReportModal, setShowAddReportModal] = useState(false);

    useEffect(() => {
        api.get(`http://localhost:8000/api/employees/${id}`)
            .then(res => {
                setEmployee(res.data.data);
                setDocuments(res.data.data.documents || []);
                console.log(res.data.data);

            })
            .catch(err => console.error("Erro ao buscar funcionário:", err));
    }, [id]);

    const fetchEmployeeDetails = async (id: number) => {
        const response = await api.get(`/employees/${id}`);
        return response.data;
    };


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

    const openTagUpdateModal = (tag: Tag) => {
        setTagForm(tag);
        setModalTagUpdateOpen(true);
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

        api.post(`http://localhost:8000/api/employees/${id}/documents`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (employee) {
            setEmployee({ ...employee, [e.target.name]: e.target.value });
        }
    };

    const handleSave = () => {
        api.put(`http://localhost:8000/api/employees/${id}`, employee)
            .then(() => setIsModalOpen(false))
            .catch(err => console.error("Erro ao salvar funcionário:", err));
    };

    const deleteTag = () => {
        api.delete('http://localhost:8000/api/tags/' + tagForm.id)
            .then(() => {
                setEmployee(prev => prev ? {
                    ...prev,
                    tags: (prev.tags || []).filter(t => t.id !== tagForm.id)
                } : prev);
                setTagForm({ id: 0, content: '', color: '#000000', employee_id: 0 });
                setModalTagUpdateOpen(false);
            })
            .catch(err => console.error("Erro ao deletar tag:", err));
    }

    const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (tagForm) {
            setTagForm({ ...tagForm, [e.target.name]: e.target.value });

        }
    };

    const handleSaveTag = () => {
        if (!employee || !employee.id) {
            console.error("Funcionário inválido");
            return;
        }

        const content = tagForm.content.trim();
        if (!content) {
            console.error("Conteúdo da tag está vazio");
            return;
        }

        const newTag = {
            content,
            color: tagForm.color,
            employee_id: employee.id,
        };

        api.post(`http://localhost:8000/api/employees/${employee.id}/tags`, newTag)
            .then(res => {
                const createdTag = res.data.data;
                setEmployee(prev => prev ? {
                    ...prev,
                    tags: [...(prev.tags || []), createdTag]
                } : prev);
                setTagForm({ id: 0, content: '', color: '#000000', employee_id: 0 });
                setIsModalTagOpen(false);
            })
            .catch(err => {
                console.error("Erro ao criar nova tag:", err.response?.data || err);
            });
    };

    const handleUpdate = () => {
        api.put(`http://localhost:8000/api/tags/${tagForm.id}`, tagForm)
            .then(res => {
                if (employee) {
                    const updatedTags = (employee.tags || []).map(t =>
                        t.id === tagForm.id ? res.data.data : t
                    );
                    setEmployee({ ...employee, tags: updatedTags });
                }
                setTagForm({ id: 0, content: '', color: '#000000', employee_id: 0 });
                setModalTagUpdateOpen(false);
            })
            .catch(err => console.error("Erro ao atualizar tag:", err));
    };

    const deleteLeave = async (leaveId: number) => {
        if (confirm('Deseja realmente excluir esta licença?')) {
            try {
                await api.delete(`/employees/${employee?.id}/leaves/${leaveId}`);
                if (employee && employee.id) {
                    fetchEmployeeDetails(employee.id);
                }
            } catch (err) {
                console.error('Erro ao excluir licença:', err);
            }
        }
    };


    if (!employee) return <p>Carregando dados do funcionário...</p>;

    return (
        <div className={styles.detailsContainer}>
            <h2>{employee.first_name} {employee.last_name} - {employee.position?.title}</h2>

            <p><strong>Nome:</strong> {employee.first_name} {employee.last_name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Data de Nascimento:</strong> {employee.date_of_birth}</p>
            <p><strong>Data de Admissão:</strong> {employee.hire_date}</p>
            <p><strong>CPF:</strong> {employee.cpf}</p>
            <p><strong>RG:</strong> {employee.rg || '-'}</p>
            <p><strong>Telefone:</strong> {employee.phone || '-'}</p>
            <p><strong>Cidade:</strong> {employee.city || '-'}</p>
            <p><strong>Status:</strong> {employee.employment_status}</p>

            <div className={styles.section}>
                <h3>Ausências</h3>
                <ul>
                    {employee.absences?.map(absence => (
                        <li key={absence.id}>
                            {absence.date} - {absence.reason}
                        </li>
                    ))}
                </ul>
                <button onClick={() => setShowAddAbsenceModal(true)} className={styles.modalsButton}>
                    + Adicionar Ausência
                </button>
            </div>

            <div className={styles.section}>
                <h3>Presenças</h3>
                <ul>
                    {employee.attendances?.map(att => (
                        <li key={att.id}>
                            {att.date} - {att.status}
                        </li>
                    ))}
                </ul>
                <button onClick={() => setShowAddAttendanceModal(true)} className={styles.modalsButton}>
                    + Adicionar Presença
                </button>
            </div>

            <div className={styles.section}>
                <h3>Salários</h3>
                <ul>
                    {employee.salaries?.map(sal => (
                        <li key={sal.id}>
                            R$ {sal.amount} ({sal.start_date} até {sal.end_date || 'Atual'})
                        </li>
                    ))}
                </ul>
                <button onClick={() => setShowAddSalaryModal(true)} className={styles.modalsButton}>
                    + Adicionar Salário
                </button>
            </div>

            <div className={styles.section}>
                <h3>Relatórios</h3>
                <ul>
                    {employee.reports?.map(rep => (
                        <li key={rep.id}>
                            <strong>{rep.title}</strong> - {rep.content} ({rep.created_at})
                        </li>
                    ))}
                </ul>
                <button onClick={() => setShowAddReportModal(true)} className={styles.modalsButton}>
                    + Adicionar Relatório
                </button>
            </div>
            <div className={styles.section}>
                <h3>Tags</h3>
                <ul className={styles.tagsList}>
                    {employee.tags?.map(tag => (
                        <li key={tag.id}>
                            <button
                                className={styles.modalsButton}
                                style={{ backgroundColor: tag.color }}
                                onClick={() => openTagUpdateModal(tag)}
                            >
                                {tag.content}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button onClick={() => setIsModalTagOpen(true)} className={styles.modalsButton}>
                            Adicionar +
                        </button>
                    </li>
                </ul>
            </div>

            {employee.labor_rights && (
                <div className={styles.section}>
                    <h3>Direitos Trabalhistas</h3>
                    <p><strong>Tipo de contrato:</strong> {employee.labor_rights.contract_type}</p>
                    <p><strong>Carga horária:</strong> {employee.labor_rights.workload}</p>
                    <p><strong>Sindicalizado:</strong> {employee.labor_rights.is_unionized ? 'Sim' : 'Não'}</p>
                </div>
            )}

            <div className={styles.section}>
                <h3>Adicionar Documento (PDF)</h3>
                <input type="file" accept="application/pdf" onChange={handleFileChange} />
                <button onClick={handleUpload} disabled={!selectedFile || uploading}>
                    {uploading ? 'Enviando...' : 'Enviar'}
                </button>
            </div>

            {employee.documents && employee.documents?.length > 0 && (
                <div className={styles.section}>
                    <h3>Documentos</h3>
                    <ul>
                        {documents.map(doc => (
                            <li key={doc.id}>
                                <a href={`http://localhost:8000/storage/${doc.path}`} target="_blank" rel="noreferrer">
                                    {doc.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <section className={styles.section}>
                <h3><FaCalendarAlt /> Licenças</h3>
                <ul>
                    {employee.leaves?.map((leave) => (
                        <li key={leave.id}>
                            {leave.type} ({leave.start_date} até {leave.end_date})
                            <button onClick={() => deleteLeave(leave.id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
                <button onClick={() => setShowAddLeaveModal(true)} className={styles.modalsButton}>
                    + Adicionar Licença
                </button>
            </section>

            {showAddLeaveModal && (
                <AddLeaveModal
                    employeeId={employee.id}
                    onClose={() => setShowAddLeaveModal(false)}
                    onSuccess={() => {
                        if (employee && employee.id) {
                            fetchEmployeeDetails(employee.id);
                        }
                    }}
                />
            )}

            {showAddAbsenceModal && (
                <AddAbsenceModal
                    employeeId={employee.id}
                    onClose={() => setShowAddAbsenceModal(false)}
                    onSuccess={() => {
                        if (employee && employee.id) {
                            fetchEmployeeDetails(employee.id);
                        }
                    }}
                />
            )}

            {showAddAttendanceModal && (
                <AddAttendanceModal
                    employeeId={employee.id}
                    onClose={() => setShowAddAttendanceModal(false)}
                    onSuccess={() => {
                        if (employee && employee.id) {
                            fetchEmployeeDetails(employee.id);
                        }
                    }}
                />
            )}

            {showAddSalaryModal && (
                <AddSalaryModal
                    employeeId={employee.id}
                    onClose={() => setShowAddSalaryModal(false)}
                    onSuccess={() => {
                        if (employee && employee.id) {
                            fetchEmployeeDetails(employee.id);
                        }
                    }}
                />
            )}

            {showAddReportModal && (
                <AddReportModal
                    employeeId={employee.id}
                    onClose={() => setShowAddReportModal(false)}
                    onSuccess={() => {
                        if (employee && employee.id) {
                            fetchEmployeeDetails(employee.id);
                        }
                    }}
                />
            )}

            {isModalTagOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2 className={styles.title}>Adicionar Tag</h2>
                        <label>Nome</label>
                        <input name='content' value={tagForm.content} onChange={handleChangeTag} />
                        <label>Cor</label>
                        <input style={{ height: 200 }} name='color' type='color' value={tagForm.color} onChange={handleChangeTag} />
                        <div className={styles.modalActions}>
                            <button onClick={handleSaveTag}>Adicionar</button>
                            <button onClick={() => setIsModalTagOpen(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
            {isModalTagUpdateOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2 className={styles.title}>Atualizar Tag</h2>
                        <label>Nome</label>
                        <input name='content' value={tagForm.content} onChange={handleChangeTag} />
                        <input name='employee_id' value={employee.id} onChange={handleChangeTag} type='hidden' />
                        <label>Cor</label>
                        <input style={{ height: 200 }} name='color' type='color' value={tagForm.color} onChange={handleChangeTag} />
                        <div className={styles.modalActions}>
                            <button onClick={handleUpdate}>Atualizar</button>
                            <button onClick={deleteTag}>Deletar</button>
                            <button onClick={() => setModalTagUpdateOpen(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            <button onClick={() => setIsModalOpen(true)} className={styles.modalsButton}>
                Editar Funcionário
            </button>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>Editar Funcionário</h3>
                        <input name="first_name" value={employee.first_name} onChange={handleChange} />
                        <input name="last_name" value={employee.last_name} onChange={handleChange} />
                        <input name="email" value={employee.email} onChange={handleChange} />
                        <input name="cpf" value={employee.cpf} onChange={handleChange} />
                        <input name="rg" value={employee.rg || ''} onChange={handleChange} />
                        <input name="phone" value={employee.phone || ''} onChange={handleChange} />
                        <input name="city" value={employee.city || ''} onChange={handleChange} />
                        <textarea name="description" value={employee.description || ''} onChange={handleChange} />
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