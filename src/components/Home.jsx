import './Home.css'; // (opcional si quieres poner estilos separados)
import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="home-container">
      {/* Banner o bienvenida */}
      <section className="banner">
        <h1>🐾 Bienvenido a la Tienda de Mascotas Virtuales 🐾</h1>
        <p>¡Encuentra los mejores accesorios, alimentos y amigos virtuales!</p>
      </section>
      <Link to="/busqueda">Buscar</Link>

      {/* Categorías destacadas */}
      <section className="destacadas">
        <h2>Categorías Destacadas</h2>
        <div className="categorias-grid">
          <div className="categoria">🐶 Accesorios</div>
          <div className="categoria">🍖 Alimentos</div>
          <div className="categoria">🐱 Mascotas Virtuales</div>
        </div>
      </section>

      {/* Productos más vendidos */}
      <section className="mas-vendidos">
        <h2>Productos Más Vendidos</h2>
        <div className="productos-grid">
          {[...Array(6)].map((_, index) => (
            <div className="producto" key={index}>
              <img src={`/assets/producto-${index + 1}.jpg`} alt={`Producto ${index + 1}`} />
              <p>Producto {index + 1}</p>
              <Link to="/orden/:id">
              <button>Añadir al carrito</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

   

      {/* Productos nuevos */}
      <section className="productos-nuevos">
        <h2>Productos Nuevos</h2>
        <div className="productos-grid">
          {[...Array(6)].map((_, index) => (
            <div className="producto" key={index}>
              <img src={`/assets/nuevo-${index + 1}.jpg`} alt={`Nuevo Producto ${index + 1}`} />
              <p>Nuevo Producto {index + 1}</p>
              <Link to="/orden/:id">
              <button>Añadir al carrito</button>
              </Link>
              
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Tienda de Mascotas Virtuales. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;