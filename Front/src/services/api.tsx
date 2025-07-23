// src/services/api.ts
import axios from 'axios';

// Captura o token CSRF do cookie
function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
    return null;
}

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, // essencial para que os cookies sejam enviados
    headers: {
        'Cache-Control': 'no-cache',
        'X-Requested-With': 'XMLHttpRequest',
    }
});

// Adiciona automaticamente o header CSRF antes das requisições
api.interceptors.request.use((config) => {
    try {
        const token = getCookie('XSRF-TOKEN');
        if (token && config.headers) {
            config.headers['X-XSRF-TOKEN'] = token;
        }
    } catch (err) {
        console.warn('Erro ao configurar CSRF token', err);
    }
    return config;
});

export default api;