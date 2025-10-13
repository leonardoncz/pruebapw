// src/context/UsuariosContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

export const UsuariosContext = createContext();

export const useUsuarios = () => {
  return useContext(UsuariosContext);
};

export const UsuariosProvider = ({ children }) => {
  // Inicializamos desde localStorage. La primera vez, estará vacío.
  // AuthContext se encargará de poblarlo al registrar usuarios.
  const [usuarios, setUsuarios] = useState(() => {
    const usuariosGuardados = localStorage.getItem('usuariosDB');
    return usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
  });

  // Guardamos en localStorage cada vez que 'usuarios' cambie.
  useEffect(() => {
    localStorage.setItem('usuariosDB', JSON.stringify(usuarios));
  }, [usuarios]);

  // Esta función será usada por AuthContext para agregar nuevos usuarios
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


