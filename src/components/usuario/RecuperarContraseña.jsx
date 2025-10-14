// src/components/usuario/RecuperarContraseña.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const RecuperarContraseña = () => {
  const [email, setEmail] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const { recuperarContraseña, verificarEmailExistente } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      await verificarEmailExistente(email);
      setStep(2);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (nuevaPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (nuevaPassword !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await recuperarContraseña(email, nuevaPassword);
      setMensaje("¡Contraseña actualizada con éxito! Serás redirigido al login.");
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError("Ocurrió un error al actualizar la contraseña.");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        {step === 1 ? (
          <>
            <h2 className="form-title">Recuperar Contraseña</h2>
            <p className="form-subtitle">Ingresa tu correo para buscar tu cuenta.</p>
            {error && <p className="form-error">{error}</p>}
            <form onSubmit={handleEmailSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email registrado</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="usuario@correo.com" className="form-input" />
              </div>
              <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Verificar Correo</button>
            </form>
          </>
        ) : (
          <>
            <h2 className="form-title">Crea tu Nueva Contraseña</h2>
            <p className="form-subtitle">Estás actualizando para: <strong>{email}</strong></p>
            {error && <p className="form-error">{error}</p>}
            {mensaje && <p className="form-success">{mensaje}</p>}
            
            {!mensaje &&
              <form onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                    <label htmlFor="nuevaPassword">Nueva Contraseña</label>
                    <input id="nuevaPassword" type="password" value={nuevaPassword} onChange={(e) => setNuevaPassword(e.target.value)} required placeholder="Mínimo 6 caracteres" className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmarPassword">Confirmar Nueva Contraseña</label>
                    <input id="confirmarPassword" type="password" value={confirmarPassword} onChange={(e) => setConfirmarPassword(e.target.value)} required className="form-input" />
                </div>
                <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Actualizar Contraseña</button>
              </form>
            }
          </>
        )}
        <div className="form-links">
          <p><Link to="/login">Volver a Iniciar Sesión</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RecuperarContraseña;

