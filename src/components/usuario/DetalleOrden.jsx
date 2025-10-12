import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './DetalleOrden.css';

const DetalleOrden = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orden, setOrden] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Datos simulados actualizados para que solo sean mascotas
    const ordenSimulada = {
      id,
      fecha: "2025-10-01",
      estado: "Pendiente",
      total: 250.00,
      producto: {
        name: "Max",
        type: "Perro",
        breed: "Labrador"
      },
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
      <h2 className="detalle-title">Detalle de Orden #{orden.id}</h2>
      <p><strong>Fecha:</strong> {orden.fecha}</p>
      <p><strong>Estado:</strong> {orden.estado}</p>
      <p><strong>Total:</strong> ${orden.total.toFixed(2)}</p>

      <h3 className="detalle-subtitle">Detalles de la Mascota</h3>
      {/* Lógica de renderizado simplificada */}
      <div className="detalle-mascota-info">
          <p><strong>Nombre:</strong> {orden.producto.name}</p>
          <p><strong>Tipo:</strong> {orden.producto.type}</p>
          <p><strong>Raza:</strong> {orden.producto.breed}</p>
      </div>

      {error && <p className="detalle-error">{error}</p>}

      {orden.estado !== "Cancelada" && (
        <button onClick={handleCancelar} className="detalle-btn">
          Cancelar Orden
        </button>
      )}
    </div>
  );
};

export default DetalleOrden;