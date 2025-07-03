import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from './StatCard';
import ActivityList from './ActivityList';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [pendingVacations, setPendingVacations] = useState(0);
  const [birthdays, setBirthdays] = useState(0);
  const [activities, setActivities] = useState<string[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/employees')
      .then(response => {
        const employees = response.data.data;

        setTotalEmployees(employees.length);

        const today = new Date();
        const birthdayCount = employees.filter((emp: any) => {
          if (!emp.birth_date) return false;
          const birth = new Date(emp.birth_date);
          return birth.getDate() === today.getDate() && birth.getMonth() === today.getMonth();
        }).length;
        setBirthdays(birthdayCount);

        const vacationCount = employees.filter((emp: any) => emp.vacation_days > 0).length;
        setPendingVacations(vacationCount);

        const activityList = employees.slice(0, 5).map((emp: any) =>
          `Funcionário ${emp.first_name} ${emp.last_name} do departamento ${emp.position?.department?.department ?? '—'} foi registrado.`
        );
        setActivities(activityList);

      })
      .catch(error => {
        console.error('Erro ao carregar dados da dashboard:', error);
      });
  }, []);

  return (
    <section id="dashboard" className={styles.tabContent}>
      <h2>Dashboard</h2>
      <div className={styles.statsContainer}>
        <StatCard title="Total de Funcionários" value={totalEmployees} />
        <StatCard title="Férias Pendentes" value={pendingVacations} />
        <StatCard title="Aniversariantes" value={birthdays} />
      </div>
      <ActivityList activities={activities} />
    </section>
  );
};

export default Dashboard;