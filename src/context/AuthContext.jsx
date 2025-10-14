// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUsuarios } from './UsuariosContext';

const AuthContext = createContext();

// Esta exportación nombrada para el hook está perfecta, no se toca.
export const useAuth = () => {
  return useContext(AuthContext);
};

// CAMBIO 1: Quitamos la palabra 'export' de aquí
const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const { agregarUsuario } = useUsuarios();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const registro = (datosUsuario) => {
    return new Promise((resolve, reject) => {
      const usuariosEnStorage = JSON.parse(localStorage.getItem('usuariosDB')) || [];
      if (usuariosEnStorage.find(u => u.email === datosUsuario.email)) {
        return reject(new Error("El correo electrónico ya está registrado."));
      }
      const nuevoUsuario = { ...datosUsuario, id: Date.now(), activo: true, rol: 'usuario' };
      agregarUsuario(nuevoUsuario);
      resolve(nuevoUsuario);
    });
  };

  const login = (email, password) => {
   return new Promise((resolve, reject) => {
     if (email === 'admin@admin.com' && password === 'admin') {
       const adminUser = {
         email: 'admin@admin.com',
         nombre: 'Administrador',
         rol: 'admin'
       };
       localStorage.setItem('usuarioLogueado', JSON.stringify(adminUser));
       setUsuario(adminUser);
       return resolve(adminUser);
     }
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
  
  const verificarEmailExistente = (email) => {
    return new Promise((resolve, reject) => {
      const usuarios = JSON.parse(localStorage.getItem('usuariosDB')) || [];
      const usuarioExiste = usuarios.some(u => u.email === email);
      if (usuarioExiste) {
        resolve();
      } else {
        reject(new Error("No se encontró cuenta para este correo."));
      }
    });
  };
  
  const recuperarContraseña = (email, nuevaPassword) => {
    let usuarios = JSON.parse(localStorage.getItem('usuariosDB')) || [];
    const userIndex = usuarios.findIndex(u => u.email === email);
    if (userIndex !== -1) {
      usuarios[userIndex].password = nuevaPassword;
      localStorage.setItem('usuariosDB', JSON.stringify(usuarios));
      return Promise.resolve("Contraseña actualizada con éxito.");
    } else {
      return Promise.reject(new Error("Error al intentar actualizar la contraseña."));
    }
  };
  
  const actualizarPerfil = (data) => {
    return new Promise((resolve, reject) => {
      const usuarios = JSON.parse(localStorage.getItem('usuariosDB')) || [];
      const userIndex = usuarios.findIndex(u => u.id === usuario.id);
      if (userIndex === -1) return reject(new Error("Usuario no encontrado."));
      if (usuarios[userIndex].password !== data.passwordActual) return reject(new Error("La contraseña actual es incorrecta."));

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

// CAMBIO 2: Añadimos esta línea para exportarlo por defecto
export default AuthProvider;
