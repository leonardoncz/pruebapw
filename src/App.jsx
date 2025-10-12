// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import { AuthProvider } from "./context/AuthContext";

// Componentes y Páginas
import Home from "./components/Home";
import Login from "./components/usuario/Login";
import Registro from "./components/usuario/Registro";
import PanelUsuario from "./components/usuario/PanelUsuario";
import EditarPerfil from "./components/usuario/EditarPerfil";
import RecuperarContraseña from "./components/usuario/RecuperarContraseña"; // <-- ¡AQUÍ ESTÁ LA SOLUCIÓN!
// ... (asegúrate de que todos los componentes que usas estén importados)
import Busqueda from "./components/usuario/Busqueda";
import CarritoPage from "./components/carrito/CarritoPage";
import CheckoutPage from "./components/carrito/CheckoutPage";
import ConfirmacionPage from "./components/carrito/ConfirmacionPage";
import DetalleOrden from "./components/usuario/DetalleOrden";
// ... etc.

import RutaProtegida from "./components/RutaProtegida";
import Header from "./components/layout/Header";

function App() {
  // ... el resto de tu código se mantiene igual
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <Header />
          <main >
            <Routes>
              {/* Rutas Públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              {/* Ahora esta línea funcionará correctamente */}
              <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
              <Route path="/busqueda" element={<Busqueda />} />
              {/* ... resto de las rutas ... */}
            </Routes>
          </main>
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;