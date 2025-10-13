import React, { useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CarritoContext } from "../../context/CarritoContext.jsx";

const DetalleOrden = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Obtenemos las órdenes y la función para cancelar desde el contexto
  const { ordenes, cancelarOrden } = useContext(CarritoContext);
  
  // Buscamos la orden específica en nuestra lista de órdenes reales
  // Convertimos el 'id' de la URL a número para que la comparación funcione
  const orden = ordenes.find(o => o.id === parseInt(id));

  const handleCancelar = () => {
    // Ya no usamos window.confirm ni alert
    cancelarOrden(orden.id);
    navigate("/panel"); // Redirigimos al panel después de cancelar
  };

  // Si la orden aún se está cargando o no se encuentra
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
          <span className={orden.estado === "Enviado" || orden.estado === "Cancelada" ? `estado-${orden.estado.toLowerCase()}` : "estado-pendiente"}>
            {orden.estado}
          </span>
        </div>
        <div className="info-item">
          <p>Total</p>
          <strong>${orden.total}</strong>
        </div>
      </div>

      <h3 className="detalle-productos-header">Productos en esta orden</h3>
      <ul className="detalle-productos-lista">
        {orden.productos.map((prod) => (
          <li key={prod.id} className="detalle-producto-item">
            <img src={prod.image} alt={prod.name} />
            <div className="producto-info">
              <h4>{prod.name}</h4>
              <p>Cantidad: {prod.quantity}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Solo mostramos el botón si la orden no está ya cancelada o enviada */}
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

