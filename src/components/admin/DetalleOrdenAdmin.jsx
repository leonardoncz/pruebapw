import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// CORRECCIÓN 1: Se importa el hook del contexto en lugar del archivo JSON.
import { useOrdenes } from '../../context/OrdenesContext';
import './Admin.css';

const DetalleOrdenAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // CORRECCIÓN 2: Se obtiene la lista completa de órdenes desde el contexto.
    const { ordenes } = useOrdenes();
    const [orden, setOrden] = useState(null);

    useEffect(() => {
        // CORRECCIÓN 3: Se busca la orden específica dentro de la lista del contexto.
        const ordenEncontrada = ordenes.find(o => o.id === parseInt(id));
        if (ordenEncontrada) {
            setOrden({
                ...ordenEncontrada,
                direccion: "Av. La Mascota Feliz 456, Lima" // Simulación de dato extra
            });
        }
    }, [id, ordenes]); // Se añade 'ordenes' a las dependencias

    const handleCancelar = () => {
        // En el futuro, aquí llamarías a una función del contexto como 'cancelarOrden(id)'
        if (window.confirm("¿Seguro que quieres cancelar esta orden?")) {
            alert("Orden cancelada (simulado).");
            navigate("/admin/ordenes");
        }
    };

    if (!orden) {
        return <p>Cargando orden...</p>;
    }

    return (
        <div className="admin-container admin-detalle">
            <h2 className="detalle-title">Detalle de Orden #{orden.id}</h2>
            <p><strong>Cliente:</strong> {orden.usuario.nombre}</p>
            <p><strong>Fecha:</strong> {orden.fecha}</p>
            <p><strong>Estado:</strong> {orden.estado}</p>
            <p><strong>Dirección de envío:</strong> {orden.direccion}</p>
            <p><strong>Total:</strong> ${orden.total}</p>

            <h3 className="detalle-subtitle">Mascotas en esta Orden</h3>
            <ul className="detalle-productos-lista">
              {(orden.productos || []).map(mascota => (
                <li key={mascota.id || mascota.name}>
                  <strong>{mascota.name}</strong> ({mascota.breed}) - ${mascota.price ? mascota.price.toFixed(2) : '0.00'}
                </li>
              ))}
            </ul>
            
            {orden.estado !== "Cancelada" && orden.estado !== "Completada" && (
                 <button onClick={handleCancelar} className="detalle-btn">
                    Cancelar Orden
                </button>
            )}
            
            <div className="admin-back-link-container">
                <Link to="/admin/ordenes" className="admin-link-back">
                    ← Volver al listado
                </Link>
            </div>
        </div>
    );
};

export default DetalleOrdenAdmin;
