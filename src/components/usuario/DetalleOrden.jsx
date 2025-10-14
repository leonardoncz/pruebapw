// src/components/usuario/DetalleOrden.jsx
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useOrdenes } from "../../context/OrdenesContext.jsx";
import './PanelUsuario.css'; // Reutilizamos los estilos del panel

const DetalleOrden = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ordenes, cancelarOrden } = useOrdenes();
  const orden = ordenes.find(o => o.id === parseInt(id));

  const handleCancelar = () => {
    if (window.confirm("¿Estás seguro de que quieres cancelar esta orden?")) {
      cancelarOrden(orden.id);
      alert("Tu orden ha sido cancelada.");
      navigate("/panel");
    }
  };

  if (!orden) {
    return <div className="page-container"><p>Orden no encontrada o cargando...</p></div>;
  }
  
  const getStatusClassName = (estado) => {
    switch (estado?.toLowerCase()) {
      case "enviado":
        return "status-enviado";
      case "cancelada":
        return "status-cancelada";
      case "pendiente":
      default:
        return "status-pendiente";
    }
  };

  return (
    <div className="page-container">
        <div className="detalle-orden-container">
            <div className="detalle-orden-header">
                <h2 className="detalle-orden-title">Detalle de Orden #{orden.id}</h2>
                <Link to="/panel" className="btn btn-secondary">Volver al Panel</Link>
            </div>

            <div className="detalle-orden-info">
                <div className="detalle-info-item">
                    <p>Fecha</p>
                    <strong>{orden.fecha}</strong>
                </div>
                <div className="detalle-info-item">
                    <p>Estado</p>
                    <span className={`status-badge ${getStatusClassName(orden.estado)}`}>
                        {orden.estado}
                    </span>
                </div>
                <div className="detalle-info-item">
                    <p>Total</p>
                    <strong>${orden.total}</strong>
                </div>
            </div>

            <h3>Mascotas en esta orden</h3>
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
                <button onClick={handleCancelar} className="btn btn-danger">
                    Cancelar Orden
                </button>
                </div>
            )}
        </div>
    </div>
  );
};

export default DetalleOrden;

