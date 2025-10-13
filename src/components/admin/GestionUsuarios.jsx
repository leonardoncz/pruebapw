import { useState } from "react";
import { Link } from "react-router-dom";
import { useUsuarios } from '../../context/UsuariosContext';
import './Admin.css';

const GestionUsuarios = () => {
  const { usuarios, toggleActivo } = useUsuarios();

  const [filtro, setFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const ITEMS_POR_PAGINA = 10;

  // CORRECCIÓN: Se filtra por 'pais' en lugar de 'apellido'
  const usuariosFiltrados = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    (u.pais || '').toLowerCase().includes(filtro.toLowerCase()) || // Se usa (u.pais || '') por seguridad
    u.email.toLowerCase().includes(filtro.toLowerCase()) ||
    u.id.toString().includes(filtro)
  );

  const totalPaginas = Math.ceil(usuariosFiltrados.length / ITEMS_POR_PAGINA);
  const usuariosPaginados = usuariosFiltrados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  return (
    <div className="admin-container">
      <h2 className="admin-title">Gestión de Usuarios</h2>
      <div className="admin-filter-bar">
        <input
          type="text"
          // CORRECCIÓN: El placeholder ahora incluye 'país'
          placeholder="Filtrar por ID, nombre, email o país..."
          value={filtro}
          onChange={(e) => { setFiltro(e.target.value); setPaginaActual(1); }}
          className="admin-filter-input"
        />
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            {/* CORRECCIÓN: La columna ahora es 'País' */}
            <th>País</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosPaginados.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              {/* CORRECCIÓN: Se muestra el campo 'pais' */}
              <td>{usuario.pais}</td>
              <td>{usuario.activo ? "Activo" : "Inactivo"}</td>
              <td className="admin-actions">
                <button onClick={() => toggleActivo(usuario.id)} className={`admin-btn-toggle ${usuario.activo ? 'active' : 'inactive'}`}>
                  {usuario.activo ? "Desactivar" : "Activar"}
                </button>
                <Link to={`/admin/usuario/${usuario.id}`} className="admin-link">Ver detalle</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button onClick={() => setPaginaActual(p => Math.max(p - 1, 1))} disabled={paginaActual === 1}>Anterior</button>
        <span className="pagination-span">Página {paginaActual} de {totalPaginas}</span>
        <button onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))} disabled={paginaActual === totalPaginas}>Siguiente</button>
      </div>
    </div>
  );
};

export default GestionUsuarios;

