import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useOrdenes } from "../../context/OrdenesContext";
import { useUsuarios } from "../../context/UsuariosContext";
import { useMascotas } from "../../context/MascotasContext";
import { useCategorias } from "../../context/CategoriasContext";
import "./Admin.css";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  // Validamos que sean arrays para evitar errores si cargan lento
  const { ordenes = [] } = useOrdenes();
  const { usuarios = [] } = useUsuarios();
  const { mascotas = [] } = useMascotas();
  const { categorias = [] } = useCategorias();

  const [resumen, setResumen] = useState({
    totalIngresos: 0,
  });
  const [graficoDatos, setGraficoDatos] = useState([]);

  useEffect(() => {
    // CORRECCIÓN: parseFloat asegura que sumemos números, no textos
    const totalIngresos = ordenes.reduce((acc, o) => acc + parseFloat(o.total || 0), 0);
    setResumen({ totalIngresos });

    const agrupado = ordenes.reduce((acc, o) => {
      const fecha = o.fecha; // Asegúrate que tu backend envíe fecha, o usa o.createdAt
      acc[fecha] = (acc[fecha] || 0) + parseFloat(o.total || 0);
      return acc;
    }, {});

    const datosGrafico = Object.entries(agrupado)
        .map(([fecha, total]) => ({ fecha, total }))
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    setGraficoDatos(datosGrafico);
  }, [ordenes]);

  return (
    <div className="admin-container">
      <h2 className="admin-title">Dashboard</h2>

      <div className="dashboard-cards">
        <div className="dashboard-card clickable" onClick={() => navigate("/admin/ordenes")}>
          <h3>Gestionar Órdenes</h3>
          <p>{ordenes.length}</p>
        </div>
        <div className="dashboard-card">
          <h3>Ingresos Totales</h3>
          {/* CORRECCIÓN: Number() para evitar crash con toFixed */}
          <p>${Number(resumen.totalIngresos).toFixed(2)}</p>
        </div>
        <div className="dashboard-card clickable" onClick={() => navigate("/admin/mascotas")}>
          <h3>Gestionar Mascotas</h3>
          <p>{mascotas.length}</p>
        </div>
        <div className="dashboard-card clickable" onClick={() => navigate("/admin/usuarios")}>
          <h3>Gestionar Usuarios</h3>
          <p>{usuarios.length}</p>
        </div>
        <div className="dashboard-card clickable" onClick={() => navigate("/admin/categorias")}>
          <h3>Gestionar Categorías</h3>
          <p>{categorias.length}</p>
        </div>
      </div>

      <div className="dashboard-chart">
        <h3>Ingresos por día</h3>
        {graficoDatos.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graficoDatos} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
              <Line type="monotone" dataKey="total" name="Ingresos" stroke="var(--color-primary-light)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="dashboard-no-data">No hay datos de ingresos para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;