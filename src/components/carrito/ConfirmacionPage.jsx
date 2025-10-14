// src/components/carrito/ConfirmacionPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ConfirmacionPage.css'; // Importamos el CSS

export default function ConfirmacionPage() {
  return (
    <div className="page-container centered-container">
      <div className="confirmacion-box">
        <div className="confirmacion-icon">✓</div>
        <h1>¡Gracias por tu compra!</h1>
        <p>Tu orden ha sido procesada exitosamente. Recibirás una confirmación por correo.</p>
        <Link to="/" className="btn btn-primary">
          Volver a la página de inicio
        </Link>
      </div>
    </div>
  );
}