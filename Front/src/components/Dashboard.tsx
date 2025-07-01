import React from 'react';
import StatCard from './StatCard';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => (
  <section id="dashboard" className={styles.tabContent}>
    <h2>Dashboard</h2>
    <div className={styles.statsContainer}>
      <StatCard title="Total de Funcionários" value={0} />
      <StatCard title="Férias Pendentes" value={0} />
      <StatCard title="Aniversariantes" value={0} />
    </div>
    <div className={styles.recentActivity}>
      <h3 className={styles.recentActivityTitle}>Atividades Recentes</h3>
      <ul className={styles.recentActivityList}></ul>
    </div>
  </section>
);

export default Dashboard;