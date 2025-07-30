import React from 'react';
import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const links = [
  { to: '/dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
  { to: '/employees', icon: 'fas fa-user-alt', label: 'Funcionários' },
  { to: '/departments', icon: 'fas fa-building', label: 'Departamentos' },
  { to: '/payroll', icon: 'fas fa-invoice-dollar', label: 'Folha de Pagamento' },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const handleLinkClick = () => onClose();

  return (
    <nav className={`${styles.sidebar} ${open ? styles.open : ''}`}>
      <ul>
        {links.map(({ to, icon, label }) => (
          <li key={to} className={styles.linkWrapper}>
            <NavLink
              to={to}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <i className={icon}></i> {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
