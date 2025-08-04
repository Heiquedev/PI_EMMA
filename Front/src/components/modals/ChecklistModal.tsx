// src/components/ChecklistModal.tsx
import React from 'react';
import styles from './Modal.module.css';
import type { DetailedEmployeeChecklist } from '../../types';

interface Props {
  checklist: DetailedEmployeeChecklist | null;
  onClose: () => void;
  onToggleItem: (itemId: number) => void;
}

const ChecklistModal: React.FC<Props> = ({ checklist, onClose, onToggleItem }) => {
  if (!checklist) return <div>Carregando...</div>;

  console.log(checklist);
  

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <h2>{checklist.template.name}</h2>
        <ul className={styles.itemList}>
          {checklist.items.map(item => (
            <li key={item.id} className={styles.item}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onToggleItem(item.id)}
                id={`check-${item.id}`}
              />
              <label htmlFor={`check-${item.id}`}>
                <strong>{item.template_item?.title || item.title}</strong>
                {item.template_item?.description && <p>{item.template_item.description}</p>}
              </label>
            </li>
          ))}
        </ul>
        <button className={styles.closeButton} onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};


export default ChecklistModal;
