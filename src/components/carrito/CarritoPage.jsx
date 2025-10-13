import React from "react";
// CORRECCIÓN 1: Se importa el hook personalizado 'useCarrito'
import { useCarrito } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import "./CarritoPage.css";

export default function CarritoPage() {
  // CORRECCIÓN 2: Se usa el hook 'useCarrito()' para obtener las funciones
  const { items, modificarCantidad, eliminarDelCarrito, moverAGuardados } = useCarrito();

  const total = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <div className="carrito-container">
      <h1>Tu Carrito de Compras</h1>
      <div className="carrito-layout">
        <div className="carrito-items-lista">
          {items.length === 0 ? (
            <div className="carrito-vacio">
              <p>No tienes mascotas en tu carrito.</p>
              <Link to="/" className="checkout-link">¡Encuentra a tu amigo ideal!</Link>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="carrito-item-card">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Raza: {item.breed}</p>
                  <p className="item-precio-unitario">${(item.price || 0).toFixed(2)}</p>
                  <div className="item-acciones">
                    {/* Ahora estas funciones existirán y el error desaparecerá */}
                    <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
                    <button onClick={() => moverAGuardados(item.id)}>Guardar para después</button>
                  </div>
                </div>
                <div className="item-cantidad-total">
                  <div className="item-cantidad">
                    <button onClick={() => modificarCantidad(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => modificarCantidad(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <p className="item-subtotal">
                    <strong>${((item.price || 0) * item.quantity).toFixed(2)}</strong>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className="carrito-resumen">
            <h2>Resumen del Pedido</h2>
            <div className="resumen-linea">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="resumen-linea">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <div className="resumen-total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <Link to="/checkout" className="checkout-link">Proceder al Pago</Link>
          </div>
        )}
      </div>
    </div>
  );
}

