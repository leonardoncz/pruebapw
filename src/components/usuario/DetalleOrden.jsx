import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetalleOrden = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orden, setOrden] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const ordenSimulada = {
      id,
      fecha: "2025-10-01",
      estado: "Pendiente",
      total: 59.99,
      productos: [
        { nombre: "Pelota para perro", cantidad: 2, precio: 10.5 },
        { nombre: "Comida para gato", cantidad: 1, precio: 38.99 },
      ],
    };
    setOrden(ordenSimulada);
  }, [id]);

  const handleCancelar = () => {
    if (window.confirm("¿Deseas cancelar esta orden?")) {
      if (orden.estado === "Cancelada") {
        setError("La orden ya está cancelada.");
        return;
      }
      setOrden({ ...orden, estado: "Cancelada" });
      alert("Orden cancelada (simulado).");
      navigate("/panel");
    }
  };

  if (!orden) return <p>Cargando orden...</p>;

  return (
    <div className="detalle-container">
      <h2>Detalle de Orden #{orden.id}</h2>
      <p><strong>Fecha:</strong> {orden.fecha}</p>
      <p><strong>Estado:</strong> {orden.estado}</p>
      <p><strong>Total:</strong> ${orden.total}</p>

      <h3>Productos</h3>
      <ul>
        {orden.productos.map((prod, idx) => (
          <li key={idx}>
            {prod.nombre} - Cantidad: {prod.cantidad} - Precio unitario: ${prod.precio}
          </li>
        ))}
      </ul>

      {error && <p className="error-msg">{error}</p>}

      {orden.estado !== "Cancelada" && (
        <button onClick={handleCancelar} className="btn-primary">Cancelar Orden</button>
      )}
    </div>
  );
};

export default DetalleOrden;
