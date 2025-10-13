// src/components/usuario/DetalleOrden.jsx

import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
// CORRECCIÓN 1: Se importa el hook del contexto correcto
import { useOrdenes } from "../../context/OrdenesContext.jsx";
// Importamos los estilos si aún no lo has hecho
import './DetalleOrden.css'; 

const DetalleOrden = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // CORRECCIÓN 2: Obtenemos las órdenes y la función desde OrdenesContext
  const { ordenes, cancelarOrden } = useOrdenes();
  
  // La lógica de búsqueda ahora funciona porque busca en la lista correcta
  const orden = ordenes.find(o => o.id === parseInt(id));

  const handleCancelar = () => {
    cancelarOrden(orden.id);
    alert("Tu orden ha sido cancelada.");
    navigate("/panel");
  };

  if (!orden) {
    return <p className="detalle-no-encontrada">Orden no encontrada o cargando...</p>;
  }

  return (
    <div className="detalle-orden-container">
      <div className="detalle-orden-header">
        <h2 className="detalle-orden-title">Detalle de Orden #{orden.id}</h2>
        <Link to="/panel" className="detalle-boton-volver">Volver al Panel</Link>
      </div>

      <div className="detalle-orden-info">
        <div className="info-item">
          <p>Fecha</p>
          <strong>{orden.fecha}</strong>
        </div>
        <div className="info-item">
          <p>Estado</p>
          <span className={`estado-${(orden.estado || 'pendiente').toLowerCase()}`}>
            {orden.estado}
          </span>
        </div>
        <div className="info-item">
          <p>Total</p>
          <strong>${orden.total}</strong>
        </div>
      </div>

      <h3 className="detalle-productos-header">Mascotas en esta orden</h3>
      <ul className="detalle-productos-lista">
        {(orden.productos || []).map((prod) => (
          <li key={prod.id || prod.name} className="detalle-producto-item">
            <img src={prod.image} alt={prod.name} />
            <div className="producto-info">
              <h4>{prod.name}</h4>
              <p>Cantidad: {prod.quantity}</p>
            </div>
            <span className="producto-precio">${(prod.price || 0).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      {orden.estado === "Pendiente" && (
        <div className="detalle-acciones">
          <button onClick={handleCancelar} className="detalle-boton-cancelar">
            Cancelar Orden
          </button>
        </div>
      )}
    </div>
  );
};

export default DetalleOrden;

