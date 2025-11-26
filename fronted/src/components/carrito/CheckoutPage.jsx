import React, { useContext, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CarritoContext } from '../../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import { useOrdenes } from '../../context/OrdenesContext';

export default function CheckoutPage() {
  const { usuario } = useAuth();
  const { items, limpiarCarrito } = useContext(CarritoContext);
  const { agregarOrden } = useOrdenes();
  const navigate = useNavigate();

  const [pago, setPago] = useState({
    cci: "",
    tarjeta: "",
    nombreTarjeta: "",
    expiracion: "",
    cvv: ""
  });

  const total = items.reduce((sum, item) => sum + Number(item.price || 0) * item.quantity, 0);

  const handleChange = (e) => {
    setPago({
      ...pago,
      [e.target.name]: e.target.value
    });
  };

  const handlePagar = async (e) => {
    e.preventDefault();

    if (!usuario || items.length === 0) {
      alert("No puedes proceder al pago sin iniciar sesión o sin productos en el carrito.");
      return;
    }

    // Validaciones de tarjeta... (Mantenlas igual)
    if (pago.tarjeta.length !== 16) return alert("Tarjeta inválida");
    if (pago.cvv.length !== 3) return alert("CVV inválido");

    // --- CORRECCIÓN AQUÍ ---
    const nuevaOrden = {
      // 1. NO enviamos 'id'. Dejamos que PostgreSQL lo cree (1, 2, 3...)
      // 2. NO enviamos el objeto 'usuario'. Solo el ID.
      usuarioId: usuario.id, 
      fecha: new Date().toLocaleDateString('es-ES'),
      productos: items, // Array de productos
      estado: "Pendiente",
      total: total.toFixed(2), // Precio como string o numero
      pago: { 
          tarjeta: `****-${pago.tarjeta.slice(-4)}`, // Solo últimos 4 dígitos
          titular: pago.nombreTarjeta
      } 
    };

    console.log("Enviando orden:", nuevaOrden); // Para depurar en consola

    const exito = await agregarOrden(nuevaOrden); // agregarOrden devuelve true/false
    
    if (exito) {
        limpiarCarrito();
        navigate('/confirmacion');
    } else {
        alert("Hubo un error al procesar tu compra. Intenta nuevamente.");
    }
  };

  if (items.length === 0) {
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

          <div className="form-group">
            <label>Número de tarjeta</label>
            <input
              type="text"
              name="tarjeta"
              maxLength="16"
              pattern="\d{16}"
              placeholder="1234567890123456"
              required
              className="form-input"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Nombre en la tarjeta</label>
            <input
              type="text"
              name="nombreTarjeta"
              placeholder="Como aparece en la tarjeta"
              required
              className="form-input"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Fecha de expiración (MM/AA)</label>
            <input
              type="text"
              name="expiracion"
              maxLength="5"
              placeholder="MM/AA"
              required
              className="form-input"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>CVV</label>
            <input
              type="password"
              name="cvv"
              maxLength="3"
              pattern="\d{3}"
              placeholder="123"
              required
              className="form-input"
              onChange={handleChange}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '1rem', background: 'var(--color-success)', borderColor: 'var(--color-success)'}}>
            Confirmar y Pagar
          </button>
        </form>
      </div>
    </div>
  );
  
}

