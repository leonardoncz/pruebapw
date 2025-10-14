// src/components/admin/GestionCategorias.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCategorias } from "../../context/CategoriasContext";
import './Admin.css';

const GestionCategorias = () => {
  const { categorias, eliminarCategoria } = useCategorias();

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2 className="admin-title" style={{ border: 'none', margin: 0 }}>Gestión de Categorías</h2>
        <Link to="/admin/categorias/agregar" className="btn btn-primary">+ Agregar Categoría</Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Productos asociados</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(cat => (
            <tr key={cat.id}>
              <td>
                <img src={cat.imagen} alt={cat.nombre} style={{ width: 60, height: 60, borderRadius: '8px' }} />
              </td>
              <td>{cat.nombre}</td>
              <td>{cat.descripcion}</td>
              <td>{cat.productosAsociados?.length || 0}</td>
              <td className="admin-actions">
                <Link to={`/admin/categorias/editar/${cat.id}`} className="btn btn-secondary">Editar</Link>
                <button 
                  onClick={() => {
                    if(window.confirm(`¿Seguro que deseas eliminar la categoría "${cat.nombre}"?`)) {
                      eliminarCategoria(cat.id);
                    }
                  }} 
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionCategorias;
