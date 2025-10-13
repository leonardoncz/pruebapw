import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMascotas } from '../context/MascotasContext';
import { useCarrito } from '../context/CarritoContext';
import './DetalleProducto.css';

const DetalleProducto = () => {
    const { id } = useParams();
    const { getMascotaById } = useMascotas();
    const { agregarAlCarrito } = useCarrito();

    // Buscar la mascota por su ID. Se usa parseInt para asegurar que el tipo sea correcto
    const mascota = getMascotaById(id);

    if (!mascota) {
        return (
            <div className="detalle-producto-container">
                <p className="no-encontrado-msg">Mascota no encontrada.</p>
                <Link to="/" className="link-volver">Volver a la página principal</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        agregarAlCarrito(mascota);
        alert(`¡${mascota.name} ha sido añadida al carrito!`);
    };

    return (
        <div className="detalle-producto-container">
            <div className="detalle-producto-card">
                <img src={mascota.image} alt={mascota.name} className="detalle-producto-img" />
                <div className="detalle-producto-info">
                    <h1>{mascota.name}</h1>
                    <p className="detalle-raza-tipo">{mascota.type} • {mascota.breed}</p>
                    <p className="detalle-price">${mascota.price.toFixed(2)}</p>

                    <h3 className="detalle-section-title">Acerca de {mascota.name}</h3>
                    <p className="detalle-description">{mascota.description || 'No hay descripción disponible para esta mascota.'}</p>

                    <button className="btn-add-to-cart" onClick={handleAddToCart}>
                        Añadir al Carrito
                    </button>
                    <Link to="/" className="link-volver">← Volver</Link>
                </div>
            </div>
        </div>
    );
};

export default DetalleProducto;