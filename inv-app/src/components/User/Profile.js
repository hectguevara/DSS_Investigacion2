// src/components/User/Profile.js
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);

  // Simulación de datos adicionales si no están en el contexto
  const fakeData = {
    name: user?.name || 'Juan Pérez',
    role: user?.role || 'paciente',
    email: 'juan.perez@correo.com',
    edad: 45,
    sexo: 'Masculino',
    enfermedades: ['Hipertensión', 'Diabetes tipo 2']
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Perfil del Usuario</h2>
      <div className="card shadow-sm p-4">
        <h4 className="mb-3">{fakeData.name}</h4>
        <p><strong>Correo:</strong> {fakeData.email}</p>
        <p><strong>Rol:</strong> {fakeData.role}</p>
        <p><strong>Edad:</strong> {fakeData.edad} años</p>
        <p><strong>Sexo:</strong> {fakeData.sexo}</p>
        <p><strong>Enfermedades crónicas:</strong></p>
        <ul>
          {fakeData.enfermedades.map((enfermedad, idx) => (
            <li key={idx}>{enfermedad}</li>
          ))}
        </ul>
        <button className="btn btn-secondary mt-3" disabled>
          Editar perfil (Próximamente)
        </button>
      </div>
    </div>
  );
}

export default Profile;