// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const registro = (datosUsuario) => {
    return new Promise((resolve, reject) => {
      const usuarios = JSON.parse(localStorage.getItem('usuariosDB')) || [];
      if (usuarios.find(u => u.email === datosUsuario.email)) {
        return reject(new Error("El correo electrónico ya está registrado."));
      }
      const nuevoUsuario = { ...datosUsuario, id: Date.now(), activo: true };
      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuariosDB', JSON.stringify(usuarios));
      resolve(nuevoUsuario);
    });
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      const usuarios = JSON.parse(localStorage.getItem('usuariosDB')) || [];
      const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password);

      if (usuarioEncontrado) {
        if (!usuarioEncontrado.activo) {
          return reject(new Error("Esta cuenta ha sido desactivada."));
        }
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));
        setUsuario(usuarioEncontrado);
        resolve(usuarioEncontrado);
      } else {
        reject(new Error("Credenciales inválidas."));
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('usuarioLogueado');
    setUsuario(null);
  };
  
  const recuperarPassword = (email, nuevaPassword) => {
     return new Promise((resolve, reject) => {
        const usuarios = JSON.parse(localStorage.getItem('usuariosDB')) || [];
        const userIndex = usuarios.findIndex(u => u.email === email);
        if (userIndex !== -1) {
            usuarios[userIndex].password = nuevaPassword;
            localStorage.setItem('usuariosDB', JSON.stringify(usuarios));
            resolve("Contraseña actualizada.");
        } else {
            reject(new Error("Correo no registrado."));
        }
     });
  };
  
  const actualizarPerfil = (data) => {
    return new Promise((resolve, reject) => {
      const usuarios = JSON.parse(localStorage.getItem('usuariosDB')) || [];
      const userIndex = usuarios.findIndex(u => u.email === usuario.email);

      if (userIndex === -1) return reject(new Error("Usuario no encontrado."));
      if (usuarios[userIndex].password !== data.passwordActual) return reject(new Error("Contraseña incorrecta."));

      const usuarioActualizado = { ...usuarios[userIndex] };
      if (data.nuevoNombre) usuarioActualizado.nombre = data.nuevoNombre;
      if (data.nuevoEmail) usuarioActualizado.email = data.nuevoEmail;
      if (data.nuevaPassword) usuarioActualizado.password = data.nuevaPassword;
      
      usuarios[userIndex] = usuarioActualizado;
      localStorage.setItem('usuariosDB', JSON.stringify(usuarios));
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioActualizado));
      setUsuario(usuarioActualizado);
      resolve(usuarioActualizado);
    });
  };

  const value = {
    usuario, login, logout, registro, recuperarPassword, actualizarPerfil
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

