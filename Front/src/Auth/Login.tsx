import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        setLoading(true);

        try {
            await login(email, password);
            console.log('Login bem-sucedido. Redirecionando...');
        } catch (error: any) {
            const response = error?.response;

            if (response) {
                switch (response.status) {
                    case 422:
                        setErrorMsg('Preencha todos os campos corretamente.');
                        break;
                    case 401:
                        setErrorMsg('E-mail ou senha inválidos.');
                        break;
                    case 419:
                        setErrorMsg('Sessão expirada. Tente novamente.');
                        break;
                    default:
                        setErrorMsg('Erro inesperado no servidor.');
                }
            } else if (error.request) {
                setErrorMsg('Sem resposta do servidor. Verifique sua conexão.');
            } else {
                setErrorMsg('Erro inesperado: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <h2>Login</h2>

                {errorMsg && <div className={styles.error}>{errorMsg}</div>}

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="username"
                        placeholder="Digite seu e-mail"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Senha</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        placeholder="Digite sua senha"
                    />
                </div>

                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>

                <div className={styles.switchLink}>
                    Não tem uma conta? <Link to="/register">Registrar</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
