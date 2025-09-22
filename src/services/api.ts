import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-connexa-bahia-grupo12-dvf4c6avczb3fces.brazilsouth-01.azurewebsites.net/api',
});

// Adiciona um interceptor de requisição
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
