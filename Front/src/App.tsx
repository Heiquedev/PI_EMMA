import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import EmployeeModal from './components/EmployeeModal';
import styles from './App.module.css';

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <main className={styles.content}>
        <Dashboard />
        <Employees onAdd={() => setShowModal(true)} />
      </main>
      <EmployeeModal visible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default App;