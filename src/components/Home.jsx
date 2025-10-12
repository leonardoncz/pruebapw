import React, { useState, useEffect, useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { useMascotas } from '../context/MascotasContext';
// Se importa solo la galería de imágenes, ya que las mascotas vienen del context
import { galeriaImagenes } from './data/productos.js';
import './Home.css';

function Home() {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { mascotas } = useMascotas(); // La única fuente de verdad para las mascotas

  // Estados para el carrusel y filtros
  const [imagenActual, setImagenActual] = useState(0);
  const [filtroTipo, setFiltroTipo] = useState('all');
  const [filtroRaza, setFiltroRaza] = useState('all');
  const [mascotasFiltradas, setMascotasFiltradas] = useState([]);
  const [razasDisponibles, setRazasDisponibles] = useState([]);

  // useEffect para el carrusel automático
  useEffect(() => {
    const timer = setInterval(() => {
      setImagenActual(prev => (prev + 1) % galeriaImagenes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [galeriaImagenes.length]);

  // useEffect para aplicar los filtros cuando cambien las selecciones o las mascotas
  useEffect(() => {
    let mascotasResultado = mascotas;

    // Filtrar por tipo (Perro/Gato)
    if (filtroTipo !== 'all') {
      mascotasResultado = mascotasResultado.filter(
        mascota => mascota.type.toLowerCase() === filtroTipo.toLowerCase()
      );
    }

    // Generar dinámicamente las razas disponibles según el tipo seleccionado
    const razas = [...new Set(mascotasResultado.map(m => m.breed))];
    setRazasDisponibles(razas);

    // Filtrar por raza
    if (filtroRaza !== 'all') {
      mascotasResultado = mascotasResultado.filter(
        mascota => mascota.breed.toLowerCase() === filtroRaza.toLowerCase()
      );
    }
    
    setMascotasFiltradas(mascotasResultado);
  }, [filtroTipo, filtroRaza, mascotas]);

  // Manejar el cambio de tipo para resetear el filtro de raza
  const handleTipoChange = (e) => {
    setFiltroTipo(e.target.value);
    setFiltroRaza('all'); // Resetear la raza al cambiar de tipo
  };

  return (
    <div className="home-container">
      {/* Sección del carrusel */}
      <section className="carousel-container">
        <div className="carousel-slide" style={{ transform: `translateX(-${imagenActual * 100}%)` }}>
          {galeriaImagenes.map((imgSrc, index) => (
            <img key={index} src={imgSrc} alt={`Mascota en venta ${index + 1}`} />
          ))}
        </div>
      </section>
      
      {/* Sección de la galería con filtros */}
      <section className="animal-gallery">
        <h2>Encuentra a tu nuevo amigo</h2>
        <div className="filters">
          <select value={filtroTipo} onChange={handleTipoChange}>
            <option value="all">Todos los Tipos</option>
            <option value="Perro">Perros</option>
            <option value="Gato">Gatos</option>
          </select>
          <select value={filtroRaza} onChange={(e) => setFiltroRaza(e.target.value)}>
            <option value="all">Todas las Razas</option>
            {/* Las razas se generan dinámicamente */}
            {razasDisponibles.map(raza => (
              <option key={raza} value={raza}>{raza}</option>
            ))}
          </select>
        </div>

        <div className="animal-grid">
          {mascotasFiltradas.map(mascota => (
            <div key={mascota.id} className="animal-card">
              <img src={mascota.image} alt={mascota.name} />
              <h3>{mascota.name}</h3>
              <p>Raza: {mascota.breed}</p>
              {/* Añadimos el precio para que parezca una tienda */}
              <p className="animal-price">${mascota.price ? mascota.price.toFixed(2) : '0.00'}</p>
              <button className="adopt-button" onClick={() => agregarAlCarrito(mascota)}>
                Añadir al Carrito
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;


