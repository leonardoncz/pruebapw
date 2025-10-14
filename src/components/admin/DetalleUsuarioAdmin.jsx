// src/components/admin/DetalleUsuarioAdmin.jsx
import { useParams, Link } from "react-router-dom";
import { useUsuarios } from '../../context/UsuariosContext';
// CAMBIO CLAVE 1: Importamos el hook para acceder a la lista de TODAS las órdenes
import { useOrdenes } from '../../context/OrdenesContext';
import './Admin.css';

const DetalleUsuarioAdmin = () => {
  const { id } = useParams();
  const { usuarios } = useUsuarios();
  // CAMBIO CLAVE 2: Obtenemos la lista completa de órdenes
  const { ordenes } = useOrdenes();

  const usuario = usuarios.find(u => u.id === parseInt(id));

  // CAMBIO CLAVE 3: Filtramos la lista de órdenes para encontrar las de este usuario
  const ordenesDelUsuario = ordenes.filter(orden => orden.usuarioId === parseInt(id));

  if (!usuario) {
    return <div className="admin-container"><p>Usuario no encontrado.</p></div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
          <h2 className="admin-title" style={{border: 'none', margin: 0}}>Detalle de Usuario: {usuario.nombre}</h2>
          <Link to="/admin/usuarios" className="btn btn-secondary">← Volver a la lista</Link>
      </div>
      
      <div className="detalle-info-grid">
          <p><strong>ID:</strong> {usuario.id}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>País:</strong> {usuario.pais || 'No especificado'}</p>
          <p><strong>Estado:</strong> {usuario.activo ? 'Activo' : 'Inactivo'}</p>
      </div>

      <h3 style={{marginTop: '2rem'}}>Historial de Órdenes</h3>
      
      {/* CAMBIO CLAVE 4: Usamos nuestra nueva lista filtrada para mostrar los datos */}
      {ordenesDelUsuario.length > 0 ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Orden</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenesDelUsuario.map(orden => (
              <tr key={orden.id}>
                <td>#{orden.id}</td>
                <td>{orden.fecha}</td>
                <td>{orden.estado}</td>
                <td>${orden.total}</td>
                <td>
                  <Link to={`/admin/orden/${orden.id}`} className="link-detalle">
                    Ver Detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Este usuario no tiene órdenes registradas.</p>
      )}
    </div>
  );
};

export default DetalleUsuarioAdmin;
