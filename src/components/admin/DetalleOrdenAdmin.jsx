import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import mockOrdenesAdmin from '../../data/ordenes.json';
import './Admin.css'; // <-- NUEVA IMPORTACIÓN

const DetalleOrdenAdmin = () => {
  // ... (el resto de tu código no cambia)
  const { id } = useParams();
  const navigate = useNavigate();
  const [orden, setOrden] = useState(null);

  useEffect(() => {
      const ordenEncontrada = mockOrdenesAdmin.find(o => o.id === parseInt(id));
      if (ordenEncontrada) {
          setOrden({
              ...ordenEncontrada,
              productos: [
                  { nombre: "Producto A", cantidad: 2, precio: 15.00 },
                  { nombre: "Producto B", cantidad: 1, precio: 45.50 },
              ],
              direccion: "Av. Siempre Viva 123, Springfield"
          });
      }
  }, [id]);

  const handleCancelar = () => {
      if (window.confirm("¿Seguro que quieres cancelar esta orden?")) {
          alert("Orden cancelada (simulado).");
          navigate("/admin/ordenes");
      }
  };

  if (!orden) return <p>Cargando orden...</p>;

  return (
      <div className="admin-container admin-detalle">
          <h2 className="detalle-title">Detalle de Orden #{orden.id} (Admin)</h2>
          <p><strong>Cliente:</strong> {orden.usuario.nombre} {orden.usuario.apellido}</p>
          <p><strong>Fecha:</strong> {orden.fecha}</p>
          <p><strong>Estado:</strong> {orden.estado}</p>
          <p><strong>Dirección de envío:</strong> {orden.direccion}</p>
          <p><strong>Total:</strong> ${orden.total}</p>

          <h3 className="detalle-subtitle">Productos</h3>
          <ul className="detalle-productos">
              {orden.productos.map((prod, idx) => (
                  <li key={idx} className="detalle-producto">
                      {prod.nombre} (x{prod.cantidad}) - ${prod.precio.toFixed(2)} c/u
                  </li>
              ))}
          </ul>

          {orden.estado !== "Cancelada" && (
               <button onClick={handleCancelar} className="detalle-btn">
                  Cancelar Orden
              </button>
          )}
          
          <div className="admin-back-link-container">
              <Link to="/admin/ordenes" className="admin-link-back">
                  ← Volver al listado de órdenes
              </Link>
          </div>
      </div>
  );
};

export default DetalleOrdenAdmin;

