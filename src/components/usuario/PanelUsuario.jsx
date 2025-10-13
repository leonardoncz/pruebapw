import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
// CORRECCIÓN 1: Se importa el hook para obtener TODAS las órdenes
import { useOrdenes } from "../../context/OrdenesContext.jsx";
import './PanelUsuario.css';

const PanelUsuario = () => {
  const { usuario } = useAuth();
  // CORRECCIÓN 2: Se usa el contexto correcto
  const { ordenes } = useOrdenes();
  
  const [ordenesDelUsuario, setOrdenesDelUsuario] = useState([]);
  const [ordenesPaginadas, setOrdenesPaginadas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const ITEMS_POR_PAGINA = 10;

  useEffect(() => {
    if (usuario && ordenes) {
      // Esta lógica de filtrado ahora funcionará porque guardamos el 'usuarioId'
      const ordenesFiltradas = ordenes.filter(
        (orden) => orden.usuarioId === usuario.id
      );
      const ordenesOrdenadas = ordenesFiltradas.sort((a, b) => b.id - a.id);
      setOrdenesDelUsuario(ordenesOrdenadas);
    }
  }, [usuario, ordenes]); 

  useEffect(() => {
    const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
    const fin = inicio + ITEMS_POR_PAGINA;
    setOrdenesPaginadas(ordenesDelUsuario.slice(inicio, fin));
  }, [paginaActual, ordenesDelUsuario]);

  const totalPaginas = Math.ceil(ordenesDelUsuario.length / ITEMS_POR_PAGINA);
  
  if (!usuario) {
    return <p>Cargando panel...</p>;
  }

  const getStatusClassName = (estado) => {
    switch (estado) {
      case "Enviado":
        return "estado-enviado";
      case "Cancelada":
        return "estado-cancelada";
      case "Pendiente":
      default:
        return "estado-pendiente";
    }
  };

  return (
    <div className="panel-container">
      <h2 className="panel-title">Panel de {usuario.nombre}</h2>
      <p className="panel-subtitle">Aquí puedes ver el historial de todas tus compras.</p>
      
      {ordenesDelUsuario.length > 0 ? (
        <>
          <table className="panel-table">
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
              {ordenesPaginadas.map((orden) => (
                <tr key={orden.id}>
                  <td>#{orden.id}</td>
                  <td>{orden.fecha}</td>
                  <td>
                    <span className={getStatusClassName(orden.estado)}>
                      {orden.estado}
                    </span>
                  </td>
                  <td>${orden.total}</td>
                  <td>
                    <Link to={`/orden/${orden.id}`} className="panel-link">Ver detalle</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPaginas > 1 && (
            <div className="pagination-controls">
              <button
                onClick={() => setPaginaActual((p) => Math.max(p - 1, 1))}
                disabled={paginaActual === 1}
                className="pagination-button"
              >
                Anterior
              </button>
              <span className="pagination-span">
                Página {paginaActual} de {totalPaginas}
              </span>
              <button
                onClick={() => setPaginaActual((p) => Math.min(p + 1, totalPaginas))}
                disabled={paginaActual === totalPaginas}
                className="pagination-button"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="panel-vacio">
          <h3>¡Bienvenido!</h3>
          <p>Aún no tienes ninguna orden registrada. ¡Anímate a comprar tu nueva mascota!</p>
          <Link to="/" className="panel-boton-explorar">Explorar Mascotas</Link>
        </div>
      )}
    </div>
  );
};

export default PanelUsuario;

