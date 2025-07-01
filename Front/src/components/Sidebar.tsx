import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => (
  <nav className={styles.sidebar}>
    <ul className={styles.menu}>
      {["Dashboard", "Funcionários", "Departamentos", "Cargos", "Folha de Pagamento", "Benefícios", "Relatórios", "Configurações"].map((label, index) => {
        const icons = [
          'fa-tachometer-alt',
          'fa-user-tie',
          'fa-building',
          'fa-briefcase',
          'fa-file-invoice-dollar',
          'fa-hand-holding-heart',
          'fa-chart-bar',
          'fa-cog',
        ];
        return (
          <li key={label} className={styles.menuItem}>
            <a href={`#${label.toLowerCase()}`} className={styles.link}>
              <i className={`fas ${icons[index]}`}></i> {label}
            </a>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default Sidebar;