import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import axios from 'axios';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);

        if (password !== passwordConfirmation) {
            setErrorMsg('As senhas não coincidem.');
            return;
        }

        setLoading(true);

        try {
            // Pega cookie XSRF-TOKEN para enviar no header manualmente
            const getCookie = (name: string) => {
                const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
                return match ? decodeURIComponent(match[2]) : null;
            };

            // Solicita o cookie CSRF para garantir token atualizado
            await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });

            // Extrai token do cookie
            const xsrfToken = getCookie('XSRF-TOKEN');
            console.log(document.cookie); 
            console.log('XSRF-TOKEN:', xsrfToken);
            

            // Faz POST com o header X-XSRF-TOKEN explícito
            const response = await axios.post(
                'http://localhost:8000/register',
                {
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                },
                {
                    withCredentials: true,
                    headers: {
                        'X-XSRF-TOKEN': xsrfToken || '',
                    },
                }
            );

            console.log('Registro realizado com sucesso:', response.data);
            navigate('/login');
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 422) {
                    const errors = error.response.data.errors;
                    let messages = '';
                    if (errors) {
                        for (const key in errors) {
                            if (Object.prototype.hasOwnProperty.call(errors, key)) {
                                messages += errors[key].join(' ') + ' ';
                            }
                        }
                    }
                    setErrorMsg(messages.trim() || 'Verifique os dados informados.');
                } else {
                    setErrorMsg('Erro ao registrar. Tente novamente mais tarde.');
                }
            } else if (error.request) {
                setErrorMsg('Servidor não respondeu. Verifique sua conexão.');
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
                {errorMsg && <div className={styles.error}>{errorMsg}</div>}

                <h2>Registro</h2>

                <div className={styles.formGroup}>
                    <label htmlFor="name">Nome</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Nome"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                        autoComplete="email"
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
                        placeholder="Senha"
                        autoComplete="new-password"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="passwordConfirmation">Confirmar Senha</label>
                    <input
                        id="passwordConfirmation"
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                        placeholder="Confirmar Senha"
                        autoComplete="new-password"
                    />
                </div>

                <button className={styles.button} type="submit" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrar'}
                </button>

                <div className={styles.switchLink}>
                    Já tem conta? <Link to="/login">Entrar</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
