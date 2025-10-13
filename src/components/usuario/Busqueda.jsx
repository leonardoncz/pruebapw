import { useState } from "react";
import { Link } from "react-router-dom";
import { useMascotas } from "../../context/MascotasContext"; // Usar Contexto

export default function Busqueda() {
  const { mascotas } = useMascotas(); // Obtener mascotas del contexto
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleBuscar = (e) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);

    if (texto.trim() === "") {
      setResultados([]);
      return;
    }

    // Filtrar desde la lista de mascotas del contexto
    const filtrados = mascotas.filter((animal) =>
      animal.name.toLowerCase().includes(texto) ||
      animal.type.toLowerCase().includes(texto) ||
      animal.breed.toLowerCase().includes(texto)
    );
    setResultados(filtrados);
  };


  return (
    <div className="busqueda-container">
      <h2>Buscar Mascotas</h2>
      <input
        type="text"
        value={busqueda}
        onChange={handleBuscar}
        placeholder="Busca por nombre, tipo o raza..."
        className="busqueda-input"
      />

      <div className="resultados-lista">
        {resultados.length === 0 && busqueda !== "" && (
          <p>No se encontraron mascotas.</p>
        )}

        {resultados.map((animal) => (
          <Link to={`/animal/${animal.id}`} key={animal.id} className="producto-item">
            <img src={animal.image} alt={animal.name} width={100} />
            <div>
              <h3>{animal.name}</h3>
              <p>{animal.breed}</p>
              <button>Ver Detalles</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

