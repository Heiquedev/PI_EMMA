import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './EmployeeModalTags.module.css';
import type { Tag } from '../types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EmployeeModalTagsProps {
  visible: boolean;
  onClose: () => void;
}

const initialState: Tag = {
  id: 0,
  content: '',
  color: ''
}

const EmployeeModalTags: React.FC<EmployeeModalTagsProps> = ({ visible, onClose }) => {
  const [tag, setTag] = useState<Tag>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (visible) setTag(initialState);
  }, [visible]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTag(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:8000/api/employees/tags', tag);
      toast.success('Tag criada com sucesso!');
      onClose();
    } catch (error: any) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        if (errors) {
          Object.values(errors).forEach((msg: any) => toast.error(msg as string));
        } else {
          toast.error('Dados inválidos. Verifique os campos e tente novamente.');
        }
      } else if (error.response?.status === 500) {
        toast.error('Erro interno no servidor. Tente novamente mais tarde.');
      } else {
        toast.error('Erro ao criar tag. Verifique sua conexão.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!visible) return null;

  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>Criar Tag</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.subtitle}>Nome</label>
        <input value={tag.content} title='' required/>
        <label className={styles.subtitle}>Cor</label>
        <select name="" id="">
          <option value=""></option>
        </select>

      </form>

    </div>
  )

}


export default EmployeeModalTags;