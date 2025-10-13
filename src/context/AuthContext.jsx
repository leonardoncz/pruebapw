
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
      const usuarios = JSON.parse(localStorage.getItem('usuariosDB')) || [];
      const existeUsuario = usuarios.find(u => u.email === datosUsuario.email);

      if (existeUsuario) {
        return reject(new Error("El correo electrónico ya está registrado."));
      }
      
      const nuevoUsuario = {
        ...datosUsuario,
        id: Date.now(),
        activo: true
      };
      
      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuariosDB', JSON.stringify(usuarios));
      resolve(nuevoUsuario);
    });
  };

  // Función de inicio de sesión
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      const usuarios = JSON.parse(localStorage.getItem('usuariosDB')) || [];
      const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password);

      if (usuarioEncontrado) {
        if (!usuarioEncontrado.activo) {
          return reject(new Error("Esta cuenta ha sido desactivada por un administrador."));
        }
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
        const usuarios = JSON.parse(localStorage.getItem('usuariosDB')) || [];
        const userIndex = usuarios.findIndex(u => u.email === email);

        if (userIndex !== -1) {
            usuarios[userIndex].password = nuevaPassword;
            localStorage.setItem('usuariosDB', JSON.stringify(usuarios));
            resolve("Contraseña actualizada con éxito.");
        } else {
            reject(new Error("El correo electrónico no se encuentra registrado."));
        }
     });
  };
  
  // Función para actualizar el perfil (nombre, email o contraseña)
  const actualizarPerfil = (data) => {
    return new Promise((resolve, reject) => {
      const usuarios = JSON.parse(localStorage.getItem('usuariosDB')) || [];
      // Usamos el email original del usuario en sesión para la búsqueda
      const userIndex = usuarios.findIndex(u => u.email === usuario.email);

      if (userIndex === -1) {
        return reject(new Error("Usuario no encontrado."));
      }
      if (usuarios[userIndex].password !== data.passwordActual) {
        return reject(new Error("La contraseña actual es incorrecta."));
      }

      const usuarioActualizado = { ...usuarios[userIndex] };

      if (data.nuevoNombre) {
        usuarioActualizado.nombre = data.nuevoNombre;
      }
      if (data.nuevoEmail) {
        // Opcional: Validar que el nuevo email no exista ya
        const emailExiste = usuarios.some(u => u.email === data.nuevoEmail && u.id !== usuario.id);
        if (emailExiste) {
          return reject(new Error("El nuevo correo electrónico ya está en uso."));
        }
        usuarioActualizado.email = data.nuevoEmail;
      }
      if (data.nuevaPassword) {
        usuarioActualizado.password = data.nuevaPassword;
      }
      
      usuarios[userIndex] = usuarioActualizado;
      localStorage.setItem('usuariosDB', JSON.stringify(usuarios));
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioActualizado));
      setUsuario(usuarioActualizado);

      resolve(usuarioActualizado);
    });
  };

  // El valor completo que se comparte a través del contexto
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

