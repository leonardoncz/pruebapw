// src/components/usuario/Registro.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const [form, setForm] = useState({
    nombre: "", // Añadimos campo de nombre
    email: "",
    password: "",
    confirmarPassword: "",
  });
  const [error, setError] = useState("");
  const { registro } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... (tus validaciones de contraseña y email se mantienen) ...
    if (form.password !== form.confirmarPassword) {
        setError("Las contraseñas no coinciden");
        return;
    }
    
    setError("");
    try {
      await registro({ nombre: form.nombre, email: form.email, password: form.password });
      alert("¡Registro exitoso! Ahora serás redirigido para iniciar sesión.");
      navigate("/login");
    } catch (err) {
      setError("Ocurrió un error durante el registro. Inténtalo de nuevo.");
    }
  };
  return (
    <div className="registro-container">
      <h2 className="registro-title">Registro</h2>
      <form onSubmit={handleSubmit} className="registro-form">
        <label>Email</label>
        <input
          className="registro-input"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="usuario@correo.com"
        />
        <label>Contraseña</label>
        <input
          className="registro-input"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Al menos 6 caracteres"
        />
        <label>Confirmar Contraseña</label>
        <input
          className="registro-input"
          type="password"
          name="confirmarPassword"
          value={form.confirmarPassword}
          onChange={handleChange}
          required
          placeholder="Repite la contraseña"
        />
        {error && <p className="registro-error">{error}</p>}
        <button type="submit" className="registro-btn">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;
