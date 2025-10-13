// src/components/admin/GestionMascotas.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useMascotas } from '../../context/MascotasContext';
import './Admin.css';

const GestionMascotas = () => {
  const { mascotas, eliminarMascota } = useMascotas();

  const handleEliminar = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${nombre}?`)) {
      eliminarMascota(id);
    }
  };

  return (
    <div className="admin-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="admin-title">Gestión de Mascotas</h2>
        <Link to="/admin/mascotas/agregar" className="btn-agregar">
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
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map(mascota => (
            <tr key={mascota.id}>
              <td><img src={mascota.image} alt={mascota.name} width="50" style={{ borderRadius: '5px' }} /></td>
              <td>{mascota.name}</td>
              <td>{mascota.type}</td>
              <td>{mascota.breed}</td>
              <td>${mascota.price ? mascota.price.toFixed(2) : '0.00'}</td>
              <td className="admin-actions">
                <Link to={`/admin/mascotas/editar/${mascota.id}`} className="btn-accion btn-editar">Modificar</Link>
                <button onClick={() => handleEliminar(mascota.id, mascota.name)} className="btn-accion btn-eliminar">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionMascotas;

