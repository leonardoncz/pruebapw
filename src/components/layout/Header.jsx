// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
 // Crea un archivo CSS para el header si es necesario
import './Header.css';

const Header = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuAbierto(false);
    navigate('/'); // Redirige al home después de cerrar sesión
  };

  return (
    <header className="top-nav">
      <div className="nav-left">
        <Link to="/" className="nav-logo">PetAdopt</Link>
      </div>
      <nav className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/busqueda">Buscar</Link>
        <Link to="/carrito">Carrito</Link>
      </nav>
      <div className="nav-right">
        {usuario ? (
          // Vista para usuario logueado
          <div className="user-menu-container">
            <img 
              src="https://i.pinimg.com/236x/d3/3a/2d/d33a2d1b538f71b19af66d2276aa10e1.jpg" 
              alt="User Photo" 
              className="user-photo" 
              onClick={() => setMenuAbierto(!menuAbierto)}
            />
            {menuAbierto && (
              <div className="dropdown-menu">
                <span>Hola, {usuario.nombre}</span>
                <Link to="/panel" onClick={() => setMenuAbierto(false)}>Mis Órdenes</Link>
                <Link to="/perfil/editar" onClick={() => setMenuAbierto(false)}>Editar Perfil</Link>
                <button onClick={handleLogout}>Cerrar Sesión</button>
              </div>
            )}
          </div>
        ) : (
          // Vista para visitante
          <div className="auth-links">
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/registro" className="btn-registro">Registrarse</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;