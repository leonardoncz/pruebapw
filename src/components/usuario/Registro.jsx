// src/components/usuario/Registro.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const Registro = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
    pais: "",
  });
  const [error, setError] = useState("");
  const { registro } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (form.password !== form.confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await registro({
        nombre: form.nombre,
        email: form.email,
        password: form.password,
        pais: form.pais
      });
      // Redirigir al login con un mensaje de éxito
      navigate("/login", { state: { message: "¡Registro exitoso! Ya puedes iniciar sesión." } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="form-title">Crea tu Cuenta</h2>
        <p className="form-subtitle">Únete a nuestra comunidad de amantes de las mascotas.</p>
        
        <form onSubmit={handleSubmit}>
          {error && <p className="form-error">{error}</p>}
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" type="text" value={form.nombre} onChange={handleChange} required placeholder="Tu nombre completo" className="form-input"/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="usuario@correo.com" className="form-input"/>
          </div>
          <div className="form-group">
            <label htmlFor="pais">País</label>
            <input id="pais" name="pais" type="text" value={form.pais} onChange={handleChange} required placeholder="Ej: Perú" className="form-input"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required placeholder="Al menos 6 caracteres" className="form-input"/>
          </div>
          <div className="form-group">
            <label htmlFor="confirmarPassword">Confirmar Contraseña</label>
            <input id="confirmarPassword" name="confirmarPassword" type="password" value={form.confirmarPassword} onChange={handleChange} required placeholder="Repite la contraseña" className="form-input"/>
          </div>
          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Crear Cuenta</button>
        </form>
        <div className="form-links">
          <p>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Registro;

