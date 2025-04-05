import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Login() {
  const {user, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/profile'); 
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Llama a la función login del contexto
      navigate('/profile'); // Redirige al perfil después de un inicio de sesión exitoso
    } catch (err) {
      setError('❌ Usuario o contraseña incorrectos.'); // Maneja errores de autenticación
    }
  };

  /*const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const user = usuarios.find(u => u.email === email && u.password === password);

    if (user) {
      login(user);
      navigate('/profile');
    } else {
      setError('❌ Usuario o contraseña incorrectos.');
    }
  };*/

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