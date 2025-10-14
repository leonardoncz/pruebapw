// src/components/carrito/CheckoutPage.jsx
import React, { useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CarritoContext } from '../../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import { useOrdenes } from '../../context/OrdenesContext';

export default function CheckoutPage() {
  const { usuario } = useAuth();
  const { items, limpiarCarrito } = useContext(CarritoContext);
  const { agregarOrden } = useOrdenes();
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  const handlePagar = (e) => {
    e.preventDefault();

    if (!usuario || items.length === 0) {
      alert("No puedes proceder al pago sin iniciar sesión o sin productos en el carrito.");
      return;
    }
    
    const nuevaOrden = {
      id: Date.now(),
      usuarioId: usuario.id,
      fecha: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      usuario: { nombre: usuario.nombre, email: usuario.email },
      productos: items,
      estado: "Pendiente",
      total: total.toFixed(2)
    };
    
    agregarOrden(nuevaOrden);
    limpiarCarrito();
    navigate('/confirmacion');
  };

  if (items.length === 0) {
      navigate("/");
      return null;
  }

  return (
    <div className="form-wrapper">
      <div className="form-container" style={{maxWidth: '600px', textAlign: 'left'}}>
        <h2 className="form-title" style={{textAlign: 'center'}}>Proceso de Pago</h2>
        
        <div className="resumen-checkout">
            <h3>Resumen de tu compra</h3>
            {items.map(item => (
                <div key={item.id} className="resumen-item">
                    <span>{item.name} (x{item.quantity})</span>
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
            ))}
            <hr/>
            <div className="resumen-total">
                <span>Total a pagar</span>
                <strong>${total.toFixed(2)}</strong>
            </div>
        </div>

        <form onSubmit={handlePagar}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input id="nombre" type="text" defaultValue={usuario?.nombre || ''} required className="form-input"/>
          </div>
          <div className="form-group">
            <label htmlFor="direccion">Dirección de envío</label>
            <input id="direccion" type="text" placeholder="Av. Siempre Viva 123" required className="form-input"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" type="email" defaultValue={usuario?.email || ''} readOnly required className="form-input"/>
          </div>
          
          <h3 style={{marginTop: '2rem', marginBottom: '1rem'}}>Método de Pago</h3>
          {/* Aquí iría la lógica de pago con tarjeta, QR, etc. */}
          <p className="form-subtitle">Funcionalidad de pago real por implementar. Al hacer clic se confirmará la orden.</p>
          
          <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '1rem', background: 'var(--color-success)', borderColor: 'var(--color-success)'}}>
            Confirmar y Pagar
          </button>
        </form>
      </div>
    </div>
  );
}

