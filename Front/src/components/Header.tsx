import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => (
  <header className={styles.header}>
    {/* Botão Hamburger visible só no mobile */}
    <button
      className={styles.hamburgerButton}
      onClick={toggleSidebar}
      aria-label="Abrir menu"
    >
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
    </button>

    <h1 className={styles.headerTitle}>
      <i className="fas fa-users"></i> EMMA - Gestão de RH
    </h1>
    <div className={styles.userInfo}>
      <span>Olá, Administrador</span>
      <div className={styles.userAvatar}>
        <i className="fas fa-user-circle"></i>
      </div>
    </div>
  </header>
);

export default Header;
