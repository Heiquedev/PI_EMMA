import React, { useState } from 'react';
import styles from './Modal.module.css';
import api from '../../services/api';

interface Props {
    employeeId: number;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddLeaveModal({ employeeId, onClose, onSuccess }: Props) {
    const [type, setType] = useState('');
    const [status, setStatus] = useState('pending');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = async () => {
        try {
            await api.post(`/api/employees/${employeeId}/leaves`, {
                employee_id: employeeId,
                type,
                status,
                start_date,
                end_date,
                reason,
            });
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Erro ao adicionar licença:', err);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContent}>
                <h3>Adicionar Licença</h3>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="unpaid">Faltas</option>
                    <option value="vacation">Férias</option>
                    <option value="medical">Médico</option>
                    <option value="other">Outro</option>
                </select>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={styles.input}
                >
                    <option value="pending">Pendente</option>
                    <option value="approved">Aprovado</option>
                    <option value="rejected">Rejeitado</option>
                </select>
                <input
                    value={start_date}
                    onChange={(e) => setStartDate(e.target.value)}
                    type="date"
                    className={styles.input}
                />
                <input
                    value={end_date}
                    onChange={(e) => setEndDate(e.target.value)}
                    type="date"
                    className={styles.input}
                />
                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Motivo"
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
