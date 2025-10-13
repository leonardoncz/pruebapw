import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// CORRECCIÓN 1: Se importan los hooks de los contextos
import { useOrdenes } from "../../context/OrdenesContext";
import { useUsuarios } from "../../context/UsuariosContext";
import { useMascotas } from "../../context/MascotasContext";
import "./DashboardAdmin.css";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  // CORRECCIÓN 2: Se obtienen los datos dinámicos de los contextos
  const { ordenes } = useOrdenes();
  const { usuarios } = useUsuarios();
  const { mascotas } = useMascotas();

  const hoy = new Date().toISOString().split("T")[0];
  const [fechaInicio, setFechaInicio] = useState(hoy);
  const [fechaFin, setFechaFin] = useState(hoy);
  
  const [resumen, setResumen] = useState({
    totalOrdenes: 0,
    totalIngresos: 0,
    nuevosUsuarios: 0, // Esta métrica es más compleja y se puede implementar después
  });
  const [graficoDatos, setGraficoDatos] = useState([]);

  // Función para parsear la fecha en formato 'D/M/YYYY' a un objeto Date
  const parsearFecha = (str) => {
    const [d, m, y] = str.split("/").map(Number);
    return new Date(y, m - 1, d);
  };

  useEffect(() => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    fin.setHours(23, 59, 59, 999); // Asegurar que se incluya todo el día final

    // CORRECCIÓN 3: Se usan los datos del contexto para los cálculos
    const ordenesFiltradas = ordenes.filter((o) => {
      const fechaOrden = parsearFecha(o.fecha);
      return fechaOrden >= inicio && fechaOrden <= fin;
    });

    const totalOrdenes = ordenesFiltradas.length;
    const totalIngresos = ordenesFiltradas.reduce((acc, o) => acc + parseFloat(o.total), 0);

    setResumen({ totalOrdenes, totalIngresos, nuevosUsuarios: 0 }); // nuevosUsuarios por implementar

    // Agrupar ingresos por fecha para el gráfico
    const agrupado = {};
    ordenesFiltradas.forEach((o) => {
      agrupado[o.fecha] = (agrupado[o.fecha] || 0) + parseFloat(o.total);
    });

    const datosGrafico = Object.entries(agrupado).map(([fecha, total]) => ({
      fecha,
      total,
    }));

    setGraficoDatos(datosGrafico);
  }, [fechaInicio, fechaFin, ordenes]); // Depende de 'ordenes' del contexto

  return (
    <div className="admin-container">
      <h2 className="admin-title">Dashboard del Administrador</h2>

      {/* FILTRO DE FECHAS */}
      <div className="admin-filter-bar">
        <label>
          Desde:
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="admin-filter-input"
          />
        </label>
        <label>
          Hasta:
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="admin-filter-input"
          />
        </label>
      </div>

      <div className="dashboard-main-flex">
        {/* TARJETAS DE RESUMEN */}
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Órdenes en Rango</h3>
            <p>{resumen.totalOrdenes}</p>
          </div>
          <div className="dashboard-card">
            <h3>Ingresos en Rango</h3>
            <p>${resumen.totalIngresos.toFixed(2)}</p>
          </div>
          <div className="dashboard-card clickable" onClick={() => navigate("/admin/productos")}>
            <h3>Mascotas Totales</h3>
            <p>{mascotas.length}</p>
          </div>
          <div className="dashboard-card clickable" onClick={() => navigate("/admin/usuarios")}>
            <h3>Usuarios Totales</h3>
            <p>{usuarios.length}</p>
          </div>
        </div>

        {/* GRÁFICO DE INGRESOS */}
        <div className="dashboard-chart">
          <h3>Ingresos por día</h3>
          {graficoDatos.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graficoDatos} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Line type="monotone" dataKey="total" name="Ingresos" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="dashboard-no-data">No hay datos de ingresos en el rango seleccionado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;