import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import MainLayout from './layout/MainLayout';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import { useAuth } from './context/AuthContext';
import EmployeeDetails from './components/EmployeeDetails';
import { useState } from 'react';
import EmployeeModal from './components/EmployeeModal';
import GoogleCallback from './layout/GoogleCallback';
import Register from './Auth/Register';
import DepartmentDetails from './components/DepartmentDetails';
import Departments from './components/Department';
import AuthorizedEmails from './components/AuthorizedEmails';
import Unauthorized from './components/Unauthorized';

const App = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="App">
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/google/callback" element={<GoogleCallback />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Rotas protegidas */}
        <Route
          path="/employees"
          element={
            isAuthenticated ? (
              <MainLayout>
                <Employees onAdd={() => setShowModal(true)} />
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
        <Route
          path="/departments"
          element={
            isAuthenticated ? (
              <MainLayout>
                <Departments onAdd={() => setShowModal(true)} />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/departments/:id"
          element={
            isAuthenticated ? (
              <MainLayout>
                <DepartmentDetails />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/emails"
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <MainLayout>
                <AuthorizedEmails />
              </MainLayout>
            ) : (
              <Navigate to="/unauthorized" replace />
            )
          }
        />

        {/* Dashboard como rota padrão */}
        <Route
          path="/*"
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
      </Routes>

      {/* Modal deve estar fora das rotas, mas ainda dentro do componente */}
      <EmployeeModal visible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default App;
