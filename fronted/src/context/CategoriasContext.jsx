import React, { createContext, useContext, useState, useEffect } from "react";

const CategoriasContext = createContext();
export const useCategorias = () => useContext(CategoriasContext);

const CategoriasProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);

  // Cargar desde Backend
  useEffect(() => {
    fetch('http://localhost:3000/api/categories')
        .then(res => res.json())
        .then(data => {
            if(Array.isArray(data)) setCategorias(data);
            else setCategorias([]);
        })
        .catch(err => console.error(err));
  }, []);

  // CRUD con Backend
  const agregarCategoria = async (nueva) => {
    try {
        const res = await fetch('http://localhost:3000/api/categories', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(nueva)
        });
        const data = await res.json();
        setCategorias(prev => [...prev, data]);
    } catch (error) { console.error(error); }
  };

  const eliminarCategoria = async (id) => {
    try {
        await fetch(`http://localhost:3000/api/categories/${id}`, { method: 'DELETE' });
        setCategorias(prev => prev.filter(cat => cat.id !== id));
    } catch (error) { console.error(error); }
  };

  const editarCategoria = async (id, datos) => {
     try {
        const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datos)
        });
        const data = await res.json();
        setCategorias(prev => prev.map(cat => (cat.id === id ? data : cat)));
     } catch (error) { console.error(error); }
  };
  
  const getCategoriaById = (id) => {
      return categorias.find(c => c.id === id);
  }

  // Nota: asociar/desasociar producto se maneja al editar el Producto (cambiando su categoriaId),
  // no necesitamos funciones especiales aquí por ahora.
  const asociarProductoACategoria = () => {}; 
  const desasociarProductoDeCategoria = () => {};

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
        agregarCategoria,
        eliminarCategoria,
        editarCategoria,
        getCategoriaById,
        asociarProductoACategoria,
        desasociarProductoDeCategoria
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasProvider;