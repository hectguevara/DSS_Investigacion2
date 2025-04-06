import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>No has iniciado sesión.</p>;

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