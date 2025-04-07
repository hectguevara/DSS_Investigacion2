// src/services/userService.js

import createApiClient from '../api/AxiosClient';

const api = createApiClient('https://mi-api.com/api');

export const loginUser = async (credentials) => {
  return await api.post('/auth/login', credentials);
};

export const getUserProfile = async () => {
  return await api.get('/user/profile');
};
