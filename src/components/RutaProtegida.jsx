// src/components/RutaProtegida.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RutaProtegida = ({ children }) => {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) {
    // Redirige al usuario a la página de login, pero guarda la ubicación
    // a la que intentaba ir, para poder volver después del login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RutaProtegida;