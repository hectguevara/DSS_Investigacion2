import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'paciente' });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener usuarios existentes o iniciar lista sin nada
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Validar que no exista otro correo igual
    const yaExiste = usuarios.some(u => u.email === form.email);
    if (yaExiste) {
      setMensaje('❌ Ya existe un usuario con este correo.');
      return;
    }

    // Guardar nuevo usuario
    usuarios.push(form);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    setMensaje('✅ Usuario registrado exitosamente. Redirigiendo...');

    // Redirigir al login
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="container mt-4">
      <h2>Registro de Usuario</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Nombre" className="form-control mb-2" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Correo" type="email" className="form-control mb-2" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Contraseña" type="password" className="form-control mb-2" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <select className="form-control mb-2" onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="paciente">Paciente</option>
          <option value="medico">Médico</option>
          <option value="admin">Administrador</option>
        </select>
        <button className="btn btn-success">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
