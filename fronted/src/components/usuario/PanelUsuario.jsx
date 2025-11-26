import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Corrige la extensión .jsx si no es necesaria
import { useOrdenes } from "../../context/OrdenesContext";
import './PanelUsuario.css';

const PanelUsuario = () => {
  const { usuario } = useAuth();
  // Aseguramos que 'ordenes' sea un array, por si el fetch falla
  const { ordenes = [] } = useOrdenes();
  
  const [ordenesDelUsuario, setOrdenesDelUsuario] = useState([]);
  const [ordenesPaginadas, setOrdenesPaginadas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const ITEMS_POR_PAGINA = 10;

  useEffect(() => {
    if (usuario && Array.isArray(ordenes)) {
      const ordenesFiltradas = ordenes.filter(
        // CORRECCIÓN: Usamos '==' para que "1" sea igual a 1, o parseamos ambos
        (orden) => parseInt(orden.usuarioId) === parseInt(usuario.id)
      );
      // Ordenamos por ID descendente (más nuevas primero)
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
    switch (estado?.toLowerCase()) {
      case "enviado": return "status-enviado";
      case "cancelada": return "status-cancelada";
      case "pendiente": default: return "status-pendiente";
    }
  };

  return (
    <div className="page-container">
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
                      <span className={`status-badge ${getStatusClassName(orden.estado)}`}>
                        {orden.estado}
                      </span>
                    </td>
                    {/* CORRECCIÓN: Number() para evitar error con toFixed */}
                    <td>${Number(orden.total).toFixed(2)}</td>
                    <td>
                      <Link to={`/orden/${orden.id}`} className="link-detalle">Ver detalle</Link>
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
                  className="btn btn-secondary"
                >
                  Anterior
                </button>
                <span>
                  Página {paginaActual} de {totalPaginas}
                </span>
                <button
                  onClick={() => setPaginaActual((p) => Math.min(p + 1, totalPaginas))}
                  disabled={paginaActual === totalPaginas}
                  className="btn btn-secondary"
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
            <Link to="/" className="btn btn-primary">Explorar Mascotas</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelUsuario;