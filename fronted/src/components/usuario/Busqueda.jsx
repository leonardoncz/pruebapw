import { useState } from "react";
import { Link } from "react-router-dom";
import { useMascotas } from "../../context/MascotasContext";
// Asegúrate de tener este CSS o usa estilos en línea
import './Busqueda.css'; 

export default function Busqueda() {
  const { mascotas } = useMascotas();
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleBuscar = (e) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);

    if (texto.trim() === "") {
      setResultados([]);
      return;
    }

    // Validación de seguridad: asegurarnos que 'mascotas' sea un array
    const listaMascotas = Array.isArray(mascotas) ? mascotas : [];

    const filtrados = listaMascotas.filter((animal) =>
      (animal.name || "").toLowerCase().includes(texto) ||
      (animal.type || "").toLowerCase().includes(texto) ||
      (animal.breed || "").toLowerCase().includes(texto)
    );
    setResultados(filtrados);
  };

  return (
    <div className="page-container">
      <div className="busqueda-header">
        <h1>Buscar Mascotas</h1>
        <p>Encuentra a tu nuevo amigo por su nombre, tipo o raza.</p>
        <input
          type="text"
          value={busqueda}
          onChange={handleBuscar}
          placeholder="Busca por nombre, tipo o raza..."
          className="busqueda-input"
        />
      </div>

      <div className="product-grid" style={{marginTop: '2rem'}}>
        {resultados.length === 0 && busqueda.trim() !== "" && (
          <p className="no-results-message">No se encontraron mascotas que coincidan con tu búsqueda.</p>
        )}
        
        {resultados.map((mascota) => (
          <Link to={`/producto/${mascota.id}`} key={mascota.id} className="product-card" style={{textDecoration: 'none', color: 'inherit'}}>
            <img 
                src={mascota.image || "https://via.placeholder.com/300x200?text=Mascota"} 
                alt={mascota.name} 
                className="product-card-image" 
            />
            <div className="product-card-info">
              <h3 className="product-card-name">{mascota.name}</h3>
              <p className="product-card-details">
                Tipo: {mascota.type} | Raza: {mascota.breed}
              </p>
              <div className="product-card-footer">
                {/* CORRECCIÓN CRÍTICA AQUÍ: Number() */}
                <p className="product-card-price">${Number(mascota.price).toFixed(2)}</p>
                <span className="btn-view-details">Ver Detalles</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}