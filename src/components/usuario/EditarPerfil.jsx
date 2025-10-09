import { useState } from "react";

const EditarPerfil = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    passwordActual: "",
    nuevaPassword: "",
    confirmarNuevaPassword: "",
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarEmail(form.email)) {
      setError("Email no válido");
      setMensaje("");
      return;
    }

    if (form.nuevaPassword || form.confirmarNuevaPassword) {
      if (form.nuevaPassword.length < 6) {
        setError("La nueva contraseña debe tener al menos 6 caracteres");
        setMensaje("");
        return;
      }
      if (form.nuevaPassword !== form.confirmarNuevaPassword) {
        setError("Las nuevas contraseñas no coinciden");
        setMensaje("");
        return;
      }
      if (!form.passwordActual) {
        setError("Debe ingresar la contraseña actual para cambiarla");
        setMensaje("");
        return;
      }
    }

    setError("");
    setMensaje("Perfil actualizado correctamente (simulado)");
  };

  return (
    <div className="form-container">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="input-field"
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="input-field"
        />
        <label>Contraseña Actual</label>
        <input
          type="password"
          name="passwordActual"
          value={form.passwordActual}
          onChange={handleChange}
          className="input-field"
        />
        <label>Nueva Contraseña</label>
        <input
          type="password"
          name="nuevaPassword"
          value={form.nuevaPassword}
          onChange={handleChange}
          className="input-field"
        />
        <label>Confirmar Nueva Contraseña</label>
        <input
          type="password"
          name="confirmarNuevaPassword"
          value={form.confirmarNuevaPassword}
          onChange={handleChange}
          className="input-field"
        />
        {error && <p className="error-msg">{error}</p>}
        {mensaje && <p className="success-msg">{mensaje}</p>}
        <button type="submit" className="btn-primary">Actualizar Perfil</button>
      </form>
    </div>
  );
};

export default EditarPerfil;
