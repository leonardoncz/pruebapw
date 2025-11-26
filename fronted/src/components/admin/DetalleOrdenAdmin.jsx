import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useOrdenes } from '../../context/OrdenesContext';
import './Admin.css';

const DetalleOrdenAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { ordenes, cancelarOrden } = useOrdenes();
    const [orden, setOrden] = useState(null);

    useEffect(() => {
        // Aseguramos que ordenes sea un array antes de buscar
        if (Array.isArray(ordenes)) {
            const ordenEncontrada = ordenes.find(o => o.id === parseInt(id));
            if (ordenEncontrada) {
                setOrden({
                    ...ordenEncontrada,
                    direccion: "Av. La Mascota Feliz 456, Lima" 
                });
            }
        }
    }, [id, ordenes]);

    const handleCancelar = () => {
        if (window.confirm("¿Seguro que quieres cancelar esta orden?")) {
            cancelarOrden(orden.id);
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
                <p><strong>Cliente:</strong> {orden.usuario?.nombre || 'Desconocido'}</p>
                <p><strong>Fecha:</strong> {orden.fecha}</p>
                <p><strong>Estado:</strong> {orden.estado}</p>
                {/* CORRECCIÓN: Number() */}
                <p><strong>Total:</strong> ${Number(orden.total).toFixed(2)}</p>
            </div>

            <h3 style={{marginTop: '2rem'}}>Mascotas en esta Orden</h3>
            <ul className="detalle-productos-lista">
                {(orden.productos || []).map(mascota => (
                    <li key={mascota.id || Math.random()} className="detalle-producto-item">
                        <img src={mascota.image} alt={mascota.name} style={{width: '50px', height: '50px', borderRadius: 'var(--border-radius)'}} />
                        <div>
                             {/* CORRECCIÓN: Number() */}
                            <strong>{mascota.name}</strong> ({mascota.breed}) - ${mascota.price ? Number(mascota.price).toFixed(2) : '0.00'}
                        </div>
                    </li>
                ))}
            </ul>
            
            {orden.estado === "Pendiente" && (
                <div style={{textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)'}}>
                    <button onClick={handleCancelar} className="btn btn-danger">
                        Cancelar Orden
                    </button>
                </div>
            )}
        </div>
    );
};

export default DetalleOrdenAdmin;