import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import api from '../services/api';

interface DepartmentCount {
  name: string;
  value: number;
}

interface MonthlyHire {
  month: string;
  total: number;
}

interface ReasonCount {
  reason: string;
  total: number;
}

interface StatusCount {
  status: string;
  total: number;
}

interface Birthday {
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

interface Document {
  name: string;
  type: string;
  path: string;
}

interface Tag {
  content: string;
  total: number;
}

interface Stats {
  total_employees: number;
  pending_vacations: number;
  birthdays: number;
  employees_by_department: DepartmentCount[];
  hires_by_month: MonthlyHire[];
  absences_this_month: number;
  absences_by_reason: ReasonCount[];
  leaves_by_status: StatusCount[];
  total_payroll: number;
  upcoming_birthdays: Birthday[];
  recent_documents: Document[];
  top_tags: Tag[];
}

interface Activity {
  type: string;
  message: string;
  created_at: string;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get('/api/dashboard')
      .then((response) => {
        setStats(response.data.stats);
        setActivities(response.data.activities);
      })
      .catch((err) => {
        console.error("Falha ao buscar dados da API:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>

      {loading ? (
        <p>Carregando dados...</p>
      ) : error ? (
        <p>Falha ao conectar-se. Verifique o servidor.</p>
      ) : stats ? (
        <>
          <div className={styles.statsContainer}>
            <div className={styles.statCard}><h3>Total de Funcionários</h3><p>{stats.total_employees}</p></div>
            <div className={styles.statCard}><h3>Férias Pendentes</h3><p>{stats.pending_vacations}</p></div>
            <div className={styles.statCard}><h3>Aniversariantes</h3><p>{stats.birthdays}</p></div>
            <div className={styles.statCard}><h3>Faltas no Mês</h3><p>{stats.absences_this_month}</p></div>
            <div className={styles.statCard}><h3>Total da Folha</h3><p>R$ {stats.total_payroll.toLocaleString('pt-BR')}</p></div>
          </div>

          <div className={styles.chartsGrid}>
            <div className={styles.chartBox}>
              <h3>Contratações por Mês</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stats.hires_by_month}>
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="total" fill="#8884d8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.chartBox}>
              <h3>Licenças por Status</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={stats.leaves_by_status} dataKey="total" nameKey="status" outerRadius={80}>
                    {stats.leaves_by_status.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.chartBox}>
              <h3>Faltas por Motivo</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={stats.absences_by_reason} dataKey="total" nameKey="reason" outerRadius={80}>
                    {stats.absences_by_reason.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.chartBox}>
              <h3>Funcionários por Departamento</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stats.employees_by_department}>
                  <XAxis dataKey="name" interval={0} angle={-20} textAnchor="end" height={60} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={styles.listsContainer}>
            <div className={styles.listBox}>
              <h3>Próximos Aniversariantes</h3>
              <ul>
                {stats.upcoming_birthdays.map((b, idx) => (
                  <li key={idx}>{b.first_name} {b.last_name} - {new Date(b.date_of_birth).toLocaleDateString('pt-BR')}</li>
                ))}
              </ul>
            </div>

            <div className={styles.listBox}>
              <h3>Documentos Recentes</h3>
              <ul>
                {stats.recent_documents.map((d, idx) => (
                  <li key={idx}>{d.name} ({d.type})</li>
                ))}
              </ul>
            </div>

            <div className={styles.listBox}>
              <h3>Tags Mais Usadas</h3>
              <ul>
                {stats.top_tags.map((tag, idx) => (
                  <li key={idx}>{tag.content} ({tag.total})</li>
                ))}
              </ul>
            </div>
          </div>

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
      ) : null}
    </div>
  );
};

export default Dashboard;
