import React, { useState } from 'react';
import styles from './Modal.module.css';
import api from '../../services/api';

interface Props {
    employeeId: number;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddAttendanceModal({ employeeId, onClose, onSuccess }: Props) {
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('present');

    const handleSubmit = async () => {
        try {
            await api.post(`/api/employees/${employeeId}/attendances`, {
                employee_id: employeeId,
                date,
                status,
            });
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Erro ao adicionar presença:', err);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContent}>
                <h3>Adicionar Presença</h3>
                <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    className={styles.input}
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={styles.input}
                >
                    <option value="present">Presente</option>
                    <option value="absent">Ausente</option>
                </select>
                <div className={styles.footer}>
                    <button onClick={handleSubmit} className={styles.buttonPrimary}>Salvar</button>
                    <button onClick={onClose} className={styles.buttonSecondary}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}
