import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Crear el contexto
const AuthContext = createContext();

// 2. Hook personalizado para un uso más fácil
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Cargar el usuario desde localStorage al iniciar la app
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  // Función de registro
  const registro = (datosUsuario) => {
    return new Promise((resolve, reject) => {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const existeUsuario = usuarios.find(u => u.email === datosUsuario.email);

      if (existeUsuario) {
        reject(new Error("El correo electrónico ya está registrado."));
      } else {
        usuarios.push(datosUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        resolve({ ...datosUsuario });
      }
    });
  };

  // Función de inicio de sesión
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password);

      if (usuarioEncontrado) {
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));
        setUsuario(usuarioEncontrado);
        resolve(usuarioEncontrado);
      } else {
        reject(new Error("Credenciales inválidas."));
      }
    });
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('usuarioLogueado');
    setUsuario(null);
  };
  
  // Función para recuperar/actualizar contraseña
  const recuperarPassword = (email, nuevaPassword) => {
     return new Promise((resolve, reject) => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const userIndex = usuarios.findIndex(u => u.email === email);

        if (userIndex !== -1) {
            usuarios[userIndex].password = nuevaPassword;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            resolve("Contraseña actualizada con éxito.");
        } else {
            reject(new Error("El correo electrónico no se encuentra registrado."));
        }
     });
  };
  
  // --- FUNCIÓN CORREGIDA ---
  // Función para actualizar el perfil (nombre, email o contraseña)
  const actualizarPerfil = (data) => {
    return new Promise((resolve, reject) => {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const userIndex = usuarios.findIndex(u => u.email === data.email);

      if (userIndex === -1) {
        return reject(new Error("Usuario no encontrado."));
      }
      if (usuarios[userIndex].password !== data.passwordActual) {
        return reject(new Error("La contraseña actual es incorrecta."));
      }

      // **LA CORRECCIÓN ESTÁ AQUÍ**
      // 1. Empezamos con una copia COMPLETA del usuario existente.
      const usuarioActualizado = { ...usuarios[userIndex] };

      // 2. Actualizamos solo los campos que el usuario proporcionó.
      if (data.nuevoNombre) {
        usuarioActualizado.nombre = data.nuevoNombre;
      }
      if (data.nuevoEmail) {
        usuarioActualizado.email = data.nuevoEmail;
      }
      if (data.nuevaPassword) {
        usuarioActualizado.password = data.nuevaPassword;
      }
      
      // 3. Guardamos el objeto COMPLETO en la lista y en el estado.
      usuarios[userIndex] = usuarioActualizado;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioActualizado)); // También actualizamos la sesión
      setUsuario(usuarioActualizado); // Actualizamos el estado global con el objeto completo

      resolve(usuarioActualizado);
    });
  };

  const value = {
    usuario,
    login,
    logout,
    registro,
    recuperarPassword,
    actualizarPerfil
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

