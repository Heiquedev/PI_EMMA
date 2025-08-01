import React, { useState } from 'react';
import styles from './Modal.module.css';
import api from '../../services/api';

interface Props {
    employeeId: number;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddSalaryModal({ employeeId, onClose, onSuccess }: Props) {
    const [amount, setAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async () => {
        try {
            await api.post(`/api/employees/${employeeId}/salaries`, {
                employee_id: employeeId,
                amount,
                start_date: startDate,
                end_date: endDate || null,
            });
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Erro ao adicionar salário:', err);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContent}>
                <h3>Adicionar Salário</h3>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Valor"
                    type="number"
                    className={styles.input}
                />
                <input
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    type="date"
                    className={styles.input}
                />
                <input
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    type="date"
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
