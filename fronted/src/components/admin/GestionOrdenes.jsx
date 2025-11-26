import { useState } from "react";
import { Link } from "react-router-dom";
import { useOrdenes } from '../../context/OrdenesContext';
import './Admin.css';

const GestionOrdenes = () => {
  // Validación: Si ordenes falla, usamos array vacío []
  const { ordenes = [] } = useOrdenes(); 
  const [filtro, setFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const ITEMS_POR_PAGINA = 10;

  // Función segura para obtener productos (ya sea array o JSON string)
  const getProductosSeguros = (orden) => {
    if (Array.isArray(orden.productos)) return orden.productos;
    if (typeof orden.productos === 'string') {
        try { return JSON.parse(orden.productos); } catch(e) { return []; }
    }
    return [];
  };

  const ordenesFiltradas = ordenes.filter(o => {
    const productos = getProductosSeguros(o);
    const mascotasTexto = productos.map(p => `${p.name} ${p.breed}`).join(' ');
    const nombreCliente = o.usuario?.nombre || 'Cliente Desconocido';

    return (
      nombreCliente.toLowerCase().includes(filtro.toLowerCase()) ||
      mascotasTexto.toLowerCase().includes(filtro.toLowerCase()) ||
      o.id.toString().includes(filtro)
    );
  });

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
          placeholder="Filtrar por ID, cliente o mascota..."
          value={filtro}
          onChange={(e) => { setFiltro(e.target.value); setPaginaActual(1); }}
          className="admin-filter-input"
        />
      </div>
      
      {/* Tabla */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID Orden</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Mascotas</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenesPaginadas.length > 0 ? (
            ordenesPaginadas.map((orden) => {
                const productos = getProductosSeguros(orden);
                return (
                    <tr key={orden.id}>
                      <td>{orden.id}</td>
                      <td>{orden.fecha}</td>
                      <td>{orden.usuario?.nombre || 'Desconocido'}</td>
                      <td>
                        {productos.slice(0, 2).map(p => p.name).join(', ')}
                        {productos.length > 2 ? '...' : ''}
                      </td>
                      <td>{orden.estado}</td>
                      
                      {/* CORRECCIÓN: Number() antes de toFixed */}
                      <td>${Number(orden.total).toFixed(2)}</td>
                      
                      <td>
                        <Link to={`/admin/orden/${orden.id}`} className="admin-link">Ver detalle</Link>
                      </td>
                    </tr>
                );
            })
          ) : (
            <tr>
                <td colSpan="7" style={{textAlign: 'center', padding: '2rem'}}>
                    No se encontraron órdenes.
                </td>
            </tr>
          )}
        </tbody>
      </table>

       <div className="pagination-controls">
        <button onClick={() => setPaginaActual(p => Math.max(p - 1, 1))} disabled={paginaActual === 1}>Anterior</button>
        <span className="pagination-span">Página {paginaActual} de {totalPaginas || 1}</span>
        <button onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))} disabled={paginaActual === totalPaginas || totalPaginas === 0}>Siguiente</button>
      </div>
    </div>
  );
};

export default GestionOrdenes;