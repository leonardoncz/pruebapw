import React, { useState, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CarritoContext } from '../../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import { useOrdenes } from '../../context/OrdenesContext';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const { usuario } = useAuth();
  const { items, limpiarCarrito } = useContext(CarritoContext);
  const { agregarOrden } = useOrdenes();
  const navigate = useNavigate();
  const [metodoPago, setMetodoPago] = useState('tarjeta');

  const handlePagar = (e) => {
    e.preventDefault();

    if (!usuario || items.length === 0) {
      alert("No puedes proceder al pago sin iniciar sesión o sin productos en el carrito.");
      return;
    }
    
    const total = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    
    const nuevaOrden = {
      id: Date.now(),
      // CORRECCIÓN CLAVE: Se añade el ID del usuario a la orden
      usuarioId: usuario.id,
      fecha: new Date().toLocaleDateString('es-PE'),
      usuario: { nombre: usuario.nombre },
      productos: items,
      estado: "Pendiente",
      total: total.toFixed(2)
    };
    
    agregarOrden(nuevaOrden);

    limpiarCarrito();
    navigate('/confirmacion');
  };

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handlePagar}>
        <h2>Formulario de Envío</h2>
        <input type="text" placeholder="Nombre completo" required />
        <input type="text" placeholder="Dirección de envío" required />
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          defaultValue={usuario?.email || ''} 
          required 
        />
        
        <h2>Método de Pago</h2>
        <div className="pago-tabs">
          <button 
            type="button" 
            onClick={() => setMetodoPago('tarjeta')} 
            className={metodoPago === 'tarjeta' ? 'activo' : ''}
          >
            Tarjeta
          </button>
          <button 
            type="button" 
            onClick={() => setMetodoPago('qr')} 
            className={metodoPago === 'qr' ? 'activo' : ''}
          >
            QR
          </button>
        </div>

        {metodoPago === 'tarjeta' && (
          <div className="pago-detalles">
            <input type="text" placeholder="Número de tarjeta" required />
            <input type="text" placeholder="MM/AA" required />
            <input type="text" placeholder="CVC" required />
          </div>
        )}

        {metodoPago === 'qr' && (
          <div className="pago-detalles qr-code">
            <p>Escanea este código para pagar.</p>
          </div>
        )}
        
        <button type="submit" className="pagar-btn">Pagar ahora</button>
      </form>
    </div>
  );
}
