import React from 'react';
import { Link } from 'react-router-dom';

export default function ConfirmacionPage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>¡Gracias por tu compra!</h1>
      <p>Tu pedido ha sido procesado exitosamente.</p>
      <Link to="/" style={{ fontSize: '1.2rem', color: '#007bff' }}>
        Volver a la página de inicio
      </Link>
    </div>
  );
}


