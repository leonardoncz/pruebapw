import React, { createContext, useState, useContext, useEffect } from 'react';

export const OrdenesContext = createContext();

export const useOrdenes = () => {
  return useContext(OrdenesContext);
};

export const OrdenesProvider = ({ children }) => {
  const [ordenes, setOrdenes] = useState([]);

  const recargarOrdenes = () => {
    fetch('http://localhost:3000/api/orders')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setOrdenes(data);
        else setOrdenes([]);
      })
      .catch(err => console.error("Error cargando órdenes:", err));
  };

  useEffect(() => {
    recargarOrdenes();
  }, []);

  const agregarOrden = async (nuevaOrden) => {
    try {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaOrden)
      });
      
      const data = await response.json();

      if (response.ok) {
        setOrdenes(prev => [...prev, data]);
        return true; // Éxito
      } else {
        // AQUÍ ESTÁ LA MEJORA: Mostramos el error real del backend
        console.error("Error del servidor al guardar orden:", data);
        alert(`Error al guardar: ${data.error || data.message || 'Error desconocido'}`);
        return false; // Fallo
      }
    } catch (error) {
      console.error("Error de red:", error);
      return false;
    }
  };

  const cancelarOrden = async (ordenId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${ordenId}/cancel`, {
        method: 'PUT'
      });
      if (response.ok) {
        const ordenActualizada = await response.json();
        setOrdenes(prev => prev.map(o => o.id === ordenId ? ordenActualizada : o));
      }
    } catch (error) { console.error(error); }
  };
  
  const value = { ordenes, agregarOrden, cancelarOrden, recargarOrdenes };

  return (
    <OrdenesContext.Provider value={value}>
      {children}
    </OrdenesContext.Provider>
  );
};