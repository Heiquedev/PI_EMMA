import React from 'react';
import styles from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <div className={styles.searchBar}>
    <input
      type="text"
      placeholder="Pesquisar funcionário..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.input}
    />
    <button className={styles.button}><FontAwesomeIcon icon={faSearch} /></button>
  </div>
);

export default SearchBar;
