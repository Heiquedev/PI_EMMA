import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => (
  <div className={styles.searchBar}>
    <input type="text" placeholder="Pesquisar funcionário..." className={styles.input} />
    <button className={styles.button}><i className="fas fa-search"></i></button>
  </div>
);

export default SearchBar;