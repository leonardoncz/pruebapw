// src/context/MascotasContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const MascotasContext = createContext();

export const useMascotas = () => {
  return useContext(MascotasContext);
};

const MascotasProvider = ({ children }) => {
  const [mascotas, setMascotas] = useState(() => {
    try {
      const mascotasGuardadas = localStorage.getItem('mascotasDB');
      return mascotasGuardadas ? JSON.parse(mascotasGuardadas) : [];
    } catch (error) {
      console.error("Error al cargar las mascotas desde localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('mascotasDB', JSON.stringify(mascotas));
  }, [mascotas]);

  // Agregar mascota y retornar la nueva para poder usarla al asociar categorías
  const agregarMascota = (nuevaMascota) => {
    const imageUrl = nuevaMascota.image instanceof File 
      ? URL.createObjectURL(nuevaMascota.image) 
      : nuevaMascota.image;

    const mascotaConIdYUrl = { 
      ...nuevaMascota, 
      id: Date.now(), 
      image: imageUrl, 
      categoriaId: nuevaMascota.categoriaId || null 
    };

    setMascotas(prevMascotas => [...prevMascotas, mascotaConIdYUrl]);
    return mascotaConIdYUrl; // 🔹 Retorna la mascota agregada
  };

  // Actualizar mascota y retornar el objeto actualizado
  const actualizarMascota = (mascotaActualizada) => {
    let mascotaFinal = { ...mascotaActualizada };

    if (mascotaActualizada.image instanceof File) {
      mascotaFinal.image = URL.createObjectURL(mascotaActualizada.image);
    }

    setMascotas(prevMascotas => 
      prevMascotas.map(mascota => 
        mascota.id === mascotaFinal.id ? mascotaFinal : mascota
      )
    );

    return mascotaFinal; 
  };

  const eliminarMascota = (id) => {
    setMascotas(prevMascotas => 
      prevMascotas.filter(mascota => mascota.id !== id)
    );
  };

  const getMascotaById = (id) => {
    return mascotas.find(mascota => mascota.id === parseInt(id));
  };

  const getMascotasPorCategoria = (categoriaId) => {
    return mascotas.filter(mascota => mascota.categoriaId === categoriaId);
  };

  const value = {
    mascotas,
    agregarMascota,
    actualizarMascota,
    eliminarMascota,
    getMascotaById,
    getMascotasPorCategoria
  };

  return (
    <MascotasContext.Provider value={value}>
      {children}
    </MascotasContext.Provider>
  );
};

export default MascotasProvider;
