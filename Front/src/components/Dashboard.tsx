import React from "react";
import StatCard from "./StatCard";
import styles from './styles/Dashboard.module.css'

const Dashboard: React.FC = () => (
  <section id="dashboard" className="tab-content active">
    <h2>Dashboard</h2>
    <div className="stats-container">
      <StatCard title="Total de Funcionários" value={0} />
      <StatCard title="Férias Pendentes" value={0} />
      <StatCard title="Aniversariantes" value={0} />
    </div>

    <div className="recent-activity">
      <h3>Atividades Recentes</h3>
      <ul id="activity-list"></ul>
    </div>
  </section>
);

export default Dashboard;