// src/components/admin/FormularioProducto.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useMascotas } from '../../context/MascotasContext';

const FormularioProducto = () => {
  const { agregarMascota, actualizarMascota, getMascotaById } = useMascotas();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    type: '',      // CORRECCIÓN: Ahora es texto libre
    breed: '',
    price: '',
    edad: '',      // NUEVO CAMPO: Edad
    image: null,   // CORRECCIÓN: Manejará el archivo de imagen
    description: ''
  });
  
  // Estado para la vista previa de la imagen
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (isEditing) {
      const mascotaExistente = getMascotaById(parseInt(id));
      if (mascotaExistente) {
        setForm(mascotaExistente);
        // Si ya hay una imagen, la mostramos en la vista previa
        if (mascotaExistente.image) {
          setImagePreview(mascotaExistente.image);
        }
      }
    }
  }, [id, isEditing, getMascotaById]);
  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        setForm(prevForm => ({ ...prevForm, image: file }));
        setImagePreview(URL.createObjectURL(file)); // Crear URL para la vista previa
      }
    } else {
      setForm(prevForm => ({
        ...prevForm,
        [name]: name === 'price' ? (value === '' ? '' : Number(value)) : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.price < 0) {
      alert("El precio no puede ser negativo.");
      return;
    }
    // Si estamos creando y no se ha subido imagen
    if (!isEditing && !form.image) {
      alert("Por favor, sube una imagen para la mascota.");
      return;
    }

    if (isEditing) {
      actualizarMascota({ ...form, id: parseInt(id) });
    } else {
      agregarMascota(form);
    }
    navigate('/admin/mascotas');
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
            <label htmlFor="type">Tipo (Ej: Perro, Loro, Hamster)</label>
            <input id="type" name="type" type="text" value={form.type} onChange={handleChange} required className="form-input"/>
          </div>
          <div className="form-group">
            <label htmlFor="breed">Raza</label>
            <input id="breed" name="breed" value={form.breed} onChange={handleChange} required className="form-input"/>
          </div>
          <div className="form-group">
            <label htmlFor="edad">Edad (Ej: 3 meses, 2 años)</label>
            <input id="edad" name="edad" type="text" value={form.edad} onChange={handleChange} required className="form-input"/>
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio (USD)</label>
            <input id="price" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required className="form-input"/>
          </div>
          <div className="form-group">
            <label htmlFor="image">Imagen de la Mascota</label>
            <input id="image" name="image" type="file" accept="image/*" onChange={handleChange} className="form-input"/>
          </div>
          
          {imagePreview && (
            <div className="form-group" style={{textAlign: 'center'}}>
              <p>Vista previa:</p>
              <img src={imagePreview} alt="Vista previa" style={{maxWidth: '150px', borderRadius: 'var(--border-radius)'}}/>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} className="form-textarea" rows="4"/>
          </div>
          
          <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
            <Link to="/admin/mascotas" className="btn btn-secondary" style={{flex: 1}}>Cancelar</Link>
            <button type="submit" className="btn btn-primary" style={{flex: 2}}>{isEditing ? 'Guardar Cambios' : 'Agregar Mascota'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioProducto;

