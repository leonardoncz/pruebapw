import React, { useState, useEffect } from "react";
import { useMascotas } from "../context/MascotasContext";
import "./Home.css";
import { useNavigate } from "react-router-dom";

// --- FUNCIÓN AUXILIAR: DETERMINAR ETAPA (Bebé o Adulto) ---
const getEtapaMascota = (edadTexto) => {
  if (!edadTexto) return "Adulto";

  const texto = edadTexto.toLowerCase().trim();

  // Intenta encontrar número (meses o años)
  const match = texto.match(/\d+/);
  const numero = match ? parseInt(match[0]) : 0;

  // Detecta si es meses o años (acepta variantes y abreviaciones)
  const esMeses = /(mes|mese|meses|m\b)/.test(texto);
  const esAnios = /(año|años|ano|a\b)/.test(texto);

  if (esMeses) {
    // Todo lo menor de 12 meses se considera bebé
    return numero < 12 ? "Bebé" : "Adulto";
  }

  if (esAnios) {
    // Menos de 1 año = bebé
    return numero < 1 ? "Bebé" : "Adulto";
  }

  // Si no se puede determinar, asumimos adulto
  return "Adulto";
};

// --- FUNCIÓN AUXILIAR: SI ESTÁ EN ADOPCIÓN ---
const isEnAdopcion = (price) => {
  return !price || price === 0;
};

// --- CATEGORÍAS DE PRODUCTOS ---
const nuevasCategorias = [
  { name: "Alimentos", icon: "🍖" },
  { name: "Accesorios", icon: "🧸" },
  { name: "Juguetes", icon: "🪁" },
  { name: "Medicamentos", icon: "💊" },
];

const Home = () => {
  const { mascotas } = useMascotas();
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [filtroRaza, setFiltroRaza] = useState("Todas");
  const [filtroEtapa, setFiltroEtapa] = useState("Todas");
  const [mascotasFiltradas, setMascotasFiltradas] = useState([]);
  const [activeNewCategory, setActiveNewCategory] = useState(null);
  const navigate = useNavigate();

  const categoriasDestacadas = [
    { nombre: "Bebés", valor: "Bebé", icon: "🍼" },
    { nombre: "Adultos", valor: "Adulto", icon: "🐾" },
    { nombre: "En Adopción", valor: "Adopcion", icon: "🏠" },
  ];

  // --- EFECTO PRINCIPAL DE FILTRADO ---
  useEffect(() => {
    let filtradas = mascotas;

    if (filtroTipo !== "Todos") {
      filtradas = filtradas.filter((m) => m.type === filtroTipo);
    }
    if (filtroRaza !== "Todas") {
      filtradas = filtradas.filter((m) => m.breed === filtroRaza);
    }

    if (filtroEtapa !== "Todas") {
      if (filtroEtapa === "Adopcion") {
        filtradas = filtradas.filter((m) => isEnAdopcion(m.price));
      } else {
        filtradas = filtradas.filter(
          (m) => getEtapaMascota(m.edad) === filtroEtapa
        );
      }
    }

    setMascotasFiltradas(filtradas);
  }, [mascotas, filtroTipo, filtroRaza, filtroEtapa]);

  // --- OBTENER TIPOS Y RAZAS ÚNICAS ---
  const tiposUnicos = ["Todos", ...new Set(mascotas.map((m) => m.type))];
  const razasFiltradas = mascotas
    .filter((m) => filtroTipo === "Todos" || m.type === filtroTipo)
    .map((m) => m.breed);
  const razasUnicas = ["Todas", ...new Set(razasFiltradas)];

  // --- HANDLERS ---
  const handleViewDetails = (id) => {
    navigate(`/producto/${id}`);
  };

  const handleCategoryClick = (valor) => {
    setFiltroEtapa(filtroEtapa === valor ? "Todas" : valor);
    setActiveNewCategory(null);
  };

  const handleNewCategoryClick = (name) => {
    setActiveNewCategory(activeNewCategory === name ? null : name);
  };

  // --- RENDER PRINCIPAL ---
  return (
    <div className="home-page-container">
      {/* SECCIÓN HERO */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🐾 Encuentra a tu nuevo amigo</h1>
          <p className="hero-subtitle">
            Explora nuestra gran variedad de mascotas esperando un hogar amoroso.
            ¡Haz la diferencia hoy mismo!
          </p>
        </div>
      </div>

      {/* CATEGORÍAS DESTACADAS */}
      <div className="featured-categories-section">
        <h2 className="featured-categories-title-box">CATEGORÍAS DESTACADAS</h2>
        <div className="category-cards-grid">
          {categoriasDestacadas.map((cat) => (
            <div
              key={cat.valor}
              className={`category-card ${
                filtroEtapa === cat.valor ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(cat.valor)}
            >
              <div className="category-card-icon">{cat.icon}</div>
              <p className="category-card-text">{cat.nombre}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FILTROS */}
      <div className="filters-container">
        <select
          onChange={(e) => {
            setFiltroTipo(e.target.value);
            setFiltroRaza("Todas");
          }}
          value={filtroTipo}
        >
          {tiposUnicos.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo === "Todos" ? "Todos los Tipos" : tipo}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setFiltroRaza(e.target.value)}
          value={filtroRaza}
        >
          {razasUnicas.map((raza) => (
            <option key={raza} value={raza}>
              {raza === "Todas" ? "Todas las Razas" : raza}
            </option>
          ))}
        </select>
      </div>

      {/* LISTADO DE MASCOTAS */}
      <div className="product-grid">
        {mascotasFiltradas.length > 0 ? (
          mascotasFiltradas.map((mascota) => (
            <div
              key={mascota.id}
              className="product-card"
              onClick={() => handleViewDetails(mascota.id)}
            >
              <img
                src={
                  mascota.image ||
                  "https://via.placeholder.com/300x200?text=Mascota"
                }
                alt={mascota.name}
                className="product-card-image"
              />
              <div className="product-card-info">
                <h3 className="product-card-name">{mascota.name}</h3>
                <p className="product-card-details">
                  Tipo: {mascota.type} | Raza: {mascota.breed}
                  <br />
                  Etapa: {getEtapaMascota(mascota.edad)} ({mascota.edad})
                </p>
                <p className="product-card-price">
                  {isEnAdopcion(mascota.price)
                    ? "¡En Adopción!"
                    : `$${mascota.price.toFixed(2)}`}
                </p>
                <button
                  className="btn-view-details"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(mascota.id);
                  }}
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-pets-message">
            No se encontraron mascotas con los filtros seleccionados.
          </p>
        )}
      </div>

      {/* CATEGORÍAS DE PRODUCTOS */}
      <div className="featured-categories-footer">
        <h2 className="featured-categories-title-box">
          EXPLORA CATEGORÍAS DE PRODUCTOS
        </h2>
        <div className="category-cards-grid">
          {nuevasCategorias.map((cat) => (
            <div
              key={cat.name}
              className={`category-card ${
                activeNewCategory === cat.name ? "active" : ""
              }`}
              onClick={() => handleNewCategoryClick(cat.name)}
            >
              <div className="category-card-icon">{cat.icon}</div>
              <p className="category-card-text">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;