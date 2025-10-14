// src/components/usuario/EditarPerfil.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import './EditarPerfil.css'; // Estilos específicos para este componente

const EditarPerfil = () => {
  const { usuario, actualizarPerfil } = useAuth();
  const [view, setView] = useState('profile'); // 'profile' o 'password'

  const [form, setForm] = useState({ nombre: '', email: '' });
  const [passwordForm, setPasswordForm] = useState({
    passwordActual: '',
    nuevaPassword: '',
    confirmarNuevaPassword: '',
  });

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (usuario) {
      setForm({
        nombre: usuario.nombre,
        email: usuario.email,
      });
    }
  }, [usuario]);
  
  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handlePasswordFormChange = (e) => setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  const clearMessages = () => {
    setError("");
    setMensaje("");
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    
    if (!passwordForm.passwordActual) {
      setError("Por seguridad, ingresa tu contraseña actual para guardar los cambios.");
      return;
    }

    try {
      await actualizarPerfil({
        passwordActual: passwordForm.passwordActual,
        nuevoNombre: form.nombre,
        nuevoEmail: form.email
      });
      setMensaje("¡Perfil actualizado con éxito!");
      setPasswordForm({ ...passwordForm, passwordActual: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    if (passwordForm.nuevaPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (passwordForm.nuevaPassword !== passwordForm.confirmarNuevaPassword) {
      setError("Las nuevas contraseñas no coinciden.");
      return;
    }

    try {
      await actualizarPerfil({
        passwordActual: passwordForm.passwordActual,
        nuevaPassword: passwordForm.nuevaPassword
      });
      setMensaje("¡Contraseña actualizada con éxito!");
      setPasswordForm({ passwordActual: '', nuevaPassword: '', confirmarNuevaPassword: '' });
    } catch(err) {
      setError(err.message);
    }
  };

  if (!usuario) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="form-title">Configuración de tu Cuenta</h2>

        <div className="profile-tabs">
          <button 
            className={`tab-button ${view === 'profile' ? 'active' : ''}`}
            onClick={() => { setView('profile'); clearMessages(); }}
          >
            Editar Perfil
          </button>
          <button 
            className={`tab-button ${view === 'password' ? 'active' : ''}`}
            onClick={() => { setView('password'); clearMessages(); }}
          >
            Cambiar Contraseña
          </button>
        </div>

        {error && <p className="form-error">{error}</p>}
        {mensaje && <p className="form-success">{mensaje}</p>}

        {view === 'profile' && (
          <form onSubmit={handleProfileSubmit}>
            <p className="form-subtitle" style={{textAlign: 'left'}}>Actualiza tu información personal.</p>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" type="text" name="nombre" value={form.nombre} onChange={handleFormChange} required className="form-input"/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" value={form.email} onChange={handleFormChange} required className="form-input"/>
            </div>
            <hr style={{margin: '2rem 0', border: 'none', borderTop: '1px solid var(--color-border)'}}/>
            <div className="form-group">
              <label htmlFor="passwordActualProfile">Contraseña Actual (para confirmar)</label>
              <input id="passwordActualProfile" type="password" name="passwordActual" value={passwordForm.passwordActual} onChange={handlePasswordFormChange} required placeholder="Ingresa tu contraseña actual" className="form-input"/>
            </div>
            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Guardar Cambios</button>
          </form>
        )}

        {view === 'password' && (
          <form onSubmit={handlePasswordSubmit}>
            <p className="form-subtitle" style={{textAlign: 'left'}}>Para mayor seguridad, no reutilices contraseñas antiguas.</p>
            <div className="form-group">
              <label htmlFor="passwordActual">Contraseña Actual</label>
              <input id="passwordActual" type="password" name="passwordActual" value={passwordForm.passwordActual} onChange={handlePasswordFormChange} required className="form-input"/>
            </div>
            <div className="form-group">
              <label htmlFor="nuevaPassword">Nueva Contraseña</label>
              <input id="nuevaPassword" type="password" name="nuevaPassword" value={passwordForm.nuevaPassword} onChange={handlePasswordFormChange} required placeholder="Mínimo 6 caracteres" className="form-input"/>
            </div>
            <div className="form-group">
              <label htmlFor="confirmarNuevaPassword">Confirmar Nueva Contraseña</label>
              <input id="confirmarNuevaPassword" type="password" name="confirmarNuevaPassword" value={passwordForm.confirmarNuevaPassword} onChange={handlePasswordFormChange} required className="form-input"/>
            </div>
            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Actualizar Contraseña</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditarPerfil;

