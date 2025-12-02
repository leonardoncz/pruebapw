import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const URL = "https://testserverapi1-gchyazccfebqdwhq.centralus-01.azurewebsites.net";

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  // 1. NUEVO ESTADO: Iniciamos cargando en true
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      try {
        setUsuario(JSON.parse(usuarioGuardado));
      } catch (error) {
        console.error("Error al leer sesión local:", error);
        localStorage.removeItem('usuarioLogueado'); // Limpiamos si está corrupto
      }
    }
    // 2. IMPORTANTE: Avisamos que ya terminamos de revisar
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      localStorage.setItem('usuarioLogueado', JSON.stringify(data));
      setUsuario(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const registro = async (datosUsuario) => {
    try {
      const response = await fetch(`${URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosUsuario)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrarse");
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('usuarioLogueado');
    setUsuario(null);
  };
  
  const actualizarPerfil = async (datos) => {
    if (!usuario) return;

    try {
        const response = await fetch(`${URL}/api/auth/update/${usuario.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Error al actualizar");

        localStorage.setItem('usuarioLogueado', JSON.stringify(data));
        setUsuario(data);
        
        return data;
    } catch (error) {
        throw error;
    }
  };

  const verificarEmailExistente = async (email) => {
    try {
        const response = await fetch(`${URL}/api/auth/check-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (!response.ok) throw new Error("Correo no encontrado");
    } catch (error) {
        throw error;
    }
  };
  
  const recuperarContraseña = async (email, nuevaPassword) => {
    try {
        const response = await fetch(`${URL}/api/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, nuevaPassword })
        });
        if (!response.ok) throw new Error("Error al cambiar contraseña");
    } catch (error) {
        throw error;
    }
  };

  const value = {
    usuario,
    login,
    logout,
    registro,
    actualizarPerfil,
    verificarEmailExistente,
    recuperarContraseña,
    loading // Puedes exportarlo si lo necesitas
  };

  // 3. BLOQUEO: Si estamos cargando, mostramos pantalla blanca o spinner
  // en lugar de cargar la App y provocar redirecciones erróneas.
  if (loading) {
    return <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>Cargando...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;