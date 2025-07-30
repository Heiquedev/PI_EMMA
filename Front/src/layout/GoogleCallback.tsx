import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const GoogleCallback: React.FC = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            api.get('/api/user')
                .then((response) => {
                    setUser(response.data);
                    navigate('/dashboard');
                })
                .catch(() => {
                    navigate('/login');
                });
        } else {
            navigate('/login');
        }
    }, [navigate, setUser]);

    return <div>Autenticando com Google...</div>;
};

export default GoogleCallback;
