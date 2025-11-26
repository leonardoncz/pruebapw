import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useCategorias } from '../../context/CategoriasContext';

const FormularioCategoria = () => {
  const { agregarCategoria, actualizarCategoria, getCategoriaById } = useCategorias();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    imagen: '', // Aquí guardaremos el Base64
    productos: []
  });

  const [imagePreview, setImagePreview] = useState('');

  // --- FUNCIÓN MÁGICA: Convertir imagen a texto ---
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
      const categoria = getCategoriaById(parseInt(id));
      if (categoria) {
        setForm(categoria);
        if (categoria.imagen) setImagePreview(categoria.imagen);
      }
    }
  }, [id, isEditing, getCategoriaById]);

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        // Convertimos la imagen a texto Base64
        const base64 = await convertToBase64(file);
        setForm(prev => ({ ...prev, imagen: base64 }));
        setImagePreview(base64);
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditing && !form.imagen) {
      alert('Por favor, sube una imagen para la categoría.');
      return;
    }

    if (isEditing) {
      actualizarCategoria({ ...form, id: parseInt(id) });
    } else {
      agregarCategoria(form);
    }
    navigate('/admin/categorias');
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="form-title">
          {isEditing ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required className="form-input" />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea id="descripcion" name="descripcion" value={form.descripcion} onChange={handleChange} rows="3" className="form-textarea" />
          </div>

          <div className="form-group">
            <label htmlFor="image">Imagen Representativa</label>
            {/* Nota: el name no importa tanto aquí porque lo manejamos manualmente, pero mantenemos consistencia */}
            <input id="image" name="imagen" type="file" accept="image/*" onChange={handleChange} className="form-input" />
          </div>

          {imagePreview && (
            <div className="form-group" style={{ textAlign: 'center' }}>
              <p>Vista previa:</p>
              <img src={imagePreview} alt="Vista previa" style={{ maxWidth: '150px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} />
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link to="/admin/categorias" className="btn btn-secondary" style={{ flex: 1 }}>
              Cancelar
            </Link>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
              {isEditing ? 'Guardar Cambios' : 'Agregar Categoría'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCategoria;