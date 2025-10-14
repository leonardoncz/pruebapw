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

  // CORRECCIÓN: La función ahora maneja archivos de imagen
  const agregarMascota = (nuevaMascota) => {
    // Si la imagen es un objeto File, crea una URL para ella.
    // Si no, usa el valor que ya tenga (por si acaso).
    const imageUrl = nuevaMascota.image instanceof File 
      ? URL.createObjectURL(nuevaMascota.image) 
      : nuevaMascota.image;

    const mascotaConIdYUrl = { ...nuevaMascota, id: Date.now(), image: imageUrl };
    setMascotas(prevMascotas => [...prevMascotas, mascotaConIdYUrl]);
  };

  // CORRECCIÓN: La función ahora maneja archivos de imagen al actualizar
  const actualizarMascota = (mascotaActualizada) => {
    let mascotaFinal = { ...mascotaActualizada };

    // Solo crea una nueva URL si se subió un nuevo archivo.
    // Si 'image' es un string, significa que no se cambió la imagen.
    if (mascotaActualizada.image instanceof File) {
      const imageUrl = URL.createObjectURL(mascotaActualizada.image);
      mascotaFinal.image = imageUrl;
    }
    
    setMascotas(prevMascotas => 
      prevMascotas.map(mascota => 
        mascota.id === mascotaFinal.id ? mascotaFinal : mascota
      )
    );
  };

  const eliminarMascota = (id) => {
    setMascotas(prevMascotas => 
      prevMascotas.filter(mascota => mascota.id !== id)
    );
  };

  const getMascotaById = (id) => {
    return mascotas.find(mascota => mascota.id === parseInt(id));
  };

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

export default MascotasProvider;

