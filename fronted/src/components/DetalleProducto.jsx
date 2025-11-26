import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMascotas } from '../context/MascotasContext'; // Ajusta la ruta si es necesario
import { useCarrito } from '../context/CarritoContext';
import './DetalleProducto.css'; // Usamos estilos genéricos o crea DetalleProducto.css

const DetalleProducto = () => {
    const { id } = useParams();
    const { getMascotaById } = useMascotas();
    const { agregarAlCarrito } = useCarrito();

    // Convertimos el id de la URL a número para buscar
    const mascota = getMascotaById(parseInt(id));

    if (!mascota) {
        return (
            <div className="page-container" style={{textAlign: 'center', marginTop: '50px'}}>
                <p>Cargando mascota o no encontrada...</p>
                <Link to="/" className="btn btn-primary">Volver al inicio</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        agregarAlCarrito(mascota);
        alert(`¡${mascota.name} ha sido añadida al carrito!`);
    };

    return (
        <div className="page-container">
            <div className="detalle-producto-card" style={{display: 'flex', gap: '2rem', maxWidth: '800px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
                <img 
                    src={mascota.image || "https://via.placeholder.com/400"} 
                    alt={mascota.name} 
                    style={{width: '300px', height: '300px', objectFit: 'cover', borderRadius: '12px'}} 
                />
                <div className="detalle-producto-info" style={{flex: 1}}>
                    <h1 style={{color: 'var(--color-primary)', marginBottom: '0.5rem'}}>{mascota.name}</h1>
                    <p style={{color: '#666', fontSize: '1.1rem', marginBottom: '1rem'}}>
                        {mascota.type} • {mascota.breed} • {mascota.edad}
                    </p>
                    
                    {/* CORRECCIÓN CRÍTICA AQUÍ: Number() */}
                    <p style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: '1.5rem'}}>
                        ${Number(mascota.price).toFixed(2)}
                    </p>

                    <h3 style={{marginBottom: '0.5rem'}}>Acerca de {mascota.name}</h3>
                    <p style={{lineHeight: '1.6', marginBottom: '2rem'}}>
                        {mascota.description || 'No hay descripción disponible para esta mascota.'}
                    </p>

                    <div style={{display: 'flex', gap: '1rem'}}>
                        <button className="btn btn-primary" onClick={handleAddToCart}>
                            Añadir al Carrito
                        </button>
                        <Link to="/" className="btn btn-secondary">← Volver</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleProducto;