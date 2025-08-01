import React, { useState } from 'react';
import styles from './Modal.module.css';
import api from '../../services/api';

interface Props {
    employeeId: number;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddReportModal({ employeeId, onClose, onSuccess }: Props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        try {
            await api.post(`/api/employees/${employeeId}/reports`, {
                employee_id: employeeId,
                title,
                content,
            });
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Erro ao adicionar relatório:', err);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContent}>
                <h3>Adicionar Relatório</h3>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título"
                    className={styles.input}
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Conteúdo"
                    className={styles.input}
                />
                <div className={styles.footer}>
                    <button onClick={handleSubmit} className={styles.buttonPrimary}>Salvar</button>
                    <button onClick={onClose} className={styles.buttonSecondary}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}
