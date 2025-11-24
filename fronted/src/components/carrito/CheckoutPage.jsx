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

  const total = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  const handleChange = (e) => {
    setPago({
      ...pago,
      [e.target.name]: e.target.value
    });
  };

  const handlePagar = (e) => {
    e.preventDefault();

    if (!usuario || items.length === 0) {
      alert("No puedes proceder al pago sin iniciar sesión o sin productos en el carrito.");
      return;
    }

    if (pago.tarjeta.length !== 16) {
      alert("El número de tarjeta debe tener 16 dígitos.");
      return;
    }

    if (!pago.expiracion.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      alert("La fecha debe ser MM/AA.");
      return;
    }

    if (pago.cvv.length !== 3) {
      alert("El CVV debe tener 3 dígitos.");
      return;
    }

    const nuevaOrden = {
      id: Date.now(),
      usuarioId: usuario.id,
      fecha: new Date().toLocaleDateString('es-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      }),
      usuario: { nombre: usuario.nombre, email: usuario.email },
      productos: items,
      estado: "Pendiente",
      total: total.toFixed(2),
      pago // aca se guardan los datos de la tarjeta
  };

  agregarOrden(nuevaOrden);
  limpiarCarrito();
  navigate('/confirmacion');
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

