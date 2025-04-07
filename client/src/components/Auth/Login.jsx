import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import axiosRetry from 'axios-retry';

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const axiosInstance = axios.create({ baseURL: '/api', timeout: 20000 });

  axiosRetry(axiosInstance, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => error.code === 'ECONNABORTED' || error.message === 'Network Error'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axiosInstance.post('/auth/login', { email, password });
      const { access_token } = res.data;
      const userData = { email, access_token };

      login(userData);
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/profile');
    } catch (err) {
      console.error('🧨 Error completo al iniciar sesión:', err);
      let apiError = 'Error desconocido';
      if (err.response) {
        console.log('🔎 err.response.data:', err.response.data);
        apiError = JSON.stringify(err.response.data, null, 2);
      } else {
        apiError = err.message || 'Error inesperado';
      }
      setError(`❌ ${apiError}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Iniciar Sesión</h2>
      {error && <div className="alert alert-danger" style={{ whiteSpace: 'pre-wrap' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} className="form-control mb-2" required />
        <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} className="form-control mb-2" required />
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
      <p className="mt-3">
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;