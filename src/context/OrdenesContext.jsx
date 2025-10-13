// src/context/OrdenesContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';

export const OrdenesContext = createContext();

export const useOrdenes = () => {
  return useContext(OrdenesContext);
};

export const OrdenesProvider = ({ children }) => {
  const [ordenes, setOrdenes] = useState(() => {
    const ordenesGuardadas = localStorage.getItem('ordenesDB');
    return ordenesGuardadas ? JSON.parse(ordenesGuardadas) : [];
  });

  useEffect(() => {
    localStorage.setItem('ordenesDB', JSON.stringify(ordenes));
  }, [ordenes]);

  const agregarOrden = (nuevaOrden) => {
    setOrdenes(prev => [...prev, nuevaOrden]);
  };

  // --- NUEVA FUNCIÓN AÑADIDA ---
  const cancelarOrden = (ordenId) => {
    setOrdenes(prevOrdenes =>
      prevOrdenes.map(orden =>
        orden.id === ordenId ? { ...orden, estado: 'Cancelada' } : orden
      )
    );
  };
  
  const value = {
    ordenes,
    agregarOrden,
    cancelarOrden, // Se exporta la nueva función
  };

  return (
    <OrdenesContext.Provider value={value}>
      {children}
    </OrdenesContext.Provider>
  );
};