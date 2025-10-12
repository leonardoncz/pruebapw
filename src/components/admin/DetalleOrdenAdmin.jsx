import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import mockOrdenesAdmin from '../../data/ordenes.json';
import './Admin.css';

const DetalleOrdenAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [orden, setOrden] = useState(null);

    useEffect(() => {
        const ordenEncontrada = mockOrdenesAdmin.find(o => o.id === parseInt(id));
        if (ordenEncontrada) {
            setOrden({
                ...ordenEncontrada,
                direccion: "Av. La Mascota Feliz 456, Lima"
            });
        }
    }, [id]);

    const handleCancelar = () => {
        if (window.confirm("¿Seguro que quieres cancelar esta orden?")) {
            alert("Orden cancelada (simulado).");
            navigate("/admin/ordenes");
        }
    };

    if (!orden) return <p>Cargando orden...</p>;

    return (
        <div className="admin-container admin-detalle">
            <h2 className="detalle-title">Detalle de Orden #{orden.id}</h2>
            <p><strong>Cliente:</strong> {orden.usuario.nombre} {orden.usuario.apellido}</p>
            <p><strong>Fecha:</strong> {orden.fecha}</p>
            <p><strong>Estado:</strong> {orden.estado}</p>
            <p><strong>Dirección de envío:</strong> {orden.direccion}</p>
            <p><strong>Total:</strong> ${orden.total}</p>

            <h3 className="detalle-subtitle">Detalles de la Mascota</h3>
            {/* Lógica de renderizado simplificada */}
            <div className="detalle-mascota-info">
                <p><strong>Nombre:</strong> {orden.producto.name}</p>
                <p><strong>Tipo:</strong> {orden.producto.type}</p>
                <p><strong>Raza:</strong> {orden.producto.breed}</p>
            </div>
            
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

