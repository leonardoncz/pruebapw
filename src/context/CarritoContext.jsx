import React, { createContext, useState, useEffect } from 'react';

// Se crea el contexto para ser consumido por otros componentes.
export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  // Estado para los items en el carrito actual
  const [items, setItems] = useState(() => {
    const guardado = localStorage.getItem('carritoItems');
    return guardado ? JSON.parse(guardado) : [];
  });

  // Estado para las órdenes completadas
  const [ordenes, setOrdenes] = useState(() => {
    const guardado = localStorage.getItem('ordenes');
    return guardado ? JSON.parse(guardado) : [];
  });

  // Efecto para guardar el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('carritoItems', JSON.stringify(items));
  }, [items]);

  // Efecto para guardar las órdenes en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('ordenes', JSON.stringify(ordenes));
  }, [ordenes]);

  // --- Funciones del Carrito ---
  const agregarAlCarrito = (producto) => {
    setItems(prevItems => {
      const existe = prevItems.find(item => item.id === producto.id);
      if (existe) {
        return prevItems.map(item =>
          item.id === producto.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...producto, quantity: 1 }];
    });
  };

  const modificarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId);
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === productoId ? { ...item, quantity: nuevaCantidad } : item
        )
      );
    }
  };

  const eliminarDelCarrito = (productoId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productoId));
  };

  const limpiarCarrito = () => {
    setItems([]);
  };
  
  // --- Función de Crear Órdenes CORREGIDA ---
  // AHORA RECIBE LOS PRODUCTOS DIRECTAMENTE COMO ARGUMENTO
  const crearOrden = (usuarioId, total, productosDeLaOrden) => {
    const nuevaOrden = {
      id: Date.now(), // ID único basado en la fecha actual
      usuarioId: usuarioId,
      fecha: new Date().toLocaleDateString(),
      estado: "Pendiente",
      total: total.toFixed(2),
      productos: productosDeLaOrden, // Usamos los productos que nos pasaron
    };
    
    setOrdenes(prevOrdenes => [...prevOrdenes, nuevaOrden]);
  };

  return (
    <CarritoContext.Provider value={{
      items,
      ordenes,
      agregarAlCarrito,
      modificarCantidad,
      eliminarDelCarrito,
      limpiarCarrito,
      crearOrden,
    }}>
      {children}
    </CarritoContext.Provider>
  );
}

