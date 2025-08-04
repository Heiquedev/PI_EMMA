import React, { useEffect, useState } from 'react';
import styles from './ChecklistTemplates.module.css';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import type { ChecklistTemplate } from '../../types';

const ChecklistTemplatesList: React.FC = () => {
  const [templates, setTemplates] = useState<ChecklistTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/checklist-templates')
      .then(response => setTemplates(response.data))
      .catch(error => console.error('Erro ao buscar templates:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este modelo?')) return;

    try {
      await api.delete(`/api/checklist-templates/${id}`);
      setTemplates(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Erro ao excluir template:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Modelos de Checklist</h2>
        <Link to="/checklist-templates/new" className={styles.createButton}>
          + Novo Modelo
        </Link>
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className={styles.list}>
          {templates.map(template => (
            <li key={template.id} className={styles.item}>
              <div>
                <strong>{template.name}</strong>
                <p>{template.description}</p>
              </div>
              <div className={styles.actions}>
                <Link to={`/checklist-templates/${template.id}/edit`} className={styles.editButton}>Editar</Link>
                <button onClick={() => handleDelete(template.id)} className={styles.deleteButton}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChecklistTemplatesList;
