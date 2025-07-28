import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import MainLayout from './layout/MainLayout';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import { useAuth } from './context/AuthContext';
import EmployeeDetails from './components/EmployeeDetails';
import { useState } from 'react';
import EmployeeModal from './components/EmployeeModal';

const App = () => {
  const { isAuthenticated, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="App">
      <Routes>
        {/* Autenticação (sem layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protegido (com layout) */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <MainLayout>
                <Dashboard />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/employees"
          element={
            isAuthenticated ? (
              <MainLayout>
                <Employees onAdd={() => { setShowModal(true) }} />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/employees/:id"
          element={
            isAuthenticated ? (
              <MainLayout>
                <EmployeeDetails />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Redirecionamento padrão */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
      <EmployeeModal visible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default App;
