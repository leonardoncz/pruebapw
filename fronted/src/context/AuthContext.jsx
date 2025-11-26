import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
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
      const response = await fetch('http://localhost:3000/api/auth/register', {
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
  
  // --- CORRECCIÓN: Actualizar perfil conecta con Backend y actualiza estado global ---
  const actualizarPerfil = async (datos) => {
    if (!usuario) return;

    try {
        const response = await fetch(`http://localhost:3000/api/auth/update/${usuario.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Error al actualizar");

        // ACTUALIZACIÓN CRÍTICA: Actualizamos localStorage y Estado Global
        // Esto hará que el avatar cambie inmediatamente
        localStorage.setItem('usuarioLogueado', JSON.stringify(data));
        setUsuario(data);
        
        return data;
    } catch (error) {
        throw error;
    }
  };

  const verificarEmailExistente = async (email) => {
    try {
        const response = await fetch('http://localhost:3000/api/auth/check-email', {
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
        const response = await fetch('http://localhost:3000/api/auth/reset-password', {
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;