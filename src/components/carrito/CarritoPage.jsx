// src/components/carrito/CarritoPage.jsx
import React from "react";
import { useCarrito } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import "./CarritoPage.css";

export default function CarritoPage() {
  const { items, modificarCantidad, eliminarDelCarrito } = useCarrito();

  const total = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <div className="page-container">
      <h1>Tu Carrito</h1>
      
      {items.length === 0 ? (
        <div className="carrito-vacio">
          <p>No tienes mascotas en tu carrito.</p>
          <Link to="/" className="btn btn-primary">¡Encuentra a tu amigo ideal!</Link>
        </div>
      ) : (
        <div className="carrito-layout">
          <div className="carrito-items-lista">
            {items.map(item => (
              <div key={item.id} className="carrito-item-card">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Raza: {item.breed}</p>
                  <p className="item-precio-unitario">${(item.price || 0).toFixed(2)}</p>
                  <div className="item-acciones">
                    <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
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
            ))}
          </div>
          
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
            <hr />
            <div className="resumen-total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <Link to="/checkout" className="btn btn-primary" style={{width: '100%', marginTop: '1.5rem'}}>Proceder al Pago</Link>
          </div>
        </div>
      )}
    </div>
  );
}

