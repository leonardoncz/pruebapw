// src/components/admin/FormularioMascota.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMascotas } from '../../context/MascotasContext';
import '../usuario/AuthForms.css'; // Reutilizamos los estilos de los formularios

const FormularioMascota = () => {
  const { agregarMascota, actualizarMascota, getMascotaById } = useMascotas();
  const navigate = useNavigate();
  const { id } = useParams(); // Para saber si estamos editando
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    type: 'Perro', // Valor por defecto
    breed: '',
    price: 0,
    image: '',
    birthDate: '',
    description: ''
  });

  useEffect(() => {
    if (isEditing) {
      const mascotaExistente = getMascotaById(parseInt(id));
      if (mascotaExistente) {
        setForm({
          ...mascotaExistente,
          price: mascotaExistente.price || 0, // Asegurar que price no sea undefined
          birthDate: mascotaExistente.birthDate || '',
          description: mascotaExistente.description || ''
        });
      }
    }
  }, [id, isEditing, getMascotaById]);
  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      actualizarMascota({ ...form, id: parseInt(id) });
    } else {
      agregarMascota(form);
    }
    navigate('/admin/mascotas');
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <h2 className="auth-title">{isEditing ? 'Editar Mascota' : 'Agregar Nueva Mascota'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Nombre</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Ej: Max" required className="auth-input"/>
          
          <label>Tipo</label>
          <select name="type" value={form.type} onChange={handleChange} required className="auth-input">
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
          </select>
          
          <label>Raza</label>
          <input name="breed" value={form.breed} onChange={handleChange} placeholder="Ej: Labrador" required className="auth-input"/>
          
          <label>Precio (USD)</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Ej: 250.00" required className="auth-input"/>
          
          <label>Fecha de Nacimiento</label>
          <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} className="auth-input"/>

          <label>URL de la Imagen</label>
          <input name="image" value={form.image} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" required className="auth-input"/>
          
          <label>Descripción</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción de la mascota" className="auth-input"/>

          <button type="submit" className="auth-button login-btn">{isEditing ? 'Guardar Cambios' : 'Agregar Mascota'}</button>
        </form>
      </div>
    </div>
  );
};

export default FormularioMascota;

