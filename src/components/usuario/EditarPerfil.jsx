import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './AuthForms.css'; // Importar los estilos compartidos

const EditarPerfil = () => {
  const { usuario, actualizarPerfil } = useAuth();
  const [view, setView] = useState('profile'); // 'profile' o 'password'

  // Estado para el formulario de perfil
  const [form, setForm] = useState({
    nombre: '',
    email: '',
  });

  // Estado para el formulario de contraseña
  const [passwordForm, setPasswordForm] = useState({
    passwordActual: '',
    nuevaPassword: '',
    confirmarNuevaPassword: '',
  });

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Cargar datos del usuario en el formulario cuando el componente se monta
  useEffect(() => {
    if (usuario) {
      setForm({
        nombre: usuario.nombre,
        email: usuario.email,
      });
    }
  }, [usuario]);
  
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handlePasswordFormChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  // Manejar la actualización de los datos del perfil
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");
    
    // Se necesita la contraseña actual para CUALQUIER cambio
    if (!passwordForm.passwordActual) {
        setError("Por seguridad, ingresa tu contraseña actual para guardar los cambios.");
        return;
    }

    try {
      await actualizarPerfil({
        email: usuario.email, // Email original para buscar al usuario
        passwordActual: passwordForm.passwordActual,
        nuevoNombre: form.nombre,
        nuevoEmail: form.email
      });
      setMensaje("¡Perfil actualizado con éxito!");
      setPasswordForm({ ...passwordForm, passwordActual: '' }); // Limpiar campo de contraseña
    } catch (err) {
      setError(err.message);
    }
  };

  // Manejar el cambio de contraseña
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

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
            email: usuario.email,
            passwordActual: passwordForm.passwordActual,
            nuevaPassword: passwordForm.nuevaPassword
        });
        setMensaje("¡Contraseña actualizada con éxito!");
        // Limpiar todos los campos de contraseña por seguridad
        setPasswordForm({ passwordActual: '', nuevaPassword: '', confirmarNuevaPassword: '' });
    } catch(err) {
        setError(err.message);
    }
  };


  if (!usuario) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container profile-theme">
        <h2 className="auth-title">Configuración de tu Cuenta</h2>

        {/* --- Pestañas para cambiar de vista --- */}
        <div className="profile-tabs">
          <button 
            className={`tab-button ${view === 'profile' ? 'active' : ''}`}
            onClick={() => setView('profile')}
          >
            Editar Perfil
          </button>
          <button 
            className={`tab-button ${view === 'password' ? 'active' : ''}`}
            onClick={() => setView('password')}
          >
            Cambiar Contraseña
          </button>
        </div>

        {/* Mensajes de feedback para el usuario */}
        {error && <p className="auth-error">{error}</p>}
        {mensaje && <p className="auth-success">{mensaje}</p>}

        {/* --- Vista para Editar Perfil --- */}
        {view === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="auth-form">
            <p className="auth-subtitle">Actualiza tu información personal.</p>
            <label>Nombre</label>
            <input
              className="auth-input"
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleFormChange}
              required
            />
            <label>Email</label>
            <input
              className="auth-input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleFormChange}
              required
            />
            <hr className="divider" />
            <label>Contraseña Actual (para confirmar)</label>
            <input
              className="auth-input"
              type="password"
              name="passwordActual"
              value={passwordForm.passwordActual}
              onChange={handlePasswordFormChange}
              required
              placeholder="Ingresa tu contraseña actual"
            />
            <button type="submit" className="auth-button profile-btn">Guardar Cambios</button>
          </form>
        )}

        {/* --- Vista para Cambiar Contraseña --- */}
        {view === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="auth-form">
            <p className="auth-subtitle">Para mayor seguridad, no reutilices contraseñas antiguas.</p>
            <label>Contraseña Actual</label>
            <input
              className="auth-input"
              type="password"
              name="passwordActual"
              value={passwordForm.passwordActual}
              onChange={handlePasswordFormChange}
              required
              placeholder="Tu contraseña actual"
            />
            <label>Nueva Contraseña</label>
            <input
              className="auth-input"
              type="password"
              name="nuevaPassword"
              value={passwordForm.nuevaPassword}
              onChange={handlePasswordFormChange}
              required
              placeholder="Mínimo 6 caracteres"
            />
            <label>Confirmar Nueva Contraseña</label>
            <input
              className="auth-input"
              type="password"
              name="confirmarNuevaPassword"
              value={passwordForm.confirmarNuevaPassword}
              onChange={handlePasswordFormChange}
              required
              placeholder="Repite la nueva contraseña"
            />
            <button type="submit" className="auth-button profile-btn">Actualizar Contraseña</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditarPerfil;
