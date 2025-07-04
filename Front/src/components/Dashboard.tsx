import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

interface Stats {
  total_employees: number;
  pending_vacations: number;
  birthdays: number;
}

interface Activity {
  type: string;
  message: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard')
      .then((response) => {
        setStats(response.data.stats ?? {
          total_employees: 0,
          pending_vacations: 0,
          birthdays: 0,
        });
        setActivities(response.data.activities ?? []);
      })
      .catch((err) => {
        console.error("Falha ao buscar dados da API:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const chartData = stats ? [
    { name: 'Funcionários', value: stats.total_employees },
    { name: 'Férias Pendentes', value: stats.pending_vacations },
    { name: 'Aniversariantes', value: stats.birthdays },
  ] : [];

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>

      {loading ? (
        <p>Carregando dados...</p>
      ) : error ? (
        <p>Falha ao conectar-se. Verifique o servidor.</p>
      ) : (
        <>
          {/* Estatísticas principais */}
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <h3>Total de Funcionários</h3>
              <p>{stats?.total_employees ?? '-'}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Férias Pendentes</h3>
              <p>{stats?.pending_vacations ?? '-'}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Aniversariantes</h3>
              <p>{stats?.birthdays ?? '-'}</p>
            </div>
          </div>

          {/* Gráfico com Recharts */}
          <div className={styles.chartContainer}>
            <h3>Resumo Visual</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Atividades Recentes */}
          <div className={styles.activity}>
            <h3>Atividades Recentes</h3>
            {activities.length > 0 ? (
              <ul className={styles.activityList}>
                {activities.map((act, idx) => (
                  <li key={idx}>
                    <span>{act.message}</span>
                    <small>{new Date(act.created_at).toLocaleString("pt-BR")}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma atividade recente registrada.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
