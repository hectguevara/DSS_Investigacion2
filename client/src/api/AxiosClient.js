// src/api/axiosClient.js

import axios from 'axios';

const createApiClient = (baseURL) => {
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor para añadir el token desde localStorage
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Método para hacer peticiones POST
  const post = async (path, body) => {
    try {
      const response = await api.post(path, body);
      return response.data;
    } catch (error) {
      console.error('Error en POST:', error);
      throw error;
    }
  };

  // También podés agregar GET, PUT, DELETE si necesitás
  const get = async (path) => {
    try {
      const response = await api.get(path);
      return response.data;
    } catch (error) {
      console.error('Error en GET:', error);
      throw error;
    }
  };

  return {
    post,
    get,
    // Agregá más métodos si querés: put, delete, etc.
  };
};

export default createApiClient;
