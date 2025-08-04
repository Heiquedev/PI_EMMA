import React, { useEffect, useState } from 'react';
import styles from './ChecklistTemplates.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import type { ChecklistTemplate } from '../../types';

const ChecklistTemplateForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    items: [{ title: '' }]
  });

  useEffect(() => {
    if (isEditMode) {
      api.get(`/api/checklist-templates/${id}`)
        .then(response => {
          const { title, description, items } = response.data;
          setFormData({
            name,
            description,
            items: items.length > 0 ? items : [{ title: '' }]
          });
        })
        .catch(error => console.error('Erro ao buscar template:', error));
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleItemChange = (index: number, value: string) => {
    const updatedItems = [...formData.items];
    updatedItems[index].title = value;
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { title: '' }]
    }));
  };

  const removeItem = (index: number) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await api.put(`/api/checklist-templates/${id}`, formData);
      } else {
        await api.post('/api/checklist-templates', formData);
      }
      navigate('/checklist-templates');
    } catch (error) {
      console.error('Erro ao salvar modelo:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>{isEditMode ? 'Editar Modelo' : 'Novo Modelo de Checklist'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Título:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          Descrição:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
          />
        </label>

        <div className={styles.itemsSection}>
          <h4>Itens do Checklist</h4>
          {formData.items.map((item, index) => (
            <div key={index} className={styles.itemRow}>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleItemChange(index, e.target.value)}
                className={styles.input}
                placeholder={`Item ${index + 1}`}
                required
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className={styles.removeButton}
                disabled={formData.items.length === 1}
              >
                Remover
              </button>
            </div>
          ))}
          <button type="button" onClick={addItem} className={styles.addButton}>
            + Adicionar Item
          </button>
        </div>

        <button type="submit" className={styles.submitButton}>
          {isEditMode ? 'Salvar Alterações' : 'Criar Modelo'}
        </button>
      </form>
    </div>
  );
};

export default ChecklistTemplateForm;
