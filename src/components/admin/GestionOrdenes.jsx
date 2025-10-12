import { useState } from "react";
import { Link } from "react-router-dom";
import mockOrdenesAdmin from '../../data/ordenes.json';
import './Admin.css'; // <-- NUEVA IMPORTACIÓN

const GestionOrdenes = () => {
  // ... (el resto de tu código no cambia)
  const [ordenes] = useState(mockOrdenesAdmin);
  const [filtro, setFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const ITEMS_POR_PAGINA = 10;

  const ordenesFiltradas = ordenes.filter(o =>
    o.usuario.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    o.usuario.apellido.toLowerCase().includes(filtro.toLowerCase()) ||
    o.id.toString().includes(filtro)
  );

  const totalPaginas = Math.ceil(ordenesFiltradas.length / ITEMS_POR_PAGINA);
  const ordenesPaginadas = ordenesFiltradas.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  return (
    <div className="admin-container">
      <h2 className="admin-title">Gestión de Órdenes</h2>
       <div className="admin-filter-bar">
        <input
          type="text"
          placeholder="Filtrar por ID de orden o nombre/apellido de cliente..."
          value={filtro}
          onChange={(e) => { setFiltro(e.target.value); setPaginaActual(1); }}
          className="admin-filter-input"
        />
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID Orden</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenesPaginadas.map((orden) => (
            <tr key={orden.id}>
              <td>{orden.id}</td>
              <td>{orden.fecha}</td>
              <td>{`${orden.usuario.nombre} ${orden.usuario.apellido}`}</td>
              <td>{orden.estado}</td>
              <td>${orden.total}</td>
              <td>
                <Link to={`/admin/orden/${orden.id}`} className="admin-link">Ver detalle</Link>
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

export default GestionOrdenes;

