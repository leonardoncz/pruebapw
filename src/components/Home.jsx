import React, { useState, useEffect, useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
// 1. CORRECCIÓN: Se ajusta la ruta de importación y se trae también la galería de imágenes.
import { todosAnimales, galeriaImagenes } from './data/productos.js'; 
import './Home.css';

function Home() {
  const { agregarAlCarrito } = useContext(CarritoContext);
  
  // Se restauran los estados necesarios para el carrusel y los filtros
  const [imagenActual, setImagenActual] = useState(0);
  const [filtroTipo, setFiltroTipo] = useState('all');
  const [filtroRaza, setFiltroRaza] = useState('all');
  const [filtroAnimal, setFiltroAnimal] = useState(todosAnimales);

  // useEffect para el carrusel automático
  useEffect(() => {
    const timer = setInterval(() => {
      setImagenActual(slideAnterior => (slideAnterior + 1) % galeriaImagenes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [galeriaImagenes.length]);

  // useEffect para aplicar los filtros de tipo y raza
  useEffect(() => {
    const nuevofiltroAnimal = todosAnimales.filter(animal => {
      const tipoMatch = filtroTipo === 'all' || animal.tipo === filtroTipo;
      
      const razaMatch = filtroRaza === 'all' || animal.raza === filtroRaza;;
      return tipoMatch && razaMatch;
    });
    setFiltroAnimal(nuevofiltroAnimal);
  }, [filtroTipo, filtroRaza]);

  // 2. CORRECCIÓN: Se envuelve todo en el div con la clase correcta y se elimina el <main>
  return (
    <div className="home-container">
      {/* Sección del carrusel restaurada */}
      <section className="carousel-container">
        <div className="carousel-slide" style={{ transform: `translateX(-${imagenActual * 100}%)` }}>
          {galeriaImagenes.map((imgSrc, index) => (
            <img key={index} src={imgSrc} alt={`Mascota en adopción ${index + 1}`} />
          ))}
        </div>
      </section>
      
      {/* Sección de la galería con título y filtros restaurados */}
      <section className="animal-gallery">
        <h2>Encuentra a tu nuevo amigo</h2>
        <div className="filters">
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="all">Todos los animales</option>
            <option value="perro">Perros</option>
            <option value="gato">Gatos</option>
          </select>
          <select value={filtroRaza} onChange={(e) => setFiltroRaza(e.target.value)}>
            <option value="all">Todas las razas</option>
            <option value="labrador">Labrador</option>
            <option value="beagle">Beagle</option>
            <option value="siames">Siamés</option>
            <option value="persa">Persa</option>
          </select>
        </div>

        <div className="animal-grid">
          {filtroAnimal.map(animal => (
            <div key={animal.id} className="animal-card">
              <img src={animal.image} alt={animal.name} />
              <h3>{animal.name}</h3>
              <p>Raza: {animal.raza}</p>
              <button className="adopt-button" onClick={() => agregarAlCarrito(animal)}>
                Adoptar
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
