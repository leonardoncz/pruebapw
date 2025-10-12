
import React, { createContext, useState, useContext, useEffect } from 'react';
// Importamos los datos iniciales solo para la primera carga
import { todosAnimales as initialMascotas } from '../components/data/productos';

// 1. Crear el contexto
export const MascotasContext = createContext();

// 2. Hook personalizado para facilitar su uso
export const useMascotas = () => {
  return useContext(MascotasContext);
};

// 3. Proveedor del contexto que manejará toda la lógica
export const MascotasProvider = ({ children }) => {
  // Inicializamos el estado desde localStorage o con los datos iniciales
  const [mascotas, setMascotas] = useState(() => {
    try {
      const mascotasGuardadas = localStorage.getItem('mascotasDB');
      if (mascotasGuardadas) {
        return JSON.parse(mascotasGuardadas);
      } else {
        // Si no hay nada, cargamos los datos iniciales y los guardamos
        localStorage.setItem('mascotasDB', JSON.stringify(initialMascotas));
        return initialMascotas;
      }
    } catch (error) {
      console.error("Error al cargar las mascotas desde localStorage", error);
      return initialMascotas;
    }
  });

  // Efecto para guardar en localStorage cada vez que el estado de 'mascotas' cambie
  useEffect(() => {
    localStorage.setItem('mascotasDB', JSON.stringify(mascotas));
  }, [mascotas]);

  // --- Funciones CRUD (Crear, Leer, Actualizar, Eliminar) ---

  const agregarMascota = (nuevaMascota) => {
    // Generamos un ID único simple basado en la fecha actual
    const mascotaConId = { ...nuevaMascota, id: Date.now() };
    setMascotas(prevMascotas => [...prevMascotas, mascotaConId]);
  };

  const actualizarMascota = (mascotaActualizada) => {
    setMascotas(prevMascotas => 
      prevMascotas.map(mascota => 
        mascota.id === mascotaActualizada.id ? mascotaActualizada : mascota
      )
    );
  };

  const eliminarMascota = (id) => {
    setMascotas(prevMascotas => 
      prevMascotas.filter(mascota => mascota.id !== id)
    );
  };

  const getMascotaById = (id) => {
    return mascotas.find(mascota => mascota.id === id);
  };

  // El valor que compartiremos con toda la app
  const value = {
    mascotas,
    agregarMascota,
    actualizarMascota,
    eliminarMascota,
    getMascotaById
  };

  return (
    <MascotasContext.Provider value={value}>
      {children}
    </MascotasContext.Provider>
  );
};

