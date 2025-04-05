import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null; 

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Perfil del Usuario</h2>
      <div className="card shadow-sm p-4">
        <h4 className="mb-3">{user.name}</h4>
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
      </div>
    </div>
  );
}

export default Profile;