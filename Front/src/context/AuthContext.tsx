import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/user', {
                withCredentials: true,
            });
            setUser(res.data);
        } catch (err: any) {
            setUser(null);
            // Se o erro for de autenticação, limpe o usuário
            if (err?.response?.status === 401 || err?.response?.status === 419) {
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            // Sempre obtenha um novo CSRF cookie antes de cada tentativa
            await api.get('/sanctum/csrf-cookie', {
                withCredentials: true,
            });

            // Aguarde a resposta do login antes de buscar o usuário
            await api.post('/login', { email, password }, {
                withCredentials: true,
            });

            // Só depois de login bem-sucedido, busque o usuário
            await fetchUser();
        } catch (err) {
            setUser(null);
            throw err; // Propague o erro para o componente de login
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await api.post('/logout', {}, {
                withCredentials: true,
            });
        } catch {
            // Ignorar erros de logout
        } finally {
            setUser(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
