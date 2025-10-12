// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

// 1. Crear el contexto
const AuthContext = createContext();

// 2. Crear un hook personalizado para usar el contexto más fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // null si no hay usuario, objeto de usuario si está logueado

  // Función para simular el inicio de sesión
  const login = (email, password) => {
    // En un proyecto real, aquí harías una llamada a tu API
    console.log("Intentando iniciar sesión con:", email, password);
    // Simulación: Si el email es "user@test.com" y pass "123456", el login es exitoso
    if (email === "user@test.com" && password === "123456") {
      const usuarioSimulado = {
        id: '1',
        nombre: 'Usuario de Prueba',
        email: email,
        // Aquí irían más datos del usuario: rol, etc.
      };
      setUsuario(usuarioSimulado);
      return usuarioSimulado;
    }
    // Si falla, podrías lanzar un error
    throw new Error("Credenciales inválidas");
  };

  // Función para registrar un nuevo usuario
  const registro = async (datosUsuario) => {
    // En un proyecto real, aquí harías una llamada POST a tu API para crear el usuario
    console.log("Registrando nuevo usuario:", datosUsuario);
    // Simulación: asumimos que el registro siempre es exitoso
    // y devolvemos los datos del nuevo usuario.
    // La API real devolvería el usuario creado con un ID.
    return { id: Date.now(), ...datosUsuario };
  };

  // Función para cerrar sesión
  const logout = () => {
    setUsuario(null);
    // Aquí también podrías limpiar tokens, etc.
  };

  const value = {
    usuario,
    login,
    logout,
    registro,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};