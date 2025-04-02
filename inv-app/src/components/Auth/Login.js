import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener los usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar usuario por correo y contraseña
    const user = usuarios.find(u => u.email === email && u.password === password);

    if (user) {
      login({
        name: user.name,
        role: user.role,
        email: user.email,
        token: 'fake-token' // simulación de token a agregar despues
      });
      navigate('/profile');
    } else {
      setError('❌ Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Iniciar Sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
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
