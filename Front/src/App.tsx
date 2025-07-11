import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import EmployeeModal from './components/EmployeeModal';
import styles from './App.module.css';
import DepartmentTable from './components/DepartmentTable';
import EmployeeDetails from './components/EmployeeDetails';

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={styles.container}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      <main
        className={styles.content}
        onClick={() => {
          if (window.innerWidth <= 768) closeSidebar();
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/funcionarios" element={<Employees onAdd={() => setShowModal(true)} />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/departamentos" element={<DepartmentTable/>}/>
          <Route path="/cargos" element={<DepartmentTable/>}/>
          {/* Coloque mais rotas aqui conforme criar outras seções */}
        </Routes>
      </main>
      <EmployeeModal visible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default App;
