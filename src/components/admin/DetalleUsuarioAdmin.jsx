import { useParams, Link } from "react-router-dom";
import { mockUsuarios } from '../../data/usuarios.json';

const DetalleUsuarioAdmin = () => {
  const { id } = useParams();
  const usuario = mockUsuarios.find(u => u.id === parseInt(id));

  if (!usuario) {
    return <div className="admin-container"><p>Usuario no encontrado.</p></div>;
  }

  return (
    <div className="detalle-container admin-detalle">
        <h2 className="detalle-title">Detalle de Usuario: {usuario.nombre} {usuario.apellido}</h2>
        <p><strong>ID:</strong> {usuario.id}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Estado:</strong> {usuario.activo ? 'Activo' : 'Inactivo'}</p>

        <h3 className="detalle-subtitle">Órdenes Recientes (máx. 10)</h3>
        {usuario.ordenes && usuario.ordenes.length > 0 ? (
            <ul className="detalle-productos">
                {usuario.ordenes.slice(0, 10).map(orden => (
                    <li key={orden.id} className="detalle-producto">
                        Orden #{orden.id} - Fecha: {orden.fecha} - Total: ${orden.total.toFixed(2)}
                    </li>
                ))}
            </ul>
        ) : (
            <p>Este usuario no tiene órdenes.</p>
        )}
        <Link to="/admin/usuarios" className="admin-link-back">Volver a la lista</Link>
    </div>
  );
};

export default DetalleUsuarioAdmin;

