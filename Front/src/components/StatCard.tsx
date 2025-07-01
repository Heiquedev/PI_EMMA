import React from 'react';
import styles from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: number | string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className={styles.card}>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.value}>{value}</p>
  </div>
);

export default StatCard;