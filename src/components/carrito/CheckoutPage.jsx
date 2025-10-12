import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarritoContext } from '../../context/CarritoContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  
  // Traemos todo lo que necesitamos de nuestros contextos
  const { items, crearOrden, limpiarCarrito } = useContext(CarritoContext);
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const handlePagar = (e) => {
    e.preventDefault();

    // 1. Verificamos que haya un usuario y productos en el carrito
    if (!usuario || items.length === 0) {
      alert("No puedes proceder al pago sin iniciar sesión o sin productos en el carrito.");
      return;
    }

    // 2. Calculamos el total (usando un precio de ejemplo de $25 por mascota)
    const total = items.reduce((sum, item) => sum + 25 * item.quantity, 0);

    // 3. Creamos la orden, pasando explícitamente los productos del carrito
    crearOrden(usuario.id, total, items);

    // 4. Limpiamos el carrito y redirigimos
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
            {/* Aquí podrías poner una imagen de un código QR */}
          </div>
        )}
        
        <button type="submit" className="pagar-btn">Pagar ahora</button>
      </form>
    </div>
  );
}

