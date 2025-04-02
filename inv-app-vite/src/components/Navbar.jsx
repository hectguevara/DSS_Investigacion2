import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">HealthApp</Link>
        {user && (
          <>
            <ul className="navbar-nav me-auto d-flex flex-row gap-3">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/profile">Perfil</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/schedule">Citas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/history">Historial</Link>
              </li>
            </ul>
            <button className="btn btn-sm btn-danger" onClick={logout}>Cerrar sesión</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;