// src/components/admin/GestionProductos.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useMascotas } from '../../context/MascotasContext';
import './Admin.css';

// CORRECCIÓN: Renombrado a GestionProductos para consistencia
const GestionProductos = () => {
  const { mascotas, eliminarMascota } = useMascotas();

  const handleEliminar = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${nombre}?`)) {
      eliminarMascota(id);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2 className="admin-title" style={{border: 'none', margin: 0}}>Gestión de Mascotas</h2>
        <Link to="/admin/mascotas/agregar" className="btn btn-primary">
          + Agregar Mascota
        </Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Raza</th>
            {/* NUEVA COLUMNA */}
            <th>Edad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map(mascota => (
            <tr key={mascota.id}>
              <td><img src={mascota.image} alt={mascota.name} /></td>
              <td>{mascota.name}</td>
              <td>{mascota.type}</td>
              <td>{mascota.breed}</td>
              {/* NUEVA CELDA */}
              <td>{mascota.edad || 'N/A'}</td>
              <td>${mascota.price ? mascota.price.toFixed(2) : '0.00'}</td>
              <td className="admin-actions">
                <Link to={`/admin/mascotas/editar/${mascota.id}`} className="btn btn-secondary">Modificar</Link>
                <button onClick={() => handleEliminar(mascota.id, mascota.name)} className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionProductos;

