import { useParams, Link } from "react-router-dom";
// CORRECCIÓN 1: Se importa el hook del contexto de usuarios.
import { useUsuarios } from '../../context/UsuariosContext'; 
import './Admin.css';

const DetalleUsuarioAdmin = () => {
  const { id } = useParams();
  // CORRECCIÓN 2: Se obtiene la lista completa de usuarios desde el contexto.
  const { usuarios } = useUsuarios();

  // CORRECCIÓN 3: Se busca el usuario por ID en la lista del contexto.
  const usuario = usuarios.find(u => u.id === parseInt(id));

  if (!usuario) {
    return <div className="admin-container"><p>Usuario no encontrado.</p></div>;
  }

  return (
    <div className="admin-container admin-detalle">
        {/* CORRECCIÓN 4: Se elimina la referencia al campo 'apellido' que ya no existe. */}
        <h2 className="detalle-title">Detalle de Usuario: {usuario.nombre}</h2>
        <p><strong>ID:</strong> {usuario.id}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>País:</strong> {usuario.pais || 'No especificado'}</p>
        <p><strong>Estado:</strong> {usuario.activo ? 'Activo' : 'Inactivo'}</p>

        <h3 className="detalle-subtitle">Órdenes Recientes (simulado)</h3>
        {/* La lógica de órdenes se mantiene, asumiendo que el objeto de usuario podría tenerla */}
        {usuario.ordenes && usuario.ordenes.length > 0 ? (
            <ul className="detalle-productos">
                {usuario.ordenes.slice(0, 10).map(orden => (
                    <li key={orden.id} className="detalle-producto">
                        Orden #{orden.id} - Fecha: {orden.fecha} - Total: ${orden.total.toFixed(2)}
                    </li>
                ))}
            </ul>
        ) : (
            <p>Este usuario no tiene órdenes registradas.</p>
        )}
        <div className="admin-back-link-container">
          <Link to="/admin/usuarios" className="admin-link-back">← Volver a la lista</Link>
        </div>
    </div>
  );
};

export default DetalleUsuarioAdmin;

