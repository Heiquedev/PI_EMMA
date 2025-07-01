
// App.tsx
import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import EmployeeModal from './components/EmployeeModal';
import styles from './App.module.css';

const App: React.FC = () => (
  <div className={styles.container}>
    <Header />
    <Sidebar />
    <main className={styles.content}>
      <Dashboard />
      <Employees />
    </main>
    <EmployeeModal />
  </div>
);

export default App;