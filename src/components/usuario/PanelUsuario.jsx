import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './PanelUsuario.css';

const PanelUsuario = () => {
  // Datos simulados actualizados para que solo sean mascotas
  const ordenesMock = [
    { id: 1, fecha: "2025-10-10", producto: { name: "Max", breed: "Labrador" }, estado: "Enviado", total: "250.00" },
    { id: 2, fecha: "2025-10-12", producto: { name: "Luna", breed: "Siamés" }, estado: "Completada", total: "300.00" },
  ];

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
      <h2 className="panel-title">Mis Órdenes</h2>
      <table className="panel-table">
        <thead>
          <tr>
            <th>ID Orden</th>
            <th>Fecha</th>
            <th>Mascota</th>
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
              {/* Lógica de renderizado simplificada */}
              <td>{`${orden.producto.name} (${orden.producto.breed})`}</td>
              <td className={orden.estado === "Enviado" ? "estado-enviado" : ""}>{orden.estado}</td>
              <td>${orden.total}</td>
              <td>
                <Link to={`/orden/${orden.id}`} className="panel-link">Ver detalle</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button
          onClick={() => setPaginaActual((p) => Math.max(p - 1, 1))}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>
        <span className="pagination-span">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={() => setPaginaActual((p) => Math.min(p + 1, totalPaginas))}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PanelUsuario;