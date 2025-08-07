import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styles from './EmployeeDetails.module.css';
import type { ChecklistItem, ChecklistTemplate, Document, Employee, EmployeeChecklist, Tag } from '../types';
import AddAbsenceModal from './modals/AddAbsenceModal';
import AddAttendanceModal from './modals/AddAttendanceModal';
import AddSalaryModal from './modals/AddSalaryModal';
import AddReportModal from './modals/AddReportModal';
import AddLeaveModal from './modals/AddLeaveModal';
import api from '../services/api';
import { FaCalendarAlt } from 'react-icons/fa';
import ChecklistModal from './modals/ChecklistModal';
import type { DetailedEmployeeChecklist } from '../types';
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
    const [checklists, setChecklists] = useState<EmployeeChecklist[]>([]);
    const [detailedChecklist, setDetailedChecklist] = useState<DetailedEmployeeChecklist | null>(null);
    const [templates, setTemplates] = useState<ChecklistTemplate[]>([]);
    const [selectedTemplateId, setSelectedTemplateId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/api/checklist-templates').then((res) => setTemplates(res.data));
    }, []);

    const handleAssignChecklist = () => {
        if (!selectedTemplateId || !id) return;
        api
            .post(`/api/employees/${id}/checklists`, { checklist_template_id: selectedTemplateId, employee_id: id, })
            .then((res) => {
                setChecklists((prev) => [...prev, res.data]);
                setSelectedTemplateId('');
                console.log('Checklist atribuído com sucesso:', res.data);

            })
            .catch((err) => {
                console.error('Erro ao atribuir checklist:', err);
            });
    };

    const deleteEmployee = () => {
        if (window.confirm('Tem certeza que deseja deletar este funcionário?')) {
            api.delete('http://localhost:8000/api/employees/' + id)
                .then(() => {
                    navigate('/employees'); // Redireciona automaticamente após apagar
                })
                .catch(err => console.error(id, "Erro ao deletar funcionário:", err));
        }
    };


    const openChecklistDetails = (checklistId: number) => {
        api.get(`/api/employee-checklists/${checklistId}`)
            .then(res => {
                setDetailedChecklist(res.data)
                console.log("Checklist carregado:", res.data);
            })
            .catch(err => console.error("Erro ao buscar checklist:", err));
    };

    const closeChecklistModal = () => setDetailedChecklist(null);

    const handleToggleItem = async (checklistId: number, itemId: number, isCompleted: boolean) => {
        try {
            await api.patch(`/api/employee-checklists/${checklistId}/items/${itemId}`, {
                completed: isCompleted,
            });

            // Atualiza localmente (ideal: refetch do checklist ou mutate com SWR/React Query)
            setChecklists((prevChecklists) =>
                prevChecklists.map((cl) =>
                    cl.id === checklistId
                        ? {
                            ...cl,
                            items: cl.items.map((item: any) =>
                                item.id === itemId ? { ...item, completed: isCompleted } : item
                            ),
                        }
                        : cl
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar item do checklist:', error);
        }
    };


    const toggleChecklistItem = (itemId: number) => {
        if (!detailedChecklist) return;

        const updatedItems = detailedChecklist.items.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
        );

        const completedCount = updatedItems.filter((item) => item.completed).length;
        const totalCount = updatedItems.length;
        const newProgress = Math.round((completedCount / totalCount) * 100);

        let newStatus: 'pending' | 'in_progress' | 'completed' = 'pending';
        if (newProgress === 100) newStatus = 'completed';
        else if (newProgress > 0) newStatus = 'in_progress';

        const updatedChecklist = {
            ...detailedChecklist,
            items: updatedItems,
            progress: newProgress,
            status: newStatus,
        };

        // Atualiza o checklist detalhado no modal
        setDetailedChecklist(updatedChecklist);

        // Atualiza a lista principal de checklists (cards) também
        setChecklists((prev) =>
            prev.map((cl) =>
                cl.id === updatedChecklist.id
                    ? {
                        ...cl,
                        progress: newProgress,
                        status: newStatus,
                    }
                    : cl
            )
        );

        // (Opcional) Enviar PATCH para a API
        api.patch(`/api/employee-checklists/${updatedChecklist.id}/items/${itemId}/toggle`).catch(console.error);
    };




    useEffect(() => {
        api.get(`http://localhost:8000/api/employees/${id}`)
            .then(res => {
                setEmployee(res.data.data);
                setDocuments(res.data.data.documents || []);
                console.log(res.data.data);

            })
            .catch(err => console.error("Erro ao buscar funcionário:", err));
    }, [id]);

    useEffect(() => {
        if (id) {
            api.get(`/api/employees/${id}/checklists`)
                .then((res) => setChecklists(res.data))
                .catch((err) => console.error("Erro ao buscar checklists:", err));
        }
    }, [id]);

    const fetchEmployeeDetails = async (id: number) => {
        const response = await api.get(`/api/employees/${id}`);
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
                await api.delete(`/api/employees/${employee?.id}/leaves/${leaveId}`);
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
        <div className={styles.detailsContainer} style={{ maxWidth: 900, margin: '0 auto', padding: '2rem', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <header style={{ borderBottom: '2px solid #eaeaea', marginBottom: 32, paddingBottom: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                <img src={employee.avatar_url || '/vite.svg'} alt="Avatar" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid #eaeaea' }} />
                <div>
                    <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>{employee.first_name} {employee.last_name} <span style={{ fontWeight: 400, color: '#888', fontSize: 18 }}>- {employee.position?.title}</span></h2>
                    <span style={{ color: '#4a90e2', fontWeight: 500 }}>{employee.employment_status === 'active' ? 'Ativo' : employee.employment_status === 'on_leave' ? 'Em licença' : 'Desligado'}</span>
                </div>
            </header>

            <section className={styles.section} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
                <div>
                    <p><strong>Nome:</strong> {employee.first_name} {employee.last_name}</p>
                    <p><strong>Email:</strong> {employee.email}</p>
                    <p><strong>Data de Nascimento:</strong> {employee.date_of_birth}</p>
                    <p><strong>Data de Admissão:</strong> {employee.hire_date}</p>
                </div>
                <div>
                    <p><strong>CPF:</strong> {employee.cpf}</p>
                    <p><strong>RG:</strong> {employee.rg || '-'}</p>
                    <p><strong>Telefone:</strong> {employee.phone || '-'}</p>
                    <p><strong>Cidade:</strong> {employee.city || '-'}</p>
                </div>
            </section>

            <div style={{ borderTop: '1px solid #eaeaea', margin: '32px 0' }} />

            <section className={styles.section} style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
                <div style={{ flex: 1, minWidth: 260 }}>
                    <h3>Ausências</h3>
                    <ul style={{ marginBottom: 8 }}>
                        {employee.absences?.map(absence => (
                            <li key={absence.id}>
                                {absence.date} - {absence.reason}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setShowAddAbsenceModal(true)} className={styles.modalsButton} style={{ width: '100%' }}>
                        + Adicionar Ausência
                    </button>
                </div>
                <div style={{ flex: 1, minWidth: 260 }}>
                    <h3>Presenças</h3>
                    <ul style={{ marginBottom: 8 }}>
                        {employee.attendances?.map(att => (
                            <li key={att.id}>
                                {att.date} - {att.status}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setShowAddAttendanceModal(true)} className={styles.modalsButton} style={{ width: '100%' }}>
                        + Adicionar Presença
                    </button>
                </div>
                <div style={{ flex: 1, minWidth: 260 }}>
                    <h3>Salários</h3>
                    <ul style={{ marginBottom: 8 }}>
                        {employee.salaries?.map(sal => (
                            <li key={sal.id}>
                                R$ {sal.amount} ({sal.start_date} até {sal.end_date || 'Atual'})
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setShowAddSalaryModal(true)} className={styles.modalsButton} style={{ width: '100%' }}>
                        + Adicionar Salário
                    </button>
                </div>
            </section>

            <div style={{ borderTop: '1px solid #eaeaea', margin: '32px 0' }} />

            <section className={styles.section} style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 22, marginBottom: 16 }}>📋 Checklists Atribuídos</h2>
                {checklists.length === 0 ? (
                    <p className={styles.emptyMessage}>Nenhum checklist atribuído.</p>
                ) : (
                    <ul className={styles.checklistList}>
                        {checklists.map((cl) => (
                            <li key={cl.id} className={styles.checklistItem} style={{ background: '#f8fafd', borderRadius: 8, marginBottom: 12, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                                <div className={styles.itemHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <strong style={{ fontSize: 16 }}>{cl.template?.name}</strong>
                                        <div className={styles.statusRow}>
                                            <span className={`${styles.status} ${styles[cl.status]}`}>
                                                {cl.status === 'completed' && '✅ Concluído'}
                                                {cl.status === 'in_progress' && '🕓 Em progresso'}
                                                {cl.status === 'not_started' && '⏳ Não iniciado'}
                                            </span>
                                            <span className={styles.progressText}>{cl.progress}%</span>
                                        </div>
                                        <div className={styles.progressBarContainer}>
                                            <div
                                                className={styles.progressBar}
                                                style={{ width: `${cl.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => openChecklistDetails(cl.id)}
                                        className={styles.viewButton}
                                        style={{ padding: '6px 18px', borderRadius: 6, background: '#4a90e2', color: '#fff', border: 'none', fontWeight: 500, cursor: 'pointer' }}
                                    >
                                        Ver detalhes
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {detailedChecklist && (
                <ChecklistModal
                    checklist={detailedChecklist}
                    onClose={closeChecklistModal}
                    onToggleItem={toggleChecklistItem}
                />
            )}

            <div className={styles.assignChecklist} style={{ marginBottom: 32 }}>
                <h3 style={{ marginBottom: 8 }}>Atribuir Novo Checklist</h3>
                <div className={styles.formGroup} style={{ display: 'flex', gap: 12 }}>
                    <select
                        value={selectedTemplateId}
                        onChange={(e) => setSelectedTemplateId(e.target.value)}
                        className={styles.select}
                        style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #eaeaea' }}
                    >
                        <option value="">Selecione um template</option>
                        {templates.map((tpl) => (
                            <option key={tpl.id} value={tpl.id}>
                                {tpl.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleAssignChecklist}
                        disabled={!selectedTemplateId}
                        className={styles.assignButton}
                        style={{ padding: '8px 20px', borderRadius: 6, background: '#4a90e2', color: '#fff', border: 'none', fontWeight: 500, cursor: 'pointer' }}
                    >
                        Atribuir
                    </button>
                </div>
            </div>

            <div style={{ borderTop: '1px solid #eaeaea', margin: '32px 0' }} />

            <section className={styles.section} style={{ marginBottom: 32 }}>
                <h3>Relatórios</h3>
                <ul style={{ marginBottom: 8 }}>
                    {employee.reports?.map(rep => (
                        <li key={rep.id}>
                            <strong>{rep.title}</strong> - {rep.content} ({rep.created_at})
                        </li>
                    ))}
                </ul>
                <button onClick={() => setShowAddReportModal(true)} className={styles.modalsButton} style={{ width: '100%' }}>
                    + Adicionar Relatório
                </button>
            </section>

            <section className={styles.section} style={{ marginBottom: 32 }}>
                <h3>Tags</h3>
                <ul className={styles.tagsList} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {employee.tags?.map(tag => (
                        <li key={tag.id}>
                            <button
                                className={styles.modalsButton}
                                style={{ backgroundColor: tag.color, color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', fontWeight: 500, marginBottom: 4 }}
                                onClick={() => openTagUpdateModal(tag)}
                            >
                                {tag.content}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button onClick={() => setIsModalTagOpen(true)} className={styles.modalsButton} style={{ border: '1px dashed #4a90e2', color: '#4a90e2', background: 'transparent', borderRadius: 6, padding: '6px 16px', fontWeight: 500 }}>
                            Adicionar +
                        </button>
                    </li>
                </ul>
            </section>

            {employee.labor_rights && (
                <section className={styles.section} style={{ marginBottom: 32 }}>
                    <h3>Direitos Trabalhistas</h3>
                    <p><strong>Tipo de contrato:</strong> {employee.labor_rights.contract_type}</p>
                    <p><strong>Carga horária:</strong> {employee.labor_rights.workload}</p>
                    <p><strong>Sindicalizado:</strong> {employee.labor_rights.is_unionized ? 'Sim' : 'Não'}</p>
                </section>
            )}

            <section className={styles.section} style={{ marginBottom: 32 }}>
                <h3>Adicionar Documento (PDF)</h3>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <input type="file" accept="application/pdf" onChange={handleFileChange} />
                    <button onClick={handleUpload} disabled={!selectedFile || uploading} style={{ padding: '8px 20px', borderRadius: 6, background: '#4a90e2', color: '#fff', border: 'none', fontWeight: 500, cursor: 'pointer' }}>
                        {uploading ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>
            </section>

            {employee.documents && employee.documents?.length > 0 && (
                <section className={styles.section} style={{ marginBottom: 32 }}>
                    <h3>Documentos</h3>
                    <ul style={{ marginBottom: 8 }}>
                        {documents.map(doc => (
                            <li key={doc.id}>
                                <a href={`http://localhost:8000/storage/${doc.path}`} target="_blank" rel="noreferrer" style={{ color: '#4a90e2', textDecoration: 'underline' }}>
                                    {doc.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section className={styles.section} style={{ marginBottom: 32 }}>
                <h3><FaCalendarAlt /> Licenças</h3>
                <ul style={{ marginBottom: 8 }}>
                    {employee.leaves?.map((leave) => (
                        <li key={leave.id}>
                            {leave.type} ({leave.start_date} até {leave.end_date})
                            <button onClick={() => deleteLeave(leave.id)} style={{ marginLeft: 8, background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 10px', cursor: 'pointer' }}>Excluir</button>
                        </li>
                    ))}
                </ul>
                <button onClick={() => setShowAddLeaveModal(true)} className={styles.modalsButton} style={{ width: '100%' }}>
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
                        <input style={{ height: 40, width: 60, marginBottom: 16 }} name='color' type='color' value={tagForm.color} onChange={handleChangeTag} />
                        <div className={styles.modalActions}>
                            <button onClick={handleSaveTag} style={{ background: '#4a90e2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 500 }}>Adicionar</button>
                            <button onClick={() => setIsModalTagOpen(false)} style={{ background: '#ddd', color: '#333', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 500 }}>Cancelar</button>
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
                        <input style={{ height: 40, width: 60, marginBottom: 16 }} name='color' type='color' value={tagForm.color} onChange={handleChangeTag} />
                        <div className={styles.modalActions}>
                            <button onClick={handleUpdate} style={{ background: '#4a90e2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 500 }}>Atualizar</button>
                            <button onClick={deleteTag} style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 500 }}>Deletar</button>
                            <button onClick={() => setModalTagUpdateOpen(false)} style={{ background: '#ddd', color: '#333', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 500 }}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            <button onClick={() => setIsModalOpen(true)} className={styles.modalsButton} style={{ width: '100%', marginTop: 24, background: '#4a90e2', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 600, fontSize: 18 }}>
                Editar Funcionário
            </button>
            <div style={{ marginTop: 16 }}>
                <button
                    onClick={deleteEmployee}
                    className={styles.deleteButton}
                    style={{
                        padding: '8px 20px',
                        borderRadius: 6,
                        background: '#e74c3c',
                        color: '#fff',
                        border: 'none',
                        fontWeight: 500,
                        cursor: 'pointer',
                        width: '100%',
                    }}
                >
                    Deletar Funcionário
                </button>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>Editar Funcionário</h3>
                        <input name="first_name" value={employee.first_name} onChange={handleChange} style={{ marginBottom: 8 }} />
                        <input name="last_name" value={employee.last_name} onChange={handleChange} style={{ marginBottom: 8 }} />
                        <input name="email" value={employee.email} onChange={handleChange} style={{ marginBottom: 8 }} />
                        <input name="cpf" value={employee.cpf} onChange={handleChange} style={{ marginBottom: 8 }} />
                        <input name="rg" value={employee.rg || ''} onChange={handleChange} style={{ marginBottom: 8 }} />
                        <input name="phone" value={employee.phone || ''} onChange={handleChange} style={{ marginBottom: 8 }} />
                        <input name="city" value={employee.city || ''} onChange={handleChange} style={{ marginBottom: 8 }} />
                        <textarea name="description" value={employee.description || ''} onChange={handleChange} style={{ marginBottom: 8 }} />
                        <select name="employment_status" value={employee.employment_status} onChange={handleChange} style={{ marginBottom: 16 }}>
                            <option value="active">Ativo</option>
                            <option value="on_leave">Em Licença</option>
                            <option value="terminated">Desligado</option>
                        </select>
                        <div className={styles.modalActions}>
                            <button onClick={handleSave} style={{ background: '#4a90e2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 500 }}>Salvar</button>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: '#ddd', color: '#333', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 500 }}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default EmployeeDetails;