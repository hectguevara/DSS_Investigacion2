import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosRetry from 'axios-retry';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '63b576c9-0e5a-4099-b7c3-bba50cb63b64' // Rol por defecto: Paciente
  });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  // Configuración de instancia con retry y baseURL relativa
  const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 20000
  });

  axiosRetry(axiosInstance, {
    retries: 3,
    retryDelay: (retryCount) => {
      console.log(`⏳ Reintentando intento #${retryCount}...`);
      return retryCount * 1000;
    },
    retryCondition: (error) =>
      error.code === 'ECONNABORTED' || error.message === 'Network Error'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const res = await axiosInstance.post(
        '/users',
        {
          email: form.email,
          password: form.password,
          role: form.role,
          status: 'active'
        },
        {
          headers: {
            Authorization: 'Bearer w010NMMU1_nzsybV8p-Yyih1t9LAzM9c'
          }
        }
      );

      setMensaje('✅ Usuario registrado correctamente.');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error('🧨 Error completo al registrar:', err);

      let apiError = 'Error desconocido';
      if (err.response) {
        console.log('🔎 err.response.data:', err.response.data);
        apiError = JSON.stringify(err.response.data, null, 2);
      } else {
        apiError = err.message || 'Error inesperado';
      }

      setMensaje(`❌ ${apiError}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Registro de Usuario</h2>
      {mensaje && <div className="alert alert-info" style={{ whiteSpace: 'pre-wrap' }}>{mensaje}</div>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          className="form-control mb-2"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          className="form-control mb-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="form-control mb-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <select
          className="form-control mb-2"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="63b576c9-0e5a-4099-b7c3-bba50cb63b64">Paciente</option>
          <option value="91fbcdb8-adec-4c56-8add-84ad00e88720">Médico</option>
          <option value="a5c4a604-04b6-4df4-937f-ea6321b1b06a">Administrador</option>
        </select>
        <button className="btn btn-success">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;