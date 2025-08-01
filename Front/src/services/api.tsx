// src/services/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    // sem withCredentials!
});

export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const fetchEmployeeDetails = async (id: number) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
};


export async function logoutUser() {
  await api.post('/api/logout');
  localStorage.removeItem('token');
}

export default api;
