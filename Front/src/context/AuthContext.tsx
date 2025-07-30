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
    // login não faz sentido local, mas deixei opcional
    login?: () => Promise<void>;
    logout: () => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const response = await api.get('/api/user'); // rota protegida que retorna dados do usuário logado via sessão
            setUser(response.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser(); // SEM token, só tenta buscar usuário da sessão
    }, []);

    // Login via Google será feito via redirecionamento, então não precisa de função local
    // Poderia deixar algo para iniciar o login, ex:
    /*
    const login = async () => {
      window.location.href = 'http://localhost:8000/auth/google/redirect';
    };
    */

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch {
            // opcional: tratar erro
        }
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;