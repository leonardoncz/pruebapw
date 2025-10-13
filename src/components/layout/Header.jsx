// src/components/layout/Header.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// CORRECCIÓN 1: Se importa el hook del CarritoContext
import { useCarrito } from '../../context/CarritoContext';
import './Header.css';

const Header = () => {
  const { usuario, logout } = useAuth();
  // CORRECCIÓN 2: Se usa 'items' que es el nombre correcto que exporta el contexto
  const { items } = useCarrito();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="header-container">
      <Link to="/" className="header-logo">
        PetAdopt
      </Link>

      <nav className="nav-links">
        <NavLink to="/" onClick={closeDropdown}>Home</NavLink>
        <NavLink to="/busqueda" onClick={closeDropdown}>Buscar</NavLink>
        {/* CORRECCIÓN 3: Se usa 'items.length' y se muestra solo si hay productos */}
        <NavLink to="/carrito" onClick={closeDropdown}>
          Carrito {items.length > 0 && `(${items.length})`}
        </NavLink>
        {usuario && usuario.rol === 'admin' && (
          <NavLink to="/admin" onClick={closeDropdown}>Admin</NavLink>
        )}
      </nav>

      <div className="user-controls" ref={dropdownRef}>
        {usuario ? (
          <>
            <button className="user-avatar-button" onClick={toggleDropdown}>
              <img src={usuario.avatar || "https://i.pinimg.com/236x/d3/3a/2d/d33a2d1b538f71b19af66d2276aa10e1.jpg"} alt="User Avatar" className="user-avatar" />
            </button>
            {showDropdown && (
              <ul className="dropdown-menu">
                <span className="dropdown-menu-header">{usuario.nombre}</span>
                <li><Link to="/panel" className="dropdown-menu-item" onClick={closeDropdown}>Mi Panel</Link></li>
                <li><Link to="/perfil/editar" className="dropdown-menu-item" onClick={closeDropdown}>Editar Perfil</Link></li>
                {/* Asumimos que hay un rol de admin en el objeto de usuario */}
                {usuario.rol === 'admin' && (
                  <>
                    <li><Link to="/admin/usuarios" className="dropdown-menu-item" onClick={closeDropdown}>Gestionar Usuarios</Link></li>
                    <li><Link to="/admin/productos" className="dropdown-menu-item" onClick={closeDropdown}>Gestionar Productos</Link></li>
                    <li><Link to="/admin/ordenes" className="dropdown-menu-item" onClick={closeDropdown}>Gestionar Órdenes</Link></li>
                  </>
                )}
                <li>
                  <button onClick={handleLogout} className="dropdown-menu-item logout">Cerrar Sesión</button>
                </li>
              </ul>
            )}
          </>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-login">Iniciar Sesión</Link>
            <Link to="/registro" className="btn btn-register">Registrarse</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

