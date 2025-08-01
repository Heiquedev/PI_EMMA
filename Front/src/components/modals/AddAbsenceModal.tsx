import React, { useState } from 'react';
import styles from './Modal.module.css';
import api from '../../services/api';

interface Props {
    employeeId: number;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddAbsenceModal({ employeeId, onClose, onSuccess }: Props) {
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = async () => {
        try {
            await api.post(`/api/employees/${employeeId}/absences`, {
                employee_id: employeeId,
                date,
                reason,
            });
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Erro ao adicionar ausência:', err);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContent}>
                <h3>Adicionar Ausência</h3>
                <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    className={styles.input}
                />
                <select value={reason} onChange={(e) => setReason(e.target.value)}>
                    <option value="unjustified">Não Justificada</option>
                    <option value="medical">Médico</option>
                    <option value="personal">Pessoal</option>
                </select>
                <div className={styles.footer}>
                    <button onClick={handleSubmit} className={styles.buttonPrimary}>Salvar</button>
                    <button onClick={onClose} className={styles.buttonSecondary}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}
