import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./DepartmentDetails.module.css";
import type { Department, Employee, Position } from "../types";
import api from "../services/api";

const DepartmentDetails: React.FC = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState<Department | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [employee, setEmployee] = useState<Employee[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPositionsModalOpen, setIsPositionsModalOpen] = useState(false);
  const [isPositionModalOpen, setIsUpdPositionModalOpen] = useState(false);

  useEffect(() => {
    api
      .get(`http://localhost:8000/api/departments/${id}`)
      .then((res) => {
        setDepartment(res.data.data);
      })
      .catch((err) => console.error("Erro ao buscar departamento:", err));
  }, [id]);
  useEffect(() => {
    api
      .get(`http://localhost:8000/api/employees`)
      .then((res) => {
        if (employee) {
          setEmployee(res.data.data);
        }
      })
      .catch((err) => console.error("Erro ao buscar funcionários:", err));
  }, [id]);
  useEffect(() => {
    api
      .get(`http://localhost:8000/api/positions`)
      .then((res) => {
        if (positions) {
          setPositions(res.data.data);
        }
      })
      .catch((err) => console.error("Erro ao buscar cargos:", err));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (department && position) {
      setDepartment({ ...department, [e.target.name]: e.target.value });
      setPosition({ ...position, [e.target.name]: e.target.value });
    }
  };

  const handleSaveDepartment = () => {
    setUploading(true);
    api
      .put(
        `http://localhost:8000/api/departments/${department?.id}`,
        department
      )
      .then((res) => {
        console.log("Departamento atualizado com sucesso:", res.data);
        setIsModalOpen(false);
      })
      .catch((err) => console.error("Erro ao atualizar departamento:", err))
      .finally(() => setUploading(false));
  };

  const handleSavePosition = () => {
    setUploading(true);
    api
      .post(`http://localhost:8000/api/positions/${department?.id}`, position)
      .then((res) => {
        console.log("Departamento atualizado com sucesso:", res.data);
        setIsModalOpen(false);
      })
      .catch((err) => console.error("Erro ao atualizar departamento:", err))
      .finally(() => setUploading(false));
  };
  const handleUpdatePosition = () => {
    setUploading(true);
    api
      .put(`http://localhost:8000/api/positions/${position?.id}`, position)
      .then((res) => {
        console.log("Departamento atualizado com sucesso:", res.data);
        setIsModalOpen(false);
      })
      .catch((err) => console.error("Erro ao atualizar departamento:", err))
      .finally(() => setUploading(false));
  };

  function createModal() {
    setIsPositionsModalOpen(true);
    setIsModalOpen(false);
  }

  if (!department || !employee || !positions)
    return <p>Carregando dados do departamento...</p>;

  return (
    <div className={styles.detailsContainer}>
      <h2>{department?.department}</h2>
      <p>
        <strong>Chave única:</strong> {department.id}
      </p>
      <p>
        <strong>Nome do departemento</strong>: {department.department}
      </p>
      <p>
        <strong>Informação:</strong> {department.description}
      </p>

      <div className={styles.section}>
        <h3>Cargos</h3>
        {positions.map((pos) => {
          if (pos.department) {
            if (pos.department.id == department.id) {
              return (
                <p onClick={() => setIsUpdPositionModalOpen(true)}>
                  {pos.title}
                </p>
              );
            }
          }
        })}
      </div>
      <div className={styles.section}>
        <h3>Funcionários do {department.department}</h3>
        {employee.map((emp) => {
          if (emp.position?.department?.id == department.id) {
            return (
              <p onClick={() => setIsUpdPositionModalOpen}>
                {emp.first_name} {emp.last_name} {emp.position.title}
              </p>
            );
          }
        })}
      </div>
      <div className={styles.modalsButton}>
        <button
          className={styles.btnUpdate}
          onClick={() => setIsModalOpen(true)}
        >
          Editar Departamento
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalActions}>
              <input name="id" value={department.id} type="hidden" />
              <input
                name="department"
                value={department.department}
                onChange={handleChange}
              />
              <textarea
                name="description"
                value={department.description || ""}
                onChange={handleChange}
              />
              <button onClick={() => createModal()}>Criar novo cargo</button>
              <button onClick={handleSaveDepartment}>Salvar</button>
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {isPositionsModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Criar novo cargo</h2>
            <div className={styles.modalActions}>
              <label>Nome</label>
              <input
                name="title"
                value={position?.title}
                onChange={handleChange}
              />
              <label>Descrição</label>
              <textarea
                name="description"
                value={department.description || ""}
                onChange={handleChange}
              />
              <button onClick={handleSavePosition}>Salvar</button>
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {isPositionModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Editar cargo</h2>
            <div className={styles.modalActions}>
              <label>Nome</label>
              <label>{position?.title}</label>
              <label>Descrição</label>
              <input name="description" value={position?.description} />
              <button onClick={handleUpdatePosition}>Atualizar</button>
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentDetails;
