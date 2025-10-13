// src/components/Home.jsx
import React, { useState, useEffect } from "react";
import { useMascotas } from "../context/MascotasContext";
import './Home.css'; // Importa el CSS
import { useNavigate } from 'react-router-dom'; // Para navegar a los detalles

const Home = () => {
  const { mascotas } = useMascotas();
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [filtroRaza, setFiltroRaza] = useState("Todas");
  const [mascotasFiltradas, setMascotasFiltradas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let filtradas = mascotas;

    if (filtroTipo !== "Todos") {
      filtradas = filtradas.filter(mascota => mascota.type === filtroTipo);
    }
    if (filtroRaza !== "Todas") {
      filtradas = filtradas.filter(mascota => mascota.breed === filtroRaza);
    }

    setMascotasFiltradas(filtradas);
  }, [mascotas, filtroTipo, filtroRaza]);

  const tiposUnicos = ["Todos", ...new Set(mascotas.map(mascota => mascota.type))];
  const razasUnicas = ["Todas", ...new Set(mascotas.map(mascota => mascota.breed))];

  const handleViewDetails = (id) => {
    navigate(`/producto/${id}`); // Asumiendo que tienes una ruta para el detalle del producto
  };

  return (
    <div className="home-page-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Encuentra a tu nuevo amigo</h1>
          <p className="hero-subtitle">
            Explora nuestra gran variedad de mascotas esperando un hogar amoroso.
            ¡Haz la diferencia hoy mismo!
          </p>
        </div>
      </div>

      <div className="filters-container">
        <select onChange={(e) => setFiltroTipo(e.target.value)} value={filtroTipo}>
          {tiposUnicos.map((tipo) => (
            <option key={tipo} value={tipo}>Todos los Tipos</option> // CORREGIDO: ahora muestra 'Todos los Tipos'
          ))}
        </select>
        <select onChange={(e) => setFiltroRaza(e.target.value)} value={filtroRaza}>
          {razasUnicas.map((raza) => (
            <option key={raza} value={raza}>Todas las Razas</option> // CORREGIDO: ahora muestra 'Todas las Razas'
          ))}
        </select>
      </div>

      <div className="product-grid">
        {mascotasFiltradas.length > 0 ? (
          mascotasFiltradas.map((mascota) => (
            <div key={mascota.id} className="product-card">
              <img src={mascota.image || "https://via.placeholder.com/300x200?text=Mascota"} alt={mascota.name} className="product-card-image" />
              <div className="product-card-info">
                <h3 className="product-card-name">{mascota.name}</h3>
                <p className="product-card-details">
                  Tipo: {mascota.type} | Raza: {mascota.breed}
                  <br />
                  Edad: {mascota.age || 'N/A'} | Energía: {mascota.energy || 'N/A'}
                </p>
                <p className="product-card-price">${mascota.price.toFixed(2)}</p>
                <button 
                  className="btn-view-details" 
                  onClick={() => handleViewDetails(mascota.id)}
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-pets-message">No se encontraron mascotas con los filtros seleccionados.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

