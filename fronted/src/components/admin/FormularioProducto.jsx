import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useMascotas } from '../../context/MascotasContext';
import { useCategorias } from '../../context/CategoriasContext';

const FormularioProducto = () => {
  const { agregarMascota, actualizarMascota, getMascotaById } = useMascotas();
  const { categorias, asociarProductoACategoria, desasociarProductoDeCategoria } = useCategorias();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    type: '',
    breed: '',
    price: '',
    edad: '',
    image: '', // Ahora será un string (URL o Base64)
    description: '',
    categoriaId: ''
  });

  const [imagePreview, setImagePreview] = useState('');

  // --- FUNCIÓN MÁGICA: Convierte Archivo a Texto Base64 ---
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    if (isEditing) {
      // Nota: Asegúrate que getMascotaById busque en el estado actualizado o haz fetch directo si falla
      const mascotaExistente = getMascotaById(parseInt(id));
      if (mascotaExistente) {
        setForm(mascotaExistente);
        setImagePreview(mascotaExistente.image);
      }
    }
  }, [id, isEditing, getMascotaById]);

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        // Opción A: Guardamos el archivo para convertirlo al enviar
        // Opción B (Mejor para preview): Lo convertimos ya mismo
        const base64 = await convertToBase64(file);
        setForm(prev => ({ ...prev, image: base64 }));
        setImagePreview(base64);
      }
    } else {
      setForm(prev => ({
        ...prev,
        [name]: name === 'price' ? (value === '' ? '' : Number(value)) : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(form.price) < 0) return alert("El precio no puede ser negativo.");
    if (!form.categoriaId) return alert("Selecciona una categoría.");
    if (!form.image) return alert("Por favor, sube una imagen.");

    try {
      let mascotaProcesada;

      // El form.image ya viene en Base64 gracias al handleChange, 
      // así que lo enviamos directo al Context.

      if (isEditing) {
        mascotaProcesada = await actualizarMascota({ ...form, id: parseInt(id) });
        // Nota: La lógica de desasociar/asociar depende de tu backend, 
        // pero generalmente actualizar el categoriaId en el producto es suficiente.
      } else {
        mascotaProcesada = await agregarMascota(form);
      }

      if (mascotaProcesada) {
         navigate('/admin/mascotas');
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al conectar al servidor");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="form-title">{isEditing ? 'Editar Mascota' : 'Agregar Nueva Mascota'}</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required className="form-input"/>
          </div>

          <div className="form-group">
            <label htmlFor="type">Tipo (Ej: Perro, Loro)</label>
            <input id="type" name="type" type="text" value={form.type} onChange={handleChange} required className="form-input"/>
          </div>

          <div className="form-group">
            <label htmlFor="breed">Raza</label>
            <input id="breed" name="breed" value={form.breed} onChange={handleChange} required className="form-input"/>
          </div>

          <div className="form-group">
            <label htmlFor="edad">Edad (Ej: 1 año)</label>
            <input id="edad" name="edad" type="text" value={form.edad} onChange={handleChange} required className="form-input"/>
          </div>

          <div className="form-group">
            <label htmlFor="price">Precio (USD)</label>
            <input id="price" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required className="form-input"/>
          </div>

          <div className="form-group">
            <label htmlFor="categoriaId">Categoría</label>
            <select id="categoriaId" name="categoriaId" value={form.categoriaId} onChange={handleChange} required className="form-input">
              <option value="">Selecciona una categoría</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="image">Imagen de la Mascota</label>
            <input id="image" name="image" type="file" accept="image/*" onChange={handleChange} className="form-input"/>
          </div>

          {imagePreview && (
            <div className="form-group" style={{ textAlign: 'center' }}>
              <p>Vista previa:</p>
              <img src={imagePreview} alt="Vista previa" style={{ maxWidth: '150px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} className="form-textarea" rows="4"/>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link to="/admin/mascotas" className="btn btn-secondary" style={{ flex: 1 }}>Cancelar</Link>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
              {isEditing ? 'Guardar Cambios' : 'Agregar Mascota'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioProducto;