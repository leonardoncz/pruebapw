// src/components/admin/DetalleOrdenAdmin.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// CAMBIO CLAVE 1: Obtenemos 'cancelarOrden' junto con 'ordenes' del contexto.
import { useOrdenes } from '../../context/OrdenesContext';
import './Admin.css';

const DetalleOrdenAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // CAMBIO CLAVE 2: Desestructuramos para obtener la función que necesitamos.
    const { ordenes, cancelarOrden } = useOrdenes();
    const [orden, setOrden] = useState(null);

    useEffect(() => {
        const ordenEncontrada = ordenes.find(o => o.id === parseInt(id));
        if (ordenEncontrada) {
            setOrden({
                ...ordenEncontrada,
                direccion: "Av. La Mascota Feliz 456, Lima" // Simulación de dato extra
            });
        }
    }, [id, ordenes]);

    const handleCancelar = () => {
        if (window.confirm("¿Seguro que quieres cancelar esta orden?")) {
            // CAMBIO CLAVE 3: Llamamos a la función real del contexto.
            cancelarOrden(orden.id);
            // Ya no es necesario el alert, la navegación se encarga del resto.
            navigate("/admin/ordenes");
        }
    };

    if (!orden) {
        return <div className="admin-container"><p>Cargando orden...</p></div>;
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2 className="admin-title" style={{border: 'none', margin: 0}}>Detalle de Orden #{orden.id}</h2>
                <Link to="/admin/ordenes" className="btn btn-secondary">← Volver al listado</Link>
            </div>

            <div className="detalle-info-grid">
                <p><strong>Cliente:</strong> {orden.usuario.nombre}</p>
                <p><strong>Fecha:</strong> {orden.fecha}</p>
                <p><strong>Estado:</strong> {orden.estado}</p>
                <p><strong>Total:</strong> ${orden.total}</p>
            </div>

            <h3 style={{marginTop: '2rem'}}>Mascotas en esta Orden</h3>
            <ul className="detalle-productos-lista">
                {(orden.productos || []).map(mascota => (
                    <li key={mascota.id || mascota.name} className="detalle-producto-item">
                        <img src={mascota.image} alt={mascota.name} style={{width: '50px', height: '50px', borderRadius: 'var(--border-radius)'}} />
                        <div>
                            <strong>{mascota.name}</strong> ({mascota.breed}) - ${mascota.price ? mascota.price.toFixed(2) : '0.00'}
                        </div>
                    </li>
                ))}
            </ul>
            
            {orden.estado === "Pendiente" && (
                <div style={{textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)'}}>
                    {/* CAMBIO DE ESTILO: Usamos las clases de botón globales */}
                    <button onClick={handleCancelar} className="btn btn-danger">
                        Cancelar Orden
                    </button>
                </div>
            )}
        </div>
    );
};

export default DetalleOrdenAdmin;

