import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PanelUsuario = () => {
  const ordenesMock = Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    fecha: new Date(2025, 9, i + 1).toLocaleDateString(),
    estado: i % 3 === 0 ? "Enviado" : "Pendiente",
    total: (Math.random() * 100).toFixed(2),
  }));

  const [ordenes, setOrdenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const ITEMS_POR_PAGINA = 10;

  useEffect(() => {
    const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
    setOrdenes(ordenesMock.slice(inicio, inicio + ITEMS_POR_PAGINA));
  }, [paginaActual]);

  const totalPaginas = Math.ceil(ordenesMock.length / ITEMS_POR_PAGINA);

  return (
    <div className="panel-container">
      <h2>Panel de Usuario - Órdenes</h2>
      <table className="ordenes-table">
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
          {ordenes.map((orden) => (
            <tr key={orden.id}>
              <td>{orden.id}</td>
              <td>{orden.fecha}</td>
              <td>{orden.estado}</td>
              <td>${orden.total}</td>
              <td>
                <Link to={`/orden/${orden.id}`} className="link-btn">
                  Ver detalle
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button
          onClick={() => setPaginaActual((p) => Math.max(p - 1, 1))}
          disabled={paginaActual === 1}
          className="btn-primary"
        >
          Anterior
        </button>
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={() => setPaginaActual((p) => Math.min(p + 1, totalPaginas))}
          disabled={paginaActual === totalPaginas}
          className="btn-primary"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PanelUsuario;
