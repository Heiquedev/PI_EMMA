import React from 'react';
import styles from './Auth.module.css';

const Register: React.FC = () => {
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8000/api/auth/google/redirect';
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.card}>
                <h2>Registrar no EMMA</h2>

                <button className={styles.button} onClick={handleGoogleLogin}>
                    Registrar com Google
                </button>

                <div className={styles.switchLink}>
                    Já tem conta? Faça login com Google.
                </div>
            </div>
        </div>
    );
};

export default Register;
