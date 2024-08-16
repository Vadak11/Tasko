import axios from 'axios';

// Crear una instancia de Axios
const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // Reemplaza con la URL base de tu API
    headers: {
        'Content-Type': 'application/json',
    }
});

// Añadir un interceptor para incluir el token en cada solicitud
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
