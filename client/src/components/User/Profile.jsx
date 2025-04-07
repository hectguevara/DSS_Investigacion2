import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { token, logout, isAuthLoading } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [roleName, setRoleName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthLoading) return;

    if (!token) {
      setError('No hay token, redirigiendo al login...');
      setTimeout(() => navigate('/'), 1500);
      return;
    }

    axios.get('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 20000,
    })
    .then(async (res) => {
      const userData = res.data.data;
      setUserInfo(userData);

      // Obtener nombre del rol
      if (userData.role) {
        const roleRes = await axios.get(`/api/roles/${userData.role}`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 20000,
        });
        setRoleName(roleRes.data.data.name);
      }

      setLoading(false);
    })
    .catch((err) => {
      let message = 'Error al cargar datos del perfil.';
      if (err.response) {
        message += `\nCódigo: ${err.response.status}`;
        message += `\nDetalle: ${JSON.stringify(err.response.data)}`;
      } else {
        message += `\n${err.message}`;
      }
      setError(message);
      setLoading(false);
    });
  }, [token, isAuthLoading, navigate]);

  if (isAuthLoading || loading) {
    return (
      <div className="container mt-4">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" style={{ whiteSpace: 'pre-wrap' }}>{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Perfil de Usuario</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>Nombre:</strong> {userInfo.first_name || 'No disponible'}</li>
        <li className="list-group-item"><strong>Rol:</strong> {roleName || 'No disponible'}</li>
      </ul>
      <button className="btn btn-danger mt-4" onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default Profile;