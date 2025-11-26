import React, { createContext, useState, useContext, useEffect } from 'react';

export const UsuariosContext = createContext();

export const useUsuarios = () => {
  return useContext(UsuariosContext);
};

export const UsuariosProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);

  // Cargar usuarios desde la BD
  useEffect(() => {
    fetch('http://localhost:3000/api/users')
        .then(res => res.json())
        .then(data => {
            if(Array.isArray(data)) setUsuarios(data);
        })
        .catch(err => console.error("Error cargando usuarios:", err));
  }, []); // Se ejecuta al montar

  // Nota: "agregarUsuario" ya no se usa aquí porque eso lo hace el Registro (AuthContext)
  // Pero lo mantenemos por compatibilidad si algún componente viejo lo llama.
  const agregarUsuario = () => {}; 
  
  const toggleActivo = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${id}/toggle`, {
            method: 'PUT'
        });
        
        if (response.ok) {
            const usuarioActualizado = await response.json();
            setUsuarios(prev => 
                prev.map(u => u.id === id ? usuarioActualizado : u)
            );
        }
    } catch (error) {
        console.error("Error al cambiar estado:", error);
    }
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