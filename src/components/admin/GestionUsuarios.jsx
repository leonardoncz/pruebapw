import { useState } from "react";
import { Link } from "react-router-dom";
import mockUsuarios from '../../data/usuarios.json';
import './Admin.css'; // <-- NUEVA IMPORTACIÓN

const GestionUsuarios = () => {
  // ... (el resto de tu código no cambia)
  const [usuarios, setUsuarios] = useState(mockUsuarios);
  const [filtro, setFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const ITEMS_POR_PAGINA = 10;

  const usuariosFiltrados = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    u.apellido.toLowerCase().includes(filtro.toLowerCase()) ||
    u.id.toString().includes(filtro)
  );

  const totalPaginas = Math.ceil(usuariosFiltrados.length / ITEMS_POR_PAGINA);
  const usuariosPaginados = usuariosFiltrados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  const toggleActivo = (id) => {
    setUsuarios(usuarios.map(u => u.id === id ? { ...u, activo: !u.activo } : u));
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Gestión de Usuarios</h2>
      <div className="admin-filter-bar">
        <input
          type="text"
          placeholder="Filtrar por ID, nombre o apellido..."
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
            <th>Apellido</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosPaginados.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.email}</td>
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

