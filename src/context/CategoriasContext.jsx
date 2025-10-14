import React, { createContext, useContext, useState, useEffect } from "react";

const CategoriasContext = createContext();
export const useCategorias = () => useContext(CategoriasContext);

const CategoriasProvider = ({ children }) => {
  // 🔹 Estado inicial solo una vez, desde localStorage o valores por defecto
  const [categorias, setCategorias] = useState(() => {
    try {
      const saved = localStorage.getItem("categoriasDB");
      if (saved) return JSON.parse(saved);
      // valores por defecto
      return [
        { id: 1, nombre: "Perros", descripcion: "Productos para perros", imagen: "/img/perros.jpg", productosAsociados: [] },
        { id: 2, nombre: "Gatos", descripcion: "Productos para gatos", imagen: "/img/gatos.jpg", productosAsociados: [] },
        { id: 3, nombre: "Aves", descripcion: "Productos para aves", imagen: "/img/aves.jpg", productosAsociados: [] },
        { id: 4, nombre: "Peces", descripcion: "Productos para peces", imagen: "/img/peces.jpg", productosAsociados: [] },
        { id: 5, nombre: "Roedores", descripcion: "Productos para roedores", imagen: "/img/roedores.jpg", productosAsociados: [] },
        { id: 6, nombre: "Reptiles", descripcion: "Productos para reptiles", imagen: "/img/reptiles.jpg", productosAsociados: [] },
      ];
    } catch (err) {
      console.error("Error al leer categoriasDB:", err);
      return [];
    }
  });

  // 🔹 Guardar automáticamente en localStorage cada vez que cambien las categorías
  useEffect(() => {
    localStorage.setItem("categoriasDB", JSON.stringify(categorias));
  }, [categorias]);

  // 🔹 CRUD
  const agregarCategoria = (nueva) => {
    const categoria = {
      ...nueva,
      id: Date.now(),
      productosAsociados: []
    };
    setCategorias(prev => [...prev, categoria]);
  };

  const eliminarCategoria = (id) => {
    setCategorias(prev => prev.filter(cat => cat.id !== id));
  };

  const editarCategoria = (id, datos) => {
    setCategorias(prev => prev.map(cat => (cat.id === id ? { ...cat, ...datos } : cat)));
  };

  // 🔹 Asociación de productos
  const asociarProductoACategoria = (categoriaId, productoId) => {
    setCategorias(prev =>
      prev.map(cat =>
        cat.id === parseInt(categoriaId)
          ? { ...cat, productosAsociados: [...cat.productosAsociados, productoId] }
          : cat
      )
    );
  };

  const desasociarProductoDeCategoria = (productoId) => {
    setCategorias(prev =>
      prev.map(cat => ({
        ...cat,
        productosAsociados: cat.productosAsociados.filter(id => id !== productoId)
      }))
    );
  };

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
        agregarCategoria,
        eliminarCategoria,
        editarCategoria,
        asociarProductoACategoria,
        desasociarProductoDeCategoria
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasProvider;
