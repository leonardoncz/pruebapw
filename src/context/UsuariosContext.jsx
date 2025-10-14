// src/context/UsuariosContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

export const UsuariosContext = createContext();

export const useUsuarios = () => {
  return useContext(UsuariosContext);
};

export const UsuariosProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState(() => {
    const usuariosGuardados = localStorage.getItem('usuariosDB');
    return usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
  });

  useEffect(() => {
    localStorage.setItem('usuariosDB', JSON.stringify(usuarios));
  }, [usuarios]);

  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios(prev => [...prev, nuevoUsuario]);
  };
  
  const toggleActivo = (id) => {
    setUsuarios(prev => 
      prev.map(u => u.id === id ? { ...u, activo: !u.activo } : u)
    );
  };
  
  const value = {
    usuarios,
    agregarUsuario,
    toggleActivo
  };

  return (
    <UsuariosContext.Provider value={value}>
      {children}
    </UsuariosContext.Provider>
  );
};


