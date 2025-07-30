import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './DepartmentDetails.module.css';
import type { Department, Employee, Position } from '../types';
import api from '../services/api';

const DepartmentDetails: React.FC = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState<Department | null>(null);
    const [employee, setEmployee] = useState<Employee[]>([]);
    const [positions, setPositions] = useState<Position[]>([]);
    const [uploading, setUploading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        api.get(`http://localhost:8000/api/departments/${id}`)
            .then(res => {
                setDepartment(res.data.data);
            })
            .catch(err => console.error("Erro ao buscar departamento:", err));
    }, [id]);
    useEffect(() => {
        api.get(`http://localhost:8000/api/employees`)
            .then(res => {
                setEmployee(res.data.data);
            })
            .catch(err => console.error("Erro ao buscar departamento:", err));
    }, [id]);
    useEffect(() => {
        api.get(`http://localhost:8000/api/positions`)
            .then(res => {
                setPositions(res.data.data);
            })
            .catch(err => console.error("Erro ao buscar departamento:", err));
    }, [id]);



    if (!department) return <p>Carregando dados do departamento...</p>;

    return (
        <div className={styles.detailsContainer}>
            <h2>{department?.department}</h2>
            <p><strong>Chave única:</strong> {department.id}</p>
            <p><strong>Nome do departemento</strong>: {department.department}</p>
            <p><strong>Informação:</strong> {department.description}</p>


            <div className={styles.section}>
                <h3>Cargos</h3>
                {
                    positions.map((pos) => {
                        if (pos.department) {
                            if (pos.department.id == department.id) {
                                return (
                                    <p>{pos.title}</p>
                                )
                            }
                        }
                    })
                }
            </div>
            <div className={styles.section}>
                <h3>Funcionários do {department.department}</h3>
                {
                    employee.map((emp) => {
                        if (emp.position?.department?.id == department.id) {
                            return (
                                <p>{emp.first_name} {emp.last_name}</p>
                            )
                        }
                    })
                }
            </div>

        </div>
    )

};

export default DepartmentDetails;