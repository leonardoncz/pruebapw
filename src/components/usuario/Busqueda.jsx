import { useState } from "react";
import productos from "../data/productos"; 
import { Link } from "react-router-dom";

export default function Busqueda() {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleBuscar = (e) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);

    if (texto.trim() === "") {
      setResultados([]);
      return;
    }

    const filtrados = productos.filter((prod) =>
      prod.nombre.toLowerCase().includes(texto)
    );
    setResultados(filtrados);
  };

  return (
    <div className="busqueda-container">
      <h2>Buscar Productos</h2>

      <input
        type="text"
        value={busqueda}
        onChange={handleBuscar}
        placeholder="Escribe el nombre del producto..."
        className="busqueda-input"
      />

      <div className="resultados-lista">
        {resultados.length === 0 && busqueda !== "" && (
          <p>No se encontraron productos.</p>
        )}

        {resultados.map((producto) => (
          <div key={producto.id} className="producto-item">
            <img src={producto.imagen} alt={producto.nombre} width={100} />
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
             
              <button>Añadir al carrito</button>
              
          </div>
        ))}
      </div>
    </div>
  );
}