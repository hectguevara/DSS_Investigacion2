import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  const handleMenuClick = () => {
    // Cierra el menú hamburguesa al seleccionar una opción
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">HealthApp</Link>
        {user && (
          <>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/profile" onClick={handleMenuClick}>Perfil</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/schedule" onClick={handleMenuClick}>Citas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/history" onClick={handleMenuClick}>Historial</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-danger nav-link" onClick={handleLogout}>Cerrar sesión</button>
                </li>
              </ul>
            </div>
          </>
        )}
        {!user && (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
            
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;