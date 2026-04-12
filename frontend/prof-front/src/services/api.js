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

        const token = localStorage.getItem('token') || localStorage.getItem('access_token');

        const isAuthEndpoint = config.url.includes('login') || config.url.includes('register');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Token found and set:', token.substring(0, 20) + '...');
        } else if (!isAuthEndpoint) {
            console.warn('No token in localStorage');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;