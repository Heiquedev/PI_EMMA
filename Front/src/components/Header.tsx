import React from "react";
import styles from './styles/Header.module.css'

const Header: React.FC = () => (
  <header className={styles.header}>
    <h1 className={styles.headerTitle}><i className="fas fa-users"></i> EMMA - Gestão de RH</h1>
    <div className={styles.userInfo}>
      <span>Olá, Administrador</span>
      <div className={styles.userAvatar}>
        <i className="fas fa-user-circle"></i>
      </div>
    </div>
  </header>
);

export default Header;