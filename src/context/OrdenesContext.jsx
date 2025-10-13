// src/context/OrdenesContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';

export const OrdenesContext = createContext();

export const useOrdenes = () => {
  return useContext(OrdenesContext);
};

export const OrdenesProvider = ({ children }) => {
  // CORRECCIÓN: Ahora inicializa desde localStorage o con un array vacío.
  const [ordenes, setOrdenes] = useState(() => {
    const ordenesGuardadas = localStorage.getItem('ordenesDB');
    // Si hay algo guardado, úsalo. Si no, empieza con una lista vacía [].
    return ordenesGuardadas ? JSON.parse(ordenesGuardadas) : [];
  });

  // Este efecto se asegura de que cualquier cambio en las órdenes se guarde.
  useEffect(() => {
    localStorage.setItem('ordenesDB', JSON.stringify(ordenes));
  }, [ordenes]);

  const agregarOrden = (nuevaOrden) => {
    setOrdenes(prev => [...prev, nuevaOrden]);
  };
  
  // Aquí podrías agregar en el futuro más funciones como cancelarOrden(id), etc.

  const value = {
    ordenes,
    agregarOrden,
  };

  return (
    <OrdenesContext.Provider value={value}>
      {children}
    </OrdenesContext.Provider>
  );
};
