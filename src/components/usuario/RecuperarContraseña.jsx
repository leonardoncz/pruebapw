import { useState } from "react";

const RecuperarContraseña = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarEmail(email)) {
      setError("Ingrese un email válido.");
      setMensaje("");
      return;
    }
    setError("");
    setMensaje("Se ha enviado un enlace de recuperación a su correo (simulado).");
  };

  return (
    <div className="form-container">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Email registrado</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        {error && <p className="error-msg">{error}</p>}
        {mensaje && <p className="success-msg">{mensaje}</p>}
        <button type="submit" className="btn-primary">Enviar enlace de recuperación</button>
      </form>
    </div>
  );
};

export default RecuperarContraseña;
