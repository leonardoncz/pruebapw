import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from '../../context/AuthContext'; 
import './AuthForms.css';

const Registro = () => {
  const [form, setForm] = useState({
    nombre: "", 
    email: "",
    password: "",
    confirmarPassword: "",
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
      await registro({ nombre: form.nombre, email: form.email, password: form.password });
      alert("¡Registro exitoso! Ahora serás redirigido para iniciar sesión.");
      navigate("/login"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <h2 className="auth-title">Crea tu Cuenta</h2>
        <p className="auth-subtitle">Únete a nuestra comunidad de amantes de las mascotas.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Nombre</label>
          <input
            className="auth-input"
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            placeholder="Tu nombre completo"
          />
          <label>Email</label>
          <input
            className="auth-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="usuario@correo.com"
          />
          <label>Contraseña</label>
          <input
            className="auth-input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Al menos 6 caracteres"
          />
          <label>Confirmar Contraseña</label>
          <input
            className="auth-input"
            type="password"
            name="confirmarPassword"
            value={form.confirmarPassword}
            onChange={handleChange}
            required
            placeholder="Repite la contraseña"
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-button register-btn">Crear Cuenta</button>
        </form>
        <div className="auth-links">
          <p>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Registro;

