import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Employees from "./components/Employees";
import EmployeeModal from "./components/EmployeeModal";

const App: React.FC = () => (
  <div className="container">
    <Header />
    <Sidebar />
    <main className="content">
      <Dashboard />
      <Employees />
    </main>
    <EmployeeModal />
  </div>
);

export default App;