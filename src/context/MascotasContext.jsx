import React, { createContext, useState, useContext, useEffect } from 'react';

const MascotasContext = createContext();

// El hook se mantiene como una exportación nombrada (named export)
export const useMascotas = () => {
  return useContext(MascotasContext);
};

// CORRECCIÓN 1: Se elimina 'export' de aquí para convertirlo en el default export
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

  const agregarMascota = (nuevaMascota) => {
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
    // Se convierte el id a número para una comparación segura
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

// CORRECCIÓN 2: Se añade la exportación por defecto al final del archivo
export default MascotasProvider;
