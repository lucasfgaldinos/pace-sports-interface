import axios from 'axios';

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use((config) => {
  const userData = localStorage.getItem('paceSports:userData');

  const token = userData && JSON.parse(userData).token;

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
