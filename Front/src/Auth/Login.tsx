import React from 'react';
import styles from './Auth.module.css';

const Login: React.FC = () => {
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8000/api/auth/google/redirect';
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.card}>
                <h2>Entrar no EMMA</h2>

                <button className={styles.button} onClick={handleGoogleLogin}>
                    <img src="/google-icon.svg" alt="Google" style={{ width: 20, marginRight: 8 }} />
                    Entrar com Google
                </button>

                <div className={styles.switchLink}>
                    Ainda não tem conta? Registre-se com Google.
                </div>
            </div>
        </div>
    );
};

export default Login;
