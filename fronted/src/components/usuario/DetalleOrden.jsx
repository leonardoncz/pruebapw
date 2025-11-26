import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useOrdenes } from "../../context/OrdenesContext"; // Quita .jsx si no hace falta
import './PanelUsuario.css'; 

const DetalleOrden = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { ordenes, cancelarOrden } = useOrdenes();
    
    // Aseguramos que ordenes exista y buscamos comparando IDs como números
    const orden = (ordenes || []).find(o => parseInt(o.id) === parseInt(id));

    const handleCancelar = () => {
        if (window.confirm("¿Estás seguro de que quieres cancelar esta orden?")) {
            cancelarOrden(orden.id);
            alert("Tu orden ha sido cancelada.");
            navigate("/panel");
        }
    };

    if (!orden) {
        return (
            <div className="page-container">
                <p>Cargando orden... si no aparece, verifica que exista.</p>
                <Link to="/panel" className="btn btn-secondary">Volver</Link>
            </div>
        );
    }
  
    const getStatusClassName = (estado) => {
        switch (estado?.toLowerCase()) {
            case "enviado": return "status-enviado";
            case "cancelada": return "status-cancelada";
            case "pendiente": default: return "status-pendiente";
        }
    };

    // Parseamos los productos si vienen como string JSON (casos raros en SQLite/Postgres)
    // Normalmente Sequelize lo entrega ya como objeto, pero es bueno prevenir.
    let productosLista = orden.productos;
    if (typeof productosLista === 'string') {
        try { productosLista = JSON.parse(productosLista); } catch(e) {}
    }
    if (!Array.isArray(productosLista)) productosLista = [];

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
                        {/* CORRECCIÓN: Number() */}
                        <strong>${Number(orden.total).toFixed(2)}</strong>
                    </div>
                </div>

                <h3>Mascotas en esta orden</h3>
                <ul className="detalle-productos-lista">
                    {productosLista.map((prod, index) => (
                        <li key={prod.id || index} className="detalle-producto-item">
                            <img src={prod.image || "https://via.placeholder.com/50"} alt={prod.name} />
                            <div className="producto-info">
                                <h4>{prod.name}</h4>
                                <p>Cantidad: {prod.quantity}</p>
                            </div>
                            {/* CORRECCIÓN: Number() */}
                            <span className="producto-precio">${Number(prod.price || 0).toFixed(2)}</span>
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