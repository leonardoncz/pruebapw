import { useState } from "react";
// CAMBIO CLAVE 1: Ya no importamos el JSON. Usamos el Contexto.
import { useMascotas } from "../../context/MascotasContext";
import "../admin/GestionCategorias.css";

const DetalleCategoria = ({ categoria, onCerrar }) => {
  // CAMBIO CLAVE 2: Traemos las mascotas reales del backend
  const { mascotas } = useMascotas();
  
  const [nombre, setNombre] = useState(categoria.nombre);
  const [descripcion, setDescripcion] = useState(categoria.descripcion);
  const [imagen, setImagen] = useState(categoria.imagen);
  // Nota: La lógica de asociar productos aquí es visual, el backend maneja la relación real
  const [productosCategoria, setProductosCategoria] = useState(categoria.Productos || []); 
  const [busqueda, setBusqueda] = useState("");

  // CAMBIO CLAVE 3: Filtramos sobre 'mascotas' (backend), no sobre 'productosData' (json)
  const productosFiltrados = mascotas.filter(
    (p) =>
      p.name.toLowerCase().includes(busqueda.toLowerCase()) &&
      !productosCategoria.some((pc) => pc.id === p.id)
  );

  const agregarProducto = (producto) => {
    setProductosCategoria([...productosCategoria, producto]);
  };

  const quitarProducto = (id) => {
    setProductosCategoria(productosCategoria.filter((p) => p.id !== id));
  };

  const guardarCambios = () => {
    // Aquí podrías llamar a una función del contexto para actualizar la categoría en BD
    console.log("Guardando cambios...", {
      id: categoria.id,
      nombre,
      descripcion,
      imagen,
      productos: productosCategoria,
    });
    // Nota: Para persistencia real, necesitarías un método 'actualizarCategoria' que envíe esto al backend
    onCerrar();
  };

  return (
    <div className="detalle-categoria-container">
      <h2>Detalle de Categoría</h2>

      <div className="detalle-categoria-form">
        <label>Nombre:</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label>Descripción:</label>
        <input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

        <label>Imagen URL:</label>
        <input value={imagen} onChange={(e) => setImagen(e.target.value)} />
      </div>

      <h3>Productos asociados (Vista Previa)</h3>
      <table className="productos-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Raza</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {productosCategoria.map((p) => (
            <tr key={p.id}>
              <td>
                <img src={p.image} alt={p.name} className="producto-img" />
              </td>
              <td>{p.name}</td>
              <td>{p.type}</td>
              <td>{p.breed}</td>
              <td>
                <button className="btn-agregar" onClick={() => quitarProducto(p.id)}>
                  Quitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Agregar producto a la lista</h3>
      <input
        type="text"
        placeholder="Buscar producto por nombre"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <table className="productos-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Raza</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.slice(0, 5).map((p) => (
            <tr key={p.id}>
              <td>
                <img src={p.image} alt={p.name} className="producto-img" />
              </td>
              <td>{p.name}</td>
              <td>{p.type}</td>
              <td>{p.breed}</td>
              <td>
                <button className="btn-agregar" onClick={() => agregarProducto(p)}>
                  Agregar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <button className="btn-agregar" onClick={guardarCambios}>
          Guardar (Consola)
        </button>
        <button className="btn-agregar" onClick={onCerrar}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default DetalleCategoria;