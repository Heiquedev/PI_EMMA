import React, { useState } from 'react';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <>
      <button className={styles.hamburger} onClick={toggleMenu} aria-label="Menu">
        <div className={open ? styles.bar1Active : styles.bar1}></div>
        <div className={open ? styles.bar2Active : styles.bar2}></div>
        <div className={open ? styles.bar3Active : styles.bar3}></div>
      </button>
      <nav className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        <ul>
          <li className={styles.active}><a href="#dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</a></li>
          <li><a href="#funcionarios"><i className="fas fa-user-tie"></i> Funcionários</a></li>
          <li><a href="#departamentos"><i className="fas fa-building"></i> Departamentos</a></li>
          <li><a href="#cargos"><i className="fas fa-briefcase"></i> Cargos</a></li>
          <li><a href="#folha"><i className="fas fa-file-invoice-dollar"></i> Folha de Pagamento</a></li>
          <li><a href="#beneficios"><i className="fas fa-hand-holding-heart"></i> Benefícios</a></li>
          <li><a href="#relatorios"><i className="fas fa-chart-bar"></i> Relatórios</a></li>
          <li><a href="#configuracoes"><i className="fas fa-cog"></i> Configurações</a></li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;