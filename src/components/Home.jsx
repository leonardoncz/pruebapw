import React, { useState, useEffect } from "react";
import { useMascotas } from "../context/MascotasContext";
import './Home.css';
import { useNavigate } from 'react-router-dom';

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
  const razasFiltradas = mascotas
    .filter(mascota => filtroTipo === "Todos" || mascota.type === filtroTipo)
    .map(mascota => mascota.breed);
  const razasUnicas = ["Todas", ...new Set(razasFiltradas)];

  const handleViewDetails = (id) => {
    navigate(`/producto/${id}`);
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
        <select onChange={(e) => { setFiltroTipo(e.target.value); setFiltroRaza("Todas"); }} value={filtroTipo}>
          {tiposUnicos.map((tipo) => (
            <option key={tipo} value={tipo}>{tipo === "Todos" ? "Todos los Tipos" : tipo}</option>
          ))}
        </select>
        <select onChange={(e) => setFiltroRaza(e.target.value)} value={filtroRaza}>
          {razasUnicas.map((raza) => (
            <option key={raza} value={raza}>{raza === "Todas" ? "Todas las Razas" : raza}</option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {mascotasFiltradas.length > 0 ? (
          mascotasFiltradas.map((mascota) => (
            <div key={mascota.id} className="product-card" onClick={() => handleViewDetails(mascota.id)}>
              <img src={mascota.image || "https://via.placeholder.com/300x200?text=Mascota"} alt={mascota.name} className="product-card-image" />
              <div className="product-card-info">
                <h3 className="product-card-name">{mascota.name}</h3>
                <p className="product-card-details">
                  Tipo: {mascota.type} | Raza: {mascota.breed}
                  <br />
                  {/* CORRECCIÓN: Usamos el nuevo campo 'edad' */}
                  Edad: {mascota.edad || 'No especificada'}
                </p>
                <div className="product-card-footer">
                  <p className="product-card-price">${mascota.price.toFixed(2)}</p>
                  <button
                    className="btn-view-details"
                    onClick={(e) => { e.stopPropagation(); handleViewDetails(mascota.id); }}
                  >
                    Ver Detalles
                  </button>
                </div>
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

