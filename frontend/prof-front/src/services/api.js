import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        // Check both possible token keys for compatibility
        const token = localStorage.getItem('token') || localStorage.getItem('access_token');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('✓ Token found and set:', token.substring(0, 20) + '...');
        } else {
            console.warn('⚠ No token in localStorage');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;