// src/components/layout/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCarrito } from '../../context/CarritoContext';
import './Header.css';

const Header = () => {
  const { usuario, logout } = useAuth();
  const { items } = useCarrito();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowDropdown(false);
  };

  const toggleDropdown = () => setShowDropdown(prev => !prev);
  const closeDropdown = () => setShowDropdown(false);

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

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header-container">
      <Link to="/" className="header-logo" onClick={closeDropdown}>
        PetAdopt
      </Link>

      <nav className="nav-links">
        <NavLink to="/" onClick={closeDropdown}>Home</NavLink>
        <NavLink to="/busqueda" onClick={closeDropdown}>Buscar</NavLink>
      </nav>

      <div className="user-controls">
        <NavLink to="/carrito" className="cart-link" onClick={closeDropdown}>
          🛒 Carrito {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </NavLink>

        {usuario ? (
          <div className="dropdown-container" ref={dropdownRef}>
            <button className="user-avatar-button" onClick={toggleDropdown}>
              <img src={usuario.avatar || `https://ui-avatars.com/api/?name=${usuario.nombre}&background=4682B4&color=fff`} alt="User Avatar" className="user-avatar" />
            </button>
            {showDropdown && (
              <ul className="dropdown-menu">
                <span className="dropdown-menu-header">Hola, {usuario.nombre}</span>
                {usuario.rol === 'admin' && <li><Link to="/admin" className="dropdown-menu-item" onClick={closeDropdown}>Dashboard</Link></li>}
                <li><Link to="/panel" className="dropdown-menu-item" onClick={closeDropdown}>Mi Panel</Link></li>
                <li><Link to="/perfil/editar" className="dropdown-menu-item" onClick={closeDropdown}>Editar Perfil</Link></li>
                <li>
                  <button onClick={handleLogout} className="dropdown-menu-item logout">Cerrar Sesión</button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn-login">Iniciar Sesión</Link>
            <Link to="/registro" className="btn-register">Registrarse</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

