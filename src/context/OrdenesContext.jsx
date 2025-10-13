// src/context/OrdenesContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import initialOrdenes from '../data/ordenes.json'; // Usado solo para la primera carga

export const OrdenesContext = createContext();

export const useOrdenes = () => {
  return useContext(OrdenesContext);
};

export const OrdenesProvider = ({ children }) => {
  // Inicializamos desde localStorage o con los datos del JSON si está vacío.
  const [ordenes, setOrdenes] = useState(() => {
    const ordenesGuardadas = localStorage.getItem('ordenesDB');
    if (ordenesGuardadas) {
      return JSON.parse(ordenesGuardadas);
    } else {
      localStorage.setItem('ordenesDB', JSON.stringify(initialOrdenes));
      return initialOrdenes;
    }
  });

  useEffect(() => {
    localStorage.setItem('ordenesDB', JSON.stringify(ordenes));
  }, [ordenes]);

  const agregarOrden = (nuevaOrden) => {
    setOrdenes(prev => [...prev, nuevaOrden]);
  };
  
  // Aquí podrías agregar funciones como cancelarOrden, etc.

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

